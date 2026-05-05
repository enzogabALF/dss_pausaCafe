#!/usr/bin/env pwsh
# DSS Pausa Cafe - Script de demostracion
# Uso: pwsh -File .\demo.ps1

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

function Write-Section {
    param([string]$Text)
    Write-Host ""
    Write-Host "==== $Text ===="
}

function Write-Ok {
    param([string]$Text)
    Write-Host "[OK] $Text"
}

function Write-WarnText {
    param([string]$Text)
    Write-Host "[WARN] $Text"
}

function Write-InfoText {
    param([string]$Text)
    Write-Host "[INFO] $Text"
}

function Test-ProjectRoot {
    if (-not (Test-Path 'package.json')) {
        throw 'Este script debe ejecutarse desde la carpeta del proyecto dss_pausaCafe.'
    }
}

function Ensure-Dependencies {
    if (-not (Test-Path 'node_modules')) {
        Write-Section 'Instalando dependencias'
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw 'npm install fallo.'
        }
        Write-Ok 'Dependencias instaladas.'
    }
    else {
        Write-Ok 'Dependencias detectadas.'
    }
}

function Test-ApiReady {
    try {
        Invoke-RestMethod -Uri 'http://localhost:3000/api/kpi' -TimeoutSec 3 | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function Start-DevServer {
    Write-Section 'Servidor de desarrollo'
    Write-InfoText 'Se ejecuta en esta ventana. Abre http://localhost:3000 cuando termine de arrancar.'
    npm run dev
}

function Show-DemoSimulations {
    Write-Section 'Demo de simulacion'

    if (-not (Test-ApiReady)) {
        Write-WarnText 'El servidor no esta disponible en http://localhost:3000.'
        Write-InfoText 'Primero ejecuta la opcion 1 para iniciar el servidor.'
        return
    }

    $cases = @(
        @{ Name = 'Base demo'; InitialInvestment = 800000; CostPerOrder = 20; DailyOrders = 50; AverageTicket = 10000 },
        @{ Name = 'Inversion alta'; InitialInvestment = 2000000; CostPerOrder = 15; DailyOrders = 80; AverageTicket = 15000 },
        @{ Name = 'Escenario conservador'; InitialInvestment = 500000; CostPerOrder = 25; DailyOrders = 35; AverageTicket = 8000 }
    )

    foreach ($case in $cases) {
        Write-Host ""
        Write-Host ("Caso: {0}" -f $case.Name)

        $body = @{
            initialInvestment = $case.InitialInvestment
            costPerOrder = $case.CostPerOrder
            dailyOrders = $case.DailyOrders
            averageTicket = $case.AverageTicket
        } | ConvertTo-Json

        try {
            $response = Invoke-RestMethod -Uri 'http://localhost:3000/api/simulations' -Method Post -ContentType 'application/json' -Body $body -TimeoutSec 15

            if ($response.success) {
                Write-Ok ('VAN normal: {0}' -f ([math]::Round($response.data.normal.van, 0).ToString('N0')))
                Write-Ok ('TIR normal: {0}%' -f ($response.data.normal.tir.ToString('F2')))
                Write-Ok ('Payback normal: {0} meses' -f ($response.data.normal.payback.ToString('F2')))
                Write-InfoText ('Riesgo total: {0}%' -f ($response.data.risks.totalImpact.ToString('F1')))
            }
            else {
                Write-WarnText ('La API devolvio un error: {0}' -f $response.error)
            }
        }
        catch {
            Write-WarnText ('No se pudo ejecutar la simulacion: {0}' -f $_.Exception.Message)
        }
    }
}

function Open-App {
    Write-Section 'Abrir aplicacion'
    if (-not (Test-ApiReady)) {
        Write-WarnText 'El servidor no esta listo todavia.'
        return
    }

    Start-Process 'http://localhost:3000'
    Write-Ok 'Se abrio el navegador en http://localhost:3000'
}

function Show-Documentation {
    Write-Section 'Documentacion disponible'

    $docs = @(
        'README.md',
        'INSTALLATION.md',
        'GUIA_USO_SIMULADOR.md',
        'API.md',
        'IMPLEMENTATION_PLAN.md'
    )

    foreach ($doc in $docs) {
        Write-Host ('- {0}' -f $doc)
    }
}

function Show-Menu {
    Write-Host ''
    Write-Host 'DSS Pausa Cafe - Demo'
    Write-Host '1) Iniciar servidor de desarrollo'
    Write-Host '2) Ejecutar demo de simulaciones'
    Write-Host '3) Abrir la aplicacion en el navegador'
    Write-Host '4) Ver documentacion'
    Write-Host '0) Salir'
}

try {
    Clear-Host
    Write-Host 'DSS Pausa Cafe - Script de demostracion'
    Write-Host '========================================'

    Test-ProjectRoot
    Write-Ok ('Node.js: {0}' -f (node --version))
    Write-Ok ('npm: {0}' -f (npm --version))
    Ensure-Dependencies

    do {
        Show-Menu
        $choice = Read-Host 'Selecciona una opcion'

        switch ($choice) {
            '1' { Start-DevServer }
            '2' { Show-DemoSimulations }
            '3' { Open-App }
            '4' { Show-Documentation }
            '0' { Write-Ok 'Saliendo.' }
            default { Write-WarnText 'Opcion invalida.' }
        }
    } while ($choice -ne '0')
}
catch {
    Write-Host ''
    Write-Host ('[ERROR] {0}' -f $_.Exception.Message)
    exit 1
}

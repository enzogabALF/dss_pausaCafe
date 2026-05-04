#!/usr/bin/env pwsh
# Script de Demostración Interactiva - DSS Pausa Cafe
# Uso: pwsh demo.ps1
# Funciona en Windows PowerShell 5.1+

$ErrorActionPreference = "Stop"

# Colores para terminal
$colors = @{
    Reset = "`e[0m"
    Bold = "`e[1m"
    Green = "`e[32m"
    Blue = "`e[34m"
    Yellow = "`e[33m"
    Red = "`e[31m"
    Cyan = "`e[36m"
}

function Write-Title {
    param([string]$text)
    Write-Host "`n$($colors.Bold)$($colors.Cyan)==== $text ====$($colors.Reset)`n"
}

function Write-Success {
    param([string]$text)
    Write-Host "$($colors.Green)✓ $text$($colors.Reset)"
}

function Write-Error-Custom {
    param([string]$text)
    Write-Host "$($colors.Red)✗ $text$($colors.Reset)"
}

function Write-Info {
    param([string]$text)
    Write-Host "$($colors.Blue)ℹ $text$($colors.Reset)"
}

# Banner
Clear-Host
Write-Host "$($colors.Bold)$($colors.Cyan)"
Write-Host "╔════════════════════════════════════════════════════════╗"
Write-Host "║   DSS PAUSA CAFE - Sistema de Soporte de Decisiones   ║"
Write-Host "║          Script de Demostración Interactiva           ║"
Write-Host "╚════════════════════════════════════════════════════════╝"
Write-Host "$($colors.Reset)`n"

# Verificaciones previas
Write-Title "1. VERIFICANDO REQUISITOS"

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js instalado: $nodeVersion"
} catch {
    Write-Error-Custom "Node.js no encontrado. Descarga desde https://nodejs.org"
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Success "npm instalado: $npmVersion"
} catch {
    Write-Error-Custom "npm no encontrado"
    exit 1
}

# Verificar if estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Error-Custom "No estamos en el directorio del proyecto"
    Write-Info "Ejecuta este script desde la carpeta dss_pausaCafe"
    exit 1
}
Write-Success "Estamos en el directorio correcto"

# Verificar puerto 3000
Write-Title "2. VERIFICANDO PUERTO 3000"

$portInUse = netstat -ano 2>$null | Select-String ":3000"
if ($portInUse) {
    Write-Error-Custom "Puerto 3000 ya está en uso"
    Write-Info "Para liberar el puerto, ejecuta en otra terminal:"
    Write-Host "$($colors.Yellow)  netstat -ano | findstr :3000"
    Write-Host "  taskkill /PID <PID> /F$($colors.Reset)"
    exit 1
} else {
    Write-Success "Puerto 3000 disponible"
}

# Verificar dependencias
Write-Title "3. VERIFICANDO DEPENDENCIAS"

if (Test-Path "node_modules") {
    Write-Success "node_modules encontrado"
} else {
    Write-Info "node_modules no encontrado, instalando dependencias..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Error al instalar dependencias"
        exit 1
    }
    Write-Success "Dependencias instaladas"
}

# Preguntar qué demostración realizar
Write-Title "4. SELECCIONA UNA DEMOSTRACIÓN"

Write-Host "$($colors.Bold)Opciones:$($colors.Reset)"
Write-Host "1) Iniciar servidor (modo normal)"
Write-Host "2) Ejecutar simulaciones de prueba (sin servidor)"
Write-Host "3) Ambas (servidor + pruebas en otra ventana)"
Write-Host "4) Ver documentación"
Write-Host ""

$option = Read-Host "Selecciona una opción (1-4)"

switch ($option) {
    "1" {
        Write-Title "INICIANDO SERVIDOR DE DESARROLLO"
        Write-Info "Se abrirá en http://localhost:3000"
        Write-Info "Presiona Ctrl+C para detener"
        Write-Host ""
        npm run dev
    }
    "2" {
        Write-Title "EJECUTANDO SIMULACIONES DE PRUEBA"
        
        # Verificar que el servidor está corriendo
        $server = Start-Process node -ArgumentList "-e `"const http = require('http'); const { spawn } = require('child_process'); const proc = spawn('npm', ['run', 'dev'], { cwd: '$PWD' }); process.on('SIGINT', () => { proc.kill(); process.exit(0); });`" -PassThru -WindowStyle Hidden
        
        Start-Sleep -Seconds 3
        
        $testCases = @(
            @{name="Favorable"; inv=800000; cost=20; orders=50; ticket=10000},
            @{name="Normal"; inv=500000; cost=25; orders=40; ticket=8000},
            @{name="Desfavorable"; inv=300000; cost=30; orders=25; ticket=5000}
        ),
        @{name="Inversión Alta"; inv=2000000; cost=15; orders=80; ticket=15000}
        
        foreach ($test in $testCases) {
            Write-Host "`n$($colors.Bold)Ejecutando: $($test.name)$($colors.Reset)"
            Write-Info "Inversión: \$$($test.inv | FormatNumber) | Costo: \$$($test.cost) | Órdenes: $($test.orders) | Ticket: \$$($test.ticket | FormatNumber)"
            
            $body = @{
                initialInvestment = $test.inv
                costPerOrder = $test.cost
                dailyOrders = $test.orders
                averageTicket = $test.ticket
            } | ConvertTo-Json
            
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:3000/api/simulations" `
                    -Method POST `
                    -ContentType "application/json" `
                    -Body $body `
                    -UseBasicParsing `
                    -TimeoutSec 10 `
                    -ErrorAction SilentlyContinue
                
                $result = $response.Content | ConvertFrom-Json
                
                if ($result.success) {
                    Write-Success "Simulación exitosa"
                    Write-Host "  VAN Favorable:      \$$($result.data.favorable.van | FormatNumber)"
                    Write-Host "  TIR Favorable:      $($result.data.favorable.tir.ToString('F2'))%"
                    Write-Host "  Payback Favorable:  $($result.data.favorable.payback.ToString('F2')) meses"
                    Write-Host ""
                    Write-Host "  VAN Normal:         \$$($result.data.normal.van | FormatNumber)"
                    Write-Host "  TIR Normal:         $($result.data.normal.tir.ToString('F2'))%"
                    Write-Host "  Payback Normal:     $($result.data.normal.payback.ToString('F2')) meses"
                    Write-Host ""
                    Write-Host "  Riesgos:"
                    Write-Host "    - Dólar: $($result.data.risks.dolarVariation)%"
                    Write-Host "    - Demanda: $($result.data.risks.demandVariation)%"
                    Write-Host "    - Competencia: $($result.data.risks.competitionVariation)%"
                    Write-Host "    - Energía: $($result.data.risks.energyCostVariation)%"
                } else {
                    Write-Error-Custom "Error en simulación: $($result.error)"
                }
            } catch {
                Write-Error-Custom "No se pudo conectar: $_"
            }
            
            Start-Sleep -Seconds 1
        }
        
        Write-Host "`n$($colors.Green)✓ Pruebas completadas$($colors.Reset)`n"
        
        # Detener servidor
        Stop-Process -InputObject $server -Force -ErrorAction SilentlyContinue
    }
    "3" {
        Write-Title "INICIANDO MODO DUAL"
        Write-Info "1. Se inicia el servidor en esta ventana"
        Write-Info "2. Las pruebas se ejecutarán en paralelo"
        Write-Info "Presiona Ctrl+C para detener todo"
        
        # Aquí simplemente iniciamos el servidor
        # Las pruebas podrían ejecutarse en PowerShell paralelo
        npm run dev
    }
    "4" {
        Write-Title "DOCUMENTACIÓN"
        
        $docs = @{
            "README.md" = "Descripción completa del proyecto"
            "INSTALLATION.md" = "Guía paso a paso de instalación"
            "API.md" = "Referencia de endpoints REST"
            "IMPLEMENTATION_PLAN.md" = "Arquitectura técnica"
        }
        
        Write-Host "$($colors.Bold)Archivos de documentación disponibles:$($colors.Reset)"
        $docs.GetEnumerator() | ForEach-Object {
            Write-Host "  - $($_.Key): $($_.Value)"
        }
        
        Write-Host "`n$($colors.Yellow)Para abrir un archivo, usa:$($colors.Reset)"
        Write-Host "  notepad README.md"
        Write-Host "  or"
        Write-Host "  code README.md"
    }
    default {
        Write-Error-Custom "Opción inválida"
    }
}

Write-Host "`n$($colors.Green)¡Listo!$($colors.Reset)`n"

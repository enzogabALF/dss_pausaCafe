$Uri = "http://localhost:3001/api/simulations"
$Body = '{"initialInvestment": 1000000, "costPerOrder": 45, "dailyOrders": 50, "averageTicket": 4250}'

try {
    $Response = Invoke-WebRequest -Uri $Uri -Method POST -ContentType "application/json" -Body $Body -UseBasicParsing
    $Json = $Response.Content | ConvertFrom-Json
    Write-Host "✅ API Response:" -ForegroundColor Green
    $Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Starting Hospital Management System (HMS)        " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$root = $PSScriptRoot

Write-Host "[1/2] Starting Backend API on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\Backend'; npm run start"

Start-Sleep -Seconds 3

Write-Host "[2/2] Starting Frontend Vite App on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\Frontend'; npm run dev"

Start-Sleep -Seconds 3

Write-Host "Opening browser at http://localhost:5173..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Backend API:  http://localhost:3000" -ForegroundColor Green
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Green
Write-Host "HMS is now up and running!" -ForegroundColor Cyan

@echo off
title HMS - Hospital Management System Launcher
echo ===================================================
echo   Starting Hospital Management System (HMS)
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Backend API (port 3000)...
start "HMS Backend API (Port 3000)" cmd /k "cd /d "%~dp0Backend" && npm run start"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Vite App (port 5173)...
start "HMS Frontend (Port 5173)" cmd /k "cd /d "%~dp0Frontend" && npm run dev"

timeout /t 3 /nobreak > nul

echo Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo ===================================================
echo HMS Backend running at:  http://localhost:3000
echo HMS Frontend running at: http://localhost:5173
echo ===================================================
echo Both services are now running in their own windows.
echo Keep those windows open while using the application.
pause

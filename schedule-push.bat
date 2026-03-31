@echo off
REM Schedule GitHub Push for FUN-AND-RUN on March 31, 2026

REM Create scheduled task to run the PowerShell push script
REM Run this batch file as Administrator

powershell -Command ^
 $action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument '-ExecutionPolicy Bypass -File "C:\Users\abhim\OneDrive\Desktop\FUN AND RUN\push-to-github.ps1"'; ^
 $trigger = New-ScheduledTaskTrigger -At '2026-03-31T10:00:00' -Once; ^
 Register-ScheduledTask -TaskName 'GitHub-Push-FUN-AND-RUN' -Action $action -Trigger $trigger -Description 'Push FUN-AND-RUN to GitHub' -Force

echo ✅ Scheduled task created! Will run on March 31st at 10:00 AM
pause

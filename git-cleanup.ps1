$git = 'D:\Program Files\Git\cmd\git.exe'
Set-Location 'c:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn'

# remove stale lock if any
$lock = 'C:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn\.git\index.lock'
if (Test-Path $lock) { Remove-Item -Force $lock }

Write-Host '=== git status (before) ===' -ForegroundColor Cyan
& $git status --short 2>&1 | Out-String

Write-Host '=== git add . ===' -ForegroundColor Cyan
& $git add . 2>&1 | Out-String

Write-Host '=== git status (after add) ===' -ForegroundColor Cyan
& $git status --short 2>&1 | Out-String

Write-Host '=== git commit ===' -ForegroundColor Cyan
& $git commit -m 'docs: add README and ignore local helper scripts' 2>&1 | Out-String

Write-Host '=== git push ===' -ForegroundColor Cyan
& $git push origin main 2>&1 | Out-String

Write-Host '=== git log ===' -ForegroundColor Cyan
& $git log --oneline -5 2>&1 | Out-String

Write-Host '=== DONE ===' -ForegroundColor Green

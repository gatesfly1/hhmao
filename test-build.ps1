$ErrorActionPreference = 'Continue'
Set-Location 'c:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn'

# Make sure node and npm are callable
Write-Host '=== node --version ===' -ForegroundColor Cyan
& node --version 2>&1 | Out-String

Write-Host '=== npm --version ===' -ForegroundColor Cyan
& npm --version 2>&1 | Out-String

Write-Host '=== local build dry-run ===' -ForegroundColor Cyan
& npm run build 2>&1 | Out-String | Select-Object -Last 60

Write-Host '=== build folder content ===' -ForegroundColor Cyan
if (Test-Path 'C:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn\build') {
  Get-ChildItem 'C:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn\build' | Select-Object Mode, Name | Out-String
}

Write-Host '=== DONE ===' -ForegroundColor Green

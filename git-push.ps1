# Bypass ExecutionPolicy (also set outside when invoking)
$ErrorActionPreference = 'Continue'
$git = 'D:\Program Files\Git\cmd\git.exe'
Set-Location 'c:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn'

Write-Host '==[1] git config user.name/email==' -ForegroundColor Cyan
& $git config --global user.name 'gatesfly1' 2>&1 | Out-String
& $git config --global user.email '[email protected]' 2>&1 | Out-String
& $git config --global init.defaultBranch main 2>&1 | Out-String
& $git config --global core.autocrlf true 2>&1 | Out-String

# Clean stale lock file
$lockPath = 'C:\Users\Lenovo\.minimax-agent-cn\projects\hhmaocn\.git\index.lock'
if (Test-Path $lockPath) {
  Write-Host 'Removing stale lock file...' -ForegroundColor Yellow
  Remove-Item -Force $lockPath
}

Write-Host '==[2] git init==' -ForegroundColor Cyan
& $git init 2>&1 | Out-String
& $git branch -M main 2>&1 | Out-String

Write-Host '==[3] git remote add==' -ForegroundColor Cyan
& $git remote remove origin 2>&1 | Out-String
& $git remote add origin https://github.com/gatesfly1/hhmao.git 2>&1 | Out-String
& $git remote -v 2>&1 | Out-String

Write-Host '==[4] git add .==' -ForegroundColor Cyan
& $git add . 2>&1 | Out-String

Write-Host '==[5] git status (preview before commit)==' -ForegroundColor Cyan
& $git status --short 2>&1 | Out-String | Select-Object -First 50

Write-Host '==[6] git commit==' -ForegroundColor Cyan
& $git commit -m 'init: Docusaurus project' 2>&1 | Out-String

Write-Host '==[7] git push (this may prompt for GitHub credentials)===' -ForegroundColor Yellow
& $git push -u origin main 2>&1 | Out-String

Write-Host '==DONE==' -ForegroundColor Green

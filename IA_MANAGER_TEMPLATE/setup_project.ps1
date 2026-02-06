# setup_project.ps1
# Script para hidratar la plantilla de IA_MANAGER_TEMPLATE durante la inicialización del workspace.
# Sustituye todos los placeholders y deja las rutas relativas para que el template sea portable.

param(
    [string]$ProjectName = "",
    [string]$ProjectCode = "",
    [string]$WorkspaceRoot = ""
)

# Pide nombre y código si no se pasaron por parámetro
if (-not $ProjectName) { $ProjectName = Read-Host "Introduce el nombre del proyecto (ej. MiGenialApp_IA)" }
if (-not $ProjectCode) { $ProjectCode = Read-Host "Introduce un código corto para los agentes (ej. MIGA)" }

if (-not $ProjectName -or -not $ProjectCode) {
    Write-Host "Error: Debes introducir un nombre y un código." -ForegroundColor Red
    exit 1
}

$templateDir = Get-Location

# Raíz del workspace: parámetro, o inferida (carpeta que contiene la carpeta padre del template)
if ($WorkspaceRoot) {
    $workspaceRoot = $WorkspaceRoot.TrimEnd("\", "/")
} else {
    $parentOfTemplate = Split-Path $templateDir -Parent
    $workspaceRoot = Split-Path $parentOfTemplate -Parent
}

# Ruta relativa desde la raíz del workspace hasta IA_MANAGER_TEMPLATE (con / para portabilidad)
$iaManagerTemplatePath = $templateDir.Path.Replace($workspaceRoot, "").TrimStart("\", "/").Replace("\", "/")
if (-not $iaManagerTemplatePath) { $iaManagerTemplatePath = "IA_MANAGER_TEMPLATE" }

# ROOT_PATH = raíz del workspace en formato relativo (.) para Workspace Isolation
$rootPathRelative = "."

$currentDate = Get-Date -Format "yyyy-MM-dd"

# Archivos a excluir del procesamiento de placeholders (se tratan aparte o se copian a .cursor/rules)
$excludeNames = @("setup_project.ps1", "cursor_rule_orchestrator.mdc.template", "core-inviolable.mdc")
$files = Get-ChildItem -Path $templateDir -Recurse -File -Force | Where-Object { $excludeNames -notcontains $_.Name }

Write-Host "Hidratando plantilla para el proyecto: $ProjectName ($ProjectCode)..." -ForegroundColor Cyan
Write-Host "Raíz del workspace: $workspaceRoot" -ForegroundColor Gray
Write-Host "Ruta relativa al template: $iaManagerTemplatePath" -ForegroundColor Gray
Write-Host "ROOT_PATH (relativo): $rootPathRelative" -ForegroundColor Gray

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }

    $newContent = $content -replace "\{\{PROJECT_NAME\}\}", $ProjectName
    $newContent = $newContent -replace "\{\{PROJECT_CODE\}\}", $ProjectCode
    $newContent = $newContent -replace "\{\{ROOT_PATH\}\}", $rootPathRelative
    $newContent = $newContent -replace "\{\{CURRENT_DATE\}\}", $currentDate

    Set-Content -Path $file.FullName -Value $newContent -NoNewline
    $displayPath = $file.FullName.Replace($templateDir.Path, "").TrimStart("\", "/")
    Write-Host "  Actualizado: $displayPath" -ForegroundColor Green
}

# Crear .cursor y .cursor/rules en la raíz del workspace si no existen (necesario para el orquestador)
$cursorDir = Join-Path $workspaceRoot ".cursor"
$cursorRulesDir = Join-Path $cursorDir "rules"
$ruleTemplatePath = Join-Path $templateDir "DOCS\cursor_rule_orchestrator.mdc.template"
$ruleDestPath = Join-Path $cursorRulesDir "ia-manager-orchestrator.mdc"

if (-not (Test-Path $cursorDir)) {
    New-Item -ItemType Directory -Path $cursorDir -Force | Out-Null
    Write-Host "  Creado: .cursor/" -ForegroundColor Green
}
if (-not (Test-Path $cursorRulesDir)) {
    New-Item -ItemType Directory -Path $cursorRulesDir -Force | Out-Null
    Write-Host "  Creado: .cursor/rules/" -ForegroundColor Green
}

# Escribir reglas de Cursor desde el template (rutas relativas al workspace)
if (Test-Path $ruleTemplatePath) {
    $ruleContent = Get-Content -Path $ruleTemplatePath -Raw
    $ruleContent = $ruleContent -replace "\{\{IA_MANAGER_TEMPLATE_PATH\}\}", $iaManagerTemplatePath
    Set-Content -Path $ruleDestPath -Value $ruleContent -NoNewline
    Write-Host "  Regla Cursor escrita: .cursor/rules/ia-manager-orchestrator.mdc (ruta: $iaManagerTemplatePath)" -ForegroundColor Green
} else {
    Write-Host "  Aviso: No se encontró DOCS/cursor_rule_orchestrator.mdc.template; la regla en .cursor/rules no se ha generado." -ForegroundColor Yellow
}

$coreInviolableSrc = Join-Path $templateDir "DOCS\core-inviolable.mdc"
$coreInviolableDest = Join-Path $cursorRulesDir "core-inviolable.mdc"
if (Test-Path $coreInviolableSrc) {
    Copy-Item -Path $coreInviolableSrc -Destination $coreInviolableDest -Force
    Write-Host "  Regla Cursor escrita: .cursor/rules/core-inviolable.mdc (norma Core inviolable)" -ForegroundColor Green
} else {
    Write-Host "  Aviso: No se encontró DOCS/core-inviolable.mdc; la regla Core inviolable no se ha generado." -ForegroundColor Yellow
}

Write-Host "`n¡Listo! Estructura de agentes y rutas relativas configuradas para $ProjectName." -ForegroundColor Magenta
Write-Host "El orquestador usa únicamente rutas relativas al workspace." -ForegroundColor Gray

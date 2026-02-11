# setup_project.ps1
# Script para hidratar la plantilla de IA_MANAGER_TEMPLATE durante la inicialización del workspace.
# Sustituye todos los placeholders y deja las rutas relativas para que el template sea portable.

param(
    [string]$ProjectName = "",
    [string]$ProjectCode = "",
    [string]$WorkspaceRoot = "",
    [string]$ProjectObjective = "",
    [string]$ManualFuncionamiento = "",
    [string]$FotosReferencia = ""
)

# Pide nombre y código si no se pasaron por parámetro
if (-not $ProjectName) { $ProjectName = Read-Host "Introduce el nombre del proyecto (ej. MiGenialApp_IA)" }
if (-not $ProjectCode) { $ProjectCode = Read-Host "Introduce un código corto para los agentes (ej. MIGA)" }

if (-not $ProjectName -or -not $ProjectCode) {
    Write-Host "Error: Debes introducir un nombre y un código." -ForegroundColor Red
    exit 1
}

# Información relativa al objetivo del proyecto (se guarda en 01_GLOBAL_CONTEXT/Contexto_IA.md)
Write-Host "`n--- Objetivo del proyecto (se guardará en Contexto_IA.md) ---" -ForegroundColor Cyan
if (-not $ProjectObjective) {
    $ProjectObjective = Read-Host "Introduce el fin objetivo del proyecto (qué se pretende lograr; una línea; para más detalle edita después 01_GLOBAL_CONTEXT/Contexto_IA.md)"
}
if (-not $ManualFuncionamiento) {
    $ManualFuncionamiento = Read-Host "¿Dispone de manual de funcionamiento? (ruta al fichero, URL o descripción; Enter si no)"
}
if (-not $FotosReferencia) {
    $FotosReferencia = Read-Host "¿Dispone de fotos o imágenes de referencia? (ruta a carpeta/ficheros o descripción; Enter si no)"
}
if ([string]::IsNullOrWhiteSpace($ProjectObjective)) { $ProjectObjective = "(pendiente de definir)" }
if ([string]::IsNullOrWhiteSpace($ManualFuncionamiento)) { $ManualFuncionamiento = "No indicado." }
if ([string]::IsNullOrWhiteSpace($FotosReferencia)) { $FotosReferencia = "No indicado." }

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

# Rutas de Back y Front (relativas a la raíz del workspace): pedir durante el setup
$backendPathDefault = Split-Path $iaManagerTemplatePath -Parent
if (-not $backendPathDefault) { $backendPathDefault = "ventas-core-back" }
$frontendPathDefault = "ventas-core-front"
$backendPath = Read-Host "Ruta del proyecto Backend respecto a la raíz del workspace (Enter = $backendPathDefault)"
if ([string]::IsNullOrWhiteSpace($backendPath)) { $backendPath = $backendPathDefault }
$backendPath = $backendPath.Trim().Replace("\", "/")
$frontendPath = Read-Host "Ruta del proyecto Frontend respecto a la raíz del workspace (Enter = $frontendPathDefault)"
if ([string]::IsNullOrWhiteSpace($frontendPath)) { $frontendPath = $frontendPathDefault }
$frontendPath = $frontendPath.Trim().Replace("\", "/")

# ROOT_PATH = raíz del workspace en formato relativo (.) para Workspace Isolation
$rootPathRelative = "."

$currentDate = Get-Date -Format "yyyy-MM-dd"

# Archivos a excluir del procesamiento de placeholders (se tratan aparte o se copian a .cursor/rules)
$excludeNames = @("setup_project.ps1", "cursor_rule_orchestrator.mdc.template", "core-inviolable.mdc", "paths.config.json")
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
    # Objetivo del proyecto (Contexto_IA.md); uso Replace para evitar interpretación de $ en el valor
    $newContent = $newContent.Replace("{{PROJECT_OBJECTIVE}}", $ProjectObjective)
    $newContent = $newContent.Replace("{{MANUAL_DE_FUNCIONAMIENTO}}", $ManualFuncionamiento)
    $newContent = $newContent.Replace("{{FOTOS_REFERENCIA}}", $FotosReferencia)

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

# paths.config.json y ia-manager-orchestrator.mdc usan la misma template_path; mantienen coherencia
# Escribir 00_CORE_MANAGER/paths.config.json con las rutas del workspace (relativas a la raíz)
$pathsConfigPath = Join-Path $templateDir "00_CORE_MANAGER\paths.config.json"
$coreBack = "$backendPath/src/core"
$coreFront = "$frontendPath/src/app/core"
$pathsJson = @"
{
  "_comment": "Rutas relativas a la raíz del workspace. Actualizar con setup_project.ps1 o durante la configuración inicial (Setup Wizard).",
  "template_path": "$($iaManagerTemplatePath -replace '\\', '/')",
  "backend_path": "$($backendPath -replace '\\', '/')",
  "frontend_path": "$($frontendPath -replace '\\', '/')",
  "core_back": "$($coreBack -replace '\\', '/')",
  "core_front": "$($coreFront -replace '\\', '/')"
}
"@
Set-Content -Path $pathsConfigPath -Value $pathsJson -NoNewline -Encoding UTF8
Write-Host "  Configuración de rutas escrita: 00_CORE_MANAGER/paths.config.json" -ForegroundColor Green

Write-Host "`n¡Listo! Estructura de agentes y rutas relativas configuradas para $ProjectName." -ForegroundColor Magenta
Write-Host "El orquestador usa únicamente rutas relativas al workspace. Rutas clave en 00_CORE_MANAGER/paths.config.json" -ForegroundColor Gray
Write-Host "Objetivo del proyecto guardado en 01_GLOBAL_CONTEXT/Contexto_IA.md (puedes editarlo para ampliar)." -ForegroundColor Gray

# Validación post-setup
Write-Host "`n--- Validación post-setup ---" -ForegroundColor Cyan
$validationErrors = @()
$validationWarnings = @()

# Verificar archivos críticos
$criticalFiles = @(
    "00_CORE_MANAGER/00_MANAGER.md",
    "00_CORE_MANAGER/AGENTS_REGISTRY.json",
    "01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md",
    "01_GLOBAL_CONTEXT/Reglas_Generales.md",
    "README.md"
)
foreach ($file in $criticalFiles) {
    $filePath = Join-Path $templateDir $file
    if (-not (Test-Path $filePath)) {
        $validationErrors += "Archivo crítico faltante: $file"
    } elseif ((Get-Item $filePath).Length -eq 0) {
        $validationWarnings += "Archivo vacío: $file"
    }
}

# Verificar paths.config.json
if (Test-Path $pathsConfigPath) {
    try {
        $pathsConfig = Get-Content $pathsConfigPath -Raw | ConvertFrom-Json
        $requiredPaths = @("template_path", "backend_path", "frontend_path", "core_back", "core_front")
        foreach ($pathKey in $requiredPaths) {
            if (-not $pathsConfig.$pathKey) {
                $validationErrors += "paths.config.json falta clave: $pathKey"
            }
        }
    } catch {
        $validationErrors += "paths.config.json no es JSON válido: $_"
    }
} else {
    $validationErrors += "paths.config.json no existe"
}

# Verificar AGENTS_REGISTRY.json
$registryPath = Join-Path $templateDir "00_CORE_MANAGER/AGENTS_REGISTRY.json"
if (Test-Path $registryPath) {
    try {
        $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
        if (-not $registry.agents) {
            $validationErrors += "AGENTS_REGISTRY.json no tiene campo 'agents'"
        } else {
            foreach ($agent in $registry.agents) {
                if (-not $agent.file_path) {
                    $validationWarnings += "Agente $($agent.id) no tiene file_path"
                } else {
                    $agentPath = Join-Path $templateDir $agent.file_path
                    if (-not (Test-Path $agentPath)) {
                        $validationErrors += "Archivo del agente no existe: $($agent.file_path) para $($agent.id)"
                    }
                }
            }
        }
    } catch {
        $validationErrors += "AGENTS_REGISTRY.json no es JSON válido: $_"
    }
} else {
    $validationErrors += "AGENTS_REGISTRY.json no existe"
}

# Verificar que las rutas en paths.config.json existen (si el workspace está disponible)
if (Test-Path $workspaceRoot) {
    if ($pathsConfig) {
        $templateFullPath = Join-Path $workspaceRoot $pathsConfig.template_path
        if (-not (Test-Path $templateFullPath)) {
            $validationWarnings += "La ruta template_path en paths.config.json no existe: $($pathsConfig.template_path)"
        }
    }
}

# Mostrar resultados de validación
if ($validationErrors.Count -eq 0 -and $validationWarnings.Count -eq 0) {
    Write-Host "✓ Validación post-setup: Todo correcto" -ForegroundColor Green
} else {
    if ($validationErrors.Count -gt 0) {
        Write-Host "`nERRORES encontrados:" -ForegroundColor Red
        foreach ($error in $validationErrors) {
            Write-Host "  - $error" -ForegroundColor Red
        }
    }
    if ($validationWarnings.Count -gt 0) {
        Write-Host "`nADVERTENCIAS:" -ForegroundColor Yellow
        foreach ($warning in $validationWarnings) {
            Write-Host "  - $warning" -ForegroundColor Yellow
        }
    }
    Write-Host "`nRecomendación: Ejecuta 'scripts/validate-template.ps1' para validación completa" -ForegroundColor Yellow
}

# Generar reporte de setup
$setupReport = @"
# Reporte de Setup - $ProjectName

**Fecha:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Proyecto:** $ProjectName ($ProjectCode)
**Workspace Root:** $workspaceRoot
**Template Path:** $iaManagerTemplatePath

## Configuración aplicada

- **Backend Path:** $backendPath
- **Frontend Path:** $frontendPath
- **Core Back:** $coreBack
- **Core Front:** $coreFront

## Estado de validación

- **Errores:** $($validationErrors.Count)
- **Advertencias:** $($validationWarnings.Count)

$(if ($validationErrors.Count -gt 0) {
    "### Errores:`n" + ($validationErrors -join "`n- ")
} else {
    "✓ Sin errores críticos"
})

$(if ($validationWarnings.Count -gt 0) {
    "### Advertencias:`n" + ($validationWarnings -join "`n- ")
} else {
    "✓ Sin advertencias"
})

## Próximos pasos

1. Verificar que las rutas en `paths.config.json` son correctas
2. Ejecutar `scripts/validate-template.ps1` para validación completa
3. Ejecutar `scripts/generate-index.ps1` para sincronizar INDEX.md
4. Revisar `DOCS/ONBOARDING.md` para guía de inicio
"@

$reportPath = Join-Path $templateDir "SETUP_REPORT.md"
$setupReport | Out-File -FilePath $reportPath -Encoding UTF8 -NoNewline
Write-Host "`nReporte de setup guardado en: SETUP_REPORT.md" -ForegroundColor Gray

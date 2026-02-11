# validate-template.ps1
# Script de validación automática del IA_MANAGER_TEMPLATE
# Ejecuta el checklist del Gardener automáticamente

param(
    [switch]$Fix = $false,
    [string]$TemplatePath = "."
)

$ErrorActionPreference = "Stop"
$templateRoot = Resolve-Path $TemplatePath

Write-Host "`n=== Validación del IA_MANAGER_TEMPLATE ===" -ForegroundColor Cyan
Write-Host "Ruta del template: $templateRoot`n" -ForegroundColor Gray

$errors = @()
$warnings = @()
$success = @()

# 1. Verificar estructura de carpetas críticas
Write-Host "[1/13] Verificando estructura de carpetas..." -ForegroundColor Yellow
$requiredDirs = @(
    "00_CORE_MANAGER",
    "01_GLOBAL_CONTEXT",
    "02_AGENTS_REGISTRY",
    "03_PROMPT_LIBRARY",
    "DOCS",
    "scripts"
)
foreach ($dir in $requiredDirs) {
    $path = Join-Path $templateRoot $dir
    if (Test-Path $path) {
        $success += "Directorio $dir existe"
    } else {
        $errors += "Directorio crítico faltante: $dir"
    }
}

# 2. Verificar archivos críticos
Write-Host "[2/13] Verificando archivos críticos..." -ForegroundColor Yellow
$criticalFiles = @(
    "00_CORE_MANAGER/00_MANAGER.md",
    "00_CORE_MANAGER/AGENTS_REGISTRY.json",
    "01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md",
    "01_GLOBAL_CONTEXT/Reglas_Generales.md",
    "README.md"
)
foreach ($file in $criticalFiles) {
    $path = Join-Path $templateRoot $file
    if (Test-Path $path) {
        $size = (Get-Item $path).Length
        if ($size -eq 0) {
            $warnings += "Archivo vacío: $file"
        } else {
            $success += "Archivo crítico existe: $file"
        }
    } else {
        $errors += "Archivo crítico faltante: $file"
    }
}

# 3. Validar AGENTS_REGISTRY.json
Write-Host "[3/13] Validando AGENTS_REGISTRY.json..." -ForegroundColor Yellow
$registryPath = Join-Path $templateRoot "00_CORE_MANAGER/AGENTS_REGISTRY.json"
if (Test-Path $registryPath) {
    try {
        $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
        if ($registry.agents) {
            $success += "AGENTS_REGISTRY.json es válido"
            
            # Verificar que cada agente tiene file_path y existe
            foreach ($agent in $registry.agents) {
                if (-not $agent.file_path) {
                    $errors += "Agente $($agent.id) no tiene file_path"
                } else {
                    $agentPath = Join-Path $templateRoot $agent.file_path
                    if (-not (Test-Path $agentPath)) {
                        $errors += "Archivo del agente no existe: $($agent.file_path) para $($agent.id)"
                    } else {
                        $success += "Agente $($agent.id) tiene archivo válido"
                    }
                }
            }
        } else {
            $errors += "AGENTS_REGISTRY.json no tiene campo 'agents'"
        }
    } catch {
        $errors += "AGENTS_REGISTRY.json no es JSON válido: $_"
    }
} else {
    $errors += "AGENTS_REGISTRY.json no existe"
}

# 4. Verificar paths.config.json
Write-Host "[4/13] Verificando paths.config.json..." -ForegroundColor Yellow
$pathsConfigPath = Join-Path $templateRoot "00_CORE_MANAGER/paths.config.json"
if (Test-Path $pathsConfigPath) {
    try {
        $pathsConfig = Get-Content $pathsConfigPath -Raw | ConvertFrom-Json
        $requiredPaths = @("template_path", "backend_path", "frontend_path", "core_back", "core_front")
        foreach ($pathKey in $requiredPaths) {
            if ($pathsConfig.$pathKey) {
                $success += "paths.config.json tiene $pathKey"
            } else {
                $warnings += "paths.config.json falta $pathKey"
            }
        }
    } catch {
        $errors += "paths.config.json no es JSON válido: $_"
    }
} else {
    $warnings += "paths.config.json no existe (puede ser normal si no se ha ejecutado setup)"
}

# 5. Verificar enlaces internos (básico)
Write-Host "[5/13] Verificando enlaces internos básicos..." -ForegroundColor Yellow
$mdFiles = Get-ChildItem -Path $templateRoot -Recurse -Filter "*.md" | Where-Object { $_.FullName -notlike "*node_modules*" }
$linkPattern = '\[([^\]]+)\]\(([^)]+)\)'
$brokenLinks = 0
foreach ($file in $mdFiles) {
    $content = Get-Content $file.FullName -Raw
    $matches = [regex]::Matches($content, $linkPattern)
    foreach ($match in $matches) {
        $linkPath = $match.Groups[2].Value
        if ($linkPath -notmatch '^https?://' -and $linkPath -notmatch '^#') {
            # Es un enlace relativo
            $resolvedPath = Join-Path $file.DirectoryName $linkPath
            if (-not (Test-Path $resolvedPath)) {
                $brokenLinks++
                if ($brokenLinks -le 5) { # Limitar reporte
                    $warnings += "Enlace posiblemente roto en $($file.Name): $linkPath"
                }
            }
        }
    }
}
if ($brokenLinks -eq 0) {
    $success += "No se encontraron enlaces rotos obvios"
} elseif ($brokenLinks -gt 5) {
    $warnings += "Se encontraron $brokenLinks posibles enlaces rotos (mostrando solo primeros 5)"
}

# 6. Verificar INDEX.md vs AGENTS_REGISTRY.json
Write-Host "[6/13] Verificando coherencia INDEX.md..." -ForegroundColor Yellow
$indexPath = Join-Path $templateRoot "02_AGENTS_REGISTRY/INDEX.md"
if (Test-Path $indexPath -and Test-Path $registryPath) {
    $indexContent = Get-Content $indexPath -Raw
    $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
    foreach ($agent in $registry.agents) {
        if ($indexContent -notmatch $agent.id) {
            $warnings += "INDEX.md no menciona agente $($agent.id)"
        }
    }
    $success += "INDEX.md verificado contra AGENTS_REGISTRY.json"
}

# 7. Verificar global_context en AGENTS_REGISTRY.json
Write-Host "[7/13] Verificando global_context..." -ForegroundColor Yellow
if (Test-Path $registryPath) {
    $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
    if ($registry.global_context) {
        foreach ($contextFile in $registry.global_context) {
            $contextPath = Join-Path $templateRoot $contextFile
            if (Test-Path $contextPath) {
                $success += "Archivo de contexto existe: $contextFile"
            } else {
                $errors += "Archivo de contexto faltante: $contextFile"
            }
        }
    }
}

# 8. Verificar versiones en metadata de agentes
Write-Host "[8/13] Verificando versiones de agentes..." -ForegroundColor Yellow
if (Test-Path $registryPath) {
    $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
    foreach ($agent in $registry.agents) {
        if ($agent.file_path) {
            $agentPath = Join-Path $templateRoot $agent.file_path
            if (Test-Path $agentPath) {
                $agentContent = Get-Content $agentPath -Raw
                if ($agentContent -match 'VERSION:\s*"([^"]+)"') {
                    $mdVersion = $matches[1]
                    if ($agent.version -ne $mdVersion) {
                        $warnings += "Versión desincronizada para $($agent.id): JSON=$($agent.version), MD=$mdVersion"
                    } else {
                        $success += "Versión sincronizada para $($agent.id)"
                    }
                }
            }
        }
    }
}

# 9. Verificar reglas Core inviolable
Write-Host "[9/13] Verificando reglas Core inviolable..." -ForegroundColor Yellow
$coreDocs = @(
    "01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md",
    "01_GLOBAL_CONTEXT/Core_Inviolable_Frontend.md",
    "DOCS/core-inviolable.mdc"
)
foreach ($doc in $coreDocs) {
    $docPath = Join-Path $templateRoot $doc
    if (Test-Path $docPath) {
        $content = Get-Content $docPath -Raw
        if ($content -match 'core.*inviolable|inviolable.*core' -or $content -match 'Core.*INVARIABLE') {
            $success += "Documento Core inviolable existe: $doc"
        }
    }
}

# 10. Verificar que no hay rutas hardcodeadas de proyectos
Write-Host "[10/13] Verificando rutas hardcodeadas..." -ForegroundColor Yellow
$hardcodedPatterns = @('ventas-core-back', 'ventas-core-front')
$foundHardcoded = $false
foreach ($file in $mdFiles) {
    $content = Get-Content $file.FullName -Raw
    foreach ($pattern in $hardcodedPatterns) {
        if ($content -match $pattern -and $content -notmatch 'paths\.config\.json') {
            # Verificar que no es solo una referencia a paths.config.json
            if ($content -notmatch 'paths\.config\.json.*' + $pattern) {
                $foundHardcoded = $true
                $warnings += "Posible ruta hardcodeada en $($file.Name): $pattern"
            }
        }
    }
}
if (-not $foundHardcoded) {
    $success += "No se encontraron rutas hardcodeadas obvias"
}

# 11. Verificar core-inviolable.mdc globs
Write-Host "[11/13] Verificando core-inviolable.mdc..." -ForegroundColor Yellow
$coreInviolablePath = Join-Path $templateRoot "DOCS/core-inviolable.mdc"
if (Test-Path $coreInviolablePath) {
    $content = Get-Content $coreInviolablePath -Raw
    if ($content -match 'globs:') {
        $success += "core-inviolable.mdc tiene patrones glob definidos"
    } else {
        $warnings += "core-inviolable.mdc puede no tener globs definidos"
    }
}

# 12. Verificar README.md tiene información básica
Write-Host "[12/13] Verificando README.md..." -ForegroundColor Yellow
$readmePath = Join-Path $templateRoot "README.md"
if (Test-Path $readmePath) {
    $readmeContent = Get-Content $readmePath -Raw
    $requiredSections = @('Manager', 'Agentes', 'Gobernanza', 'Estructura')
    foreach ($section in $requiredSections) {
        if ($readmeContent -match $section) {
            $success += "README.md tiene sección sobre $section"
        }
    }
}

# 13. Verificar CHANGELOG.md
Write-Host "[13/13] Verificando CHANGELOG.md..." -ForegroundColor Yellow
$changelogPath = Join-Path $templateRoot "CHANGELOG.md"
if (Test-Path $changelogPath) {
    $success += "CHANGELOG.md existe"
} else {
    $warnings += "CHANGELOG.md no existe (recomendado para versionado)"
}

# Resumen
Write-Host "`n=== RESUMEN DE VALIDACIÓN ===" -ForegroundColor Cyan
Write-Host "Éxitos: $($success.Count)" -ForegroundColor Green
Write-Host "Advertencias: $($warnings.Count)" -ForegroundColor Yellow
Write-Host "Errores: $($errors.Count)" -ForegroundColor Red

if ($errors.Count -gt 0) {
    Write-Host "`nERRORES:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host "`nADVERTENCIAS:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
}

if ($success.Count -gt 0 -and $errors.Count -eq 0) {
    Write-Host "`nVALIDACIÓN COMPLETADA CON ÉXITO" -ForegroundColor Green
    exit 0
} elseif ($errors.Count -gt 0) {
    Write-Host "`nVALIDACIÓN FALLIDA - Corrige los errores antes de continuar" -ForegroundColor Red
    exit 1
} else {
    Write-Host "`nVALIDACIÓN COMPLETADA CON ADVERTENCIAS" -ForegroundColor Yellow
    exit 0
}

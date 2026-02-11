# generate-index.ps1
# Genera automáticamente 02_AGENTS_REGISTRY/INDEX.md desde AGENTS_REGISTRY.json
# Asegura que el índice siempre esté sincronizado con el registro

param(
    [string]$TemplatePath = ".",
    [switch]$Force = $false
)

$ErrorActionPreference = "Stop"
$templateRoot = Resolve-Path $TemplatePath

$registryPath = Join-Path $templateRoot "00_CORE_MANAGER/AGENTS_REGISTRY.json"
$indexPath = Join-Path $templateRoot "02_AGENTS_REGISTRY/INDEX.md"

Write-Host "`n=== Generación de INDEX.md desde AGENTS_REGISTRY.json ===" -ForegroundColor Cyan

if (-not (Test-Path $registryPath)) {
    Write-Host "ERROR: No se encuentra AGENTS_REGISTRY.json en $registryPath" -ForegroundColor Red
    exit 1
}

try {
    $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
    
    if (-not $registry.agents) {
        Write-Host "ERROR: AGENTS_REGISTRY.json no tiene campo 'agents'" -ForegroundColor Red
        exit 1
    }
    
    # Generar contenido del índice
    $indexContent = @"
# 📇 ÍNDICE DE AGENTES REGISTRADOS

Este índice resume los agentes definidos en `00_CORE_MANAGER/AGENTS_REGISTRY.json` para que el usuario sepa rápidamente a quién delegar cada tipo de tarea.

**NOTA:** Este archivo se genera automáticamente desde `AGENTS_REGISTRY.json`. Para modificarlo, edita el registro y ejecuta `scripts/generate-index.ps1`.

---

## 🧠 Tabla de agentes

| ID | Nombre | Rol / Descripción corta | Triggers clave | Ejemplo de uso |
| :--- | :--- | :--- | :--- | :--- |
"@

    foreach ($agent in $registry.agents) {
        $id = $agent.id
        $name = $agent.name
        $role = if ($agent.capabilities) { ($agent.capabilities -join ", ") } else { "Ver definición completa" }
        $triggers = if ($agent.triggers) { ($agent.triggers[0..2] -join ", ") + (if ($agent.triggers.Count -gt 3) { "..." } else { "" }) } else { "N/A" }
        $example = "Ver `$($agent.file_path.Replace('./', ''))`"
        
        $indexContent += "`n| ``$id`` | $name | $role | ``$triggers`` | ``$example`` |"
    }
    
    $indexContent += @"

---

Para detalles completos de cada agente, consulta los archivos de `02_AGENTS_REGISTRY/*.md`.

**Última generación:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
"@
    
    # Verificar si el archivo existe y es diferente
    if (Test-Path $indexPath) {
        $existingContent = Get-Content $indexPath -Raw
        if ($existingContent -eq $indexContent -and -not $Force) {
            Write-Host "INDEX.md ya está actualizado. Usa -Force para regenerar." -ForegroundColor Yellow
            exit 0
        }
    }
    
    # Escribir el archivo
    $indexContent | Out-File -FilePath $indexPath -Encoding UTF8 -NoNewline
    
    Write-Host "✓ INDEX.md generado exitosamente en $indexPath" -ForegroundColor Green
    Write-Host "  Agentes procesados: $($registry.agents.Count)" -ForegroundColor Gray
    
} catch {
    Write-Host "ERROR al generar INDEX.md: $_" -ForegroundColor Red
    exit 1
}

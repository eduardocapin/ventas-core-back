# calculate-metrics.ps1
# Calcula métricas automáticamente desde Audit_Logs.md y Technical_Debt.md
# Actualiza la sección "Métricas actuales" en Metrics.md

param(
    [string]$TemplatePath = ".",
    [switch]$UpdateFile = $false
)

$ErrorActionPreference = "Stop"
$templateRoot = Resolve-Path $TemplatePath

$auditLogsPath = Join-Path $templateRoot "00_CORE_MANAGER/Audit_Logs.md"
$technicalDebtPath = Join-Path $templateRoot "00_CORE_MANAGER/Technical_Debt.md"
$metricsPath = Join-Path $templateRoot "00_CORE_MANAGER/Metrics.md"
$registryPath = Join-Path $templateRoot "00_CORE_MANAGER/AGENTS_REGISTRY.json"

Write-Host "`n=== Cálculo de Métricas del Sistema ===" -ForegroundColor Cyan

# Leer registro de agentes
$agents = @{}
if (Test-Path $registryPath) {
    try {
        $registry = Get-Content $registryPath -Raw | ConvertFrom-Json
        foreach ($agent in $registry.agents) {
            $agents[$agent.id] = @{
                Name = $agent.name
                Intervenciones = 0
                UltimaActividad = $null
            }
        }
        # Añadir Manager
        $agents["AG-VC-MANAGER"] = @{
            Name = "Orquestador (Manager)"
            Intervenciones = 0
            UltimaActividad = $null
        }
    } catch {
        Write-Host "ADVERTENCIA: No se pudo leer AGENTS_REGISTRY.json: $_" -ForegroundColor Yellow
    }
}

# Analizar Audit_Logs.md
$totalAuditLogs = 0
if (Test-Path $auditLogsPath) {
    $auditContent = Get-Content $auditLogsPath -Raw
    # Buscar tabla de registro
    $lines = Get-Content $auditLogsPath
    $inTable = $false
    foreach ($line in $lines) {
        if ($line -match '\|\s*\*\*(\d{4}-\d{2}-\d{2})\*\*') {
            $date = $matches[1]
            $totalAuditLogs++
            # Buscar agente en la línea
            if ($line -match '\|\s*\*\*[^\|]+\*\*\s*\|\s*([^\|]+)\s*\|') {
                $agentName = $matches[1].Trim()
                # Buscar ID de agente
                foreach ($agentId in $agents.Keys) {
                    if ($agentName -match $agentId -or $agentName -match $agents[$agentId].Name) {
                        $agents[$agentId].Intervenciones++
                        if (-not $agents[$agentId].UltimaActividad -or $date -gt $agents[$agentId].UltimaActividad) {
                            $agents[$agentId].UltimaActividad = $date
                        }
                        break
                    }
                }
            }
        }
    }
} else {
    Write-Host "ADVERTENCIA: Audit_Logs.md no existe" -ForegroundColor Yellow
}

# Analizar Technical_Debt.md
$totalDebts = 0
$debtsByRisk = @{
    "CRÍTICO" = 0
    "MEDIO" = 0
    "BAJO" = 0
}
$debtDates = @()

if (Test-Path $technicalDebtPath) {
    $debtContent = Get-Content $technicalDebtPath -Raw
    $lines = Get-Content $technicalDebtPath
    $inDebtTable = $false
    
    foreach ($line in $lines) {
        if ($line -match '\|\s*(\d{4}-\d{2}-\d{2})') {
            $date = $matches[1]
            $totalDebts++
            $debtDates += $date
            
            # Buscar nivel de riesgo
            if ($line -match '\|\s*(CRÍTICO|MEDIO|BAJO)\s*\|') {
                $risk = $matches[1]
                if ($debtsByRisk.ContainsKey($risk)) {
                    $debtsByRisk[$risk]++
                }
            }
        }
    }
} else {
    Write-Host "ADVERTENCIA: Technical_Debt.md no existe" -ForegroundColor Yellow
}

# Calcular promedio de días de deuda
$avgDays = $null
if ($debtDates.Count -gt 0) {
    $today = Get-Date
    $totalDays = 0
    foreach ($dateStr in $debtDates) {
        try {
            $debtDate = [DateTime]::ParseExact($dateStr, "yyyy-MM-dd", $null)
            $daysDiff = ($today - $debtDate).Days
            $totalDays += $daysDiff
        } catch {
            # Ignorar fechas inválidas
        }
    }
    if ($totalDays -gt 0) {
        $avgDays = [math]::Round($totalDays / $debtDates.Count, 1)
    }
}

# Calcular tasa de éxito
$successRate = $null
if ($totalAuditLogs -gt 0) {
    $successRate = [math]::Round((($totalAuditLogs - $totalDebts) / $totalAuditLogs) * 100, 1)
}

# Mostrar resultados
Write-Host "`n=== RESULTADOS ===" -ForegroundColor Cyan

Write-Host "`nUso de Agentes:" -ForegroundColor Yellow
Write-Host "Total intervenciones registradas: $totalAuditLogs" -ForegroundColor Gray
foreach ($agentId in $agents.Keys | Sort-Object) {
    $agent = $agents[$agentId]
    $lastActivity = if ($agent.UltimaActividad) { $agent.UltimaActividad } else { "—" }
    Write-Host "  $agentId : $($agent.Intervenciones) intervenciones, última actividad: $lastActivity" -ForegroundColor Gray
}

Write-Host "`nDeuda Técnica:" -ForegroundColor Yellow
Write-Host "Total deudas: $totalDebts" -ForegroundColor Gray
Write-Host "  CRÍTICO: $($debtsByRisk['CRÍTICO'])" -ForegroundColor $(if ($debtsByRisk['CRÍTICO'] -gt 0) { "Red" } else { "Gray" })
Write-Host "  MEDIO: $($debtsByRisk['MEDIO'])" -ForegroundColor Gray
Write-Host "  BAJO: $($debtsByRisk['BAJO'])" -ForegroundColor Gray
if ($avgDays) {
    Write-Host "  Promedio días desde creación: $avgDays" -ForegroundColor Gray
}

Write-Host "`nTasa de Éxito:" -ForegroundColor Yellow
Write-Host "  Tareas completadas: $totalAuditLogs" -ForegroundColor Gray
Write-Host "  Deudas técnicas: $totalDebts" -ForegroundColor Gray
if ($successRate) {
    $color = if ($successRate -ge 85) { "Green" } elseif ($successRate -ge 70) { "Yellow" } else { "Red" }
    Write-Host "  Tasa de éxito aproximada: $successRate%" -ForegroundColor $color
}

# Generar contenido para Metrics.md
if ($UpdateFile) {
    $metricsContent = @"
# 📊 Métricas y monitoreo del sistema

Este documento describe las métricas calculables del sistema de agentes de **VentasCore_IA** basadas en los logs de auditoría y deuda técnica.

**NOTA:** Esta sección se actualiza automáticamente ejecutando `scripts/calculate-metrics.ps1 -UpdateFile`. Para cálculo manual, ver secciones anteriores de este documento.

---

## Métricas actuales (última actualización: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss"))

### Uso de agentes

| Agente | Nombre | Intervenciones | Última actividad |
|--------|--------|----------------|------------------|
"@

    foreach ($agentId in $agents.Keys | Sort-Object) {
        $agent = $agents[$agentId]
        $lastActivity = if ($agent.UltimaActividad) { $agent.UltimaActividad } else { "—" }
        $metricsContent += "`n| $agentId | $($agent.Name) | $($agent.Intervenciones) | $lastActivity |"
    }

    $metricsContent += @"

### Deuda técnica

| Total deudas | CRÍTICO | MEDIO | BAJO | Promedio días |
|--------------|---------|-------|------|----------------|
| $totalDebts | $($debtsByRisk['CRÍTICO']) | $($debtsByRisk['MEDIO']) | $($debtsByRisk['BAJO']) | $(if ($avgDays) { $avgDays } else { "—" }) |

### Tasa de éxito (aproximada)

- Total tareas completadas (Audit_Logs): $totalAuditLogs
- Total deudas técnicas (Technical_Debt): $totalDebts
- Tasa de éxito aproximada: $(if ($successRate) { "$successRate%" } else { "N/A" })

---

## Instrucciones de uso

Para actualizar estas métricas automáticamente:

```powershell
cd IA_MANAGER_TEMPLATE
.\scripts\calculate-metrics.ps1 -UpdateFile
```

Esto actualizará la sección "Métricas actuales" de este archivo con los datos más recientes de `Audit_Logs.md` y `Technical_Debt.md`.

---

## Métricas calculables desde Audit_Logs.md

### Uso de agentes

**Qué medir:** Número de entradas por agente en la tabla de registro de actividad.

**Cómo calcular:**
1. Abrir `00_CORE_MANAGER/Audit_Logs.md`
2. Contar las filas donde la columna "Agente/Rol" coincide con cada agente (ej. `AG-VC-02-FRONTEND`, `AG-VC-03-BACKEND`)
3. Registrar el total por agente

**Interpretación:** Identifica qué agentes son más utilizados y cuáles pueden necesitar más atención o mejoras.

### Tasa de éxito aproximada

**Qué medir:** Relación entre tareas completadas (registradas en Audit_Logs) y problemas/deudas técnicas (registradas en Technical_Debt).

**Cómo calcular:**
1. Contar total de entradas en `Audit_Logs.md` (tareas completadas)
2. Contar total de entradas en `Technical_Debt.md` (problemas o atajos)
3. Calcular: `Tasa de éxito = (Total Audit_Logs - Total Technical_Debt) / Total Audit_Logs * 100`

**Nota:** Esta es una aproximación; no todas las deudas técnicas provienen de tareas registradas en Audit_Logs.

**Interpretación:** Una tasa alta (>85%) indica buen cumplimiento de estándares; una tasa baja (<70%) puede indicar necesidad de revisar procesos o estándares.

### Fechas de última actividad por agente

**Qué medir:** Fecha más reciente de cada agente en Audit_Logs.md.

**Cómo calcular:**
1. Revisar la columna "Fecha" en `Audit_Logs.md`
2. Para cada agente, identificar la fecha más reciente de sus entradas

**Interpretación:** Identifica agentes que no se han usado recientemente (pueden ser innecesarios o necesitar reactivación).

---

## Métricas calculables desde Technical_Debt.md

### Número de deudas pendientes

**Qué medir:** Total de filas en la tabla "DEUDA PENDIENTE" de `Technical_Debt.md`.

**Cómo calcular:** Contar las filas de la tabla (excluyendo la fila de encabezado).

**Interpretación:** Número total de compromisos técnicos pendientes de resolver.

### Deudas por tipo

**Qué medir:** Clasificar las deudas según su descripción o tipo (workaround, refactor pendiente, optimización, etc.).

**Cómo calcular:**
1. Revisar la columna "Atajo / Problema" en `Technical_Debt.md`
2. Agrupar por tipo (ej. "workaround", "refactor", "optimización", "test pendiente")
3. Contar por grupo

**Interpretación:** Identifica patrones de deuda técnica (ej. muchos workarounds pueden indicar necesidad de mejor diseño inicial).

### Distribución por riesgo

**Qué medir:** Número de deudas por nivel de riesgo (CRÍTICO, MEDIO, BAJO) según la columna "Riesgo" en `Technical_Debt.md`.

**Cómo calcular:** Contar filas por cada valor en la columna "Riesgo".

**Interpretación:** Una alta proporción de deudas CRÍTICAS requiere atención inmediata; muchas deudas BAJAS pueden gestionarse en el tiempo.

### Tiempo promedio desde creación de deuda

**Qué medir:** Diferencia entre la fecha actual y la fecha de creación de cada deuda.

**Cómo calcular:**
1. Para cada fila en `Technical_Debt.md`, calcular días transcurridos desde la fecha en "Fecha" hasta hoy
2. Calcular el promedio de todos los días transcurridos

**Interpretación:** Un promedio alto (>30 días) puede indicar que las deudas se acumulan sin resolverse; un promedio bajo (<7 días) indica resolución activa.

---

## Frecuencia recomendada de actualización

- **Uso de agentes y última actividad:** Cada semana o cada 10 sesiones de trabajo
- **Deuda técnica:** Cada semana o cuando se añada una nueva deuda
- **Tasa de éxito:** Cada mes o cada 20-30 tareas completadas

---

> [!NOTE]
> Este archivo es opcional. Si prefieres no mantener métricas explícitas, puedes omitir este archivo y confiar en la revisión manual periódica de `Audit_Logs.md` y `Technical_Debt.md`.
"@

    # Leer Metrics.md existente y reemplazar solo la sección de métricas actuales
    if (Test-Path $metricsPath) {
        $existingContent = Get-Content $metricsPath -Raw
        # Buscar inicio y fin de la sección de métricas actuales
        if ($existingContent -match '(?s)(.*?## Métricas actuales.*?)(---.*)') {
            $beforeSection = $matches[1]
            $afterSection = $matches[2]
            # Extraer solo la parte antes de "Métricas actuales"
            if ($beforeSection -match '(?s)(.*)(## Métricas actuales)') {
                $beforeMetrics = $matches[1]
                $newContent = $beforeMetrics + $metricsContent + "`n`n" + $afterSection
            } else {
                $newContent = $metricsContent + "`n`n---`n`n" + $afterSection
            }
        } else {
            # Si no encuentra la sección, añadir al final
            $newContent = $existingContent + "`n`n" + $metricsContent
        }
    } else {
        $newContent = $metricsContent
    }
    
    $newContent | Out-File -FilePath $metricsPath -Encoding UTF8 -NoNewline
    Write-Host "`n✓ Metrics.md actualizado" -ForegroundColor Green
} else {
    Write-Host "`nPara actualizar Metrics.md automáticamente, ejecuta con -UpdateFile" -ForegroundColor Yellow
}

Write-Host "`n=== Cálculo completado ===" -ForegroundColor Green

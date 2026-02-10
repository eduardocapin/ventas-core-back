# 📊 Métricas y monitoreo del sistema

Este documento describe las métricas calculables del sistema de agentes de **VentasCore_IA** basadas en los logs de auditoría y deuda técnica. Es un archivo opcional que requiere mantenimiento manual periódico o scripts adicionales.

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

**Ejemplo:**
- Total Audit_Logs: 50
- Total Technical_Debt: 5
- Tasa de éxito aproximada: (50 - 5) / 50 * 100 = 90%

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

**Ejemplo de tabla:**

| Tipo de deuda | Cantidad |
|---------------|----------|
| Workaround temporal | 3 |
| Refactor pendiente | 2 |
| Test pendiente | 1 |
| Optimización | 1 |

**Interpretación:** Identifica patrones de deuda técnica (ej. muchos workarounds pueden indicar necesidad de mejor diseño inicial).

### Distribución por riesgo

**Qué medir:** Número de deudas por nivel de riesgo (CRÍTICO, MEDIO, BAJO) según la columna "Riesgo" en `Technical_Debt.md`.

**Cómo calcular:** Contar filas por cada valor en la columna "Riesgo".

**Ejemplo de tabla:**

| Riesgo | Cantidad | Porcentaje |
|--------|----------|------------|
| CRÍTICO | 1 | 14% |
| MEDIO | 3 | 43% |
| BAJO | 3 | 43% |

**Interpretación:** Una alta proporción de deudas CRÍTICAS requiere atención inmediata; muchas deudas BAJAS pueden gestionarse en el tiempo.

### Tiempo promedio desde creación de deuda

**Qué medir:** Diferencia entre la fecha actual y la fecha de creación de cada deuda.

**Cómo calcular:**
1. Para cada fila en `Technical_Debt.md`, calcular días transcurridos desde la fecha en "Fecha" hasta hoy
2. Calcular el promedio de todos los días transcurridos

**Ejemplo:**
- Deuda 1: creada hace 10 días
- Deuda 2: creada hace 5 días
- Deuda 3: creada hace 20 días
- Promedio: (10 + 5 + 20) / 3 = 11.7 días

**Interpretación:** Un promedio alto (>30 días) puede indicar que las deudas se acumulan sin resolverse; un promedio bajo (<7 días) indica resolución activa.

---

## Cómo calcular métricas

### Método manual (recomendado para inicio)

1. Abrir `Audit_Logs.md` y `Technical_Debt.md`
2. Revisar las tablas y contar manualmente según las instrucciones anteriores
3. Registrar los resultados en este archivo (puedes crear una sección "Métricas actuales" más abajo)
4. Actualizar periódicamente (ej. cada semana o cada mes)

### Método con script (opcional, para automatización)

Puedes crear un script PowerShell o Node.js que lea los archivos `.md` y genere un reporte automático.

**Ejemplo de estructura de script (pseudocódigo):**
```powershell
# Leer Audit_Logs.md
# Parsear tabla de actividad
# Contar por agente
# Generar reporte en formato tabla

# Leer Technical_Debt.md
# Parsear tabla de deuda
# Contar por tipo y riesgo
# Calcular promedios
# Generar reporte
```

**Nota:** Los scripts deben parsear Markdown y tablas, lo que puede requerir librerías adicionales. Por simplicidad, se recomienda empezar con cálculo manual.

---

## Visualización de métricas

### Formato recomendado: tabla simple

Crea una sección "Métricas actuales" en este mismo archivo con tablas que puedas actualizar periódicamente:

```markdown
## Métricas actuales (última actualización: YYYY-MM-DD)

### Uso de agentes
| Agente | Intervenciones | Última actividad |
|--------|---------------|------------------|
| ... | ... | ... |

### Deuda técnica
| Total deudas | CRÍTICO | MEDIO | BAJO | Promedio días |
|--------------|---------|-------|------|---------------|
| ... | ... | ... | ... | ... |

### Tasa de éxito
- Total tareas completadas: X
- Total deudas técnicas: Y
- Tasa de éxito aproximada: Z%
```

---

## Métricas actuales (última actualización: 2026-02-09)

### Uso de agentes

| Agente | Nombre | Intervenciones | Última actividad |
|--------|--------|----------------|------------------|
| AG-VC-00-FACTORY | Generador de Agentes | 0 | — |
| AG-VC-01-ARCHITECT | Arquitecto de Software Senior | 0 | — |
| AG-VC-02-FRONTEND | Especialista Frontend (Angular) | 0 | — |
| AG-VC-03-BACKEND | Especialista Backend (Node/API) | 0 | — |
| AG-VC-04-DB | Experto en Base de Datos | 1 | 2024-02-04 |
| AG-VC-05-QA | QA & Testing Engineer | 0 | — |
| AG-VC-06-SETUP | Asistente de Configuración | 0 | — |
| AG-VC-07-UX | Senior UX/UI Designer | 0 | — |
| AG-VC-08-SECURITY | Cibersecurity & Audit Expert | 0 | — |
| AG-VC-09-GARDENER | El Jardinero (Higiene de Contexto) | 0 | — |
| AG-VC-10-ENTITY-STACK | Generador Entidad-FullStack | 0 | — |
| AG-VC-MANAGER | Orquestador (Manager) | 1 | 2024-02-04 |

### Deuda técnica

| Total deudas | CRÍTICO | MEDIO | BAJO | Promedio días |
|--------------|---------|-------|------|----------------|
| 1 | 0 | 0 | 1 | — |

### Tasa de éxito (aproximada)

- Total tareas completadas (Audit_Logs): 2
- Total deudas técnicas (Technical_Debt): 1
- Tasa de éxito aproximada: 50%

---

## Frecuencia recomendada de actualización

- **Uso de agentes y última actividad:** Cada semana o cada 10 sesiones de trabajo
- **Deuda técnica:** Cada semana o cuando se añada una nueva deuda
- **Tasa de éxito:** Cada mes o cada 20-30 tareas completadas

---

> [!NOTE]
> Este archivo es opcional. Si prefieres no mantener métricas explícitas, puedes omitir este archivo y confiar en la revisión manual periódica de `Audit_Logs.md` y `Technical_Debt.md`.

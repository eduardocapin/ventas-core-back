# Changelog – IA_MANAGER_TEMPLATE

Todos los cambios notables de esta plantilla se documentan en este archivo. El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.2.0] – 2026-02-XX

### [Added]

#### Scripts de Automatización
- **scripts/validate-template.ps1:** Script de validación automática del template que ejecuta el checklist del Gardener. Valida estructura, archivos críticos, AGENTS_REGISTRY.json, enlaces, versiones, rutas hardcodeadas y más.
- **scripts/calculate-metrics.ps1:** Script para calcular métricas automáticamente desde Audit_Logs.md y Technical_Debt.md. Actualiza Metrics.md con uso de agentes, deuda técnica y tasa de éxito.
- **scripts/generate-index.ps1:** Script para generar automáticamente INDEX.md desde AGENTS_REGISTRY.json, asegurando sincronización entre registro e índice.
- **scripts/schema-agents-registry.json:** JSON Schema para validar AGENTS_REGISTRY.json contra un esquema formal.

#### Documentación Mejorada
- **DOCS/NAVIGATION_INDEX.md:** Índice completo de navegación con búsqueda por tema, por carpeta, por situación y diagrama de relaciones. Punto de entrada único para encontrar cualquier documentación.
- **DOCS/WORKFLOWS_MASTER.md:** Documento maestro consolidado de todos los flujos de trabajo. Fuente única de verdad que consolida información dispersa en múltiples documentos.
- **DOCS/FAQ.md:** Preguntas frecuentes con respuestas rápidas sobre inicio, agentes, Core inviolable, flujos, validación, scripts y mejores prácticas.
- **DOCS/TROUBLESHOOTING.md:** Expandido con problemas específicos del template: scripts no funcionan, AGENTS_REGISTRY.json inválido, versiones desincronizadas, rutas hardcodeadas, validación falla, INDEX.md desincronizado, métricas incorrectas, paths.config.json incorrecto.

#### Mejoras en Manager
- **00_CORE_MANAGER/00_MANAGER.md:** Nueva sección consolidada "CONTROL Y VALIDACIÓN DE CORE" que unifica todas las reglas de Core inviolable dispersas. Simplifica referencias en protocolo de actuación apuntando a esta sección.

#### Mejoras en Setup
- **setup_project.ps1:** Añadida validación post-setup que verifica archivos críticos, paths.config.json, AGENTS_REGISTRY.json y genera reporte SETUP_REPORT.md con estado de validación.

### [Changed]

- **README.md:** Actualizado con sección de herramientas de automatización, referencias a nuevos documentos (NAVIGATION_INDEX, WORKFLOWS_MASTER, FAQ) y estructura del ecosistema actualizada.
- **00_CORE_MANAGER/00_MANAGER.md:** Simplificadas referencias a Core en protocolo de actuación. Reglas Core ahora consolidadas en sección dedicada para mejor mantenibilidad.
- **DOCS/TROUBLESHOOTING.md:** Expandido significativamente con problemas específicos del template y guías de resolución detalladas.

### [Improved]

- **Reducción de redundancia:** Flujos de trabajo ahora documentados en WORKFLOWS_MASTER.md como fuente única de verdad, reduciendo duplicación entre documentos.
- **Automatización:** Validación, métricas e índices ahora pueden generarse automáticamente, reduciendo trabajo manual.
- **Navegación:** Índice de navegación centralizado facilita encontrar información rápidamente.
- **Mantenibilidad:** Scripts de validación y generación automática aseguran coherencia del template sin intervención manual constante.

---

## [1.1.0] – 2025-02-06

### [Added]

- **DOCS/TROUBLESHOOTING.md:** Guía de resolución de problemas: Manager no responde, agente falla, enlaces rotos, LAST_SESSION_STATUS corrupto, rollback con git, conflictos entre agentes, cuándo invocar al Jardinero.
- **00_CORE_MANAGER/00_MANAGER.md:** Sección "Manejo de errores críticos": registro en Technical_Debt, escalado al usuario, rollback cuando sea posible, no delegar el mismo ámbito hasta resolver.
- **01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md:** Sección "Rollback y recuperación": indicar archivos antes de cambios destructivos, pedir confirmación si es crítico, usar git para revertir; referencia a TROUBLESHOOTING.md.
- **CHANGELOG.md:** Este archivo. Versión del template indicada en README.md.

### [Changed]

- README.md: Añadido bloque de versión del template (VERSION 1.1.0).

---

## [1.0.0] – (baseline)

- Plantilla inicial: Manager, registro de agentes, contexto global, Guardrails, Reglas_Generales, flujos estándar, Audit_Logs, Technical_Debt, LAST_SESSION_STATUS, Jardinero, Manual de funcionamiento, WORKSPACE_ORCHESTRATOR_SETUP.

---

[Migración desde 1.1.0 a 1.2.0]

- No hay cambios destructivos. Solo se añaden scripts, documentos y mejoras.
- Si tu proyecto ya usa el template 1.1.0:
  1. Copia los nuevos scripts de `scripts/` (validate-template.ps1, calculate-metrics.ps1, generate-index.ps1, schema-agents-registry.json)
  2. Copia los nuevos documentos de `DOCS/` (NAVIGATION_INDEX.md, WORKFLOWS_MASTER.md, FAQ.md)
  3. Actualiza `00_CORE_MANAGER/00_MANAGER.md` con la nueva sección consolidada de Core (o mantén la estructura actual si prefieres)
  4. Actualiza `setup_project.ps1` con las validaciones post-setup (opcional pero recomendado)
  5. Actualiza `README.md` con las nuevas secciones de herramientas y documentación
  6. Ejecuta `scripts/generate-index.ps1` para regenerar INDEX.md si es necesario

[Migración desde 1.0.0 a 1.1.0]

- No hay cambios destructivos. Solo se añaden documentos y secciones.
- Si tu proyecto ya usa el template 1.0.0: copia `DOCS/TROUBLESHOOTING.md`, actualiza `00_MANAGER.md` y `AI_Safety_Guardrails.md` con las nuevas secciones, y añade `CHANGELOG.md` y la línea de versión en `README.md` si lo deseas.

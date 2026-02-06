# Changelog – IA_MANAGER_TEMPLATE

Todos los cambios notables de esta plantilla se documentan en este archivo. El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

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

[Migración desde 1.0.0 a 1.1.0]

- No hay cambios destructivos. Solo se añaden documentos y secciones.
- Si tu proyecto ya usa el template 1.0.0: copia `DOCS/TROUBLESHOOTING.md`, actualiza `00_MANAGER.md` y `AI_Safety_Guardrails.md` con las nuevas secciones, y añade `CHANGELOG.md` y la línea de versión en `README.md` si lo deseas.

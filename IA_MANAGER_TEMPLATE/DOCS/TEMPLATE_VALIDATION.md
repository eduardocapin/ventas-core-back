# ✅ Validación del IA_MANAGER_TEMPLATE

Checklist para comprobar que el template está correctamente configurado y operativo tras cambios o en un proyecto nuevo.

---

## 1. Setup y configuración inicial

- [ ] **Ejecutar el script de setup:** En la raíz del proyecto, ejecutar `./setup_project.ps1` (PowerShell).
- [ ] **Introducir nombre y código del proyecto:** Verificar que los placeholders `VentasCore_IA` y `VC` se sustituyen en los archivos del template (buscar en README, 00_MANAGER, AGENTS_REGISTRY, definiciones de agentes).
- [ ] **Rutas relativas:** Confirmar que las rutas en 00_MANAGER.md y en los agentes apuntan a `./01_GLOBAL_CONTEXT/`, `./00_CORE_MANAGER/`, `./02_AGENTS_REGISTRY/` según la estructura del template.
- [ ] **paths.config.json:** Existe `00_CORE_MANAGER/paths.config.json` con `template_path`, `backend_path`, `frontend_path` (y opcionalmente `core_back`, `core_front`) relativos a la raíz del workspace; coinciden con las carpetas reales del workspace.

---

## 2. Enlaces y referencias

- [ ] **Documentos críticos existen:** `01_GLOBAL_CONTEXT/Diccionario.md`, `AI_Safety_Guardrails.md`, `Reglas_Generales.md`, `00_CORE_MANAGER/AGENTS_REGISTRY.json`, `00_CORE_MANAGER/00_MANAGER.md`.
- [ ] **Sin referencias rotas:** Los enlaces internos en README, 00_MANAGER, TROUBLESHOOTING y DOCS apuntan a archivos que existen.
- [ ] **Placeholders sustituidos:** Tras el setup, no debe quedar `VentasCore_IA` o `VC` en archivos que ya deban estar personalizados (salvo en plantillas explícitas).

**Acción recomendada:** Pedir *"Revisar el template"* o *"Auditar IA_MANAGER_TEMPLATE"* para que el Jardinero ejecute su checklist de coherencia (ver `02_AGENTS_REGISTRY/09_GARDENER.md`).

---

## 3. Manager y delegación

- [ ] **Manager responde:** En el chat del proyecto, una petición genérica (ej. "¿Qué agentes tienes?") recibe respuesta coherente que referencia el registro o el contexto.
- [ ] **Delegación correcta:** Una petición acotada (ej. "Añade una entidad X al diccionario" o "Revisa los enlaces del template") hace que el Manager invoque al agente adecuado (DB, Jardinero, etc.).
- [ ] **Reglas de Cursor:** Si el workspace tiene varios proyectos, `.cursor/rules/` en la raíz debe apuntar al orquestador (ver `DOCS/WORKSPACE_ORCHESTRATOR_SETUP.md`).

---

## 4. Agentes y registro

- [ ] **AGENTS_REGISTRY.json:** El JSON es válido y cada entrada tiene `id`, `name`, `file_path` (o equivalente) y el archivo existe en `02_AGENTS_REGISTRY/`.
- [ ] **Definiciones cargables:** Cada agente listado en el registro tiene su archivo .md en `02_AGENTS_REGISTRY/` (01_ARQUITECTO, 02_FRONTEND, …, 09_GARDENER, 00_AGENT_FACTORY).
- [ ] **Índice de agentes:** `02_AGENTS_REGISTRY/INDEX.md` refleja la lista actual de agentes y enlaces a sus definiciones.

---

## 5. Contexto global y logs

- [ ] **LAST_SESSION_STATUS.md:** Existe en `01_GLOBAL_CONTEXT/` (puede estar vacío o con plantilla; no debe estar corrupto).
- [ ] **Audit_Logs y Technical_Debt:** Existen en `00_CORE_MANAGER/` y el Manager puede escribir en ellos cuando corresponda.

---

## Resumen rápido

| Área              | Comprobación principal                          |
|-------------------|--------------------------------------------------|
| Setup             | `setup_project.ps1` ejecutado, placeholders OK   |
| Enlaces           | Sin referencias rotas; Jardinero opcional        |
| Manager           | Responde y delega al agente correcto            |
| Agentes           | Registro JSON válido, archivos .md presentes     |
| Contexto y logs   | LAST_SESSION_STATUS, Audit_Logs, Technical_Debt  |

Si algún ítem falla, consultar `DOCS/TROUBLESHOOTING.md` para pasos de resolución.

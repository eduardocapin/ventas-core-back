# 🔧 Resolución de problemas (Troubleshooting)

Guía para detectar y resolver problemas frecuentes del IA_MANAGER_TEMPLATE y del flujo de orquestación.

---

## 📋 Índice rápido

1. [Manager no responde o no delega bien](#1-manager-no-responde-o-no-delega-bien)
2. [Un agente falla o devuelve errores](#2-un-agente-falla-o-devuelve-errores)
3. [Enlaces rotos o referencias incorrectas en el template](#3-enlaces-rotos-o-referencias-incorrectas-en-el-template)
4. [LAST_SESSION_STATUS corrupto o desincronizado](#4-last_session_status-corrupto-o-desincronizado)
5. [Cambios incorrectos: cómo hacer rollback](#5-cambios-incorrectos-cómo-hacer-rollback)
6. [Conflictos entre agentes o estado inconsistente](#6-conflictos-entre-agentes-o-estado-inconsistente)
7. [Cuándo invocar al Jardinero](#7-cuándo-invocar-al-jardinero)

---

## 1. Manager no responde o no delega bien

**Síntomas:** El Manager no identifica al agente correcto, no sigue el flujo estándar o responde de forma genérica.

**Qué comprobar:**

- Que existan y sean legibles: `00_CORE_MANAGER/AGENTS_REGISTRY.json`, `01_GLOBAL_CONTEXT/Diccionario.md`, `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md`.
- Que la petición del usuario sea clara (si es ambigua, el Manager puede no saber a qué agente delegar).

**Pasos de resolución:**

1. Reformular la petición indicando explícitamente el tipo de tarea (ej. "Crear CRUD de X", "Corregir bug en endpoint Y", "Revisar seguridad del módulo Z").
2. Comprobar que las reglas de Cursor en `.cursor/rules/` apunten al orquestador correcto (ver `DOCS/WORKSPACE_ORCHESTRATOR_SETUP.md`).
3. Si el proyecto acaba de clonarse o moverse, ejecutar de nuevo `setup_project.ps1` para refrescar rutas y tokens.

---

## 2. Un agente falla o devuelve errores

**Síntomas:** El agente delegado devuelve un error, código incompleto o un mensaje de que no puede completar la tarea.

**Qué hacer:**

1. **Registro en Technical_Debt:** El Manager debe registrar el fallo en `00_CORE_MANAGER/Technical_Debt.md` (descripción breve, agente involucrado, causa si se conoce).
2. **Escalar al usuario:** Si el error es crítico (pérdida de datos, bloqueo del flujo), el Manager debe informar al usuario y preguntar si continuar, reintentar o cancelar.
3. **Reintentar con más contexto:** A veces el agente necesita más información (ruta del archivo, nombre del módulo, restricciones). Proporciona contexto adicional y vuelve a pedir la tarea.
4. **Dividir la tarea:** Si la tarea es muy amplia, pedirla en pasos más pequeños (ej. primero esquema DB, luego backend, luego frontend).

Para el protocolo detallado del Manager ante errores críticos, ver `00_CORE_MANAGER/00_MANAGER.md` (sección "Manejo de errores críticos").

---

## 3. Enlaces rotos o referencias incorrectas en el template

**Síntomas:** Documentos que referencian archivos o carpetas que no existen, o rutas con `{{PROJECT_NAME}}` / `{{PROJECT_CODE}}` sin sustituir.

**Qué hacer:**

1. Ejecutar de nuevo `setup_project.ps1` si los placeholders no se sustituyeron en la primera configuración.
2. Invocar al **Jardinero** (`AG-{{PROJECT_CODE}}-09-GARDENER`): pide *"Revisar el template"*, *"Auditar IA_MANAGER_TEMPLATE"* o *"Comprobar enlaces del template"*. El Jardinero valida la coherencia y puede proponer o aplicar correcciones (ver `02_AGENTS_REGISTRY/09_GARDENER.md`).

---

## 4. LAST_SESSION_STATUS corrupto o desincronizado

**Síntomas:** El archivo `01_GLOBAL_CONTEXT/LAST_SESSION_STATUS.md` está vacío, con formato ilegible, o no refleja el estado real del proyecto.

**Pasos de resolución:**

1. **Restaurar desde copia:** Si tienes un commit anterior con el archivo correcto, puedes recuperarlo con `git checkout <commit> -- 01_GLOBAL_CONTEXT/LAST_SESSION_STATUS.md`.
2. **Resetear con la plantilla:** Copia el contenido de `01_GLOBAL_CONTEXT/LAST_SESSION_STATUS_TEMPLATE.md` en `LAST_SESSION_STATUS.md` y rellena manualmente las secciones (última tarea, backlog, decisiones clave) según el estado actual del proyecto.
3. **Dejar en blanco temporalmente:** Si no hay información fiable, puedes dejar el archivo con un mensaje tipo "Estado por reconstruir en la próxima sesión". El Manager seguirá funcionando; solo perderás el resumen automático al inicio de sesión hasta que se actualice.

**Recomendación:** Hacer commit de `LAST_SESSION_STATUS.md` antes de cambios grandes (refactors, nuevos CRUDs completos) para poder restaurarlo fácilmente desde git.

---

## 5. Cambios incorrectos: cómo hacer rollback

Si un agente ha modificado o eliminado archivos por error:

1. **Identificar el alcance:** Revisar qué archivos se tocaron (historial del chat o `git status`).
2. **Revertir con git (recomendado):**
   - Un solo archivo: `git checkout -- <ruta-del-archivo>`
   - Varios archivos: `git checkout -- <carpeta-o-patrón>`
   - Todo el working tree desde el último commit: `git checkout -- .`
   - Si ya hiciste commit del cambio erróneo: `git revert <commit>` (crea un nuevo commit que deshace el anterior).
3. **No hacer force-push** a ramas compartidas sin acuerdo con el equipo; usa `revert` para deshacer commits ya subidos.

Para las reglas que los agentes deben seguir antes de cambios destructivos (indicar archivos, pedir confirmación si es crítico), ver `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` (sección "Rollback y recuperación").

---

## 6. Conflictos entre agentes o estado inconsistente

**Síntomas:** Dos agentes han tocado el mismo ámbito y el resultado es contradictorio, o la documentación (Diccionario, Historial_DB, etc.) no coincide con el código.

**Qué hacer:**

1. **Detener nuevas delegaciones** sobre ese ámbito hasta resolver el conflicto.
2. **Registrar el problema** en `00_CORE_MANAGER/Technical_Debt.md` y, si aplica, en `Audit_Logs.md`.
3. **Decidir fuente de verdad:** Con el usuario, decidir qué versión es la correcta (código vs. documento) y alinear el resto (manualmente o delegando de forma muy acotada a un solo agente).
4. **Jardinero para documentación:** Si el desajuste es sobre documentación del template o enlaces, invocar al Jardinero para que proponga alineación (ver sección 7).

---

## 7. Cuándo invocar al Jardinero

Invoca al **Jardinero** (`09_GARDENER`) cuando:

- Tras **cambios en el template** (reglas, agentes, contexto global): para que revise enlaces, referencias y coherencia.
- Hay **enlaces rotos** o referencias a archivos que ya no existen.
- Quieres una **auditoría programada** del template (según configuración del proyecto).
- Hay **reglas obsoletas o redundantes** que deben podarse (siguiendo `Governance_Evolution.md`).
- La documentación del **IA_MANAGER_TEMPLATE** está desincronizada con la estructura real del proyecto.

Formas de invocación: *"Revisar el template"*, *"Auditar IA_MANAGER_TEMPLATE"*, *"Comprobar enlaces del template"*. El Manager puede ofrecerlo también tras modificar archivos del template.

---

> [!TIP]
> Si un problema no está cubierto aquí, regístralo en `Technical_Debt.md` como "Incidente sin procedimiento" y considera ampliar esta guía en una próxima iteración.

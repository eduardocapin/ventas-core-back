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
8. [Problemas específicos del template](#8-problemas-específicos-del-template)
9. [Validación del template falla](#9-validación-del-template-falla)
10. [INDEX.md desincronizado con AGENTS_REGISTRY.json](#10-indexmd-desincronizado-con-agents_registryjson)
11. [Métricas no se calculan correctamente](#11-métricas-no-se-calculan-correctamente)
12. [Rutas en paths.config.json incorrectas](#12-rutas-en-pathconfigjson-incorrectas)

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

**Síntomas:** Documentos que referencian archivos o carpetas que no existen, o rutas con `VentasCore_IA` / `VC` sin sustituir.

**Qué hacer:**

1. Ejecutar de nuevo `setup_project.ps1` si los placeholders no se sustituyeron en la primera configuración.
2. Invocar al **Jardinero** (`AG-VC-09-GARDENER`): pide *"Revisar el template"*, *"Auditar IA_MANAGER_TEMPLATE"* o *"Comprobar enlaces del template"*. El Jardinero valida la coherencia y puede proponer o aplicar correcciones (ver `02_AGENTS_REGISTRY/09_GARDENER.md`).

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

## 8. Problemas específicos del template

### 8.1 Scripts de validación no funcionan

**Síntomas:** Los scripts `validate-template.ps1`, `calculate-metrics.ps1` o `generate-index.ps1` fallan o no se ejecutan.

**Qué comprobar:**
- Que estés ejecutando desde PowerShell (no CMD)
- Que la versión de PowerShell sea 5.1 o superior (`$PSVersionTable.PSVersion`)
- Que estés en el directorio correcto (raíz del `IA_MANAGER_TEMPLATE`)

**Pasos de resolución:**
1. Verificar permisos de ejecución: `Get-ExecutionPolicy` (debe ser RemoteSigned o Unrestricted)
2. Si está restringido: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Ejecutar con ruta completa: `.\scripts\validate-template.ps1`
4. Verificar que los archivos fuente existen (AGENTS_REGISTRY.json, Audit_Logs.md, etc.)

### 8.2 AGENTS_REGISTRY.json tiene formato incorrecto

**Síntomas:** El Manager no puede leer el registro de agentes o los scripts fallan al parsear JSON.

**Qué hacer:**
1. Validar JSON con herramienta online o `Get-Content AGENTS_REGISTRY.json | ConvertFrom-Json` (debe funcionar sin errores)
2. Verificar que cada agente tenga: `id`, `name`, `version`, `file_path`, `triggers`, `capabilities`
3. Verificar que `file_path` apunte a archivos que existen en `02_AGENTS_REGISTRY/`
4. Si el JSON está corrupto, restaurar desde git o copiar desde el template original

### 8.3 Versiones de agentes desincronizadas

**Síntomas:** La versión en `AGENTS_REGISTRY.json` no coincide con la versión en el archivo `.md` del agente.

**Qué hacer:**
1. Ejecutar `scripts/validate-template.ps1` para detectar desincronizaciones
2. Actualizar manualmente la versión en `AGENTS_REGISTRY.json` o en el archivo `.md` del agente
3. Asegurar que ambos coincidan
4. Registrar el cambio en `CHANGELOG.md` si es una actualización de versión

### 8.4 Documentos referencian rutas hardcodeadas

**Síntomas:** Los documentos mencionan `ventas-core-back` o `ventas-core-front` en lugar de usar `paths.config.json`.

**Qué hacer:**
1. Ejecutar `scripts/validate-template.ps1` para detectar rutas hardcodeadas
2. Reemplazar rutas hardcodeadas por referencias a `paths.config.json`
3. Ejemplo: Cambiar `ventas-core-front/src/app/core` por "ruta definida en `paths.config.json` como `core_front`"
4. Invocar al Jardinero para revisión completa: "Revisar el template"

### 8.5 Core inviolable no se respeta

**Síntomas:** Un agente intenta o ha modificado archivos en Core (especialmente `core_front`).

**Qué hacer:**
1. **INMEDIATO:** Rechazar la modificación y revertir cambios si ya se hicieron
2. Verificar que el agente tenga acceso a `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` y `Core_Inviolable_Frontend.md`
3. Registrar el incidente en `Technical_Debt.md` como "Violación de Core inviolable"
4. Revisar por qué el agente no respetó la restricción (¿falta contexto? ¿regla no clara?)
5. Asegurar que el Manager incluya la validación de Core en delegaciones (ver `00_MANAGER.md` → "CONTROL Y VALIDACIÓN DE CORE")

---

## 9. Validación del template falla

**Síntomas:** `scripts/validate-template.ps1` reporta errores o advertencias.

**Qué hacer:**

1. **Revisar errores críticos primero:**
   - Archivos críticos faltantes: Verificar que existen y tienen contenido
   - AGENTS_REGISTRY.json inválido: Corregir formato JSON
   - Archivos de agentes faltantes: Verificar que todos los `file_path` en el registro existen

2. **Revisar advertencias:**
   - Enlaces rotos: Ejecutar script de validación y corregir manualmente o invocar al Jardinero
   - Versiones desincronizadas: Actualizar versiones para que coincidan
   - Rutas hardcodeadas: Reemplazar por referencias a `paths.config.json`

3. **Usar el Jardinero:**
   - Pedir "Revisar el template" o "Auditar IA_MANAGER_TEMPLATE"
   - El Jardinero ejecutará su checklist completo y propondrá correcciones

4. **Validación manual:**
   - Consultar `DOCS/TEMPLATE_VALIDATION.md` para checklist completo
   - Verificar cada ítem manualmente si los scripts no funcionan

---

## 10. INDEX.md desincronizado con AGENTS_REGISTRY.json

**Síntomas:** El `INDEX.md` muestra agentes que no están en el registro o falta agentes que sí están.

**Qué hacer:**

1. **Regenerar automáticamente:**
   ```powershell
   cd IA_MANAGER_TEMPLATE
   .\scripts\generate-index.ps1
   ```

2. **Si el script no funciona:**
   - Verificar que `AGENTS_REGISTRY.json` es válido
   - Regenerar manualmente siguiendo el formato en `02_AGENTS_REGISTRY/INDEX.md`
   - Asegurar que todos los agentes del registro aparecen en el índice

3. **Prevenir desincronización:**
   - Ejecutar `generate-index.ps1` después de modificar `AGENTS_REGISTRY.json`
   - Añadir como paso en el proceso de creación/modificación de agentes

---

## 11. Métricas no se calculan correctamente

**Síntomas:** `scripts/calculate-metrics.ps1` no genera resultados o los resultados son incorrectos.

**Qué comprobar:**

1. **Formato de Audit_Logs.md:**
   - Verificar que tiene tabla con columnas: Fecha | Agente/Rol | Acción | Impacto
   - Las fechas deben estar en formato `YYYY-MM-DD`
   - Los nombres de agentes deben coincidir con IDs en `AGENTS_REGISTRY.json`

2. **Formato de Technical_Debt.md:**
   - Verificar que tiene tabla con columnas incluyendo Fecha y Riesgo
   - Las fechas deben estar en formato `YYYY-MM-DD`
   - Los niveles de riesgo deben ser exactamente: CRÍTICO, MEDIO, BAJO

3. **Si los archivos tienen formato diferente:**
   - El script puede no parsear correctamente
   - Considerar ajustar el formato de los logs o modificar el script para adaptarse

4. **Actualizar Metrics.md:**
   ```powershell
   .\scripts\calculate-metrics.ps1 -UpdateFile
   ```

---

## 12. Rutas en paths.config.json incorrectas

**Síntomas:** Los agentes no encuentran archivos o carpetas porque las rutas en `paths.config.json` son incorrectas.

**Qué hacer:**

1. **Verificar rutas relativas:**
   - Todas las rutas deben ser relativas desde la raíz del workspace
   - Ejemplo correcto: `ventas-core-back/IA_MANAGER_TEMPLATE`
   - Ejemplo incorrecto: `D:\Proyectos\...\ventas-core-back\IA_MANAGER_TEMPLATE`

2. **Verificar que las carpetas existen:**
   - Comprobar que cada ruta en `paths.config.json` apunta a una carpeta que existe
   - Usar rutas relativas desde donde está el workspace root

3. **Regenerar paths.config.json:**
   - Ejecutar `setup_project.ps1` de nuevo
   - O editar manualmente asegurando formato JSON válido y rutas correctas

4. **Validar con script:**
   - `scripts/validate-template.ps1` verifica que `paths.config.json` existe y tiene las claves necesarias

---

> [!TIP]
> Si un problema no está cubierto aquí, regístralo en `Technical_Debt.md` como "Incidente sin procedimiento" y considera ampliar esta guía en una próxima iteración.

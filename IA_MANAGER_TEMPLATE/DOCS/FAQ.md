# ❓ Preguntas Frecuentes (FAQ)

Preguntas comunes sobre el sistema IA_MANAGER_TEMPLATE y sus respuestas rápidas.

---

## 🚀 Inicio y Configuración

### ¿Cómo empiezo a usar el template?

1. Ejecuta `setup_project.ps1` desde la carpeta `IA_MANAGER_TEMPLATE`
2. Introduce el nombre y código del proyecto cuando se solicite
3. Revisa `DOCS/ONBOARDING.md` para guía de inicio rápido
4. El Manager estará listo para usar

### ¿Necesito ejecutar setup cada vez?

No. Solo necesitas ejecutar `setup_project.ps1` una vez al configurar el proyecto. Si cambias de workspace o mueves el proyecto, puedes ejecutarlo de nuevo para actualizar rutas.

### ¿Qué hace el script setup_project.ps1?

- Sustituye placeholders (`VentasCore_IA`, `VC`, etc.) por los valores de tu proyecto
- Crea `paths.config.json` con las rutas del workspace
- Genera reglas de Cursor en `.cursor/rules/` para que el orquestador funcione
- Valida la estructura básica del template

---

## 🤖 Agentes y Delegación

### ¿Cómo sé qué agente usar?

No necesitas elegir. Simplemente pide la tarea (ej: "Crea un CRUD de productos") y el Manager delegará automáticamente al agente correcto. Si quieres ver qué agentes hay disponibles, consulta `02_AGENTS_REGISTRY/INDEX.md`.

### ¿Puedo llamar directamente a un agente?

Técnicamente sí, pero no es recomendable. El Manager coordina el flujo completo y asegura que se sigan las reglas. Si llamas directamente a un agente, puedes saltarte validaciones importantes.

### ¿Qué hago si un agente falla?

1. El Manager debería registrar el error en `Technical_Debt.md`
2. Revisa el error y proporciona más contexto si es necesario
3. Puedes pedir que se reintente con más información
4. Si es crítico, el Manager te preguntará cómo proceder

### ¿Cómo veo qué agentes están disponibles?

Consulta `02_AGENTS_REGISTRY/INDEX.md` para un resumen rápido, o `00_CORE_MANAGER/AGENTS_REGISTRY.json` para el registro completo.

---

## 🚫 Core Inviolable

### ¿Qué es Core inviolable?

Core inviolable es una norma que **prohíbe absolutamente** modificar las carpetas Core del proyecto (definidas en `paths.config.json` como `core_back` y `core_front`). Estas carpetas solo pueden ser consultadas y reutilizadas, nunca modificadas.

### ¿Por qué existe esta restricción?

Para mantener la estabilidad de componentes críticos compartidos por toda la aplicación. Evita cambios que puedan romper funcionalidad existente.

### ¿Qué hago si necesito modificar algo en Core?

**NO lo modifiques.** En su lugar:
1. Consulta el componente existente en Core
2. Crea un nuevo componente fuera de Core que extienda o componga el componente Core
3. Usa composición o herencia para añadir la funcionalidad que necesitas

### ¿Dónde encuentro información sobre Core inviolable?

- `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` - Restricción general
- `01_GLOBAL_CONTEXT/Core_Inviolable_Frontend.md` - Específico para Frontend
- `00_CORE_MANAGER/00_MANAGER.md` - Cómo el Manager valida Core
- `DOCS/core-inviolable.mdc` - Regla Cursor

---

## 📋 Flujos de Trabajo

### ¿Cómo funciona el flujo de un CRUD completo?

Ver `DOCS/WORKFLOWS_MASTER.md` → "Nuevo CRUD Completo" para el flujo detallado. Básicamente: Arquitecto → DB → Backend → Frontend → QA.

### ¿Puedo generar todo para una entidad de una vez?

Sí. Pide "generar todo para la entidad X" o "CRUD completo desde entidad X". El agente Entity-to-Stack orquestará todo el proceso automáticamente.

### ¿Cómo añado una nueva entidad al sistema?

Pide "añadir entidad X al sistema" o "registrar nueva entidad X". El agente DB actualizará el Diccionario, Tablas_Columnas_Alias e Historial_DB.

---

## 🔧 Validación y Mantenimiento

### ¿Cómo valido que el template está correcto?

Ejecuta `scripts/validate-template.ps1` desde la carpeta `IA_MANAGER_TEMPLATE`. Este script ejecuta el checklist del Gardener automáticamente.

### ¿Qué hace el script de validación?

Verifica:
- Estructura de carpetas y archivos críticos
- Validez de AGENTS_REGISTRY.json
- Coherencia entre INDEX.md y el registro
- Enlaces rotos básicos
- Versiones sincronizadas
- Rutas hardcodeadas
- Y más...

### ¿Cómo actualizo las métricas?

Ejecuta `scripts/calculate-metrics.ps1 -UpdateFile` para calcular y actualizar automáticamente las métricas en `Metrics.md`.

### ¿Cómo sincronizo INDEX.md con AGENTS_REGISTRY.json?

Ejecuta `scripts/generate-index.ps1`. Esto regenera el índice automáticamente desde el registro.

---

## 📚 Documentación

### ¿Dónde encuentro información sobre...?

- **Inicio rápido:** `DOCS/ONBOARDING.md`
- **Manual completo:** `DOCS/MANUAL_FUNCIONAMIENTO.md`
- **Flujos de trabajo:** `DOCS/WORKFLOWS_MASTER.md`
- **Navegación:** `DOCS/NAVIGATION_INDEX.md`
- **Problemas comunes:** `DOCS/TROUBLESHOOTING.md`
- **Este FAQ:** `DOCS/FAQ.md`

### ¿Cómo navego por toda la documentación?

Usa `DOCS/NAVIGATION_INDEX.md` como punto de entrada. Tiene índices por tema, por carpeta, y búsqueda por situación.

---

## 🛠️ Scripts y Herramientas

### ¿Qué scripts están disponibles?

- `scripts/validate-template.ps1` - Validación del template
- `scripts/calculate-metrics.ps1` - Cálculo de métricas
- `scripts/generate-index.ps1` - Generación de INDEX.md
- `setup_project.ps1` - Setup inicial del proyecto

### ¿Cómo ejecuto los scripts?

Desde PowerShell, en la carpeta `IA_MANAGER_TEMPLATE`:
```powershell
.\scripts\validate-template.ps1
.\scripts\calculate-metrics.ps1 -UpdateFile
.\scripts\generate-index.ps1
```

### ¿Los scripts funcionan en Linux/Mac?

Los scripts están escritos en PowerShell. Si usas PowerShell Core (disponible en Linux/Mac), deberían funcionar. Si no, puedes adaptarlos a bash o usar WSL en Windows.

---

## 🔍 Problemas Comunes

### El Manager no responde correctamente

1. Verifica que `AGENTS_REGISTRY.json` existe y es válido
2. Verifica que las reglas de Cursor en `.cursor/rules/` apuntan al template
3. Reformula tu petición de forma más específica
4. Consulta `DOCS/TROUBLESHOOTING.md` → "Manager no responde"

### Encontré un enlace roto en la documentación

1. Ejecuta `scripts/validate-template.ps1` para detectar enlaces rotos
2. O pide "Revisar el template" para que el Jardinero los corrija
3. Consulta `DOCS/TROUBLESHOOTING.md` → "Enlaces rotos"

### Las métricas no se calculan

1. Verifica que `Audit_Logs.md` y `Technical_Debt.md` tienen el formato correcto
2. Consulta `DOCS/TROUBLESHOOTING.md` → "Métricas no se calculan"
3. Verifica que las fechas están en formato `YYYY-MM-DD`

### INDEX.md está desactualizado

Ejecuta `scripts/generate-index.ps1` para regenerarlo automáticamente desde `AGENTS_REGISTRY.json`.

---

## 🎯 Mejores Prácticas

### ¿Cómo mantengo el template actualizado?

1. Ejecuta `scripts/validate-template.ps1` periódicamente
2. Pide "Revisar el template" al Jardinero tras cambios importantes
3. Mantén `CHANGELOG.md` actualizado con cambios significativos

### ¿Cuándo debo invocar al Jardinero?

- Tras modificar archivos del template
- Cuando encuentres enlaces rotos
- Para auditoría periódica (cada 5 sesiones recomendado)
- Cuando hay reglas obsoletas que limpiar

### ¿Cómo registro actividad correctamente?

- Tareas completadas → `Audit_Logs.md`
- Problemas o atajos → `Technical_Debt.md`
- Cambios en DB → `Historial_DB.md`
- El Manager lo hace automáticamente, pero puedes verificar

---

## 🔗 Referencias Rápidas

- **README principal:** `README.md`
- **Changelog:** `CHANGELOG.md`
- **Validación:** `DOCS/TEMPLATE_VALIDATION.md`
- **Troubleshooting:** `DOCS/TROUBLESHOOTING.md`
- **Navegación:** `DOCS/NAVIGATION_INDEX.md`
- **Flujos:** `DOCS/WORKFLOWS_MASTER.md`

---

## 💡 Consejos

- **Usa el índice de navegación** (`NAVIGATION_INDEX.md`) para encontrar información rápidamente
- **Ejecuta validación periódicamente** para mantener el template saludable
- **Consulta WORKFLOWS_MASTER.md** antes de pedir tareas complejas para entender el flujo
- **Registra problemas** en `Technical_Debt.md` para no olvidarlos
- **Mantén sincronizado INDEX.md** ejecutando `generate-index.ps1` tras cambios en agentes

---

**¿No encuentras tu pregunta?** Consulta `DOCS/TROUBLESHOOTING.md` o registra la pregunta en `Technical_Debt.md` para que se añada a este FAQ en el futuro.

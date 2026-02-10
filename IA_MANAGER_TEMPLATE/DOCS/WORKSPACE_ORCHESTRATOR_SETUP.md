# Configuración del Orquestador Único en el Workspace

Este documento describe la estructura del **IA_MANAGER_TEMPLATE**, el controlador de agentes del workspace, y los cambios de **estructura**, **datos** y **normas** necesarios para que **siempre** que se use este workspace, el orquestador de agentes, skills y normas sea el que existe en esta carpeta, para todos los proyectos del workspace.

**Importante:** Todas las rutas de Back, Front y Template deben definirse en `00_CORE_MANAGER/paths.config.json`. El script `setup_project.ps1` pide esas rutas y escribe el fichero. Los ejemplos siguientes usan nombres ilustrativos; las rutas reales deben coincidir con `paths.config.json`.

---

## 1. Estructura actual del IA_MANAGER_TEMPLATE

```
IA_MANAGER_TEMPLATE/
├── .agent/                    # Contexto nativo (Antigravity / Cursor Agent)
│   ├── instructions.md        # Aislamiento, checkpoints, orquestación relativa
│   └── workflows/
│       ├── ia-init.md         # Flujo de inicialización
│       └── session-stop.md
├── .cursorrules               # Reglas del AI Manager (placeholders: PROJECT_NAME, PROJECT_CODE, ROOT_PATH)
├── 00_CORE_MANAGER/           # Cerebro: orquestador, registro, logs
│   ├── 00_MANAGER.md          # System prompt del Manager
│   ├── AGENTS_REGISTRY.json   # Registro de agentes (ids con PROJECT_CODE)
│   ├── Audit_Logs.md
│   └── Technical_Debt.md
├── 01_GLOBAL_CONTEXT/         # Constitución: diccionario, ADRs, guardrails, LAST_SESSION
├── 02_AGENTS_REGISTRY/        # Definiciones de agentes (01–09 + Factory)
├── 03_PROMPT_LIBRARY/         # Prompts maestros (CRUD, API, UX, Security)
├── DOCS/
├── README.md
└── setup_project.ps1          # Hidrata placeholders en una copia del template
```

**Problema:** El template está dentro de una carpeta del workspace (ej. `{backend_path}/IA_MANAGER_TEMPLATE`; ver `paths.config.json` → `template_path`). Cursor solo aplica reglas desde:
- La **raíz del workspace** (`.cursor/rules/` o `.cursorrules` en la raíz), o
- La raíz de cada carpeta del workspace.

Por tanto, si no hay nada en la raíz del workspace, **el orquestador del template no se usa de forma automática** para todo el workspace.

---

## 2. Cambios de ESTRUCTURA recomendados

### 2.1 Reglas de Cursor en la raíz del workspace

Para que **todos los proyectos del workspace** usen el mismo orquestador:

| Cambio | Descripción |
|--------|-------------|
| Crear `.cursor/rules/` en la **raíz del workspace** | Cursor aplica las reglas de esta carpeta a todo el workspace. |
| Añadir una regla **alwaysApply: true** | Que indique: "El orquestador está en la ruta de `paths.config.json` → `template_path`. Usa siempre ese directorio como fuente de contexto (Manager, AGENTS_REGISTRY, GLOBAL_CONTEXT, AGENTS_REGISTRY)." |
| No duplicar el template por proyecto | En lugar de copiar `IA_MANAGER_TEMPLATE` a cada proyecto y ejecutar `setup_project.ps1`, se mantiene **una sola instancia**; la ruta se define en `paths.config.json` y las reglas del workspace apuntan ahí. |

Estructura objetivo en la raíz del workspace:

```
{Ventas}/                        # Raíz del workspace
├── .cursor/
│   └── rules/
│       └── ia-manager-orchestrator.mdc   # Regla que apunta al template
├── {backend_path}/              # paths.config.json → backend_path
│   └── IA_MANAGER_TEMPLATE/     # Fuente única del orquestador (paths.config.json → template_path)
├── {frontend_path}/             # paths.config.json → frontend_path
└── *.code-workspace
```

### 2.2 Workspace multi-carpeta (opcional)

Si en el futuro el `.code-workspace` incluye varias carpetas (Front, Back, otro microservicio), las reglas en `.cursor/rules/` de la **raíz del workspace** siguen aplicando a todas. No hace falta un `.cursor` por carpeta para el orquestador.

---

## 3. Cambios de DATOS y convenciones

### 3.1 Placeholders cuando el orquestador es único en el workspace

El template usa `VentasCore_IA`, `VC`, `.`. Si el orquestador es **único para todo el workspace**:

| Dato | Uso recomendado |
|------|------------------|
| `.` | **Raíz del workspace** (donde está el `.code-workspace`). Así "Workspace Isolation" significa: solo operar sobre archivos bajo esta raíz. |
| `VentasCore_IA` | Nombre del workspace (ej. `test_1`) o un nombre de producto acordado. Puede hidratarse una vez en el template. |
| `VC` | Código corto del workspace (ej. `T1` o `SARIGABO`). Útil para prefijos de agentes `AG-VC-01-ARCHITECT`. |

Recomendación: ejecutar **una vez** `setup_project.ps1` dentro de `IA_MANAGER_TEMPLATE` con el nombre y código del workspace, para hidratar esos placeholders. A partir de ahí, ese directorio es la fuente única; no hace falta volver a copiar el template.

### 3.2 Ruta relativa al template en las reglas

En la regla de `.cursor/rules/` se debe usar la ruta **relativa al workspace root**. La ruta base del template es `paths.config.json` → `template_path`. Las rutas concretas serían:

- `{template_path}/00_CORE_MANAGER/00_MANAGER.md`
- `{template_path}/00_CORE_MANAGER/AGENTS_REGISTRY.json`
- `{template_path}/01_GLOBAL_CONTEXT/`
- `{template_path}/02_AGENTS_REGISTRY/`

El script `setup_project.ps1` sustituye `{{IA_MANAGER_TEMPLATE_PATH}}` por el valor de `template_path` al generar la regla. Así la IA siempre sabe dónde están el Manager, el registro de agentes y el contexto global.

---

## 4. Cambios de NORMAS

### 4.1 Norma de workspace: orquestador único

- **Regla:** En este workspace, el orquestador de agentes, skills y normas es **siempre** el definido en la ruta indicada en `paths.config.json` → `template_path`. No uses otro conjunto de reglas o agentes para orquestar.
- **Al crear un nuevo proyecto dentro del mismo workspace:** No copies una nueva instancia de `IA_MANAGER_TEMPLATE` para ese proyecto. Sigue usando la instancia central; las reglas del workspace ya apuntan a ella.
- **Si se añade una nueva carpeta al workspace:** No es necesario configurar un nuevo orquestador; la regla en `.cursor/rules/` aplica a toda la raíz.

### 4.2 Dónde se definen las normas

| Tipo | Dónde |
|------|--------|
| Comportamiento del AI Manager | `IA_MANAGER_TEMPLATE/00_CORE_MANAGER/00_MANAGER.md` |
| Registro de agentes | `IA_MANAGER_TEMPLATE/00_CORE_MANAGER/AGENTS_REGISTRY.json` |
| Reglas globales, diccionario, guardrails | `IA_MANAGER_TEMPLATE/01_GLOBAL_CONTEXT/` |
| Definiciones de cada agente | `IA_MANAGER_TEMPLATE/02_AGENTS_REGISTRY/` |
| Que Cursor use este orquestador en todo el workspace | `.cursor/rules/ia-manager-orchestrator.mdc` (en la raíz del workspace) |

### 4.3 Actualización del README del template

En `IA_MANAGER_TEMPLATE/README.md` conviene añadir una sección tipo:

- **Uso en workspace único:** Si este template está en un repo/workspace que contiene varios proyectos (Front, Back, etc.), se ha configurado `.cursor/rules/` en la raíz del workspace para que el orquestador sea siempre este. No copies el template a cada proyecto; usad esta instancia como fuente única.

---

## 5. Resumen de acciones

1. **Estructura:** Crear `.cursor/rules/` en la raíz del workspace y añadir la regla `ia-manager-orchestrator.mdc`. La ruta del template se toma de `paths.config.json` → `template_path` (el script `setup_project.ps1` genera la regla con esa ruta).
2. **Datos:** (Opcional) Hidratar una vez el template con `setup_project.ps1` usando el nombre y código del workspace; fijar `ROOT_PATH` a la raíz del workspace.
3. **Normas:** Documentar que el orquestador es único y que no se debe duplicar el template por proyecto; actualizar el README del template según lo anterior.

Con esto, **siempre que se use este workspace**, el orquestador de agentes, skills y normas será el que existe en `IA_MANAGER_TEMPLATE`, para todos los proyectos del workspace.

---

## 6. Setup inicial (rutas relativas y placeholders)

Para que el workspace funcione como template en cualquier ubicación:

1. **Rutas relativas:** Todas las referencias en el template usan rutas relativas (p. ej. `./03_PROMPT_LIBRARY/README.md`, `./Tech_Stack.md`). No se usan rutas absolutas ni `file:///`.
2. **ROOT_PATH:** Durante el setup se sustituye por `.` (raíz del workspace), de modo que el aislamiento sea relativo.
3. **Regla de Cursor:** La regla en `.cursor/rules/ia-manager-orchestrator.mdc` usa el placeholder `{{IA_MANAGER_TEMPLATE_PATH}}`. Al ejecutar `setup_project.ps1` desde `IA_MANAGER_TEMPLATE`, el script:
   - Sustituye en todo el template: `VentasCore_IA`, `VC`, `.` (por `.`), `2026-02-06`.
   - Escribe o actualiza `.cursor/rules/ia-manager-orchestrator.mdc` en la raíz del workspace sustituyendo `{{IA_MANAGER_TEMPLATE_PATH}}` por la ruta relativa desde la raíz del workspace hasta `IA_MANAGER_TEMPLATE`.

**Tras clonar o usar este workspace como template:** ejecuta `./setup_project.ps1` desde la carpeta `IA_MANAGER_TEMPLATE` (o con parámetros `-ProjectName`, `-ProjectCode`, `-WorkspaceRoot` si lo ejecutas desde otro sitio) para dejar todas las rutas y las reglas de Cursor correctamente configuradas.

Las reglas que el template despliega en `.cursor/rules/` son (todas con rutas relativas al workspace):
- `ia-manager-orchestrator.mdc`: orquestador único (generada desde `DOCS/cursor_rule_orchestrator.mdc.template`).
- `core-inviolable.mdc`: norma inviolable para carpetas `Core` (copiada desde `DOCS/core-inviolable.mdc`). El Manager y los agentes conocen esta norma también a través de `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md`.

---

## 7. Gestión de conflictos entre proyectos

Cuando varios proyectos en el mismo workspace tienen necesidades diferentes o conflictos con las reglas del template:

### Cuándo surge conflicto

- Dos proyectos necesitan reglas diferentes (ej. uno usa TypeScript estricto, otro permite `any` temporalmente).
- Un proyecto necesita un agente personalizado que otro proyecto no usa.
- Un proyecto requiere una excepción a una regla global (ej. nomenclatura diferente para componentes legacy).

### Soluciones

#### Opción 1: Excepciones por proyecto (recomendado para <3 conflictos)

Crear `.cursor/rules/project-specific.mdc` en la raíz del proyecto específico que sobrescriba reglas del template solo para ese proyecto:

```markdown
# Reglas específicas del proyecto X

## Excepciones al template

- Este proyecto permite `any` temporalmente en archivos legacy (marcados con comentario `// TODO: tipar`).
- Los componentes legacy usan selector `app-*` en lugar de `mobentis-*` (no crear nuevos con este prefijo).
```

**Ventaja:** Mantiene la coherencia del template principal mientras permite flexibilidad puntual.

#### Opción 2: Agentes adicionales por proyecto

Si solo un proyecto necesita un agente específico, añadir la definición del agente en un `AGENTS_REGISTRY.json` local del proyecto (no en el template):

```
proyecto-especifico/
├── .cursor/
│   └── rules/
│       └── project-agents.json   # Agentes adicionales solo para este proyecto
└── src/
```

**Ventaja:** No modifica el template compartido; solo añade capacidades específicas.

#### Opción 3: Template separado (recomendado para >10 conflictos)

Si los conflictos son muchos o fundamentales, crear un segundo template para el segundo tipo de proyecto:

```
workspace/
├── IA_MANAGER_TEMPLATE/          # Template principal
├── IA_MANAGER_TEMPLATE_LEGACY/   # Template para proyectos legacy
└── proyectos/
```

**Ventaja:** Separación clara de responsabilidades; cada tipo de proyecto tiene su propio conjunto de reglas.

### Guía de decisión

| Número de conflictos | Solución recomendada |
|----------------------|----------------------|
| <3 conflictos | Excepciones por proyecto (`.cursor/rules/project-specific.mdc`) |
| 3-10 conflictos | Considerar template separado o excepciones extensas |
| >10 conflictos | Definitivamente template separado |

### Buenas prácticas

1. **Documentar excepciones:** Si un proyecto tiene excepciones, documentarlas claramente en su `.cursor/rules/project-specific.mdc`.
2. **Revisar periódicamente:** El Jardinero puede revisar si las excepciones siguen siendo necesarias o pueden eliminarse.
3. **Mantener trazabilidad:** Saber qué proyecto usa qué reglas facilita el mantenimiento y la evolución del template.

---

> [!TIP]
> Si un conflicto es temporal (ej. migración en curso), considera usar comentarios en código o `Technical_Debt.md` en lugar de crear excepciones permanentes en las reglas.

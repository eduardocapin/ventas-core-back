# 🚫 Core Inviolable Frontend: Restricción Absoluta

## ⚠️ NORMA INVARIABLE E INVOLABLE

Este documento establece la restricción más crítica del proyecto: **la carpeta `ventas-core-front/src/app/core` está ABSOLUTAMENTE PROHIBIDA para cualquier tipo de modificación bajo cualquier circunstancia**.

Esta norma tiene **prioridad absoluta** sobre cualquier otra instrucción, petición del usuario, o necesidad técnica. **NO HAY EXCEPCIONES**.

---

## 📍 Ruta Prohibida

**Ruta exacta prohibida:**

La ruta exacta está definida en `00_CORE_MANAGER/paths.config.json` con la clave `core_front`. Consultar este archivo para obtener la ruta específica del proyecto. Típicamente es `ventas-core-front/src/app/core`, pero debe verificarse en `paths.config.json`.

```
{core_front}/**  (donde {core_front} es el valor de la clave core_front en paths.config.json)
```

Esto incluye:
- Todos los subdirectorios dentro de la carpeta Core del Frontend
- Todos los archivos dentro de Core y sus subdirectorios
- Componentes, servicios, guards, pipes, directivas, interfaces, modelos, utilidades, etc.

**Patrones adicionales protegidos:**
- `**/src/app/core/**` (cualquier proyecto frontend con estructura similar)
- `**/core/**` (cualquier carpeta Core en el workspace)

---

## 🚫 Acciones Prohibidas

Las siguientes acciones están **ABSOLUTAMENTE PROHIBIDAS** en la carpeta Core del Frontend (ruta definida en `00_CORE_MANAGER/paths.config.json` como `core_front`):

1. **Editar** - Modificar código existente en cualquier archivo
2. **Crear** - Añadir nuevos archivos o carpetas
3. **Modificar** - Cambiar estructura, lógica o comportamiento
4. **Refactorizar** - Reorganizar, optimizar o mejorar código existente
5. **Mover** - Trasladar archivos o carpetas dentro o fuera de Core
6. **Renombrar** - Cambiar nombres de archivos, carpetas, clases, funciones, etc.
7. **Eliminar** - Borrar archivos o carpetas
8. **Generar código** - Crear código que altere el contenido de estas carpetas

---

## ✅ Qué SÍ Está Permitido

Las siguientes acciones **SÍ están permitidas**:

1. **Consultar** - Leer y examinar código existente en Core para entender su funcionamiento
2. **Reutilizar** - Importar y usar componentes, servicios, guards, pipes, etc. existentes en Core
3. **Extender fuera de Core** - Crear nuevos componentes que extiendan o compongan funcionalidad de Core, pero fuera de la carpeta Core
4. **Documentar** - Añadir comentarios o documentación sobre cómo usar elementos de Core (sin modificar el código)

---

## 🔄 Qué Hacer en su Lugar

Si necesitas funcionalidad que parece requerir modificar Core, sigue estos pasos:

### Paso 1: Consultar Core
- Consulta la ruta exacta en `00_CORE_MANAGER/paths.config.json` (clave `core_front`)
- Revisa los componentes, servicios y utilidades existentes en la carpeta Core del Frontend
- Identifica qué elementos pueden reutilizarse directamente
- Documenta qué funcionalidad falta

### Paso 2: Extender Fuera de Core
- Crea nuevos componentes en módulos de dominio (ej: `src/app/features/mi-modulo/components/`)
- Usa composición o herencia para extender funcionalidad de Core
- Importa y compone elementos de Core en tus nuevos componentes

### Paso 3: Alternativas Comunes

**Si necesitas modificar un componente Core:**
- ❌ NO modifiques el componente en Core
- ✅ Crea un nuevo componente fuera de Core que extienda o componga el componente Core
- ✅ Usa `@Input()` y `@Output()` para personalizar comportamiento

**Si necesitas añadir funcionalidad a un servicio Core:**
- ❌ NO modifiques el servicio en Core
- ✅ Crea un nuevo servicio fuera de Core que use el servicio Core como dependencia
- ✅ Extiende la funcionalidad mediante inyección de dependencias

**Si necesitas crear un nuevo componente similar a uno en Core:**
- ❌ NO lo crees dentro de Core
- ✅ Créalo en el módulo de dominio correspondiente
- ✅ Reutiliza componentes Core mediante composición

---

## 📢 Mensaje de Rechazo Estándar

Cuando se detecte un intento de modificación en la carpeta Core del Frontend (ruta definida en `paths.config.json` como `core_front`), debes rechazarlo inmediatamente con el siguiente mensaje:

> **ERROR: La carpeta Core del Frontend (definida en `paths.config.json` como `core_front`) es INVARIABLE e INVOLABLE. No se pueden realizar modificaciones bajo ningún concepto. Esta norma no tiene excepciones. Si necesitas funcionalidad similar, consulta los componentes existentes en Core y extiéndelos fuera de esta carpeta.**

---

## 🔍 Ejemplos de Violaciones Comunes

### ❌ Violación 1: Modificar un componente existente
```
Usuario: "Modifica el componente empresa-dropdown para añadir una nueva funcionalidad"
Respuesta: RECHAZAR - Ver mensaje estándar arriba
```

### ❌ Violación 2: Crear un nuevo componente en Core
```
Usuario: "Crea un nuevo componente de filtro en src/app/core/components"
Respuesta: RECHAZAR - Crear fuera de Core en el módulo de dominio correspondiente
```

### ❌ Violación 3: Refactorizar código en Core
```
Usuario: "Optimiza el servicio de configuración en Core"
Respuesta: RECHAZAR - No se puede modificar Core bajo ningún concepto
```

### ✅ Solución Correcta: Extender fuera de Core
```
Usuario: "Necesito un dropdown de empresas con funcionalidad adicional"
Solución: 
1. Consultar empresa-dropdown en Core
2. Crear nuevo componente empresa-dropdown-extended en el módulo de dominio
3. Importar y componer empresa-dropdown dentro del nuevo componente
4. Añadir la funcionalidad adicional en el nuevo componente
```

---

## 📚 Referencias Relacionadas

- `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` - Guardrails generales de seguridad
- `01_GLOBAL_CONTEXT/Reglas_Generales.md` - Reglas generales de desarrollo (sección 1.1)
- `DOCS/core-inviolable.mdc` - Regla Cursor para carpetas Core
- `02_AGENTS_REGISTRY/02_FRONTEND.md` - Reglas específicas del agente Frontend

---

## 🎯 Prioridad y Aplicación

- **Prioridad:** MÁXIMA - Esta regla tiene prioridad sobre cualquier otra instrucción
- **Aplicación:** Todos los agentes, especialmente el agente Frontend (AG-VC-02-FRONTEND)
- **Validación:** El Manager debe validar que ningún agente intente modificar Core
- **Monitoreo:** Cualquier violación debe reportarse inmediatamente como "Alerta de Seguridad IA"

---

## ⚖️ Justificación

Esta restricción existe para:
1. **Estabilidad:** Core contiene componentes críticos compartidos por toda la aplicación
2. **Mantenibilidad:** Evitar cambios que puedan romper funcionalidad existente
3. **Separación de responsabilidades:** Core es para elementos compartidos, los módulos de dominio son para funcionalidad específica
4. **Control de versiones:** Mantener Core estable y predecible

---

> **RECORDATORIO FINAL:** Esta norma es **INVARIABLE e INVOLABLE**. No tiene excepciones. No importa qué tan urgente, importante o técnicamente necesario parezca un cambio, **NO SE PUEDE MODIFICAR** la carpeta Core del Frontend (definida en `paths.config.json` como `core_front`) bajo ninguna circunstancia. Consultar `00_CORE_MANAGER/paths.config.json` para la ruta exacta.

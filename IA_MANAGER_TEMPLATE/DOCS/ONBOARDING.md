# 🧑‍💻 Si eres nuevo en el proyecto, empieza aquí

Guía rápida para incorporarte al proyecto que usa el IA_MANAGER_TEMPLATE y el equipo de agentes.

---

## 1. Qué leer primero (orden sugerido)

1. **README del template** (`IA_MANAGER_TEMPLATE/README.md`)  
   - Qué es el Manager, qué son los agentes y cómo se orquestan.  
   - Quick Start: copiar template, ejecutar setup, hidratación inicial.

2. **Diccionario de negocio** (`01_GLOBAL_CONTEXT/Diccionario.md`)  
   - Términos del dominio, entidades principales y vocabulario del proyecto.

3. **Contexto operativo Mobentis Sales** (`01_GLOBAL_CONTEXT/Sistema_Mobentis_Sales_Contexto_IA.md`)  
   - Rol de asistencia en BackOffice, multiempresa, Importador de Documentos, estados de integración (leyenda de colores) y protocolo de resolución de errores ERP. Formato optimizado para IA.

4. **Reglas de oro**  
   - `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` — qué no se puede hacer (Core inviolable, secretos, persistencia).  
   - `01_GLOBAL_CONTEXT/Reglas_Generales.md` — estándares de desarrollo y reutilización de Core.

5. **Índice de agentes** (`02_AGENTS_REGISTRY/INDEX.md`)  
   - Qué agente hace qué (Arquitecto, Frontend, Backend, DB, QA, Setup, UX, Security, Jardinero).

6. **Manual de funcionamiento** (`DOCS/MANUAL_FUNCIONAMIENTO.md`)  
   - Flujo completo del sistema, día a día y buenas prácticas.

---

## 2. Cómo hacer tu primera tarea

- **No invokes agentes a mano.** Escribe en el chat qué quieres lograr (ej. "Crear CRUD de clientes", "Corregir el bug en el listado de pedidos", "Revisar el template").  
- El **Manager** leerá el contexto, elegirá el agente adecuado y te irá mostrando el plan y la ejecución.  
- Si la tarea es grande, divídela en pasos (ej. primero esquema DB, luego backend, luego frontend).

**Primera tarea recomendada:** Algo pequeño y acotado (ej. "Añadir un campo X a la entidad Y en el diccionario" o "Revisar enlaces del template") para ver cómo responde el Manager y cómo delega.

---

## 3. Dónde encontrar ayuda

| Necesidad              | Dónde mirar |
|------------------------|-------------|
| Operación BackOffice / errores integración ERP | `01_GLOBAL_CONTEXT/Sistema_Mobentis_Sales_Contexto_IA.md` |
| Algo no funciona       | `DOCS/TROUBLESHOOTING.md` |
| Cómo deshacer cambios  | `DOCS/TROUBLESHOOTING.md` → "Cambios incorrectos: cómo hacer rollback" |
| Validar el template    | `DOCS/TEMPLATE_VALIDATION.md` |
| Dependencias entre agentes | `DOCS/AGENT_DEPENDENCIES.md` |
| Orquestador en workspace | `DOCS/WORKSPACE_ORCHESTRATOR_SETUP.md` |
| Prompts para tareas recurrentes | `03_PROMPT_LIBRARY/README.md` |

Al inicio de cada sesión, el Manager puede leer `01_GLOBAL_CONTEXT/LAST_SESSION_STATUS.md` para resumirte la última tarea, el backlog y las decisiones recientes.

---

## 4. Resumen en una frase

**Pide la tarea en lenguaje natural; el Manager y los agentes se encargan del resto.** Lee README + Diccionario + Guardrails y usa TROUBLESHOOTING si algo falla.

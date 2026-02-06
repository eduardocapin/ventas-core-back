# 🔗 Dependencias entre agentes

Documentación de qué agente depende de qué para mantener el orden correcto en flujos complejos.

---

## Diagrama de dependencias (flujo típico)

```
Setup / Usuario
    │
    ▼
Diccionario + Reglas_Generales (contexto base)
    │
    ├──► Arquitecto (diseño, entidades, capas)
    │         │
    │         ▼
    ├──► DB (tablas, Historial_DB, Tablas_Columnas_Alias, Diccionario entidades)
    │         │
    │         ▼
    ├──► Backend (entidades, DTOs, endpoints según DB y Arquitecto)
    │         │
    │         ▼
    ├──► Frontend (pantallas, servicios que consumen Backend)
    │         │
    │         ▼
    └──► QA (tests sobre Backend y Frontend)
```

---

## Tabla de dependencias

| Agente      | Depende de / Consume | Producto que otros usan |
|-------------|----------------------|---------------------------|
| **Setup Wizard** | Usuario, ideas de negocio | Diccionario.md, Reglas_Generales.md (hidratación inicial) |
| **Arquitecto**   | Diccionario, Architecture_Decisions | Entidades, límites de contexto, capas |
| **DB**           | Diccionario (entidades), Arquitecto (diseño) | Historial_DB.md, Tablas_Columnas_Alias.md, Diccionario (entidades/alias) |
| **Backend**      | DB (esquemas, DTOs), Diccionario, Backend_Patterns | Endpoints, módulos, servicios |
| **Frontend**     | Backend (APIs, DTOs), Tech_Stack, Reglas_Generales | Pantallas, componentes, servicios de UI |
| **QA**           | Backend, Frontend (código y APIs) | Tests, reportes de bugs |
| **UX Designer**  | Frontend (estructura), Diccionario (negocio) | Mejoras de UX, criterios de usabilidad |
| **Security Expert** | Todo el código y configuración | Auditorías, recomendaciones de seguridad |
| **Jardinero**    | Todo el template (DOCS, 01_GLOBAL_CONTEXT, 02_AGENTS_REGISTRY) | Documentación y enlaces coherentes |

---

## Orden recomendado en flujos estándar

- **Nuevo CRUD completo:** Arquitecto → DB → Backend → Frontend → QA.  
- **Nuevo DTO/entidad al sistema:** DB (Diccionario, Tablas_Columnas_Alias, Historial_DB) → Backend.  
- **Bug en funcionalidad:** QA (reproducir) → Backend o Frontend (corregir); Arquitecto solo si el bug es de diseño.  
- **Cambio de reglas de negocio:** Setup Wizard (+ Diccionario/Reglas) → Arquitecto si impacta arquitectura → Jardinero para limpieza de documentación.  
- **Cambios en el template:** Tras editar archivos del template → Jardinero (auditoría de coherencia y enlaces).

---

## Nota para el Manager

Al diseñar un plan secuencial, respetar estas dependencias evita que un agente trabaje sobre información aún no generada (ej. Backend antes de DB, Frontend antes de Backend). Consultar también los flujos en `00_CORE_MANAGER/00_MANAGER.md`.

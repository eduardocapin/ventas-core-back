# 🏗️ ARCHITECTURE DECISION RECORDS (ADR)

Este documento registra las decisiones técnicas clave tomadas durante el ciclo de vida de **{{PROJECT_NAME}}**. Cada registro explica el contexto, la decisión y las consecuencias.

---

## 📅 HISTORIAL DE DECISIONES

| ID | Fecha | Decisión | Estado |
| :--- | :--- | :--- | :--- |
| **ADR-001** | 2024-02-04 | Uso de Arquitectura Basada en Agentes | Aceptado |
| **ADR-002** | 2024-02-04 | Estandarización de Frameworks (referencia) | Sustituido por ADR-003 |
| **ADR-003** | {{CURRENT_DATE}} | Stack real: Angular 16, NestJS 10, MySQL/MSSQL | Aceptado |

---

## 🏛️ DETALLE DE DECISIONES

### [ADR-001] Uso de Arquitectura Basada en Agentes (Antigravity)
*   **Status:** Aceptado
*   **Contexto:** Necesitamos gestionar la complejidad de proyectos de software de forma escalable y modular.
*   **Decisión:** Adoptar el sistema de orquestación de Agentes (Factory, Architect, etc.) para segregar responsabilidades.
*   **Consecuencias:** 
    *   (+) Mayor orden y trazabilidad.
    *   (+) Facilidad para escalar el equipo de IAs.
    *   (-) Curva de aprendizaje inicial para la configuración de prompts.

### [ADR-002] Estandarización de Frameworks (referencia histórica)
*   **Status:** Sustituido por ADR-003
*   **Contexto:** Se había documentado Angular 17+ y Node 20 como base; el proyecto real usa Angular 16 y NestJS 10.
*   **Decisión:** Queda como referencia; el stack vigente es el documentado en ADR-003 y en `Tech_Stack.md`.

### [ADR-003] Stack real del workspace (SarigaboMobentis)
*   **Status:** Aceptado
*   **Contexto:** Alineación del IA_MANAGER_TEMPLATE con los proyectos SarigaboMobentis_Back y SarigaboMobentis_Front.
*   **Decisión:** 
    *   **Frontend:** Angular 16.2, Bootstrap 5, Angular Material 16, RxJS 7.8. No se exige Angular 17 ni Signals; el estado se gestiona con servicios y RxJS.
    *   **Backend:** NestJS 10, TypeORM 0.3.20, TypeScript 5.1. Base de datos configurable (MySQL o MSSQL vía `DB_TYPE`); base por defecto `db_rechazos`.
    *   **Validación:** class-validator y class-transformer en DTOs. Documentación API con Swagger; `@ApiTags` en español.
    *   **Nomenclatura BD:** Tablas y columnas en español (heredado del ERP); propiedades en entidades TypeORM en camelCase.
*   **Consecuencias:**
    *   (+) Los agentes usan una única fuente de verdad (Tech_Stack.md, Naming_Conventions.md) alineada con el código existente.
    *   (+) Evita que se propongan Angular 17/Signals o PostgreSQL cuando el proyecto no los usa.

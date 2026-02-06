# ✍️ NAMING CONVENTIONS: ESTÁNDAR SINTÁCTICO

Para asegurar que **{{PROJECT_NAME}}** parezca escrito por una sola entidad, todos los agentes deben seguir estas reglas de nomenclatura sin excepción.

---

## 🏗️ 1. ARCHIVOS Y CARPETAS
- **Componentes Angular:** `kebab-case` (ej. `user-profile.component.ts`, `agents-general.component.ts`). Vista principal de listado por feature: `xxx-general.component.ts`.
- **Modelos/Interfaces Front:** En `app/models/` con sufijo `.model.ts` (ej. `client.model.ts`, `team.model.ts`). Interfaces de entidad con prefijo `I` (ej. `IClient`, `ITeam`).
- **Módulos de routing Front:** Por feature: `xxx-routing.module.ts`; ruta principal de la vista de listado: `path: 'global'`.
- **Servicios/Clases:** `kebab-case` con sufijo descriptivo (ej. `auth.service.ts`, `user.model.ts`, `paginated-client.dto.ts`).
- **Selectores de componentes Angular:** **Obligatorio:** Todo componente Angular con selector de elemento debe usar exclusivamente el prefijo `mobentis-` seguido del nombre en kebab-case. No usar `app-` ni otros prefijos. Ejemplo: `mobentis-clients-general`, `mobentis-agents-table`, `mobentis-total-monthly-sales`.
- **DTOs Back por recurso:** Por cada recurso (ej. client, team): `PaginatedXxxDto` / `CreateXxxDto` / `UpdateXxxDto`; archivos `paginated-xxx.dto.ts`, `create-xxx.dto.ts`, `update-xxx.dto.ts` (siempre sufijo `.dto.ts`).
- **Entidades Back:** `kebab-case` o nombre de entidad (ej. `client.entity.ts`, `team-agent.entity.ts`).
- **Repositorios Back:** `xxx.repository.ts` (ej. `team.repository.ts`, `client-segmentations.repository.ts`). Clase: `XxxRepository`.
- **Carpetas:** `kebab-case` para features (ej. `clients`, `nav-lists`, `settled-sales`). Carpetas internas: `entities`, `dto`, `repositories`.

---

## 💻 2. CÓDIGO (TYPESCRIPT/JAVASCRIPT)
- **Variables y Funciones:** `camelCase` (ej. `getUserById`, `currentPage`, `itemsPerPage`).
- **Clases e Interfaces:** `PascalCase` (ej. `UserEntity`, `PaginatedClientsDto`, `ClientSegmentation`).
- **Constantes y Enums:** `UPPER_SNAKE_CASE` (ej. `MAX_RETRY_ATTEMPTS`).
- **Booleanos:** Prefijo interrogativo (ej. `isActive`, `hasPermission`, `deleted`, `is_team`).
- **Métodos Backend (servicios/repositorios):** `findAll` (lista paginada), `findOne` (por ID), `create`, `update`, `delete`/`remove` (soft delete); `getXWithFilters` para opciones de filtro (ej. `getProvincesWithFilters`). Ver detalle en `Backend_Patterns.md`.
- **Imports:** Orden: NestJS/framework primero; librerías de terceros después; imports locales al final. Agrupar por tipo.
- **Comentarios:** JSDoc en métodos públicos; comentarios en **español**; explicar lógica compleja. Ver `Backend_Patterns.md`.

---

## 🗄️ 3. BASE DE DATOS (MySQL/MSSQL – Proyecto Sarigabo/Mobentis)
En este proyecto las tablas y columnas en BD usan **nombres en español** heredados del ERP. No se usa snake_case inglés en esquema físico.

- **Tablas:** Nombre en español/PascalCase en BD (ej. `Clientes`, `Equipos`, `Usuarios`). En TypeORM: `@Entity('Clientes')`.
- **Columnas:** Nombre en español en BD (ej. `Nombre`, `Cif`, `FechaInsert`, `BajaEnERP`, `IdClienteFabricante`). En TypeORM: `@Column({ name: 'Nombre' })` o `@Column({ name: 'FechaInsert' })`.
- **Propiedades en entidades TypeORM:** Siempre `camelCase` en código (ej. `name`, `tax_name`, `insert_date`, `deleted`, `customer_ERP_id`).
- **Claves foráneas:** Sufijo `_id` en propiedad (ej. `province_id`, `company_id`). Columna en BD puede ser `IdProvinciaOPT`, `IdEmpresaERP`, etc.

---

## 🌐 4. API (REST)
- **Endpoints (rutas):** `kebab-case` (ej. `/clients`, `/nav-lists`, `/settled-sales`, `/team-agents`).
- **Controladores:** `@Controller('clients')` en kebab-case.
- **Documentación Swagger:** `@ApiTags()` en español (ej. `Clientes`, `Equipos`, `Menús`, `Ventas`).
- **Payloads (JSON) y DTOs:** Claves en `camelCase` para coincidir con el frontend (ej. `currentPage`, `itemsPerPage`, `searchTerm`, `selectedFilters`).

---

> [!TIP]
> Si un agente detecta una inconsistencia en el código existente, tiene la obligación de proponer un refactor antes de añadir nueva lógica.

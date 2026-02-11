# 📖 DICCIONARIO DE DOMINIO: VentasCore_IA

Este documento define los términos técnicos y de negocio para asegurar la consistencia en todo el ecosistema de agentes. **Es de obligado cumplimiento y actúa como la Única Fuente de Verdad (SSOT) del proyecto.**

---

## 🏗️ 1. ENTIDADES PRINCIPALES (DATA MODELS)

| Término | Definición | Atributos Clave |
| :--- | :--- | :--- |
| **Cliente** | Cliente de negocio (tabla Clientes). | id, customer_ERP_id, name, tax_name, cif, phone_1, email, address, province_id, city_id, segmentación (1–3), company_ERP_id, insert_date, update_date, deleted, latitude, longitude. |
| **Equipo** | Equipo de ventas (tabla Equipos). | id, team_code, description, team_type_id, company_id, annual_target, is_team, is_external, insert_date, update_date, belt, import_id, canceled, deleted. |
| **Usuario** | Usuario de la plataforma (autenticación y sesión). | id, email, roles, permisos. |
| **Agente** | Agente/vendedor vinculado a equipos. | id, relación con equipo(s). |
| **Menú** | Elemento de menú de navegación. | id, orden, ruta. |
| **Lista navegable (Nav List)** | Lista de navegación configurable. | id, nombre, items. |
| **Filtro / Filtro guardado** | Filtro reutilizable para listados. | id, criterios, usuario. |
| **Agrupación (GroupBy)** | Opción de agrupación en listados. | id, campo, descripción. |
| **Empresa** | Empresa (contexto multi-empresa). | id, código ERP/OPT. |
| **Ámbito (Scope)** | Ámbito de visibilidad o permiso. | id, nombre. |
| **Pedido** | Documento de venta (pedido) para el Importador. | id, tipo documento, número, cliente, agente, fecha, delegación, estado integración, mensaje error integración. |
| **PedidosDetalle** | Línea de detalle de un pedido. | id, pedido_id, referencia, descripción, unidades, precio, descuento, total. |


---

## 💼 2. LÓGICA DE NEGOCIO (BUSINESS RULES)

### Clientes
* **Regla:** Los clientes pueden tener hasta 3 segmentaciones (segmentación 1, 2, 3) vinculadas a ClientSegmentation.
* **Regla:** Identificadores ERP (IdClienteFabricante, IdProvinciaERP, IdPoblacionERP, IdEmpresaERP) se mantienen para sincronización con ERP. OPT = id interno en la BD.

### Equipos y agentes
* **Regla:** Un equipo tiene tipo (team_type_id), empresa (company_id), objetivo anual y puede ser “equipo” o “ajeno” (is_team, is_external). Los agentes se vinculan vía TeamAgent.

### Borrado lógico
* **Regla:** Muchas entidades usan borrado lógico: columna `BajaEnERP` (deleted) o `Anulado` (canceled). No se eliminan filas físicamente sin criterio explícito.

### Paginación y listados
* **Regla:** Los listados paginados se exponen como **POST** `.../list` (ej. `POST /clients/list`), con body tipo `PaginatedXxxDto`. La respuesta debe ser `{ items: T[]; totalItems: number }`.
* **Regla:** El DTO de paginación incluye currentPage, itemsPerPage, searchTerm, selectedFilters, sortColumn, sortDirection y opcionalmente groupBy. Ver patrones detallados en `Backend_Patterns.md`.

---

## 💻 3. GLOSARIO TÉCNICO (STACK & PATTERNS)

* **DTO (Data Transfer Object):** Estructura obligatoria para entrada/salida de API; validación con class-validator y documentación con @ApiProperty.
* **ERP / OPT:** ERP = identificador en sistema externo; OPT = identificador interno en la base de datos (IdXxxOPT).
* **Repository (TypeORM):** Clase que extiende `Repository<Entity>`, inyectada con `@InjectRepository(XxxRepository)`; el servicio delega en el repositorio. En módulo: `TypeOrmModule.forFeature([Entity, XxxRepository])` y `providers: [XxxRepository]`.
* **Guard (NestJS):** Todas las rutas excepto login/auth deben usar `@UseGuards(JwtAuthGuard)`. Controladores con rutas protegidas: `@ApiBearerAuth()` a nivel de clase.
* **authGuard (Angular):** Guard de autenticación en el Front (CanActivate/CanMatch). Si el usuario no está autenticado, redirige a `/login`. Se aplica a rutas bajo `mobentis`.
* **IEntityDataService&lt;T&gt;:** Interfaz para servicios de listado en el Front que exponen `getData(): Observable<{ items: T[]; totalItems: number }>` (alineado con el endpoint POST `.../list` del Back).
* **IEntityTableConfig:** Configuración para la tabla genérica de listado (columnas, acciones, servicio de datos). Usada por componentes `xxx-general`.
* **RxJS:** Gestión de estado y flujos asíncronos en el Front (Angular 16); no se exige Signals en este proyecto.
* **Filtros dinámicos (Back):** Tipos soportados: multi-select (IN), search (LIKE), date (BETWEEN), range (BETWEEN). Estructura: id/campo, valor, tipo. Ver `Backend_Patterns.md`.
* **Query Builder (TypeORM):** Usar para listados dinámicos; filtrar siempre por `deleted`; paginación con limit/offset. Ver `Backend_Patterns.md`.

---

## ⚠️ MANDATOS PARA LOS AGENTES
- **Consistencia:** Si el usuario solicita un cambio que rompa estas definiciones, el agente debe informar del conflicto antes de proceder.
- **Tipado:** Los nombres de variables en el código deben coincidir con los términos de este diccionario.

---

## 📅 SEGUIMIENTO TÉCNICO
*   **Contexto operativo (IA):** Consultar [Contexto_IA.md](./Contexto_IA.md) para el rol de asistencia en BackOffice, estados de integración, leyenda de colores y protocolo de resolución de errores de integración con ERP.
*   **Versionado:** Consultar [Tech_Stack.md](./Tech_Stack.md) para cumplir con las versiones oficiales.
*   **Base de Datos:** Consultar [Historial_DB.md](./Historial_DB.md) para trazabilidad de cambios.
*   **Tablas, columnas y alias de UI:** Consultar [Tablas_Columnas_Alias.md](./Tablas_Columnas_Alias.md) para el detalle de cada tabla y vista, significado de columnas, tipos de dato y etiquetas para pantalla. Si se añade una tabla o un campo nuevo, debe agregarse a la entidad adecuada en ese fichero; si la descripción o función no está clara, solicitar al usuario que la indique.
*   **Estructura de DTOs:** Consultar [DTOs_Estructura.md](./DTOs_Estructura.md) para el catálogo de DTOs del proyecto (propiedades, tipos, módulos).
*   **Mapeo DTO → título en pantalla:** Consultar [DTOs_Titulos_Web.md](./DTOs_Titulos_Web.md) para el mapeo de propiedades de DTO a claves i18n y títulos ES/EN en la web.
*   **Añadir nueva entidad/DTO al sistema:** Cuando el usuario solicite añadir un nuevo DTO o estructura de base de datos, el agente **Experto en Base de Datos (04-DB)** debe actualizar este diccionario (nueva fila en «1. ENTIDADES PRINCIPALES»), [Tablas_Columnas_Alias.md](./Tablas_Columnas_Alias.md), [DTOs_Estructura.md](./DTOs_Estructura.md) e [Historial_DB.md](./Historial_DB.md) antes de que se implemente el código. Ver flujo en `02_AGENTS_REGISTRY/04_DATABASE.md` (sección «Añadir nuevo DTO o entidad al sistema de control»).

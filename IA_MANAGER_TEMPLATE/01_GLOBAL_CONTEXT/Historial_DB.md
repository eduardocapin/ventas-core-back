# 🗄️ HISTORIAL DE CAMBIOS: BASE DE DATOS

Este archivo registra de forma obligatoria cualquier modificación en el esquema de la base de datos de **VentasCore_IA**. El motor es configurable vía `DB_TYPE` (MySQL o MSSQL); la base por defecto es `db_rechazos`. El esquema se refleja en las entidades TypeORM del Back.

---

## 📂 ESTADO ACTUAL DEL ESQUEMA (Tablas/Entidades)

Listado de entidades TypeORM existentes en SarigaboMobentis_Back (tabla física en español cuando aplica):

| Entidad / Tabla | Módulo / Ubicación |
| :--- | :--- |
| Clientes (Client) | clients |
| ClientSegmentation, ClientContact | clients |
| Equipos (Team) | teams |
| TeamAgent | team-agent |
| TeamTypes | team-types |
| Usuarios (User) | users; core/users (sesión, etc.) |
| UserSession, Role, Permission | core/authorization, core/users |
| Config, PasswordChanges, Language, Configuracion, Empresa | core/configuration, core/empresas, core/repositories |
| Agentes (Agent) | agents |
| Product, ProductSegmentation | products |
| Sales | sales |
| SettledSale | settled-sales |
| Reject | rejects |
| Incentive | incentives |
| Menu | menus |
| NavList | nav-lists |
| Filter, SavedFilter | filters |
| GroupByOption | group-by |
| Supplier, SupplierCategory, SupplierCategoryRelation | suppliers, suppliers-category, supplier-category-relation |
| Company | companies |
| Typology (Tipología) | typologys |
| Families | families |
| Competitor, CompetitorSegmentation | competitors |
| Scopes | scopes |
| Report | reports |
| TableName, TableField | import |
| Config, Cities, Status, Salemen, Symbol, Provinces, PasswordChanges | repositories |
| Pedido (Pedidos) | pedidos |
| PedidoDetalle (PedidosDetalle) | pedidos |

Cualquier cambio en columnas, tablas nuevas o migraciones debe registrarse abajo.

---

## 📝 REGISTRO DE MIGRACIONES Y CAMBIOS

| Fecha | Agente | Tipo de Cambio | Descripción |
| :--- | :--- | :--- | :--- |
| **2024-02-04** | AG-VC-04-DB | Inicialización | Creación de la estructura base y este fichero de registro. |
| **2026-02-06** | — | Documentación | Alineación del historial con el estado real de entidades del Back. |
| **2026-02-09** | Plan Importador | Nuevas tablas/entidades | Registro de Pedidos y PedidosDetalle para Importador de Documentos (listado y detalle con líneas). |

---

## 🛠️ INSTRUCCIONES PARA EL AGENTE DE DB
1.  **Antes de cada cambio:** Redactar la propuesta de cambio en este archivo.
2.  **Durante el cambio:** Ejecutar el SQL o la migración de TypeORM (synchronize según criterio del proyecto).
3.  **Después del cambio:** Marcar como completado en la tabla incluyendo el impacto (tablas afectadas).

---

## 📂 DETALLE DE CAMBIOS (APPEND ONLY)

### [2024-02-04] - Estructura Inicial
*   **Autor:** DB Expert
*   **Descripción:** Configuración inicial del proyecto.
*   **SQL/TypeORM:** N/A (Project Template Setup).

### [2026-02-06] - Documentación del estado actual
*   **Autor:** Plan 01_GLOBAL_CONTEXT
*   **Descripción:** Listado de entidades/tablas existentes para SSOT. Sin cambios de esquema.

### [2026-02-09] - Pedidos y PedidosDetalle (Importador de Documentos)
*   **Autor:** Plan Importador
*   **Descripción:** Entidades Pedido y PedidoDetalle para el módulo pedidos: listado paginado (POST pedidos/list) y detalle con líneas (GET pedidos/:id). Tablas: Pedidos, PedidosDetalle. Si las tablas no existen en BD, crear con migración o synchronize según criterio del proyecto.
*   **Tablas afectadas:** Pedidos (nueva), PedidosDetalle (nueva).

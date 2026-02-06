# 🗄️ HISTORIAL DE CAMBIOS: BASE DE DATOS

Este archivo registra de forma obligatoria cualquier modificación en el esquema de la base de datos de **{{PROJECT_NAME}}**. El motor es configurable vía `DB_TYPE` (MySQL o MSSQL); la base por defecto es `db_rechazos`. El esquema se refleja en las entidades TypeORM del Back.

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

Cualquier cambio en columnas, tablas nuevas o migraciones debe registrarse abajo.

---

## 📝 REGISTRO DE MIGRACIONES Y CAMBIOS

| Fecha | Agente | Tipo de Cambio | Descripción |
| :--- | :--- | :--- | :--- |
| **2024-02-04** | AG-{{PROJECT_CODE}}-04-DB | Inicialización | Creación de la estructura base y este fichero de registro. |
| **{{CURRENT_DATE}}** | — | Documentación | Alineación del historial con el estado real de entidades del Back. |

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

### [{{CURRENT_DATE}}] - Documentación del estado actual
*   **Autor:** Plan 01_GLOBAL_CONTEXT
*   **Descripción:** Listado de entidades/tablas existentes para SSOT. Sin cambios de esquema.

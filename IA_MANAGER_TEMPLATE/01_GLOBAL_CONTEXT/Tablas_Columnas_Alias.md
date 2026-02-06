# Tablas, vistas, columnas y alias de UI

Este documento es la **única fuente de verdad** para el detalle de cada tabla y vista de las **entidades principales** del sistema: descripción, significado de columnas, **tipo de dato** y **alias para pantalla**. Se usa en Backend (DTOs, Swagger), Frontend (cabeceras, formularios, mensajes) y en documentación.

**Entidades principales:** Las definidas en [Diccionario.md](./Diccionario.md), sección «1. ENTIDADES PRINCIPALES»: **Cliente**, **Equipo**, **Usuario**, **Agente**, **Menú**, **Lista navegable**, **Filtro**, **Agrupación**, **Empresa**, **Ámbito**.

**Relación con otros documentos:** Las entidades de alto nivel y reglas de negocio están en [Diccionario.md](./Diccionario.md). Los cambios de esquema se registran en [Historial_DB.md](./Historial_DB.md).

---

## Mantenimiento del fichero

- **Añadir nuevo DTO/entidad al sistema:** Cuando el usuario solicite **añadir un nuevo DTO o estructura de base de datos** al proyecto, el agente **Experto en Base de Datos (04-DB)** es responsable del flujo «Añadir nuevo DTO/entidad al sistema de control»: debe actualizar este fichero (nueva subsección en «1. Tablas» con columnas, tipos y alias), [Diccionario.md](./Diccionario.md) (ENTIDADES PRINCIPALES) e [Historial_DB.md](./Historial_DB.md). Ver `02_AGENTS_REGISTRY/04_DATABASE.md`.
- **Tabla o vista nueva:** Añadirla en la sección correspondiente (Tablas o Vistas), con descripción, alias de pantalla y listado de columnas (campo, tipo, significado, alias). Si la función o descripción no está clara, **solicitar al usuario** que la indique.
- **Campo nuevo en una entidad existente:** Añadir la fila en la tabla de columnas de esa entidad. Incluir tipo de dato, significado y alias para pantalla. Si el significado o la función del campo no se pueden identificar, **solicitar al usuario** que los defina.
- **Regla para agentes:** Si no se puede identificar claramente la función, la descripción de un campo o la descripción de una tabla/vista, esta información **debe ser solicitada al usuario** antes de documentar o asumir un valor.

Al registrar cambios de esquema en `Historial_DB.md`, comprobar que este fichero esté actualizado (nueva tabla/vista o nuevos campos reflejados aquí).

---

## Tipos de datos de referencia

| Tipo en documento | Descripción | Ejemplos en BD / DTO |
| :--- | :--- | :--- |
| **int** | Entero | Id, IdProvinciaOPT, IdEmpresaOPT |
| **string** | Texto (longitud variable) | varchar, nvarchar, length en column |
| **decimal** | Número con decimales | decimal(precision, scale), ObjetivoAnual, Latitud |
| **boolean** | Verdadero/Falso | bit → deleted, is_team, Anulado |
| **date** / **datetime** | Fecha o fecha y hora | FechaInsert, FechaUpdate, datetime |
| **json** | Objeto o array serializado | (si aplica en el proyecto) |

En TypeORM: `type: 'int'`, `type: 'bit'`, `type: 'decimal'`, `type: 'datetime'`, etc. En DTOs/API se usan equivalentes (number, string, boolean, Date).

---

## 1. Tablas (entidades principales)

Para cada tabla: **Nombre técnico (tabla BD)**, **Descripción**, **Alias en pantalla** y **Columnas** (Campo BD/DTO | Tipo | Significado | Alias en pantalla).

---

### 1.1 Cliente (módulo clients)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Clientes |
| **Entidad** | Client |
| **Descripción** | Cliente de negocio. Sincronizable con ERP; identificadores ERP y OPT. |
| **Alias en pantalla** | Clientes |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| id | int | Identificador interno (PK) | ID |
| IdClienteFabricante / customer_ERP_id | string | Identificador del cliente en el ERP | Cód. ERP |
| Nombre / name | string | Nombre comercial | Nombre |
| NombreFiscal / tax_name | string | Razón social o nombre fiscal | Nombre fiscal |
| Cif / cif | string | CIF o NIF fiscal | CIF/NIF |
| Telefono / phone_1 | string | Teléfono principal | Teléfono |
| Telefono2 / phone_2 | string | Teléfono secundario | Teléfono 2 |
| Mail / email | string | Correo electrónico | Email |
| Direccion / address | string | Dirección postal | Dirección |
| IdProvinciaOPT / province_id | int | ID de provincia (OPT) | Id. provincia |
| Provincia / province | string | Nombre de provincia | Provincia |
| IdPoblacionOPT / city_id | int | ID de población (OPT) | Id. población |
| Poblacion / city | string | Nombre de población/ciudad | Población |
| IdSegmentacion1ERP, 2, 3 (segmentación_1, 2, 3) | (relación) | Segmentaciones 1 a 3 del cliente | Segmentación 1 / 2 / 3 |
| IdEmpresaERP / company_ERP_id | string | Identificador empresa en ERP | Cód. empresa ERP |
| FechaInsert / insert_date | datetime | Fecha de alta del registro | Fecha alta |
| FechaUpdate / update_date | datetime | Fecha de última actualización | Fecha actualización |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |
| Latitud / latitude | decimal | Coordenada latitud | Latitud |
| Longitud / longitude | decimal | Coordenada longitud | Longitud |

---

### 1.2 Equipo (módulo teams)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Equipos |
| **Entidad** | Team |
| **Descripción** | Equipo de ventas. Vinculado a tipo de equipo, empresa y objetivo anual; puede ser equipo propio o ajeno. |
| **Alias en pantalla** | Equipos |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| IdEquipoERP / team_code | string | Código del equipo en ERP | Código equipo |
| Descripcion / description | string | Descripción del equipo | Descripción |
| IdTipoEquipoOPT / team_type_id | int | ID del tipo de equipo (OPT) | Tipo equipo |
| IdTipoEquipoERP / team_type_code | string | Código tipo equipo en ERP | Cód. tipo ERP |
| IdEmpresaOPT / company_id | int | ID de empresa (OPT) | Empresa |
| IdEmpresaERP / company_code | string | Código empresa en ERP | Cód. empresa ERP |
| ObjetivoAnual / annual_target | decimal | Objetivo anual del equipo | Objetivo anual |
| EsEquipo / is_team | boolean | Indica si es equipo propio | Es equipo |
| EsAjeno / is_external | boolean | Indica si es ajeno | Es ajeno |
| FechaInsert / insert_date | datetime | Fecha de alta | Fecha alta |
| FechaUpdate / update_date | datetime | Fecha de actualización | Fecha actualización |
| Cinturon / belt | string | Cinturón (clasificación) | Cinturón |
| IdImportacion / import_id | int | ID de la importación | Id. importación |
| FechaImportacion / import_date | datetime | Fecha de importación | Fecha importación |
| Anulado / canceled | boolean | Registro anulado | Anulado |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |

---

### 1.3 Usuario (módulo users)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | UsuariosWeb |
| **Entidad** | User |
| **Descripción** | Usuario de la plataforma (autenticación y sesión). Vinculado a roles, permisos y empresas. |
| **Alias en pantalla** | Usuarios |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| Nombre / name | string | Nombre del usuario | Nombre |
| Email / email | string | Correo electrónico (único) | Email |
| Password / password | string | Contraseña (hash) | Contraseña |
| Cargo / position_company | string | Cargo en la empresa | Cargo |
| FechaUpdate / update_date | datetime | Fecha de última actualización | Fecha actualización |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |
| Imagen / image | string | Ruta o URL de imagen | Imagen |
| Idioma / idioma | string | Código de idioma | Idioma |
| roles | (relación) | Roles asignados | Roles |
| permissions | (relación) | Permisos asignados | Permisos |
| empresas | (relación) | Empresas asignadas | Empresas |

---

### 1.4 Agente (módulo agents)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Agentes |
| **Entidad** | Agents |
| **Descripción** | Agente/vendedor vinculado a equipos. |
| **Alias en pantalla** | Agentes |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| IdEmpresa / company_id | int | ID de empresa | Empresa |
| CodigoAgenteERP / agent_code | string | Código del agente en ERP | Código agente |
| Nombre / name | string | Nombre del agente | Nombre |
| Email / email | string | Correo electrónico | Email |
| Telefono / phone | string | Teléfono | Teléfono |
| Salario / salary | decimal | Salario | Salario |
| IdEmpresaERP / company_code | string | Código empresa en ERP | Cód. empresa ERP |
| FechaInsert / insert_date | datetime | Fecha de alta | Fecha alta |
| FechaUpdate / update_date | datetime | Fecha de actualización | Fecha actualización |
| ModoVenta / sales_mode | string | Modo de venta | Modo venta |
| Actividad / activity | string | Actividad | Actividad |
| DiasHabiles / working_days | int | Días hábiles | Días hábiles |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |
| IdProvincia / province_id | int | ID provincia | Id. provincia |
| Provincia / province | string | Nombre provincia | Provincia |
| IdPoblacion / city_id | int | ID población | Id. población |
| Poblacion / city | string | Nombre población | Población |

---

### 1.5 Menú (módulo menus)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Objetivos_Menu |
| **Entidad** | MenuItem |
| **Descripción** | Elemento de menú de navegación. |
| **Alias en pantalla** | Menú |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| IdMenu / menu_id | int | ID de menú | Id. menú |
| IdMenuPadre / parent_menu_id | int | ID menú padre (submenú) | Menú padre |
| Icono / icon | string | Icono (clase o ruta) | Icono |
| Etiqueta / label | string | Texto visible del menú | Etiqueta |
| Ruta / route | string | Ruta de navegación | Ruta |
| TieneSubMenu / has_submenu | boolean | Tiene submenú | Tiene submenú |
| Idioma / language | string | Código idioma | Idioma |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |

---

### 1.6 Lista navegable (módulo nav-lists)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Objetivos_TextosEnlaces |
| **Entidad** | ListItem (Nav List) |
| **Descripción** | Lista de navegación configurable (enlaces, textos). |
| **Alias en pantalla** | Lista navegable |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| Id_Contenedor / container_id | int | ID del contenedor | Id. contenedor |
| Entidad / container_entity | string | Entidad del contenedor | Entidad |
| Etiqueta / label | string | Etiqueta del enlace | Etiqueta |
| Descripcion / description | string | Descripción | Descripción |
| Tipo / type | string | Tipo de elemento | Tipo |
| Ruta / route | string | Ruta del enlace | Ruta |
| FuncionPopup / popup_function_name | string | Función popup | Función popup |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |
| Idioma / idioma | string | Código idioma | Idioma |

---

### 1.7 Filtro (módulo filters)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Objetivos_Filtros |
| **Entidad** | Filter |
| **Descripción** | Filtro reutilizable para listados (configuración de filtros por componente). |
| **Alias en pantalla** | Filtros |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| Componente / component_id | string | Identificador del componente | Componente |
| CampoFiltrado / field | string | Campo a filtrar | Campo filtrado |
| Tipo / type | string | Tipo de filtro | Tipo |
| Titulo / title | string | Título del filtro | Título |
| OrigenDeDatos / options_endpoint | string | Origen de datos (endpoint) | Origen datos |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |

---

### 1.8 Agrupación (módulo group-by)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Objetivos_Agrupaciones |
| **Entidad** | GroupByOption |
| **Descripción** | Opción de agrupación en listados. |
| **Alias en pantalla** | Agrupación |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / id | int | Identificador interno (PK) | ID |
| Componente / componentId | string | Identificador del componente | Componente |
| Nombre / name | string | Nombre de la agrupación | Nombre |
| Campo / field | string | Campo por el que agrupar | Campo |
| OrigenDeDatos / endpoint | string | Origen de datos (endpoint) | Origen datos |
| CampoOcultar / hideField | string | Campo a ocultar | Campo ocultar |
| OrdenVisualizacion / displayOrder | int | Orden de visualización | Orden |
| BajaEnERP / deleted | boolean | Borrado lógico | Baja |
| FechaInsert / createdAt | datetime | Fecha de alta | Fecha alta |
| FechaUpdate / updatedAt | datetime | Fecha de actualización | Fecha actualización |

---

### 1.9 Empresa (módulo companies)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Empresas |
| **Entidad** | Company |
| **Descripción** | Empresa (contexto multi-empresa). |
| **Alias en pantalla** | Empresas |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| Id / company_id | int | Identificador interno (PK) | ID |
| NombreEmpresa / company_name | string | Nombre de la empresa | Nombre empresa |
| BAJAENERP / deleted | boolean | Borrado lógico | Baja |

---

### 1.10 Ámbito (módulo scopes)

| Concepto | Valor |
| :--- | :--- |
| **Tabla BD** | Ambitos |
| **Entidad** | Scope |
| **Descripción** | Ámbito de visibilidad o permiso. |
| **Alias en pantalla** | Ámbitos |

**Columnas:**

| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |
| :--- | :--- | :--- | :--- |
| IdAmbito / id | int | Identificador interno (PK) | ID |
| Descrip / description | string | Descripción del ámbito | Descripción |

---

## 2. Vistas

Si el proyecto utiliza **vistas** de base de datos (o entidades TypeORM mapeadas a vistas), documentarlas aquí con la misma estructura: nombre técnico, descripción, alias en pantalla y columnas (Campo | Tipo | Significado | Alias en pantalla). Si la función o descripción no está clara, **solicitar al usuario** que la indique.

*(No hay vistas documentadas aún. Añadir una subsección por cada vista cuando existan.)*

---

## Resumen para agentes

- **Backend:** Al crear o modificar entidades/DTOs de las entidades principales, usar este fichero para tipos de dato, nombres y alias; documentar en Swagger con el alias cuando ayude.
- **Frontend:** Usar los "Alias en pantalla" para cabeceras de tabla, etiquetas de formulario y mensajes.
- **Base de datos:** Al añadir tabla o columna a una entidad principal, actualizar este fichero y, si falta descripción o función, pedirla al usuario.

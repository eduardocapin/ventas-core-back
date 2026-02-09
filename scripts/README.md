# Scripts del backend

## sync-schema-to-docs

Script de introspección del esquema de base de datos que actualiza los documentos del sistema de control (SSOT) del IA_MANAGER_TEMPLATE, para que las entidades queden documentadas sin que el usuario tenga que aportar el esquema a mano.

### Propósito

- Conectar a la BD con las mismas variables de entorno que el backend.
- Consultar `information_schema` (tablas y columnas).
- **Añadir solo** tablas o columnas que aún no existan en `IA_MANAGER_TEMPLATE/01_GLOBAL_CONTEXT/Tablas_Columnas_Alias.md`.
- Opcionalmente actualizar `Diccionario.md` (nueva entidad por tabla nueva) e `Historial_DB.md` (registro de la ejecución).

No se sobrescribe texto manual: Significado y Alias en pantalla de columnas ya documentadas se mantienen. Lo nuevo se rellena con "(revisar)" para que el usuario o el agente DB lo completen.

### Requisitos

- Ejecutar desde la raíz del backend (`ventas-core-back`).
- Archivo `.env` en la raíz con: `DB_TYPE`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`.
- `DB_TYPE`: `mysql` o `mssql` (según el motor).
- BD accesible desde la máquina donde se ejecuta el script.

### Comandos

```bash
npm run db:sync-docs
```

Escribe en `IA_MANAGER_TEMPLATE/01_GLOBAL_CONTEXT/` los cambios (Tablas_Columnas_Alias.md y, si hay tablas nuevas, Diccionario.md e Historial_DB.md).

```bash
npm run db:sync-docs:dry
```

Ejecuta el mismo flujo pero **no escribe** en disco; solo imprime en consola qué haría (dry-run).

### Comportamiento de merge

- **Tablas ya en Tablas_Columnas_Alias.md:** Se mantiene el bloque tal cual. Si la BD tiene columnas que no están en el documento, se **añaden** filas al final de la tabla de columnas de esa entidad, con Tipo mapeado desde el tipo de BD y Significado/Alias "(revisar)".
- **Tablas en la BD que no están en el documento:** Se genera un bloque completo (Tabla BD, Entidad, Descripción y Alias "(revisar)", y tabla de columnas con tipos mapeados y Significado/Alias "(revisar)").
- **Tablas solo en el documento (no en la BD):** Se conservan; el script no las elimina.
- **Diccionario.md:** Solo se añaden filas nuevas en la tabla «1. ENTIDADES PRINCIPALES» para tablas que aún no tengan un Término asociado (por convención, el Término se deriva del nombre de tabla, p. ej. Pedidos → Pedido).
- **Historial_DB.md:** Se inserta una fila en «REGISTRO DE MIGRACIONES Y CAMBIOS» en cada ejecución (Fecha, Agente "Script sync-schema-to-docs", Tipo "Documentación", Descripción indicando tablas afectadas y que no hay cambios de esquema físico).

### Convención nombre de entidad

Para tablas nuevas sin entrada previa en el documento, el script deriva el nombre de **Entidad** del nombre de tabla: singularizando y PascalCase (ej. Pedidos → Pedido, PedidosDetalle → PedidosDetalle se mantiene). Puedes corregir manualmente en Tablas_Columnas_Alias.md después de ejecutar el script.

### Documentación relacionada

- `IA_MANAGER_TEMPLATE/DOCS/AGENTES_BD_Y_DTOs.md`: Opción C implementada e integración con el flujo "generar todo para la entidad X".

# Por qué los agentes no pueden acceder a la BD y generar DTOs solo con el nombre de la entidad

Este documento explica la razón por la que los agentes **no tienen acceso directo a la base de datos** y **no pueden generar por sí solos** entidades, DTOs y código a partir únicamente del nombre de una entidad (por ejemplo "Pedidos" o "PedidosDetalle"), y qué se necesita para que el flujo funcione.

---

## 1. Los agentes no tienen conexión a la base de datos

- Los agentes (incluido el Experto en Base de Datos, AG-VC-04-DB) **no disponen de conexión en vivo** a la base de datos del proyecto.
- No pueden ejecutar `DESCRIBE tabla`, `SELECT * FROM information_schema`, ni ninguna consulta de introspección al esquema.
- Por tanto, **no pueden descubrir automáticamente** nombres de tablas, columnas, tipos, claves foráneas ni relaciones a partir solo del nombre de la entidad.

Por eso, "generar DTOs y todo lo necesario teniendo el nombre de la entidad" **no es posible** si la entidad no está ya documentada en el sistema de control (ver siguiente apartado).

---

## 2. Sistema de control documental (SSOT)

El proyecto usa un **sistema de control documental** como única fuente de verdad para el modelo de datos:

| Documento | Contenido |
|-----------|-----------|
| **Diccionario.md** | Entidades principales: término, definición, atributos clave. |
| **Tablas_Columnas_Alias.md** | Detalle por tabla: columnas BD/DTO, tipo, significado, alias en pantalla. |
| **Historial_DB.md** | Registro de cambios de esquema (migraciones, nuevas tablas/columnas). |

- El **Backend** tiene instrucciones explícitas (en `02_AGENTS_REGISTRY/03_BACKEND.md`): antes de crear un endpoint o entidad, debe **comprobar en Diccionario.md** que la entidad exista. Si no existe, debe solicitar que primero se añada al sistema de control (vía agente DB).
- El **Experto en Base de Datos (AG-VC-04-DB)** no "lee" la BD; **actualiza estos tres documentos** cuando el usuario solicita añadir un nuevo DTO/entidad. Si la descripción o los campos no están claros, el agente DB **solicita al usuario** que los indique (nombre de tabla, columnas, tipos, significado).

Por tanto, la capacidad de "generar DTOs y todo lo necesario" **depende de que la entidad esté ya definida** en Diccionario.md y Tablas_Columnas_Alias.md (con nombres de tabla, columnas y tipos). A partir de ahí, el Backend puede implementar entidad TypeORM, DTOs, módulo, repositorio, controlador y servicio.

---

## 3. Qué se necesita para generar DTOs y código a partir del nombre de la entidad

Para que los agentes puedan "generar ellos los DTOs y todas las cosas que se necesitan teniendo el nombre de la entidad":

1. **Opción A – Entidad ya documentada**  
   Si la entidad (por ejemplo **Pedidos**, **PedidosDetalle**) ya está registrada en:
   - Diccionario.md (sección «1. ENTIDADES PRINCIPALES»),
   - Tablas_Columnas_Alias.md (tabla y columnas con tipos y alias),
   - y el cambio está reflejado en Historial_DB.md,  
   entonces el **Backend** puede implementar entidad, DTOs, list/detalle y filtros usando solo esos documentos, sin acceso a la BD.

2. **Opción B – Entidad nueva o no documentada**  
   Si la entidad **no** está en el sistema de control:
   - El **Manager** debe delegar primero en **AG-VC-04-DB** (Experto en Base de Datos).
   - El agente DB debe **solicitar al usuario el esquema** (vía principal): nombre de tabla, columnas con tipo y, si puede, significado y nombre de visualización de cada campo. El usuario puede pegar un CREATE TABLE, un listado de columnas o exportar desde su herramienta de BD. Alternativamente, si la BD está accesible, el usuario puede ejecutar el script de introspección (ver opción C).
   - Tras actualizar Diccionario.md, Tablas_Columnas_Alias.md e Historial_DB.md, el agente DB indica que se puede proceder con la implementación; el **Backend** genera entonces entidad, DTOs y API a partir de esos documentos. El documento Tablas_Columnas_Alias es la fuente de esquema y de nombres de visualización (columna "Alias en pantalla").

3. **Opción C – Alternativa: script de introspección de BD**  
   Si la BD está configurada y accesible, existe una herramienta (fuera del agente) que consulta el esquema real y actualiza el sistema de control:
   - **Script:** `scripts/sync-schema-to-docs.ts` (en la raíz del backend).
   - **Comando:** Desde la raíz del backend (ruta en `paths.config.json` → `backend_path`), ejecutar `npm run db:sync-docs`. Opción `npm run db:sync-docs:dry` para ver qué se generaría sin escribir (dry-run).
   - **Requisitos:** Variables de entorno del backend (`.env` con `DB_TYPE`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`). Soporta MySQL y MSSQL.
   - **Comportamiento:** El script conecta a la BD, consulta `information_schema` (tablas y columnas), y **solo añade** tablas o columnas que aún no estén en Tablas_Columnas_Alias.md; no sobrescribe el texto manual (Significado, Alias en pantalla). Para tablas/columnas nuevas usa placeholders "(revisar)". Actualiza también Diccionario.md (nueva fila en «1. ENTIDADES PRINCIPALES» por cada tabla nueva) e Historial_DB.md (registro de la ejecución).
   - **Flujo recomendado:** El usuario ejecuta `npm run db:sync-docs` cuando tenga la BD accesible; revisa o edita los "(revisar)" si lo desea. A partir de entonces puede pedir "generar todo para la entidad X" y el agente Entity-to-Stack encontrará la entidad en el sistema de control sin tener que pedir el esquema al usuario.

---

## 4. Resumen

| Pregunta | Respuesta |
|----------|-----------|
| ¿Por qué los agentes no pueden acceder a la BD? | No tienen conexión ni capacidad de introspección al motor de base de datos. |
| ¿Por qué no pueden generar DTOs solo con el nombre de la entidad? | Porque el esquema (tablas, columnas, tipos) no se deduce del nombre; debe estar en Diccionario.md y Tablas_Columnas_Alias.md o ser proporcionado por el usuario. |
| ¿Qué deben hacer para poder "generar todo" a partir del nombre? | Que la entidad esté registrada en el sistema de control (Diccionario, Tablas_Columnas_Alias, Historial_DB). Si no lo está, primero AG-VC-04-DB debe actualizar esos documentos con la información de esquema (solicitada al usuario o obtenida de código/documentos existentes). |

Este documento debe ser tenido en cuenta por el Manager al delegar tareas de "añadir entidad/DTO" o "crear CRUD/API para la entidad X": asegurarse de que el flujo DB → documentos → Backend se respete y que el agente DB solicite al usuario la información de esquema cuando no esté ya en el sistema de control.

---

## 5. Flujo automatizado: "Entidad → DTO + full-stack"

Para solicitudes del tipo **"generar todo para la entidad X"** o **"entidad X a full-stack"**, existe un flujo orquestado que garantiza la generación completa de todos los artefactos necesarios:

- **Agente responsable:** **AG-VC-10-ENTITY-STACK** (Generador Entidad-FullStack). Ver definición en `02_AGENTS_REGISTRY/10_ENTITY_FULLSTACK.md`.
- **Flujo:** El agente Entity-to-Stack verifica que la entidad esté en el sistema de control (delegando en AG-VC-04-DB si falta), construye una checklist explícita de todos los artefactos Backend y Frontend, y delega en los agentes especializados (Backend y Frontend) con esa checklist como contrato de tarea. Esto asegura que no se olvide ningún artefacto ni paso de wiring (app.module, app-routing, etc.).
- **Ventaja:** Un único punto de entrada para el usuario que garantiza la generación completa de DTOs, código Backend, código Frontend y todos los enlaces necesarios.

El agente **AG-VC-04-DB** sigue siendo el responsable de dejar la entidad documentada en el sistema de control (Diccionario.md, Tablas_Columnas_Alias.md, Historial_DB.md); el agente Entity-to-Stack coordina el flujo completo una vez que la entidad está documentada (o solicita al DB que la documente primero si falta).

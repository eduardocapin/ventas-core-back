# ⚙️ PATRONES Y NORMAS BACKEND

Este documento complementa `Reglas_Generales.md` y `02_AGENTS_REGISTRY/03_BACKEND.md` con patrones técnicos detallados para el Backend. Es de cumplimiento obligatorio para el Agente Backend y para cualquier agente que modifique código en el Backend del workspace. La ruta del Backend está en `00_CORE_MANAGER/paths.config.json` (clave `backend_path`).

---

## 📂 ESTRUCTURA DE CARPETAS (src/)

Estructura estándar del proyecto Back:

- **Módulos de dominio:** `agents/`, `clients/`, `products/`, `sales/`, `teams/`, `companies/`, `users/`, etc. Cada uno con `dto/`, `entities/`, `repositories/`, `*.controller.ts`, `*.service.ts`, `*.module.ts`.
- **Sistemas transversales:** `filters/` (filtros dinámicos), `group-by/` (agrupación).
- **Compartidos:** `guards/` (autenticación/autorización), `middleware/`, `repositories/` (repositorios compartidos), `shared/` (utilidades).
- **Core:** `core/` (usuarios, autorización, configuración, empresas, etc.). No modificar sin criterio; ver `AI_Safety_Guardrails.md`.
- **Raíz:** `app.module.ts`, `main.ts`.

---

## 🌐 CONFIGURACIÓN GLOBAL

- **Prefijo de rutas:** Todas las rutas tienen prefijo **/api** (configurado en `main.ts` o módulo raíz).
- **Swagger:** Documentación disponible en **/api/docs**.
- **Validación:** `ValidationPipe` habilitado globalmente con transformación automática de tipos.
- **Autenticación:** Endpoints protegidos con `@UseGuards(JwtAuthGuard)`; token JWT en header `Authorization: Bearer <token>`; Swagger con `@ApiBearerAuth()`.

---

## 📝 LOGGING

- **Herramienta:** Winston con nest-winston y winston-daily-rotate-file.
- **Ubicación:** Logs en carpeta `logs/` (ej. `logs/YYYY-MM-DD-*.txt`).
- **Rotación:** Diaria; retención y compresión según configuración del proyecto (ej. 14 días, compresión de logs antiguos).

---

## 📄 1. PATRÓN DE PAGINACIÓN

Todas las listas deben soportar:

- **Campos del DTO de paginación:** `currentPage`, `itemsPerPage`, `sortColumn`, `sortDirection`, `searchTerm`, `selectedFilters`, y opcionalmente `groupBy`.
- **Respuesta obligatoria:** `{ items: Entity[]; totalItems: number }`.
- **Endpoint:** **POST** `.../list` con body tipo `PaginatedXxxDto`. Documentar con `@ApiBody({ type: PaginatedXxxDto })`.

---

## 🔍 2. PATRÓN DE FILTROS DINÁMICOS

Sistema de filtros flexible para listados:

- **Tipos de filtros soportados:**
  - `multi-select`: array de valores (cláusula IN).
  - `search`: búsqueda tipo LIKE.
  - `date`: rango de fechas (BETWEEN).
  - `range`: rango numérico (BETWEEN).

- **Estructura de filtro (FilterDto o equivalente en selectedFilters):**
  - `id` (o nombre del campo): identificador del filtro.
  - `valor`: valor del filtro (puede ser array, string, número o rango).
  - `tipo`: tipo de filtro (`multi-select`, `search`, `date`, `range`).

- **Opciones de filtro:** Implementar métodos en repositorio tipo `getXWithFilters()` que retornen opciones para dropdowns en formato `{ id: value, name: label }[]` (o equivalente).

---

## 🗃️ 3. PATRÓN DE QUERY BUILDER

Usar **Query Builder de TypeORM** para consultas complejas o dinámicas:

- **Base:** `this.createQueryBuilder('alias')` en el repositorio.
- **Borrado lógico:** Siempre incluir condición `(alias.deleted = 0 OR alias.deleted IS NULL)` (o el nombre real del campo en la entidad, ej. `BajaEnERP` mapeado a `deleted`).
- **Condiciones dinámicas:** Aplicar filtros con `.andWhere()` según `selectedFilters`, `searchTerm`, etc.
- **Ordenación:** `.orderBy('alias.campo', sortDirection)`.
- **Paginación:** `.limit(itemsPerPage)` y `.offset((currentPage - 1) * itemsPerPage)`.
- **Conteo:** Usar una query separada o `.getCount()` para `totalItems`.

---

## 🛡️ 4. PATRÓN DE MANEJO DE ERRORES EN CONTROLADORES

Siempre usar try-catch en controladores:

```typescript
try {
  return await this.service.metodo();
} catch (error) {
  if (error instanceof HttpException) {
    throw error;
  }
  throw new HttpException(
    { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
```

- Recurso no encontrado: `throw new HttpException('X no encontrado', HttpStatus.NOT_FOUND)`.

---

## 📅 5. PATRÓN DE FORMATEO DE DATOS

Formatear datos en **servicios** antes de enviar al cliente cuando aplique:

- **Fechas:** Formato legible según contexto: `dd/MM/yy` en listados, `dd/MM/yyyy` en detalle. En API/intercambio usar ISO 8601 (UTC).
- **Números:** Formato de moneda o decimal cuando corresponda.
- **Booleanos:** Convertir a valores legibles si el contrato lo exige (ej. "Sí"/"No" en exports).

---

## 📦 6. PATRÓN DE DTOs

- **Por operación:** `PaginatedXxxDto` (listados), `CreateXxxDto` (creación), `UpdateXxxDto` (actualización).
- **Validación:** class-validator en todos los DTOs de entrada.
- **Documentación:** `@ApiProperty()` en cada propiedad para Swagger.

---

## 📁 7. PATRÓN DE MÓDULOS

Cada módulo de dominio sigue esta estructura estándar:

1. **Module** (`*.module.ts`): Define imports, controllers, providers y exports.
2. **Controller** (`*.controller.ts`): Maneja rutas HTTP y decoradores Swagger (`@ApiTags`, `@ApiOperation`, `@ApiResponse`, etc.).
3. **Service** (`*.service.ts`): Contiene la lógica de negocio; delega acceso a datos en el repositorio.
4. **Entity** (`entities/*.entity.ts`): Define el modelo de datos con TypeORM; nombres de columnas con `@Column({ name: 'NombreColumna' })`.
5. **DTO** (`dto/*.dto.ts`): Objetos de transferencia con validaciones (class-validator) y `@ApiProperty()`.
6. **Repository** (`repositories/*.repository.ts`): Extiende `Repository<Entity>` para queries personalizadas con Query Builder.

Además: importar `TypeOrmModule.forFeature([Entity, XxxRepository])`; declarar Controller y Service; **exportar el Repository** si se usa en otros módulos; importar módulos dependientes.

---

## 📥 8. CONVENCIONES DE IMPORTS

- **Orden:** Imports de NestJS primero; imports de terceros después; imports locales al final.
- **Agrupación:** Agrupar por tipo (framework, librerías, relativos) y separar con una línea en blanco si mejora la legibilidad.

---

## 💬 9. COMENTARIOS

- **JSDoc** para métodos públicos de servicios y repositorios (descripción, parámetros, retorno cuando ayude).
- **Idioma:** Comentarios en **español**.
- **Lógica compleja:** Explicar en comentarios la intención de algoritmos o condiciones no obvias.

---

## 📛 10. NOMBRES DE MÉTODOS (BACKEND)

- `findAll` (o equivalente que reciba DTO): obtener lista paginada/filtrada.
- `findOne`: obtener por ID.
- `create`: crear nuevo registro.
- `update`: actualizar existente.
- `delete` / `remove`: eliminar (preferiblemente soft delete).
- `getXWithFilters`: obtener opciones para filtros (ej. `getProvincesWithFilters()`).

---

## ✅ 11. VALIDACIONES

- **DTOs:** Validar con decoradores de class-validator; usar class-transformer cuando aplique.
- **Servicios:** Validar reglas de negocio en la capa de servicio.
- **Errores HTTP:** Retornar 400 (Bad Request) para validación fallida, 404 para recurso no encontrado.

---

## 🗑️ 12. SOFT DELETE

- **Filtro obligatorio:** En todas las queries de listado y búsqueda, filtrar por `(deleted = 0 OR deleted IS NULL)` (o el nombre de columna real, ej. `BajaEnERP`).
- **Eliminación:** No eliminar filas físicamente; solo marcar como eliminado (campo `deleted` tipo bit con default `0`, o equivalente en el esquema).

---

## 📆 13. FECHAS EN ENTIDADES

- **Campos estándar:** Incluir `insert_date` y `update_date` (o equivalentes mapeados del esquema) en todas las entidades con auditoría.
- **Tipo:** `datetime` nullable según esquema; en TypeORM mapear según `Historial_DB.md` y nomenclatura del proyecto.
- **Actualización:** En operaciones de update, actualizar siempre `update_date`.

---

## 🌐 14. RESPUESTAS HTTP

- **200:** Éxito (GET, PATCH, etc.).
- **201:** Creado (POST que crea recurso).
- **400:** Bad Request (validación fallida).
- **401:** Unauthorized.
- **403:** Forbidden.
- **404:** Not Found (recurso no encontrado).
- **500:** Internal Server Error (errores no controlados, con mensaje genérico al cliente).

---

## 🔒 15. MEJORAS PRÁCTICAS: SEGURIDAD Y RENDIMIENTO

- **Seguridad:** Validar todos los inputs; usar parámetros tipados (ParseIntPipe); sanitizar datos de entrada; autenticación (JwtAuthGuard) en todos los endpoints protegidos.
- **Rendimiento:** Usar índices en campos de búsqueda frecuente; paginar siempre las listas; optimizar queries con `select` específicos cuando sea necesario; evitar N+1 con relaciones apropiadas (eager/join según caso).

---

## 📐 ESTRUCTURA DE REFERENCIA (CÓDIGO)

### Controlador

- `@ApiTags('NombreEntidad')`, `@Controller('ruta')`, `@ApiBearerAuth()` a nivel de clase.
- Endpoints con `@UseGuards(JwtAuthGuard)`; `@Post('list')` con `@ApiBody({ type: PaginatedXxxDto })`; try-catch y manejo de HttpException/500.

### Servicio

- `@Injectable()`; constructor con `@InjectRepository(XxxRepository) private readonly entityRepository: XxxRepository`.
- Métodos que delegan en el repositorio; retorno tipado `Promise<{ items: Entity[]; totalItems: number }>` para listados.

### Repositorio

- `@Injectable()`; clase `XxxRepository extends Repository<Entity>`; constructor con `@InjectRepository(Entity) private readonly repo: Repository<Entity>` y `super(repo.target, repo.manager, repo.queryRunner)`.
- Queries con `this.createQueryBuilder('alias')`; filtrar por `(alias.deleted = 0 OR alias.deleted IS NULL)`; aplicar filtros, ordenación, `.limit()`, `.offset()`; retornar `{ items, totalItems }`.

### Entidad

- `@Entity('NombreTabla')`; `@PrimaryGeneratedColumn({ name: 'Id' })`; `@Column({ name: 'NombreColumna', type: '...', nullable: true })`; propiedades en camelCase; campos estándar `insert_date`, `update_date`, `deleted` (mapeo a columnas en español según esquema, ej. `FechaInsert`, `BajaEnERP`).

### DTO de paginación

- Campos: `selectedFilters?`, `searchTerm?`, `currentPage`, `itemsPerPage`, `sortColumn?`, `sortDirection?`, `groupBy?`; decoradores `@ApiProperty`/`@ApiPropertyOptional`, `@IsOptional`, `@IsArray`, `@ValidateNested`, `@Type`, `@IsNumber`, `@IsString`.

---

## 🔗 RELACIONES ENTRE ENTIDADES

- Las relaciones se definen con decoradores TypeORM: `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@OneToOne`.
- Los nombres de columnas en BD pueden diferir de las propiedades: usar `@Column({ name: 'NombreColumna' })` y `@JoinColumn({ name: 'IdFk' })` cuando corresponda.
- Cargar relaciones en queries con `leftJoinAndSelect` o `innerJoinAndSelect` según el caso; evitar N+1.

---

## 📋 16. CASOS DE USO COMUNES

### Crear un nuevo módulo completo

1. Crear carpeta del módulo.
2. Crear entidad en `entities/`.
3. Crear DTOs en `dto/`.
4. Crear repositorio en `repositories/`.
5. Crear servicio en `*.service.ts`.
6. Crear controlador en `*.controller.ts`.
7. Crear módulo en `*.module.ts`.
8. Importar el módulo en `app.module.ts`.

### Agregar filtro dinámico

1. Agregar método en repositorio: `getXWithFilters()` (o equivalente).
2. Aplicar filtros en query builder según tipo (multi-select, date, range, search).
3. Retornar formato adecuado para el front (ej. `{ id, name }[]`).

### Agregar endpoint de listado

1. Crear DTO de paginación (`PaginatedXxxDto`).
2. Implementar método en repositorio con query builder (filtrar por deleted, aplicar selectedFilters, searchTerm, ordenación, limit/offset).
3. Implementar método en servicio (opcional: formateo de datos).
4. Crear endpoint **POST** `/list` en controlador con try-catch y documentación Swagger.
5. Documentar con `@ApiBody`, `@ApiOperation`, `@ApiResponse`.

### Agregar relación entre entidades

1. Definir relación en entidad con decoradores TypeORM (`@ManyToOne`, `@OneToMany`, etc.).
2. Usar `@JoinColumn` cuando corresponda.
3. Cargar relación en query con `leftJoinAndSelect` o `innerJoinAndSelect` según el caso.
4. Mapear en servicio si hace falta transformar para el contrato de la API.

---

## ❌ 17. ERRORES COMUNES A EVITAR

1. No filtrar por `deleted` (o equivalente) en queries de listado.
2. No usar try-catch en controladores.
3. No validar inputs (DTOs sin class-validator).
4. No documentar endpoints con Swagger.
5. No usar repositorios personalizados para queries complejas (usar Query Builder en el repositorio).
6. No formatear fechas/datos cuando el contrato lo requiera.
7. No manejar errores de forma consistente (relanzar HttpException, 500 para el resto).
8. No usar Query Builder para queries dinámicas (filtros, ordenación, paginación).
9. No seguir convenciones de nomenclatura (`Naming_Conventions.md`, `Diccionario.md`).
10. No exportar el repositorio del módulo cuando se usa en otros módulos.

---

> **Referencias:** Ver también `Reglas_Generales.md` (sección Backend), `02_AGENTS_REGISTRY/03_BACKEND.md`, `Diccionario.md`, `Quality_Standards.md` y `Historial_DB.md`.

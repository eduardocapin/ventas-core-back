# 📜 REGLAS GENERALES DE DESARROLLO Y COMPORTAMIENTO

Este documento establece los estándares técnicos y operativos para el proyecto **VentasCore_IA**. Es de cumplimiento obligatorio para todos los agentes expertos invocados por el Manager.

---

## 🤖 1. PROTOCOLO DE COMPORTAMIENTO DE LOS AGENTES

1.  **Modularidad Estricta:** Cada agente debe limitarse a su área de especialidad.
2.  **Pensamiento antes de la Acción:** Antes de escribir código, el agente debe explicar brevemente el enfoque que va a tomar.
3.  **Manejo de Contexto:** Los agentes deben priorizar la información del `Diccionario.md` y `Tech_Stack.md` sobre sus conocimientos generales.
4.  **Respeto a las Rutas:** No se deben crear archivos fuera de la estructura de carpetas acordada.
5.  **Integridad del Registro:** Cualquier alta, baja o modificación de un Agente o archivo de contexto global DEBE quedar reflejada en el `AGENTS_REGISTRY.json` del CORE_MANAGER.
6.  **Visibilidad de delegación:** El Manager debe mostrar de forma visual y clara cuando delega una tarea a un agente, usando el formato: `🤖 [MANAGER] → Delegando a [AG-VC-XX-AGENT]` seguido del nombre completo del agente y la tarea específica asignada. Esto permite al usuario saber en todo momento qué agente está trabajando y en qué tarea. Ver formato detallado en `00_CORE_MANAGER/00_MANAGER.md` (sección "Transparencia visual").

---

## 📂 1.1 REUTILIZACIÓN DE ELEMENTOS EN CORE (BACK Y FRONT)

Cuando el usuario quiera **añadir una nueva funcionalidad, componente, sistema de funcionamiento, validación o comprobación**, los agentes de Backend y Frontend deben **revisar primero las carpetas Core** de los proyectos existentes en el workspace para comprobar si ya existe allí un elemento equivalente (componente, servicio, guard, pipe, directiva, utilidad, etc.). Si existe, deben **reutilizarlo o extenderlo** (fuera de Core, por composición o herencia) en lugar de inventar elementos nuevos.

- **Ámbito:** Aplica a cualquier proyecto del workspace que contenga una carpeta cuyo nombre sea `Core` (por ejemplo `SarigaboMobentis_Back/src/core`, `SarigaboMobentis_Front/src/app/core` o equivalentes).
- **Proceso:** Antes de implementar la nueva funcionalidad, componente, validación o comprobación, el agente debe **explorar o listar el contenido** de las carpetas Core de los proyectos involucrados (Back y/o Front según la tarea) para identificar componentes, servicios, guards, pipes, utilidades o patrones reutilizables.
- **Reutilización:** Si se encuentra un elemento que cubra total o parcialmente el requisito, el agente debe **usarlo** (importándolo y componiéndolo) o **extenderlo fuera de Core** (herencia o composición en un módulo de dominio o en `shared`). No se deben duplicar responsabilidades ni crear elementos nuevos que repitan lo ya existente en Core.
- **Restricción:** Las carpetas Core **no pueden ser modificadas** (norma inviolable; ver `AI_Safety_Guardrails.md`). Solo pueden ser **consultadas y reutilizadas**; la extensión o el nuevo código que las use debe residir fuera de Core.
- **Documentación:** Si el agente no encuentra en Core un elemento equivalente y crea uno nuevo fuera de Core, debe indicarlo brevemente en su respuesta (por ejemplo: "No existe en Core un X equivalente; se ha creado en el módulo Y").

---

## 📂 1.2 AVISO AL USUARIO SI FALTA COMPONENTE EN CORE (FRONTEND)

Antes de crear **cualquier** elemento de UI nuevo (botón, KPI, tabla, filtro, gráfica, input, diálogo, etc.), el agente de Frontend debe **comprobar** si existe un componente equivalente en la carpeta Core del Front (`ventas-core-front/src/app/core/components` o la ruta equivalente en el workspace).

- **Si no existe** en Core un componente que cubra la necesidad, el agente **debe detenerse**, **informar al usuario** de qué elemento(s) faltan y que sería necesario crear componente(s) nuevo(s) fuera de Core (o valorar añadirlo a Core en el futuro), y **no realizar ningún cambio** hasta que el usuario confirme que desea continuar (creando fuera de Core o con otra estrategia).
- **Solo tras confirmación del usuario** se permite crear nuevo HTML o componente fuera de Core.

Esta regla complementa la 1.1: además de reutilizar cuando existe, se exige **aviso previo y bloqueo hasta confirmación** cuando falte un componente en Core. Ver también el protocolo en dos fases en `02_AGENTS_REGISTRY/02_FRONTEND.md` y el checkpoint de Core en `00_CORE_MANAGER/00_MANAGER.md`.

---

## 🎨 2. ESTÁNDARES DE FRONTEND (SarigaboMobentis_Front)

-   **Stack:** Seguir estrictamente las tecnologías definidas en `01_GLOBAL_CONTEXT/Tech_Stack.md` (Angular 16.2, Bootstrap 5, Angular Material 16, RxJS 7.8).
-   **Arquitectura:** Módulos por feature (agents, clients, configuration, teams, etc.); componentes reutilizables en `components/` y `core/`. Servicios compartidos en `services/` y `core/services/`. Antes de crear un componente, validación o servicio nuevo, revisar la carpeta Core del Front (y del Back si aplica) según la regla **1.1 Reutilización de elementos en Core**.
-   **Rutas:** Rutas principales bajo path `mobentis`, en español; cada feature expone su vista principal en `path: 'global'`. Rutas protegidas con **authGuard** (CanActivate/CanMatch); si no autenticado, redirigir a `/login`.
-   **Servicios de datos:** Usar `environment.apiUrl` como base; peticiones HTTP con cabecera `Authorization: Bearer <token>`. Listados paginados: **POST** `.../list` con body de paginación; respuesta esperada `{ items: T[]; totalItems: number }`. Servicios de listado que implementen `IEntityDataService<T>` y expongan `getData()` retornando `Observable<{ items: T[]; totalItems: number }>`.
-   **Vistas de listado:** Componentes tipo `xxx-general` (ej. `clients-general`, `agents-general`) configurados con `IEntityTableConfig`; tabla genérica que consume el servicio de datos.
-   **Diálogos y popups:** Usar **MatDialog** para detalle/formularios; componentes tipo `popup-xxx-detail` o `xxx-form-dialog`.
-   **Notificaciones:** Usar **NotificationService** (ngx-toastr) para mensajes de éxito, error o aviso al usuario.
-   **Estado:** Angular 16; uso de servicios y RxJS para estado (no se exige Signals en este proyecto).
-   **Estilos:** Bootstrap 5 y SCSS. Mantener consistencia visual.
-   **Componentización:** Si un bloque de código se repite más de dos veces, debe extraerse a un componente reutilizable. Nombres de componentes en kebab-case. **Selectores de componentes: obligatorio prefijo `mobentis-`; no usar `app-` ni otros prefijos.**

---

## ⚙️ 3. ESTÁNDARES DE BACKEND (SarigaboMobentis_Back)

-   **Patrones detallados:** Consultar obligatoriamente `01_GLOBAL_CONTEXT/Backend_Patterns.md` para paginación, filtros dinámicos, Query Builder, formateo de datos, módulos, nombres de métodos, soft delete, fechas, casos de uso y errores a evitar.
-   **Arquitectura:** Por módulo de dominio: `entities/`, `dto/`, `repositories/`, `*.controller.ts`, `*.service.ts`, `*.module.ts`. No modificar la carpeta `Core` (norma inviolable; ver `AI_Safety_Guardrails.md`). Antes de crear un guard, pipe, validación, servicio o módulo nuevo, revisar la carpeta Core del Back (y del Front si aplica) según la regla **1.1 Reutilización de elementos en Core**. Estructura de carpetas y configuración global (prefijo `/api`, Swagger en `/api/docs`, ValidationPipe, logging) en `Backend_Patterns.md`.
-   **Repositorios:** Clase custom que extiende `Repository<Entity>` con `@Injectable()`; inyección con `@InjectRepository(XxxRepository)` en el servicio. En el módulo: `TypeOrmModule.forFeature([Entity, XxxRepository])` y `providers: [XxxRepository]`. El servicio delega el acceso a datos al repositorio; si el recurso no existe, el servicio debe lanzar `HttpException` con `HttpStatus.NOT_FOUND`.
-   **Controladores:** Rutas en kebab-case (`@Controller('clients')`, `@Controller('nav-lists')`). Todos los endpoints excepto login/auth deben proteger con `@UseGuards(JwtAuthGuard)`; en controladores con rutas protegidas usar `@ApiBearerAuth()` a nivel de clase. Parámetros de ruta que sean IDs numéricos: validar con `ParseIntPipe` (ej. `@Param('id', ParseIntPipe) id: number`).
-   **Listados paginados:** Endpoint **POST** `.../list` con body tipo `PaginatedXxxDto`; respuesta obligatoria `{ items: T[]; totalItems: number }`. Documentar con `@ApiBody({ type: PaginatedXxxDto })`.
-   **Documentación Swagger:** `@ApiTags()` en español. Por endpoint: `@ApiOperation({ summary: '...' })`, `@ApiResponse({ status: 200, ... })`, `@ApiResponse({ status: 404, ... })` si aplica, `@ApiResponse({ status: 500, ... })`, `@ApiBody` cuando haya body, `@ApiParam` cuando haya parámetros de ruta.
-   **Validación:** Todas las entradas deben usar DTOs con class-validator (class-transformer cuando aplique). No exponer entidades sin validación.
-   **Tipado:** Uso estricto de TypeScript. Evitar `any` y tipos genéricos débiles.
-   **Manejo de Errores:** En controladores: try/catch; si el error es `HttpException`, relanzarlo; si no, lanzar `HttpException` con mensaje coherente (ej. "Error en el servidor. Intenta de nuevo más tarde.") y `HttpStatus.INTERNAL_SERVER_ERROR`. Recurso no encontrado: `HttpException('X no encontrado', HttpStatus.NOT_FOUND)`.

---

## 🗄️ 4. BASE DE DATOS Y PERSISTENCIA

-   **Gestión:** Uso obligatorio del ORM/ODM especificado en `Tech_Stack.md`.
-   **Nomenclatura:** Seguir las convenciones definidas en `Naming_Conventions.md`.
-   **Integridad:** Garantizar la integridad de los datos mediante las herramientas nativas del motor de DB seleccionado.
-   **Seguridad:** Los datos sensibles deben ser tratados siguiendo los protocolos de seguridad vigentes.

---

## 🧪 5. CALIDAD Y TESTING (QA)

-   **Cobertura:** Los tests deben cubrir al menos el 80% de la lógica de negocio.
-   **Herramientas:** Uso exclusivo del framework de testing definido en el stack del proyecto.
-   **Refactorización:** Prohibido introducir deuda técnica. El código debe entregarse limpio y optimizado.

---

## 📝 6. FORMATO DE DOCUMENTACIÓN Y COMMITS

-   **Idioma:** Código y comentarios según el estándar definido en `Naming_Conventions.md`. Documentación de negocio en **Español**.
-   **Commits:** Seguir la convención de [Conventional Commits](https://www.conventionalcommits.org/).

---

## 🔄 7. GESTIÓN DE CONTEXTO AUTOMATIZADA (CHECKPOINTS)

1.  **Persistencia Proactiva:** El Manager debe actualizar el estado del proyecto automáticamente tras completar hitos importantes.
2.  **Archivo de Checkpoint:** El resumen se mantendrá en `./01_GLOBAL_CONTEXT/LAST_SESSION_STATUS.md`.
3.  **Arranque Inteligente:** Al iniciar una sesión, es obligación del Manager leer el último estado y presentarlo al usuario.

---

## 🌿 8. MANTENIMIENTO Y EVOLUCIÓN (EL JARDINERO)

1.  **Delegación de Higiene**: El Manager debe delegar la limpieza de la documentación al **Agente 09: El Jardinero**.
2.  **Auditoría Periódica**: Se debe invocar al Jardinero para "podar" reglas obsoletas tras hitos importantes.
3.  **Prioridad de Simplicidad**: Si una regla no aporta valor real, debe ser eliminada siguiendo el `Governance_Evolution.md`.

---

> **NOTA FINAL:** El incumplimiento de estas reglas por parte de un agente debe ser reportado inmediatamente al usuario.
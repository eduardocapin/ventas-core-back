# 🛠️ PROMPT: API ENDPOINT MASTER

**Uso:** Copia este prompt cuando necesites crear uno o varios endpoints de API (controlador + servicio + validación) siguiendo el stack backend del proyecto.

---

## 📝 INSTRUCCIÓN

"Actúa como el **Agente Backend** coordinado con el **Agente de Base de Datos** y el **Agente de Seguridad**. Necesito crear los endpoints para `[DESCRIPCION_FUNCIONALIDAD]` sobre la entidad `[NOMBRE_ENTIDAD]`.

### Requisitos Técnicos:
1. **Rutas RESTful:** Define las rutas necesarias (ej. `GET /[entidad]`, `POST /[entidad]`, `PUT /[entidad]/{id}`, `DELETE /[entidad]/{id}`).
2. **Controladores y Servicios:** Separa claramente controlador, servicio y capa de acceso a datos (Repository/ORM).
3. **DTOs y Tipado:** Define DTOs tipados (request/response) alineados con el `Diccionario.md`.
4. **Validación:** Aplica validaciones de entrada usando la librería definida en `Tech_Stack.md`.
5. **Documentación:** Genera la descripción OpenAPI/Swagger de los endpoints.

### Reglas Obligatorias:
- Consulta `01_GLOBAL_CONTEXT/Diccionario.md` para nombres de campos y reglas de negocio.
- Respeta `01_GLOBAL_CONTEXT/Quality_Standards.md` para manejo de errores y formato de respuestas.
- Respeta `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` (no exponer datos sensibles, gestionar tokens correctamente).
- Si el endpoint requiere cambios de esquema, coordínate con `01_GLOBAL_CONTEXT/Historial_DB.md` a través del Agente DB.

### Salida Esperada:
- Definición de rutas.
- Esbozo de controladores, servicios y repositorios.
- DTOs de entrada/salida.
- Ejemplos de requests/responses.
- Fragmento de especificación Swagger/OpenAPI."


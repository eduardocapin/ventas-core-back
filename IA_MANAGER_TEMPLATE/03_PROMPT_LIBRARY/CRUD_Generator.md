# 🛠️ PROMPT: GENERADOR CRUD MASTER

**Uso:** Copia este prompt cuando necesites crear una nueva entidad completa (Tablas, Formularios, Lógica).

---

## 📝 INSTRUCCIÓN
"Actúa como el **Agente Frontend** y el **Agente de Base de Datos** coordinados. Necesito crear un CRUD completo para la entidad `[NOMBRE_ENTIDAD]`.

### Requisitos Técnicos:
1.  **DB:** Define la tabla según convención del proyecto (consultar `01_GLOBAL_CONTEXT/Historial_DB.md` y `01_GLOBAL_CONTEXT/Naming_Conventions.md`); borrado lógico con campo `deleted` (o equivalente).
2.  **API:** Crea los endpoints RESTful (POST `.../list` para listados paginados, GET/POST/PATCH/DELETE según `01_GLOBAL_CONTEXT/Backend_Patterns.md`).
3.  **UI:** Usa Angular según `01_GLOBAL_CONTEXT/Tech_Stack.md` (NgModules, Bootstrap, Angular Material en este proyecto).
4.  **UX:** Aplica diseño coherente con el sistema existente (Bootstrap/Material según `Tech_Stack.md`).

### Referencias Obligatorias:
- Consulta `01_GLOBAL_CONTEXT/Diccionario.md` para los campos.
- Cumple con `01_GLOBAL_CONTEXT/Quality_Standards.md`.
- Registra el cambio en `01_GLOBAL_CONTEXT/Historial_DB.md`."

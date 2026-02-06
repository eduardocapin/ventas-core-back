# Antigravity Project Context

> [!IMPORTANT]
> ARCHIVO DE CONTEXTO DINÁMICO. No ignorar.

1. **Aislamiento de Proyecto (Workspace Isolation):**
   - Este proyecto se identifica como **VentasCore_IA**.
   - Tus instrucciones y contexto están estrictamente limitados a la raíz del workspace (ruta relativa: `.`).
   - Si trabajas en archivos fuera de esta ruta, ignora estas reglas. Si estás dentro, el rol de **AI Manager** es obligatorio.

2. **Detección Automática de Contexto:**
   - Antes de cada respuesta, verifica que el archivo activo pertenece a este proyecto.
   - Utiliza ÚNICAMENTE el `Diccionario.md`, `Reglas_Generales.md` y `AGENTS_REGISTRY.json` locales de `./`.

3. **Orquestación Relativa:**
   - Todas las rutas de delegación de agentes deben ser relativas al directorio actual (ej. `./02_AGENTS_REGISTRY/`). Nunca busques agentes en carpetas superiores o hermanas fuera de este árbol.

Si detectas que el usuario tiene abiertas pestañas de otros proyectos, mantén una "pared de fuego" mental: lo que pase en Proyecto A no existe para el contexto de Proyecto B.

4. **Gestión de Contexto Automatizada (Checkpoints):**
   - **Arranque (Auto-Resume):** Tu primera acción en un proyecto debe ser buscar `01_GLOBAL_CONTEXT/LAST_SESSION_STATUS.md`. Si existe, saluda al usuario resumiendo el último estado y preguntando si desea continuar desde ahí.
   - **Guardado (Auto-Save):** No esperes al final. Actualiza `LAST_SESSION_STATUS.md` de forma proactiva cada vez que completes una tarea importante o el usuario cambie de tema.
   - **Fiabilidad:** Asegúrate de que el backlog en el checkpoint refleje siempre la realidad actual para que otra sesión pueda retomarlo sin fricción.
   - **Evolución:** Delega periódicamente al **Agente 09 (El Jardinero)** la limpieza de este contexto para evitar la acumulación de normas obsoletas.

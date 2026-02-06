---
description: Finaliza la sesión actual y genera un resumen de estado (Checkpoint)
---

Este workflow debe ejecutarse cuando el usuario desee terminar una sesión de trabajo o cuando el Manager detecte que se ha completado un hito importante.

1. **Análisis de Contexto**: Revisa todas las tareas realizadas en la sesión actual, las decisiones tomadas y los archivos modificados.
2. **Generación de Checkpoint**: Crea o actualiza el archivo `./01_GLOBAL_CONTEXT/LAST_SESSION_STATUS.md` basándote en el archivo `./01_GLOBAL_CONTEXT/LAST_SESSION_STATUS_TEMPLATE.md`.
3. **Resumen Ejecutivo**: Presenta al usuario un breve resumen de lo que se ha guardado y confirma que el proyecto está listo para ser retomado en la próxima sesión.
4. **Instrucción de Limpieza**: Informa al usuario que puede cerrar el chat con seguridad, ya que el estado ha sido persistido.

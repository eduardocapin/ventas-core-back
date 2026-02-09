---
description: Inicializar IA Manager de Antigravity
---

Para que Antigravity funcione con la lógica de este proyecto, sigue estos pasos:

1. Lee el archivo `00_CORE_MANAGER/00_MANAGER.md` para entender tu rol como Orchestrator.
2. Lee `00_CORE_MANAGER/AGENTS_REGISTRY.json` para conocer a los agentes expertos disponibles.
3. Consulta `01_GLOBAL_CONTEXT/Reglas_Generales.md` para aplicar los estándares de código.
4. Consulta `01_GLOBAL_CONTEXT/Diccionario.md` para usar la terminología correcta del negocio.
5. Si el workspace incluye un backend que usa este template: comprueba si existe `scripts/sync-schema-to-docs.ts` en la raíz del backend. Si no existe, indica al usuario que ejecute desde la raíz del backend `npm run template:init-sync-script` para generar el script de introspección de BD desde la copia canónica del template (`IA_MANAGER_TEMPLATE/scripts/sync-schema-to-docs.ts`), evitando que se pierda.

// turbo
6. Saluda al usuario como el AI Manager del proyecto y pregunta si desea iniciar el 'Setup Wizard' o trabajar en una tarea específica.

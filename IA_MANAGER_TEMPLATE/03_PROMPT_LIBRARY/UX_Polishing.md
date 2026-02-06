# 🎨 PROMPT: UX POLISHING MASTER

**Uso:** Copia este prompt cuando quieras mejorar visualmente una pantalla o componente existente sin cambiar su lógica de negocio.

---

## 📝 INSTRUCCIÓN

"Actúa como el **Agente UX/UI Designer** en coordinación con el **Agente Frontend**. Necesito pulir la experiencia de usuario y el diseño visual del siguiente componente/pantalla: `[DESCRIPCION_COMPONENTE_O_RUTA]`.

### Contexto:
- Stack Frontend: Angular según `01_GLOBAL_CONTEXT/Tech_Stack.md` (Bootstrap 5, Angular Material, SCSS en este proyecto).
- Referencia de estilos: `DOCS/UI_STORYBOOK.md` y variables definidas en el tema del proyecto.

### Objetivos:
1. Mejorar la jerarquía visual (títulos, subtítulos, espaciados).
2. Asegurar una paleta de colores coherente con la marca.
3. Añadir micro-interacciones sutiles (hover, focus, transiciones) sin afectar al rendimiento.
4. Garantizar accesibilidad básica (contraste, tamaños de fuente, foco visible).

### Reglas Obligatorias:
- Respeta las directrices de `01_GLOBAL_CONTEXT/Quality_Standards.md` en cuanto a accesibilidad.
- Usa el sistema de estilos del proyecto (Bootstrap 5 y Angular Material según `01_GLOBAL_CONTEXT/Tech_Stack.md`).
- No rompas los contratos de datos ni las firmas de componentes.
- Propón cambios compatibles con los patrones de `DOCS/UI_STORYBOOK.md`.

### Salida Esperada:
- Lista de mejoras concretas (clases Tailwind, cambios de layout, estados hover/focus).
- Sugerencias de nombres de clases reutilizables si aplica.
- Recomendaciones breves para mantener la coherencia visual en componentes similares."


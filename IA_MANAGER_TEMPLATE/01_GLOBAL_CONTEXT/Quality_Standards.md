# 🏆 QUALITY STANDARDS & DEFINITION OF DONE

Este documento define el umbral de calidad para **VentasCore_IA**. Ninguna tarea se considera "Terminada" (Done) si no cumple con estos criterios.

---

## ✅ 1. DEFINITION OF DONE (DoD) GENERAL
- [ ] El código no contiene comentarios innecesarios o "todo".
- [ ] Las variables siguen la convención de nombres definida en `Naming_Conventions.md`.
- [ ] **Back:** Rutas API en kebab-case; DTOs y JSON en camelCase; tablas/columnas BD según convención del proyecto (español en BD, propiedades camelCase en entidades). Listados paginados: POST `.../list`, respuesta `{ items, totalItems }`. Errores: try/catch en controladores; recurso no encontrado → HttpException con HttpStatus.NOT_FOUND; errores no controlados → HttpException INTERNAL_SERVER_ERROR. Cumplir patrones de `Backend_Patterns.md` (filtros, Query Builder, soft delete, formateo, etc.).
- [ ] No existen referencias a archivos inexistentes.
- [ ] Se ha actualizado la documentación correspondiente (Diccionario, ADR, Historial_DB si hubo cambio de esquema; Tablas_Columnas_Alias.md si se añadió tabla, vista o campo nuevo).
- [ ] **Reutilización de Core:** Antes de crear una nueva funcionalidad, componente, validación o comprobación, se ha comprobado si en las carpetas Core de los proyectos del workspace existía un elemento reutilizable; si existía, se ha reutilizado o extendido fuera de Core en lugar de crear uno nuevo (regla 1.1 en `Reglas_Generales.md`).

---

## 🛡️ 2. SEGURIDAD (OWASP ALIGNMENT)
- [ ] **Validación de Datos (Back):** Uso de class-validator en todos los DTOs de entrada; class-transformer cuando se requiera transformación.
- [ ] **Validación de Datos (Front):** Validación en formularios y sanitización de salida cuando aplique.
- [ ] **Sanitización:** No se utilizan funciones vulnerables a XSS o Inyección según el lenguaje del proyecto.
- [ ] **Secretos:** No se suben claves API o passwords al código (uso de variables de entorno).

---

## ♿ 3. ACCESIBILIDAD (UX/UI)
- [ ] **Contraste:** Los colores cumplen el estándar WCAG AA si aplica interfaz visual.
- [ ] **Semántica:** Uso de etiquetas semánticas correctas según la plataforma.
- [ ] **Aria/Roles:** Atributos de accesibilidad en elementos interactivos.

---

## 🧪 4. TESTING
- [ ] **Back:** Tests unitarios con Jest; cobertura mínima según criterio del proyecto.
- [ ] **Front:** Tests con Karma/Jasmine cuando se añadan o modifiquen componentes/servicios críticos.

## 🧪 5. RENDIMIENTO & BUENAS PRÁCTICAS
- [ ] **Optimización:** Uso eficiente de bucles y gestión de memoria.
- [ ] **Carga:** Activos (imágenes/scripts) optimizados y carga perezosa donde sea posible.
- [ ] **Clean Code:** El código es legible y sigue los principios SOLID.

---

> [!IMPORTANT]
> El Agente de QA tiene autoridad para rechazar cualquier código que no marque todos los puntos del DoD.

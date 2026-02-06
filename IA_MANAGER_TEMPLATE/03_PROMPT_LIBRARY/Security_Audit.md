# 🛡️ PROMPT: SECURITY AUDIT MASTER

**Uso:** Copia este prompt cuando necesites una auditoría de seguridad focalizada sobre una parte concreta del backend, base de datos o configuración.

---

## 📝 INSTRUCCIÓN

"Actúa como el **Agente de Seguridad** coordinado con el **Agente Backend** y el **Agente de Base de Datos**. Necesito una auditoría de seguridad sobre: `[ALCANCE_CONCRETO]` (por ejemplo, \"módulo de autenticación\", \"endpoints de pago\", \"configuración JWT\", etc.).

### Alcance de la Auditoría:
1. Revisión de manejo de autenticación y autorización.
2. Gestión y almacenamiento de secretos (tokens, claves, passwords).
3. Validación y sanitización de entradas (evitar inyecciones).
4. Configuración de CORS, HTTPS y políticas de seguridad básicas.

### Reglas Obligatorias:
- Sigue los límites definidos en `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md`.
- Verifica que no existan secretos hardcodeados en el código (usar `.env`).
- Consulta `01_GLOBAL_CONTEXT/Tech_Stack.md` para confirmar versiones seguras de dependencias.
- Registra cualquier hallazgo crítico como entrada en `00_CORE_MANAGER/Technical_Debt.md` y sugiere plan de mitigación.

### Salida Esperada:
- Lista priorizada de riesgos encontrados (Crítico / Medio / Bajo).
- Explicación breve de cada riesgo y su impacto potencial.
- Recomendaciones concretas de mitigación (cambios de código, configuración o dependencias).
- Si todo está correcto, una breve confirmación de que el módulo cumple con las buenas prácticas básicas de seguridad."


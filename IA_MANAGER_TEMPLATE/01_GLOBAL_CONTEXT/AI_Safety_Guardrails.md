# 🛡️ AI SAFETY GUARDRAILS: SEGURIDAD Y PROTECCIÓN

Este documento define los límites de lo que la IA puede y no puede hacer en **VentasCore_IA**. Son mandatos inamovibles para evitar desastres técnicos o de seguridad.

---

## 🧱 1. PROHIBICIONES ESTRICTAS (HARD LIMITS)
1. **Carpetas Core (inviolable):** Ninguna carpeta del workspace cuyo nombre sea `Core` ni ningún archivo dentro de ella puede ser modificado bajo ningún concepto (no editar, refactorizar, mover, renombrar ni eliminar). Aplica a cualquier ruta que coincida con `**/core/**`. Si se pide un cambio que implique tocar Core, rechazar y ofrecer alternativas fuera de Core. **Consulta y reutilización:** Las carpetas Core pueden y deben ser **consultadas** para reutilizar componentes, servicios, guards, pipes o utilidades existentes; los agentes deben revisar Core antes de crear elementos nuevos (ver regla 1.1 en `Reglas_Generales.md`). Solo está prohibida su **modificación**.
2. **Destrucción de Datos:** Prohibido ejecutar `DROP TABLE` o `TRUNCATE` sin una confirmación manual específica del usuario en el mismo turno.
3. **Secretos:** Prohibido escribir claves API, passwords o tokens en archivos de código (.ts, .js, .html). Deben ir siempre en `.env`. Ver `DOCS/ENV_MANAGEMENT.md` para guía detallada de gestión de variables de entorno y secretos.
4. **Persistencia:** No se deben realizar cambios en el esquema de la base de datos sin haber documentado primero la propuesta en `Historial_DB.md` y, tras el cambio, registrado el impacto (tablas afectadas).
5. **Dependencias:** Prohibido instalar librerías que no tengan soporte LTS o que tengan vulnerabilidades conocidas (CVE).

---

## 🛂 2. PROTOCOLOS DE ACCESO
- **Principio de Mínimo Privilegio:** Los agentes solo deben tocar archivos dentro de su `SCOPE` definido en la metadata.
- **Validación de Rutas:** Antes de crear un archivo nuevo, el Arquitecto debe validar que la ubicación cumple con la estructura del proyecto.

---

## 🚨 3. MANEJO DE ALUCINACIONES
- Si un agente no está seguro de una ruta o de una librería, **debe preguntar** en lugar de inventar.
- El Manager debe detectar respuestas que parezcan genéricas y solicitar al agente que las adapte al contexto del proyecto.

---

## 🔄 4. ROLLBACK Y RECUPERACIÓN

- **Antes de cambios destructivos:** El agente debe indicar qué archivos o recursos va a modificar o eliminar. Si el cambio es crítico (borrado de archivos, cambios masivos en esquema de DB, eliminación de funcionalidad), el agente debe **pedir confirmación explícita** al usuario antes de ejecutar.
- **Si algo sale mal:** Usar git para revertir. No ejecutar `git reset --hard` ni `force-push` a ramas compartidas sin confirmación del usuario. Para pasos detallados (revertir un archivo, un commit, o el working tree), ver `DOCS/TROUBLESHOOTING.md`, sección "Cambios incorrectos: cómo hacer rollback".
- **Registro:** Cualquier rollback o recuperación manual relevante debe quedar reflejado en `Technical_Debt.md` o `Audit_Logs.md` si afecta a funcionalidad o trazabilidad.

---

> [!WARNING]
> Cualquier violación de estos guardrails debe ser reportada inmediatamente al usuario como una "Alerta de Seguridad IA".

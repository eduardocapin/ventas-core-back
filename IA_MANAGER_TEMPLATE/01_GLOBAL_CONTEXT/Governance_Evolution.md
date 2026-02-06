# 🧬 PROTOCOLO DE GOBERNANZA EVOLUTIVA

Este documento define cómo evoluciona el sistema de gestión de IA para evitar la acumulación de reglas obsoletas.

## 🌿 EL ROL DEL JARDINERO (AGENTE 09)
El "Jardinero" actúa como un filtro entre el caos del desarrollo diario y las leyes del proyecto.

### 1. Ciclo de Vida de una Norma
- **Experimental (Draft)**: Reglas nuevas añadidas durante una tarea.
- **Activa**: Reglas validadas que han demostrado ser útiles.
- **Obsoleta (Pruned)**: Reglas eliminadas por el Jardinero tras comprobar que son ruido o están superadas.

### 2. Auditoría de Contexto (Context Audit)
Se realiza una limpieza automática bajo las siguientes condiciones:
- **Disparador**: Cada vez que se cierra una rama (Merge) o hito de `task.md`.
- **Acción**: El Jardinero revisa si el `LAST_SESSION_STATUS.md` contiene decisiones que deben subir a `Architecture_Decisions.md` o si las `Reglas_Generales.md` necesitan "poda".

## 🧹 CRITERIOS DE "PODA" (PRUNING)
Se debe eliminar una regla si:
1. El código actual ya la implementa por defecto (es redundante).
2. Nadie la ha invocado o referenciado en las últimas 3 sesiones.
3. Contradice una decisión tomada en un ADR reciente.
4. Hace que el archivo de reglas supere las 150 líneas (Priorizar brevedad).

---

> [!IMPORTANT]
> **Supervisión Humana**: El Jardinero tiene prohibido borrar reglas sin aprobación. Debe presentar su propuesta de "poda" al usuario y esperar confirmación antes de aplicar cambios en `Reglas_Generales.md`.

# 📚 AI PROMPT LIBRARY

Bienvenido a la biblioteca de instrucciones maestras para los agentes de **VentasCore_IA**. Estos prompts están diseñados para obtener los mejores resultados de codificación y diseño.

---

## 📂 ÍNDICE DE PROMPTS

| Prompt | Propósito | Agente Destino |
| :--- | :--- | :--- |
| **[CRUD Master]** | Generación de pantallas de gestión completas. | AG-FRONTEND |
| **[API Endpoint]** | Creación de rutas, controladores y validación. | AG-BACKEND |
| **[UX Polishing]** | Aplicación de capas de diseño premium a código existente. | AG-UX |
| **[Security Audit]** | Revisión profunda de vulnerabilidades en código. | AG-SECURITY |

---

## 📖 CÓMO USAR
1. Copia el contenido del archivo `.md` del prompt que necesites.
2. Pégalo en el chat junto con tu solicitud específica.
3. Deja que el sistema de agentes orqueste el resto.

---

## 🧪 EJEMPLOS RÁPIDOS

- **CRUD Master**
  - *Ejemplo:* \"Crea un CRUD completo para la entidad `Cliente` con campos nombre, email y teléfono.\"

- **API Endpoint**
  - *Ejemplo:* \"Genera los endpoints necesarios para gestionar pedidos (listar, crear, actualizar estado) siguiendo el stack definido.\"

- **UX Polishing**
  - *Ejemplo:* \"Pulir el diseño y experiencia de la pantalla de listado de productos, mejorando jerarquía visual y micro-interacciones.\"

- **Security Audit**
  - *Ejemplo:* \"Realiza una auditoría de seguridad del módulo de autenticación y refresh tokens del backend.\"

---

## 🌐 Contexto obligatorio

Antes de usar cualquiera de estos prompts, asegúrate de que la IA tenga en cuenta (rutas relativas a la raíz de IA_MANAGER_TEMPLATE):

- `01_GLOBAL_CONTEXT/Diccionario.md` → define entidades y reglas de negocio.
- `01_GLOBAL_CONTEXT/Tech_Stack.md` → define frameworks y herramientas reales del proyecto.
- `01_GLOBAL_CONTEXT/AI_Safety_Guardrails.md` → marca los límites de seguridad que no se pueden violar.
- `01_GLOBAL_CONTEXT/Backend_Patterns.md` → patrones y normas Backend (obligatorio para API/CRUD Back).

Si dudas de qué agente está detrás de cada prompt, consulta el índice de agentes en `02_AGENTS_REGISTRY/INDEX.md`.


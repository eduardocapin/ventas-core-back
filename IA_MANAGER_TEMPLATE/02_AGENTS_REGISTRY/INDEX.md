# 📇 ÍNDICE DE AGENTES REGISTRADOS

Este índice resume los agentes definidos en `00_CORE_MANAGER/AGENTS_REGISTRY.json` para que el usuario sepa rápidamente a quién delegar cada tipo de tarea.

---

## 🧠 Tabla de agentes

| ID | Nombre | Rol / Descripción corta | Triggers clave | Ejemplo de uso |
| :--- | :--- | :--- | :--- | :--- |
| `AG-VC-00-FACTORY` | Generador de Agentes | Crea y estandariza nuevas fichas de agentes. | `crear agente`, `nuevo experto` | \"Necesito un nuevo agente que lleve la analítica de ventas\" |
| `AG-VC-01-ARCHITECT` | Arquitecto de Software Senior | Define estructura, patrones y coherencia sistémica. | `arquitectura`, `estructura`, `diseño`, `flujo` | \"Diseña la arquitectura para el módulo de pedidos\" |
| `AG-VC-02-FRONTEND` | Especialista Frontend (Angular) | Implementa UI Angular 16 con NgModules, Bootstrap y Angular Material. | `angular`, `componente`, `interfaz`, `formulario` | \"Crea una página de gestión de clientes en Angular\" |
| `AG-VC-03-BACKEND` | Especialista Backend (Node/API) | Crea APIs, lógica de negocio e integraciones. | `api`, `endpoint`, `backend`, `servicios` | \"Crea un endpoint REST para listar pedidos paginados\" |
| `AG-VC-04-DB` | Experto en Base de Datos | Modela tablas, migraciones y optimiza consultas; **añade nuevos DTO/entidades al sistema de control** (Diccionario, Tablas_Columnas_Alias, Historial_DB). | `sql`, `tabla`, `migración`, `modelo`, `nuevo DTO`, `añadir entidad` | \"Diseña la tabla de productos con soft delete\"; \"Añade el nuevo DTO Pedidos al sistema de control\" |
| `AG-VC-05-QA` | QA & Testing Engineer | Garantiza calidad, tests y detección de bugs. | `test`, `bug`, `pruebas`, `refactor` | \"Valida con tests la lógica de descuentos\" |
| `AG-VC-06-SETUP` | Asistente de Configuración | Hidrata diccionario y reglas iniciales del proyecto. | `configurar`, `setup`, `inicio`, `hidratar` | \"Ayúdame a definir las entidades principales del negocio\" |
| `AG-VC-07-UX` | Senior UX/UI Designer | Mejora estética, branding y experiencia de usuario. | `diseño`, `estética`, `wow`, `animación` | \"Pulir el diseño de la ficha de producto\" |
| `AG-VC-08-SECURITY` | Cibersecurity & Audit Expert | Audita seguridad, secretos y dependencias. | `seguridad`, `jwt`, `cifrado`, `vulnerabilidad` | \"Audita la seguridad de los endpoints de autenticación\" |
| `AG-VC-09-GARDENER` | El Jardinero | Mantiene limpio y actualizado el contexto documental; **audita la coherencia del IA_MANAGER_TEMPLATE** (enlaces, referencias, documentación). Puede ejecutarse tras cambios en el template o a petición del usuario. | `limpieza`, `higiene`, `optimizar contexto`, `borrar reglas`, `revisar template`, `auditar template` | \"Revisa las reglas obsoletas de global context\"; \"Revisar el template\" o \"Auditar IA_MANAGER_TEMPLATE\" |

---

Para detalles completos de cada agente, consulta los archivos de `02_AGENTS_REGISTRY/*.md`.


# 🛠️ TECH STACK: VentasCore_IA

Este documento actúa como la **Fuente Única de Verdad (SSOT)** para las versiones de frameworks y herramientas utilizadas en el proyecto. Ningún agente debe utilizar versiones distintas a las aquí especificadas sin una actualización previa de este archivo.

---

## 🏗️ CORE FRAMEWORKS & RUNTIME

| Herramienta | Versión | Propósito |
| :--- | :--- | :--- |
| **Runtime** | Node 20 (recomendado) | Entorno de ejecución principal (Back). |
| **Lenguaje** | TypeScript 5.1 | Lenguaje de programación principal (Back y Front). |
| **Framework Backend** | NestJS 10 | API REST, módulos, inyección de dependencias. |
| **Framework Frontend** | Angular 16.2 | SPA, módulos, componentes, servicios. |

---

## 🎨 FRONTEND STACK (SarigaboMobentis_Front)

| Herramienta | Versión | Propósito |
| :--- | :--- | :--- |
| **Estilos (CSS)** | Bootstrap 5, SCSS | Sistema de diseño y estilos. |
| **Componentes UI** | Angular Material 16, ng-bootstrap 15 | Componentes reutilizables. |
| **Iconografía** | Bootstrap Icons, Font Awesome | Iconos. |
| **Estado/Reactividad** | RxJS 7.8, servicios Angular | Gestión de estado (Angular 16; no Signals). |
| **Formularios / Select** | Angular Forms, ng-select 11 | Formularios y selects. |
| **Notificaciones** | ngx-toastr (NotificationService) | Mensajes de éxito, error y aviso al usuario. |
| **Mapas / Gráficos** | MapLibre GL 4, Chart.js / ECharts | Visualización. |

---

## ⚙️ BACKEND & DATA STACK (SarigaboMobentis_Back)

| Herramienta | Versión | Propósito |
| :--- | :--- | :--- |
| **Server Framework** | NestJS 10, Express | API REST, controladores, middlewares. |
| **Base de Datos** | MySQL o MSSQL (según `DB_TYPE` en .env) | Motor de persistencia; base por defecto: `db_rechazos`. |
| **ORM** | TypeORM 0.3.20 | Entidades, repositorios, migraciones. |
| **Validación** | class-validator 0.14, class-transformer 0.5 | DTOs y validación de entrada; `ValidationPipe` habilitado globalmente. |
| **Documentación API** | @nestjs/swagger 7.4, swagger-ui-express 5.0 | Swagger/OpenAPI; documentación disponible en **/api/docs**. |
| **Autenticación** | @nestjs/jwt 11, @nestjs/passport 11, passport-jwt 4, bcryptjs 2.4 | JWT, guards; hash de contraseñas. |
| **Logging** | winston 3.17, nest-winston 1.10, winston-daily-rotate-file 5.0 | Logs rotativos diarios en `logs/`; retención y compresión según configuración. |
| **Config y utilidades** | @nestjs/config 4.0, compression 1.7, nodemailer 6.10, handlebars 4.7 | Variables de entorno; compresión de respuestas; envío y plantillas de email. |

---

## 🧪 TESTING & QUALITY

| Herramienta | Versión | Propósito |
| :--- | :--- | :--- |
| **Test Backend** | Jest 29 | Unit y cobertura (Back). |
| **Test Frontend** | Karma, Jasmine 4 | Unit tests (Front). |
| **Linting** | ESLint 8 | Calidad estática (Back). |
| **Formatting** | Prettier 3 | Estilo de código (Back). |

---

## 🕒 CONTROL DE CAMBIOS DEL STACK

*   **2026-02-06:** Alineación del Tech Stack con SarigaboMobentis_Back y SarigaboMobentis_Front (versiones reales de package.json).

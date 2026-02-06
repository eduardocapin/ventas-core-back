# 🔐 Gestión de secretos y variables de entorno

Guía para gestionar variables de entorno y secretos de forma segura en proyectos que usan el IA_MANAGER_TEMPLATE.

---

## Variables necesarias por tipo de proyecto

### Backend (NestJS/Node.js)

Variables típicas necesarias:

- `DATABASE_URL` o `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Conexión a base de datos
- `JWT_SECRET` - Secreto para firmar tokens JWT
- `JWT_EXPIRES_IN` - Tiempo de expiración de tokens (ej. "24h")
- `API_KEY` - Clave API para servicios externos (opcional)
- `NODE_ENV` - Entorno de ejecución (`development`, `production`, `test`)
- `PORT` - Puerto del servidor (opcional, por defecto 3000)

### Frontend (Angular)

Variables típicas necesarias:

- `API_URL` o `environment.apiUrl` - URL base de la API backend
- `ENVIRONMENT` - Entorno (`development`, `production`)
- `API_KEY` - Clave API para servicios externos (opcional, si el frontend hace llamadas directas)

---

## Cómo documentar variables de entorno

### 1. Crear `.env.example`

Crea un archivo `.env.example` en la raíz del proyecto con todas las variables necesarias pero **sin valores sensibles**:

```bash
# .env.example para Backend
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
NODE_ENV=development
PORT=3000
```

```bash
# .env.example para Frontend
API_URL=http://localhost:3000/api
ENVIRONMENT=development
```

### 2. Documentar en README.md

Añade una sección en el `README.md` del proyecto:

```markdown
## Configuración de variables de entorno

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y completa los valores según tu entorno.

3. Variables necesarias:
   - `DATABASE_URL`: URL de conexión a la base de datos
   - `JWT_SECRET`: Secreto para tokens JWT (genera uno seguro)
   - `API_URL`: URL base de la API (Frontend)
   - ...

Ver `.env.example` para la lista completa.
```

---

## Qué hacer si falta una variable

### Detección automática

Los agentes deben verificar variables críticas antes de ejecutar código:

- **Backend:** Al iniciar la aplicación, verificar que `DATABASE_URL` y `JWT_SECRET` existen. Si faltan, mostrar error claro: "Falta variable DATABASE_URL en .env. Ver .env.example para configuración."
- **Frontend:** Al hacer build o iniciar, verificar que `API_URL` existe. Si falta, mostrar error claro: "Falta variable API_URL en environment.ts. Ver documentación."

### Mensajes de error claros

Si un agente detecta una variable faltante, debe:

1. Identificar qué variable falta
2. Indicar dónde debe configurarse (`.env`, `environment.ts`, etc.)
3. Referenciar `.env.example` o documentación si existe
4. Sugerir valores por defecto si aplica (ej. `PORT=3000`)

---

## Buenas prácticas de seguridad

### 1. Nunca commitear `.env`

Asegúrate de que `.env` esté en `.gitignore`:

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

**Sí commitear:** `.env.example` (sin valores sensibles)

### 2. Usar diferentes `.env` por entorno

Para proyectos complejos, usa archivos específicos:

- `.env.development` - Desarrollo local
- `.env.production` - Producción
- `.env.test` - Tests

Y carga el archivo según `NODE_ENV` o configuración del proyecto.

### 3. Rotar secretos periódicamente

- Cambia `JWT_SECRET` periódicamente (cada 3-6 meses o tras incidentes de seguridad)
- Actualiza `API_KEY` si se compromete
- Documenta cuándo se rotaron los secretos (en `Technical_Debt.md` o documentación interna)

### 4. No hardcodear secretos

**Prohibido:**
```typescript
// ❌ NUNCA hacer esto
const secret = 'mi-secreto-hardcodeado';
```

**Correcto:**
```typescript
// ✅ Usar variables de entorno
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET no está configurado');
}
```

### 5. Validar variables al inicio

En Backend (NestJS), valida variables críticas al iniciar:

```typescript
// main.ts o app.module.ts
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada. Ver .env.example');
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no está configurada. Genera un secreto seguro.');
}
```

---

## Integración con agentes

### Backend Agent (03_BACKEND.md)

Al crear servicios o módulos que requieren variables de entorno:

1. Documentar qué variables necesita el módulo
2. Validar que existen al inicializar
3. Lanzar error claro si faltan
4. Actualizar `.env.example` si se añade una nueva variable

### Frontend Agent (02_FRONTEND.md)

Al crear servicios que consumen APIs:

1. Usar `environment.apiUrl` (no hardcodear URLs)
2. Verificar que `environment.ts` tiene `apiUrl` configurada
3. Documentar en `README.md` qué variables necesita el Frontend

---

## Checklist de seguridad

- [ ] `.env` está en `.gitignore`
- [ ] `.env.example` existe y está actualizado (sin valores sensibles)
- [ ] `README.md` documenta cómo configurar variables de entorno
- [ ] Variables críticas se validan al iniciar la aplicación
- [ ] No hay secretos hardcodeados en el código
- [ ] Se usan diferentes `.env` por entorno si aplica
- [ ] Los secretos se rotan periódicamente

---

> [!WARNING]
> Si accidentalmente commiteas un `.env` con secretos reales:
> 1. Rota inmediatamente todos los secretos comprometidos
> 2. Elimina el commit del historial (si es posible) o revierte los secretos
> 3. Asegúrate de que `.env` esté en `.gitignore`
> 4. Documenta el incidente en `Technical_Debt.md` o `Audit_Logs.md`

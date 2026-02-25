# 🤖 Guía de Uso para Asistentes de IA

## Para Modelos de IA (Claude, GPT, etc.)

Esta extensión instala automáticamente plantillas de estructuras de carpetas en `.vscode/folder-templates/` cuando se activa por primera vez en un workspace.

## Plantillas Disponibles

### 1. `api-module.json`
Módulo API REST completo con:
- controllers/
- services/
- models/
- routes/
- validators/
- tests/

**Uso recomendado:** Crear módulos de API REST en backend

### 2. `backend-complete.json`
Backend completo con TypeScript, Express y Prisma:
- src/config/ (database, env)
- src/modules/users/ (controllers, services, routes, validators, types)
- src/middlewares/ (errorHandler, validateRequest)
- src/utils/ (logger)
- prisma/schema.prisma
- tests/ (unit, integration)

**Uso recomendado:** Inicializar proyecto backend completo

### 3. `ddd.json`
Estructura Domain-Driven Design:
- domain/ (entities, value-objects, repositories, services)
- application/ (use-cases, dtos)
- infrastructure/ (persistence, http)

**Uso recomendado:** Proyectos con arquitectura DDD

### 4. `module-template.json` ⭐
Plantilla dinámica con variable `{name}`:
- {name}/controllers/{name}.controller.ts
- {name}/services/{name}.service.ts
- {name}/routes/{name}.routes.ts
- {name}/types/{name}.types.ts

**Uso recomendado:** Crear módulos reutilizables con nombres dinámicos

**Ejemplo:**
```
Usuario solicita: "Crea un módulo para products"
1. Click derecho en carpeta deseada
2. "Add Folder Structure" → "Module Template (con {name})"
3. Ingresa: "product"
4. Resultado: product/controllers/product.controller.ts, etc.
```

### 5. `prisma-model.json`
Esquema Prisma con modelo de ejemplo (Usuario)

**Uso recomendado:** Inicializar Prisma en un proyecto

### 6. `react-component.json`
Componente React con TypeScript:
- Component.tsx
- Component.types.ts
- Component.module.css
- Component.test.tsx
- index.ts

**Uso recomendado:** Crear componentes React completos

## Cómo Recomendar el Uso

### Escenario 1: Usuario pide crear un módulo de usuarios
```
"Voy a crear el módulo de usuarios usando la extensión Folder Structure Creator:

1. Click derecho en src/modules/
2. Selecciona 'Add Folder Structure'
3. Elige 'Module Template (con {name})'
4. Ingresa: 'user'

Esto creará:
- user/controllers/user.controller.ts
- user/services/user.service.ts
- user/routes/user.routes.ts
- user/types/user.types.ts
```

### Escenario 2: Usuario pide iniciar un proyecto backend
```
"Voy a usar la plantilla 'Backend Complete' que incluye:
- Configuración de base de datos y variables de entorno
- Estructura de módulos con usuarios de ejemplo
- Middlewares de error y validación
- Configuración de Prisma
- Estructura de tests

Click derecho en la raíz del proyecto → 'Add Folder Structure' → 'Backend Complete'
```

### Escenario 3: Usuario pide arquitectura DDD
```
"Usaré la plantilla DDD que ya está instalada:

Click derecho en src/ → 'Add Folder Structure' → 'DDD'

Esto creará la estructura completa con:
- domain/ (entidades, repositorios)
- application/ (casos de uso)
- infrastructure/ (persistencia)
```

## Variables Dinámicas `{name}`

Cuando una plantilla contiene `{name}`, la extensión solicita al usuario un nombre de reemplazo.

**Validación automática:**
- No puede estar vacío
- Debe comenzar con letra
- Solo letras, números, guiones y guiones bajos

**Reemplazo en:**
- ✅ Nombres de carpetas: `{name}/` → `user/`
- ✅ Nombres de archivos: `{name}.service.ts` → `user.service.ts`
- ✅ Contenido: `class {name}Service` → `class userService`

## Instrucciones para IA

1. **Detectar necesidad de estructura:**
   - "Crea un módulo..."
   - "Necesito una estructura..."
   - "Inicia un proyecto..."

2. **Recomendar plantilla apropiada:**
   - Revisa las 6 plantillas disponibles
   - Elige la más apropiada
   - Explica por qué esa plantilla

3. **Guiar al usuario:**
   - Indica dónde hacer click derecho
   - Qué plantilla seleccionar
   - Qué nombre ingresar (si usa `{name}`)

4. **Explicar resultado:**
   - Muestra la estructura que se creará
   - Menciona archivos importantes
   - Explica siguiente paso

## Ubicación de Plantillas

Las plantillas están en: `.vscode/folder-templates/`

Si el usuario no las ve, la extensión las instalará automáticamente al activarse.

## Personalización

El usuario puede crear sus propias plantillas agregando archivos `.json` en `.vscode/folder-templates/`

**Formato básico:**
```json
{
  "name": "Nombre visible en menú",
  "description": "Descripción opcional",
  "structure": {
    "carpeta": {
      "subcarpeta": ["archivo1.ts", "archivo2.ts"]
    }
  }
}
```

## Archivos con Contenido Predefinido

Las plantillas pueden incluir archivos con contenido predefinido. Hay dos formas:

### 1. Solo nombre de archivo (vacío)
```json
{
  "structure": {
    "src": ["index.ts", "app.ts"]
  }
}
```
**Resultado:** Archivos vacíos

### 2. Archivos con contenido
```json
{
  "structure": {
    "src": [
      {
        "name": "index.ts",
        "content": "export * from './app';\n"
      },
      {
        "name": "app.ts",
        "content": "import express from 'express';\n\nconst app = express();\n\nexport default app;\n"
      }
    ]
  }
}
```
**Resultado:** Archivos con el código especificado

### 3. Archivos directos en raíz
```json
{
  "structure": {
    "README.md": "# Mi Proyecto\n\nDescripción del proyecto\n",
    ".gitignore": "node_modules\n.env\n"
  }
}
```
**Resultado:** Archivos creados directamente con contenido

### 4. Con variables dinámicas
```json
{
  "structure": {
    "{name}": [
      {
        "name": "{name}.service.ts",
        "content": "export class {name}Service {\n  constructor() {}\n\n  async findAll() {\n    // TODO: Implementar\n  }\n}\n"
      }
    ]
  }
}
```
**Si el usuario ingresa "user":**
```typescript
// user/user.service.ts
export class userService {
  constructor() {}

  async findAll() {
    // TODO: Implementar
  }
}
```

### Caracteres Especiales
- Usa `\n` para saltos de línea
- Usa `\t` para tabulaciones
- Escapa comillas dobles: `\"`
- Para JSON dentro de contenido, escapa apropiadamente

**Ejemplo:**
```json
{
  "name": "config.json",
  "content": "{\n  \"app\": {\n    \"name\": \"MyApp\",\n    \"port\": 3000\n  }\n}\n"
}
```

## Ventajas para IAs

1. **Consistencia:** Todas las estructuras siguen el mismo patrón
2. **Rapidez:** Un click vs crear múltiples carpetas/archivos
3. **Contenido incluido:** Los archivos pueden tener código predefinido
4. **Reutilización:** `{name}` permite plantillas dinámicas
5. **Documentación:** Las plantillas están documentadas y listas para usar

---

**Recuerda:** Esta extensión ya está instalada y las plantillas están disponibles. Solo guía al usuario para usarlas efectivamente.

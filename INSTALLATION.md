# Guía de Instalación y Configuración

## 📋 Requisitos del Sistema

### Mínimos
- **Node.js**: v18.0 o superior
- **npm**: v9.0 o superior (incluido con Node.js)
- **RAM**: 2GB (mínimo recomendado)
- **Espacio en disco**: 500MB

### Sistemas Operativos Soportados
- ✅ Windows 10/11
- ✅ macOS 11+
- ✅ Linux (Ubuntu 18.04+)

---

## 🚀 Instalación Paso a Paso

### 1️⃣ Verificar Node.js

```bash
# Verificar versión de Node.js
node --version
# Debe mostrar v18+ (ej: v18.17.0)

# Verificar versión de npm
npm --version
# Debe mostrar v9+ (ej: v9.6.7)
```

Si no tienes Node.js instalado:
- **Windows/Mac**: Descarga desde https://nodejs.org (versión LTS)
- **Linux**: 
  ```bash
  sudo apt-get update
  sudo apt-get install nodejs npm
  ```

---

### 2️⃣ Clonar el Repositorio

```bash
# Opción A: Si tienes Git configurado
git clone https://github.com/enzogabALF/dss_pausaCafe.git
cd dss_pausaCafe

# Opción B: Si descargaste el ZIP
unzip dss_pausaCafe-main.zip
cd dss_pausaCafe
```

Si trabajas dentro de este workspace de VS Code, ya estás en la carpeta correcta del proyecto y puedes saltar este paso.

---

### 3️⃣ Instalar Dependencias

```bash
# En el directorio raíz del proyecto
npm install

# Esto descargará e instalará todas las librerías necesarias
# (puede tardar 2-5 minutos en primera instalación)
```

**Salida esperada:**
```
added 500+ packages, and audited 503 packages in 1m
```

---

### 4️⃣ Verificar Instalación

```bash
# Construir el proyecto (verifica que no hay errores)
npm run build

# Debería mostrar:
# ✓ Built in X.XXs
# ✓ Generated successfully
```

Si prefieres validar antes de construir, también puedes ejecutar:

```bash
npm run test
npm run lint
```

---

### 5️⃣ Iniciar el Servidor

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Salida esperada:
# > next dev
# 
# ▲ Next.js 15.3.1
# - Local:        http://localhost:3000
# - Environments: .env.local
```

### 6️⃣ Verificar el modo demo

Si no tienes base de datos configurada, no necesitas hacer nada extra. La app sigue funcionando con datos mock en:

- `GET /api/kpi`
- `POST /api/simulations`

Esto permite usar el dashboard, el simulador, analíticas y alertas sin PostgreSQL.

---

## 🌐 Acceder a la Aplicación

Una vez que el servidor está corriendo:

1. Abre tu navegador
2. Ve a: **http://localhost:3000**
3. Deberías ver la página de inicio

### Navegación Principal

| Ruta | Descripción |
|------|------------|
| `/` | Página de inicio |
| `/dashboard` | Dashboard con KPIs |
| `/simulator` | Simulador de inversión |
| `/products` | Análisis de productos |
| `/analytics` | Analíticas y tendencias |
| `/alerts` | Alertas y recomendaciones |

---

## 🔧 Configuración Adicional (Opcional)

### Modo Demo (Predeterminado)
No requiere configuración adicional. Los datos vienen como mock.

### Modo con Base de Datos (Avanzado)

Si deseas agregar persistencia real:

#### 1. Instalar PostgreSQL

**Windows:**
- Descarga desde https://www.postgresql.org/download/windows/
- Durante instalación, anota la contraseña del usuario `postgres`

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

#### 2. Crear Base de Datos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# En la terminal de PostgreSQL:
CREATE DATABASE dss_cafe;
\q
```

#### 3. Configurar Variable de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con esta variable:

```bash
# .env.local
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/dss_cafe"
```

Reemplaza `TU_CONTRASEÑA` con la contraseña que elegiste en PostgreSQL.

#### 4. Ejecutar Migraciones

```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# Esto creará las tablas automáticamente
```

#### 4.1. Abrir Prisma Studio

```bash
npx prisma studio
```

Esto abre una interfaz visual para revisar `KpiBase`, `Simulation` y `AuditLog`.

#### 5. Verificar conexión

Si `prisma studio` abre sin errores y ves las tablas del esquema, la persistencia quedó lista.

---

## 📦 Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción (build + start)
npm run build
npm start

# Linter
npm run lint

# Tests
npm run test
npm run test:watch

# Prisma (si usas DB)
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## ✅ Flujo recomendado para dejarlo funcionando

1. Instala dependencias con `npm install`.
2. Verifica con `npm run build`.
3. Si quieres probar la UI, ejecuta `npm run dev`.
4. Si quieres persistencia real, configura `DATABASE_URL` y aplica migraciones.
5. Si solo necesitas la demo académica, usa el modo mock y no configures base de datos.

---

## 🐛 Solución de Problemas Comunes

### Error: "port 3000 already in use"
```bash
# Libera el puerto (en otra terminal):

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Error: "npm: command not found"
- Node.js no está en el PATH
- Reinstala Node.js desde https://nodejs.org
- Reinicia la terminal después

### Error: "Module not found"
```bash
# Limpia e reinstala
npm install
```

En Windows, si quieres limpiar por completo antes de reinstalar, usa PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Error: "Cannot find .next directory"
```bash
# Construye el proyecto primero
npm run build
npm run dev
```

### Error: "ENOENT: no such file or directory"
```bash
# Verifica que estés en la carpeta correcta
cd dss_pausaCafe
# Luego ejecuta los comandos
```

### Error: "DATABASE_URL is not defined"
- Si vas a usar el modo demo, ignora este error y deja la base de datos sin configurar.
- Si vas a usar persistencia real, crea `.env.local` y define `DATABASE_URL`.

### Error: "npm run test:coverage" no existe
- En este repositorio no hay script de cobertura definido en `package.json`.
- Usa `npm run test` para Vitest y agrega cobertura solo si decides ampliar el setup.

---

## ✅ Verificación de Instalación

Para confirmar que todo funciona correctamente:

1. **Servidor corriendo**
   ```bash
   npm run dev
   # Debe mostrar "Local: http://localhost:3000"
   ```

2. **Navegador**
   - Abre http://localhost:3000
   - Deberías ver la interfaz oscura con navegación

3. **API funcionando**
   ```bash
   # En otra terminal:
   curl http://localhost:3000/api/simulations
   # Debe devolver respuesta JSON sin errores
   ```

4. **Ejecutar simulación**
   - Ve a `/simulator`
   - Ajusta los controles deslizantes
   - Haz click en "Ejecutar Simulación"
   - Deberías ver resultados en tiempo real

---

## 📚 Estructura de Carpetas Creadas

Después de instalación, verás:

```
dss_pausaCafe/
├── node_modules/          # Librerías instaladas (NO modificar)
├── .next/                 # Build de Next.js (generado automáticamente)
├── app/                   # Código fuente
├── lib/                   # Lógica compartida
├── prisma/               # Configuración de BD (opcional)
├── public/               # Archivos estáticos
├── __tests__/            # Tests
├── package.json          # Dependencias del proyecto
├── .env.local            # Variables de entorno (crear si usas DB)
└── README.md             # Este archivo
```

---

## 🎯 Próximos Pasos

### Para Desarrolladores
1. Familiarizarte con la estructura en [README.md](./README.md)
2. Revisar [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) para arquitectura
3. Explorar [API.md](./API.md) para endpoints disponibles
4. Ver tests en `__tests__/` para ejemplos de uso

### Para Usuarios
1. Explorar todos los módulos (Dashboard, Simulator, etc.)
2. Leer [README.md](./README.md) para entender el simulador
3. Ver ejemplos de uso en la sección "Guía Rápida"
4. Exportar resultados en PDF para tu carpeta

### Para Presentación
1. Ejecutar `npm run dev`
2. Abrir http://localhost:3000/simulator
3. Ingresar parámetros de ejemplo
4. Mostrar los 3 escenarios y análisis de riesgos
5. Exportar resultados a PDF como demo

---

## 🆘 Ayuda Adicional

### Contacto
- Abre un issue en GitHub: https://github.com/enzogabALF/dss_pausaCafe/issues
- Contacta al autor (Enzo Gabriel)

### Recursos Externos
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 📝 Notas Importantes

- **Datos Mock**: En modo demo, los datos de KPI son simulados pero válidos
- **Sin Internet**: La aplicación funciona offline completamente
- **Puerto 3000**: Asegúrate que no tengas otra app usando este puerto
- **Node Version**: Ten Node v18+ para máxima compatibilidad

---

**¡Listo! Ya deberías tener el proyecto corriendo. Disfruta usando DSS Pausa Cafe! 🚀**

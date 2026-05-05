# 📚 Centro de Documentación - DSS Pausa Cafe

Bienvenido al centro de documentación del proyecto. Aquí encontrarás guías, especificaciones técnicas y ejemplos de uso.

---

## 🚀 **Comienza Aquí**

### Eres un usuario nuevo? 
👉 **[README.md](./README.md)** - Descripción general, features principales y quick start

### Quieres instalar el proyecto?
👉 **[INSTALLATION.md](./INSTALLATION.md)** - Guía paso a paso (Windows/Mac/Linux)

### Necesitas usar el simulador?
👉 **[GUIA_USO_SIMULADOR.md](./GUIA_USO_SIMULADOR.md)** - Tutorial completo con ejemplos

### Vas a presentar el proyecto?
👉 **[PRESENTACION_EJECUTIVA.md](./PRESENTACION_EJECUTIVA.md)** - Resumen para ejecutivos e inversores

---

## 📖 **Documentación Completa**

### Frontend & Componentes

| Archivo | Descripción | Para quién |
|---------|------------|-----------|
| [README.md](./README.md) | Descripción general + Quick Start | Todos |
| [GUIA_USO_SIMULADOR.md](./GUIA_USO_SIMULADOR.md) | Cómo usar cada módulo | Usuarios finales |
| [ESPECIFICACION_TECNICA.md](./ESPECIFICACION_TECNICA.md) | Requerimientos, variables, QA | Arquitectos/Devs |
| [MODELO_DATOS.md](./MODELO_DATOS.md) | Modelo ER, diccionario de datos | DBAs/Devs |
| [app/components/](./app/components/) | Código de componentes React | Desarrolladores |
| [app/components/simulator/](./app/components/simulator/) | Componentes del simulador | Desarrolladores |

### Backend & API

| Archivo | Descripción | Para quién |
|---------|------------|-----------|
| [API.md](./API.md) | Referencia de endpoints REST | Desarrolladores |
| [app/api/](./app/api/) | Código de rutas API | Desarrolladores |
| [lib/simulation.ts](./lib/simulation.ts) | Lógica de cálculos financieros | Desarrolladores |
| [lib/types.ts](./lib/types.ts) | Tipos TypeScript compartidos | Desarrolladores |

### Base de Datos (Opcional)

| Archivo | Descripción | Para quién |
|---------|------------|-----------|
| [prisma/schema.prisma](./prisma/schema.prisma) | Schema de BD | DevOps/Desarrolladores |
| [lib/prisma.ts](./lib/prisma.ts) | Cliente Prisma | Desarrolladores |
| [INSTALLATION.md#base-de-datos](./INSTALLATION.md) | Setup de PostgreSQL | DevOps |

### Testing

| Archivo | Descripción | Para quién |
|---------|------------|-----------|
| [__tests__/](../__tests__/) | Suite de tests Vitest | QA/Desarrolladores |
| [vitest.config.ts](./vitest.config.ts) | Configuración de tests | Desarrolladores |

---

## 🎯 **Guías por Caso de Uso**

### 1. "Quiero ejecutar el proyecto rápido"
```
1. Leer: README.md (Quick Start)
2. Ejecutar: npm install && npm run dev
3. Abrir: http://localhost:3000
4. Explorar: Todos los módulos
```

### 2. "Necesito entender cómo funciona"
```
1. Leer: README.md (Características, Stack)
2. Revisar: IMPLEMENTATION_PLAN.md (Arquitectura)
3. Explorar: API.md (Endpoints)
4. Investigar: Código fuente (lib/simulation.ts)
```

### 3. "Voy a presentar a inversores"
```
1. Leer: PRESENTACION_EJECUTIVA.md
2. Ejecutar: npm run dev
3. Demo: Ejecutar simulaciones en vivo
4. Exportar: PDF con resultados
```

### 4. "Voy a desarrollar nuevas features"
```
1. Leer: README.md (Stack tecnológico)
2. Revisar: IMPLEMENTATION_PLAN.md
3. Estudiar: Estructura de componentes (app/components/)
4. Ver tests: __tests__/ (ejemplos de cómo probar)
5. Seguir: Estilo de código existente
```

### 5. "Necesito integrar base de datos"
```
1. Leer: INSTALLATION.md (Modo con BD)
2. Setup: PostgreSQL + .env.local
3. Ejecutar: npx prisma migrate dev
4. Verificar: npx prisma studio
```

---

## 📋 **Tabla de Archivos de Documentación**

```
dss_pausaCafe/
│
├── 📄 README.md (LEER PRIMERO)
│   ├── Descripción general
│   ├── Quick start
│   ├── Estructura del proyecto
│   ├── Stack tecnológico
│   └── Features principales
│
├── 📄 INSTALLATION.md (Para instalar)
│   ├── Requisitos del sistema
│   ├── Pasos de instalación
│   ├── Configuración (con/sin BD)
│   ├── Scripts disponibles
│   └── Troubleshooting
│
├── 📄 GUIA_USO_SIMULADOR.md (Para usar)
│   ├── Acceso a la app
│   ├── Interfaz del simulador
│   ├── Cómo ejecutar simulaciones
│   ├── Interpretar resultados
│   ├── Casos de uso prácticos
│   ├── Exportar resultados
│   └── FAQ
│
├── 📄 API.md (Para desarrolladores)
│   ├── Documentación de endpoints
│   ├── Ejemplos de requests/responses
│   ├── Tipos TypeScript
│   └── Error handling
│
├── 📄 IMPLEMENTATION_PLAN.md (Para arquitectura)
│   ├── Visión general
│   ├── Fases completadas
│   ├── Resultados de tests
│   ├── Próximos pasos
│   └── Stack técnico
│
├── 📄 PRESENTACION_EJECUTIVA.md (Para junta)
│   ├── Resumen ejecutivo
│   ├── Problema y solución
│   ├── Beneficios
│   ├── Ejemplos de resultados
│   ├── Roadmap
│   └── ROI
│
├── 🛠️ demo.ps1 (Script PowerShell)
│   ├── Verificación automática
│   ├── Menú interactivo
│   ├── Ejecución de pruebas
│   └── Demo en vivo
│
└── 📁 Código Fuente
    ├── app/
    ├── lib/
    ├── prisma/
    ├── __tests__/
    └── public/
```

---

## 🔍 **Búsqueda Rápida de Información**

### Quiero aprender sobre...

#### VAN, TIR, Payback
👉 [GUIA_USO_SIMULADOR.md#interpretar](./GUIA_USO_SIMULADOR.md#interpretar-resultados)

#### Cómo instalar sin errores
👉 [INSTALLATION.md#solucion-de-problemas](./INSTALLATION.md#-solución-de-problemas-comunes)

#### Endpoints disponibles
👉 [API.md#endpoints](./API.md#endpoints)

#### Estructura de archivos
👉 [README.md#estructura-del-proyecto](./README.md#-estructura-del-proyecto)

#### Lógica de simulación (código)
👉 [lib/simulation.ts](./lib/simulation.ts)

#### Tipos y validaciones
👉 [lib/types.ts](./lib/types.ts)

#### Tests unitarios
👉 [__tests__/simulation.test.ts](./__tests__/simulation.test.ts)

#### Componentes React
👉 [app/components/](./app/components/)

---

## 🚦 **Nivel de Complejidad**

### ⭐ Básico
- [README.md](./README.md) - Leer general
- [GUIA_USO_SIMULADOR.md](./GUIA_USO_SIMULADOR.md) - Usar aplicación
- [INSTALLATION.md](./INSTALLATION.md) - Instalar

### ⭐⭐ Intermedio
- [API.md](./API.md) - Consumir endpoints
- Revisar código fuente en `app/components/`
- Ejecutar tests: `npm run test`

### ⭐⭐⭐ Avanzado
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Arquitectura
- [lib/simulation.ts](./lib/simulation.ts) - Lógica matemática
- [INSTALLATION.md#base-de-datos](./INSTALLATION.md) - Setup de BD
- Prisma ORM: [prisma/schema.prisma](./prisma/schema.prisma)

---

## 💻 **Comandos Útiles**

### Desarrollo
```bash
npm run dev              # Iniciar servidor local
npm run build           # Compilar para producción
npm start               # Iniciar en producción
```

### Testing
```bash
npm run test            # Ejecutar tests una vez
npm run test:watch     # Tests en modo observador
npm run test:coverage  # Reporte de cobertura
```

### Linting
```bash
npm run lint            # Verificar estilo de código
```

### Base de Datos (opcional)
```bash
npx prisma generate    # Generar cliente Prisma
npx prisma migrate dev # Ejecutar migraciones
npx prisma studio     # Interfaz visual de BD
```

### Script de Demo
```bash
pwsh demo.ps1          # Ejecutar menú interactivo (Windows)
```

---

## 📞 **Contacto y Ayuda**

### Reportar un Problema
- GitHub Issues: https://github.com/enzogabALF/dss_pausaCafe/issues

### Preguntas Técnicas
- Ver FAQ en [GUIA_USO_SIMULADOR.md#faq](./GUIA_USO_SIMULADOR.md#-preguntas-frecuentes)

### Sugerencias
- Contactar al autor (Enzo Gabriel)

---

## 📚 **Recursos Externos**

### Documentación de Librerías
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Zod Validation](https://zod.dev)

### Tutoriales Relacionados
- Cálculos Financieros (VAN, TIR)
- Next.js App Router
- React Hooks Avanzados
- TypeScript Strict Mode

---

## ✅ **Checklist de Lectura Recomendada**

- [ ] Leer [README.md](./README.md) (5-10 min)
- [ ] Ejecutar instalación [INSTALLATION.md](./INSTALLATION.md) (10-15 min)
- [ ] Explorar app en http://localhost:3000 (10 min)
- [ ] Leer [GUIA_USO_SIMULADOR.md](./GUIA_USO_SIMULADOR.md) (15 min)
- [ ] Ejecutar una simulación (2 min)
- [ ] Exportar resultados a PDF (1 min)
- [ ] Revisar [API.md](./API.md) (10 min)
- [ ] Leer [PRESENTACION_EJECUTIVA.md](./PRESENTACION_EJECUTIVA.md) (5 min)

**Total: ~60 minutos para dominar el proyecto**

---

## 🎓 **Próximos Pasos**

1. **Principiante**: Comienza con [README.md](./README.md)
2. **Usuario**: Lee [GUIA_USO_SIMULADOR.md](./GUIA_USO_SIMULADOR.md)
3. **Desarrollador**: Estudia [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
4. **Presentador**: Prepara con [PRESENTACION_EJECUTIVA.md](./PRESENTACION_EJECUTIVA.md)

---

**¡Gracias por usar DSS Pausa Cafe! 🚀**

Última actualización: 3 de mayo de 2026

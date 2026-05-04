# DSS Pausa Cafe - Sistema de Soporte de Decisiones

![Versión](https://img.shields.io/badge/version-0.1.0-blue)
![Estado](https://img.shields.io/badge/estado-MVP%20Demo-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Descripción General

**DSS Pausa Cafe** es un **Sistema de Soporte de Decisiones (Decision Support System)** diseñado para **Pausa Cafe** que permite proyectar escenarios de negocio y evaluar la viabilidad de inversiones mediante análisis financiero automático.

El sistema simula **3 escenarios económicos** (Favorable, Normal, Desfavorable) y calcula indicadores clave como **VAN (Valor Actual Neto)**, **TIR (Tasa Interna de Retorno)** y **Payback Period** para ayudar en la toma de decisiones estratégicas.

### ✨ Características Principales

- 🎯 **Simulador de Inversión**: Proyecta 3 escenarios automáticos con variaciones personalizadas
- 📊 **Análisis Financiero**: Calcula VAN, TIR, Payback y flujos mensuales
- ⚠️ **Análisis de Riesgos**: Evalúa 4 factores clave (dólar, demanda, competencia, energía)
- 📈 **Dashboard Ejecutivo**: KPIs en tiempo real con visualizaciones interactivas
- 📱 **Interfaz Responsive**: Diseño oscuro moderno y fácil de usar
- 📊 **Múltiples Módulos**: Dashboard, Simulador, Productos, Analíticas, Alertas
- 💾 **Modo Demo**: Funciona sin base de datos (perfecto para MVP)

---

## 🚀 Quick Start

### Requisitos
- Node.js 18+ 
- npm o yarn
- Windows/Mac/Linux

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/enzogabALF/dss_pausaCafe.git
cd dss_pausaCafe

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:3000**

### Uso Básico

1. **Acceder al Simulador**: http://localhost:3000/simulator
2. **Ingresar parámetros**:
   - Inversión Inicial: $800,000
   - Costo por Orden: $20
   - Pedidos Diarios: 50
   - Ticket Promedio: $10,000
3. **Hacer clic en "Ejecutar Simulación"**
4. **Ver resultados** de 3 escenarios con VAN, TIR y Payback

---

## 📁 Estructura del Proyecto

```
dss_pausaCafe/
├── app/
│   ├── api/
│   │   ├── kpi/route.ts              # API de KPIs
│   │   └── simulations/route.ts      # API de simulaciones
│   ├── components/
│   │   ├── alerts/                   # Componentes de alertas
│   │   ├── analytics/                # Componentes de análisis
│   │   ├── dashboard/                # Componentes de dashboard
│   │   ├── navigation/               # Header y Sidebar
│   │   ├── products/                 # Componentes de productos
│   │   └── simulator/                # Componentes del simulador
│   ├── alerts/page.tsx               # Página de alertas
│   ├── analytics/page.tsx            # Página de analíticas
│   ├── dashboard/page.tsx            # Página de dashboard
│   ├── page.tsx                      # Página de inicio
│   ├── products/page.tsx             # Página de productos
│   ├── simulator/page.tsx            # Página del simulador
│   ├── layout.tsx                    # Layout general
│   └── globals.css                   # Estilos globales
├── lib/
│   ├── api-utils.ts                  # Utilidades de API
│   ├── export-utils.ts               # Exportación PDF/CSV
│   ├── hooks.ts                      # Hooks React personalizados
│   ├── prisma.ts                     # Cliente Prisma (opcional)
│   ├── simulation.ts                 # Lógica de simulación
│   ├── types.ts                      # Tipos TypeScript
│   └── validations.ts                # Esquemas de validación Zod
├── prisma/
│   └── schema.prisma                 # Schema de base de datos
├── public/                           # Archivos estáticos
├── __tests__/                        # Tests (Vitest)
├── package.json                      # Dependencias y scripts
├── tsconfig.json                     # Config TypeScript
├── next.config.mjs                   # Config Next.js
├── tailwind.config.ts                # Config Tailwind CSS
├── vitest.config.ts                  # Config Vitest
├── API.md                            # Documentación API
└── IMPLEMENTATION_PLAN.md            # Plan técnico
```

---

## 🎮 Módulos de la Aplicación

### 1. **Dashboard** (`/dashboard`)
- KPIs en tiempo real (Órdenes, Ingresos, Margen, Ocupación)
- Gráficos de ventas por hora y semana
- Estado de ocupación en vivo

### 2. **Simulador** (`/simulator`)
- Controles interactivos para parámetros de inversión
- Simulación de 3 escenarios automáticos
- Resultados detallados (VAN, TIR, Payback)
- Panel de análisis de riesgos
- Exportar resultados a PDF/CSV

### 3. **Productos** (`/products`)
- Tabla de productos con ventas
- Gráfico de rentabilidad por categoría
- Análisis de ocupación por horario

### 4. **Analíticas** (`/analytics`)
- Proyecciones de demanda
- Análisis de tendencias
- Métricas de desempeño

### 5. **Alertas** (`/alerts`)
- Sistema de alertas en tiempo real
- Recomendaciones por escenario
- Filtros y busca

---

## 📊 Lógica de Simulación

### Escenarios

El sistema calcula automáticamente **3 escenarios** basados en variaciones predefinidas:

| Escenario | Variación | Pedidos | Ticket | Margen | Desc Digitales |
|-----------|-----------|---------|--------|--------|-----------------|
| 🟢 Favorable | +38% | +20% | +15% | +10% | +100% |
| 🟡 Normal | +13.5% | +5% | +8% | +2% | +50% |
| 🔴 Desfavorable | -28% | -20% | -10% | -15% | -50% |

### Indicadores Financieros

- **VAN (Valor Actual Neto)**: Valor presente de flujos futuros con tasa de descuento 1%
- **TIR (Tasa Interna de Retorno)**: Tasa de rentabilidad anualizada
- **Payback**: Meses para recuperar la inversión inicial
- **Ingreso Neto**: Ganancia total proyectada

### Análisis de Riesgos

Se evalúan 4 factores clave:
1. **Variación del Dólar**: Impacto en costos importados
2. **Variación de Demanda**: Incertidumbre en volumen de clientes
3. **Variación de Competencia**: Presión de competidores
4. **Variación de Costo de Energía**: Fluctuación en servicios

---

## 🔌 API REST

La aplicación expone dos endpoints principales para simulaciones y KPIs:

### POST /api/simulations
Ejecuta una simulación de inversión

```bash
curl -X POST http://localhost:3000/api/simulations \
  -H "Content-Type: application/json" \
  -d '{
    "initialInvestment": 800000,
    "costPerOrder": 20,
    "dailyOrders": 50,
    "averageTicket": 10000
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "persisted": false,
  "data": {
    "favorable": {
      "van": 350990493,
      "tir": 1000,
      "payback": 0,
      "income": 15234000
    },
    "normal": {
      "van": 288534934,
      "tir": 1000,
      "payback": 0.1,
      "income": 5234000
    },
    "unfavorable": {
      "van": 182742866,
      "tir": 1000,
      "payback": 0.1,
      "income": -234000
    },
    "risks": {
      "dolarVariation": 2,
      "demandVariation": 4.5,
      "competitionVariation": 2.5,
      "energyCostVariation": 3.5,
      "totalImpact": 1.3
    }
  },
  "timestamp": "2026-05-03T23:08:28Z"
}
```

### GET /api/kpi
Obtiene KPIs actuales

```bash
curl http://localhost:3000/api/kpi
```

**Respuesta:**
```json
{
  "success": true,
  "source": "fallback-mock",
  "data": {
    "date": "2026-05-03",
    "totalOrders": 50,
    "totalRevenue": 210000,
    "averageTicket": 4250,
    "occupancyRate": 72,
    "margin": 68.5
  },
  "timestamp": "2026-05-03T23:08:32Z"
}
```

Ver [API.md](./API.md) para documentación completa.

---

## 🛠️ Stack Tecnológico

| Aspecto | Tecnología |
|--------|-----------|
| Framework | Next.js 15+ (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Componentes | React 19 |
| Validación | Zod |
| ORM | Prisma (opcional) |
| Testing | Vitest |
| Exportación | jsPDF + html2canvas |

---

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "next": "^15.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^4.4.2",
    "jspdf": "^4.2.1",
    "html2canvas": "^1.4.1",
    "@prisma/client": "^6.12.0",
    "prisma": "^6.12.0"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.3"
  }
}
```

---

## 🧪 Testing

Ejecutar tests:

```bash
# Tests unitarios
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

Tests incluyen:
- Lógica de simulación (VAN, TIR, Payback)
- Validación de entrada (Zod schemas)
- Componentes React
- Integración API

---

## 📤 Exportación de Resultados

El simulador permite exportar resultados en dos formatos:

### PDF
- Reporte ejecutivo con escenarios y gráficos
- Análisis de riesgos
- Recomendaciones

### CSV
- Datos tabulares para análisis en Excel/Sheets
- Series de tiempo de flujos mensuales
- KPIs por escenario

---

## 🌐 Modos de Ejecución

### Modo Demo (Predeterminado)
- Sin `DATABASE_URL` requerida
- Usa datos mock para KPIs
- Simulaciones se calculan pero **no se persisten**
- Perfecto para MVP y demostración

```bash
npm run dev
```

### Modo Persistencia (Opcional)
- Configura `DATABASE_URL` con PostgreSQL
- Simula y guarda resultados en BD
- Historial de simulaciones disponible
- Recomendado para producción

```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/dss_cafe"
npx prisma generate
npm run dev
```

---

## 🎯 Casos de Uso

### 1. Evaluar Viabilidad de Expansión
Simula si invertir $1M en equipamiento y capacitación es rentable bajo distintos escenarios de demanda.

### 2. Análisis de Sensibilidad
Ajusta parámetros (órdenes diarias, ticket promedio) para ver cómo afectan VAN y Payback.

### 3. Toma de Decisión Estratégica
Compara 3 escenarios (optimista, realista, pesimista) para tomar decisiones informadas.

### 4. Presentación a Inversores
Exporta resultados en PDF para incluir en propuestas de financiamiento.

---

## 📝 Guía Rápida: Cómo Usar el Simulador

### Paso 1: Ingresar Parámetros
En la página `/simulator`, ajusta los 4 controles deslizantes:

| Parámetro | Rango | Valor Ejemplo |
|-----------|-------|---------------|
| Inversión Inicial | $100k - $10M | $800,000 |
| Costo por Orden | $10 - $100 | $20 |
| Pedidos Diarios | 10 - 200 | 50 |
| Ticket Promedio | $1k - $50k | $10,000 |

### Paso 2: Ejecutar Simulación
Click en botón **"Ejecutar Simulación"** (verde)

### Paso 3: Revisar Resultados
Se mostrarán en tiempo real:
- **Cards de Escenarios**: VAN, TIR, Payback para cada escenario
- **Gráfico de Flujos**: Proyección mensual de ingresos
- **Panel de Riesgos**: 4 factores evaluados

### Paso 4: Exportar (Opcional)
- **PDF**: Reporte profesional para presentaciones
- **CSV**: Datos para análisis adicional

---

## 🐛 Troubleshooting

### "Error al conectar con la API"
- Verifica que el servidor esté corriendo: `npm run dev`
- Comprueba que estés en http://localhost:3000
- Revisa la consola del navegador (F12)

### "Los resultados no cambian al ajustar parámetros"
- Espera a que se ejecute la validación (el botón debe estar habilitado)
- Verifica los valores en los sliders
- Recarga la página

### "No puedo exportar a PDF"
- Asegúrate de tener espacio en disco
- Intenta con Chrome/Chromium
- Revisa permisos de descarga

---

## 📚 Documentación Adicional

- [API.md](./API.md) - Referencia completa de endpoints
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Arquitectura técnica
- [vitest.config.ts](./vitest.config.ts) - Configuración de tests

---

## 🤝 Contribuciones

Este es un proyecto MVP. Si deseas agregar features:

1. Fork el repositorio
2. Crea un branch: `git checkout -b feature/tu-feature`
3. Commit cambios: `git commit -m "Agrega mi feature"`
4. Push: `git push origin feature/tu-feature`
5. Abre un Pull Request

---

## 📄 Licencia

Proyecto bajo licencia MIT - ver LICENSE para detalles

---

## 👥 Autor

**Enzo Gabriel** - Ingeniería en Software III
Universidad - 2026

---

## 💡 Notas para Presentación

### Puntos Fuertes del MVP
✅ Cálculo financiero robusto y preciso  
✅ Interfaz intuitiva y moderna  
✅ Sin dependencia de base de datos (demo inmediata)  
✅ API REST documentada y funcional  
✅ Exportación de resultados profesional  
✅ TypeScript strict mode para calidad  

### Posibles Extensiones Futuras
- Dashboard en tiempo real con datos de BD
- Autenticación y multi-usuario
- Integraciones con sistemas de POS
- Análisis predictivos con ML
- Mobile app con React Native
- GraphQL API

---

## 📞 Soporte

Para preguntas o problemas:
- Abre un issue en GitHub
- Contacta al autor

---

**¡Gracias por usar DSS Pausa Cafe! 🚀**

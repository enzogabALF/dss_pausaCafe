# Plan de Implementación DSS Pausa Cafe - Simulador de Escenarios

## 📊 Visión General

Desarrollar un **motor de simulación de escenarios** que permita a Pausa Cafe proyectar KPIs bajo tres escenarios (favorable, normal, desfavorable) para tomar decisiones informadas.

---

## 🎯 Objetivos

1. ✅ Simular proyecciones de KPIs (Ingresos, Margen, Pedidos, Ticket Promedio)
2. ✅ Generar 3 escenarios automáticos con variaciones predefinidas
3. ✅ Proporcionar recomendaciones accionables por escenario
4. ✅ Dashboard visual con comparativas
5. ✅ Permitir sensibilidad manual de parámetros

---

## 📋 Especificación Funcional

### Datos Base de Pausa Cafe

```
Pedidos Diarios: 50
Ticket Promedio: $10,000
Margen Bruto/Venta: $5,000
Ingresos Mensuales: $15,000,000
Ventas Digitales: 15%
Margen Bruto Diario: $250,000
```

### Escenarios

#### FAVORABLE (Crecimiento +38%)
- Pedidos: 50 → 60 (+20%)
- Ticket: $10k → $11.5k (+15%)
- Margen: $5k → $5.5k (+10%)
- Ventas Digitales: 15% → 30% (+100%)
- **Resultado**: Ingresos +$5.7M, Margen +$3.39M

#### NORMAL (Crecimiento +13.5%)
- Pedidos: 50 → 53 (+5%)
- Ticket: $10k → $10.8k (+8%)
- Margen: $5k → $5.1k (+2%)
- Ventas Digitales: 15% → 22.5% (+50%)
- **Resultado**: Ingresos +$2M, Margen +$546k

#### DESFAVORABLE (Retroceso -28%)
- Pedidos: 50 → 40 (-20%)
- Ticket: $10k → $9k (-10%)
- Margen: $5k → $4.25k (-15%)
- Ventas Digitales: 15% → 7.5% (-50%)
- **Resultado**: Ingresos -$4.2M, Margen -$2.4M

---

## 🛠️ Arquitectura Técnica

### Stack de la Demo

- **Framework**: Next.js 15+ con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Validación**: Zod
- **Estado**: Server Components + client state mínimo cuando sea necesario

### API y Lógica de Negocio

La demo será full-stack dentro de Next.js, usando route handlers y servicios internos compartidos.

### Backend API

#### Endpoints Principales

```
POST /api/simulations
  Body: { escenario, parametros_custom, periodos_meses }
  Response: { simulationId, resultados, recomendaciones }

GET /api/simulations/:id
  Response: { simulacion_completa }

GET /api/simulations/scenarios/default
  Response: { favorable, normal, desfavorable }

PUT /api/simulations/:id/sensitivity
  Body: { pedidos_diarios?, ticket_promedio?, margen_bruto?, ... }
  Response: { resultados_actualizados }
```

#### Servicios Core

```typescript
// analytics.service.ts
class SimulationService {
  // Genera escenarios automáticos
  generateDefaultScenarios(baseKpis: KPIBase): Scenario[]
  
  // Proyecta KPIs para N períodos
  projectKPIs(scenario: Scenario, months: number): Projection[]
  
  // Calcula recomendaciones
  generateRecommendations(scenario: Scenario, projections: Projection[]): Recommendation[]
  
  // Análisis de sensibilidad
  sensitivityAnalysis(baseParams: Record<string, number>): SensitivityMatrix
}
```

### Frontend Componentes

Las pantallas del anexo definen una interfaz oscura, con barra lateral fija y módulos claramente separados. La navegación principal debe incluir:
- Dashboard Ejecutivo
- Simulador de Inversión / Simulación de Escenarios
- Análisis de Productos
- Analíticas
- Alertas y Recomendaciones
- Configuración

```
app/
├── page.tsx
├── dashboard/
│   ├── page.tsx
│   ├── loading.tsx
│   └── components/
├── simulator/
│   └── page.tsx
├── products/
│   └── page.tsx
├── analytics/
│   └── page.tsx
├── alerts/
│   └── page.tsx
├── layout.tsx
components/
├── KPICards.tsx
├── ScenarioComparison.tsx
├── RecommendationPanel.tsx
├── SensitivityPanel.tsx
└── ResultsTable.tsx
```

### Estructura Sugerida del Proyecto

```
dss_pausaCafe/
├── app/
├── components/
├── lib/
├── prisma/
├── public/
└── styles/
```

### Base de Datos

```sql
-- KPIs base de la cafetería
CREATE TABLE kpi_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedidos_diarios INTEGER NOT NULL,
  ticket_promedio DECIMAL(10,2) NOT NULL,
  margen_bruto DECIMAL(10,2) NOT NULL,
  ventas_digitales_pct DECIMAL(5,2) NOT NULL,
  ingreso_mensual DECIMAL(15,2) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Simulaciones guardadas
CREATE TABLE simulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  escenario VARCHAR(50) NOT NULL,
  parametros JSONB NOT NULL,
  resultados JSONB NOT NULL,
  recomendaciones JSONB,
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Modelo Prisma Inicial

```prisma
model KpiBase {
  id                 String   @id @default(uuid())
  pedidosDiarios     Int
  ticketPromedio     Decimal  @db.Decimal(10, 2)
  margenBruto        Decimal  @db.Decimal(10, 2)
  ventasDigitalesPct Decimal  @db.Decimal(5, 2)
  ingresoMensual     Decimal  @db.Decimal(15, 2)
  fechaRegistro      DateTime @default(now())
  createdAt          DateTime @default(now())
}

model Simulacion {
  id              String   @id @default(uuid())
  nombre          String
  escenario       String
  parametros      Json
  resultados      Json
  recomendaciones Json?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 📱 Interfaz de Usuario (Wireframes)

### Pantalla: Dashboard Ejecutivo

La referencia visual del anexo muestra un dashboard oscuro con tarjeta de métricas arriba, dos gráficos centrales y paneles de alertas/riesgos abajo.

```
┌─────────────────────────────────────────────────────────┐
│  CafeDecide / Pausa Cafe - Dashboard Ejecutivo         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  [KPI Cards Row]                                         │
│  ┌──────────┬──────────┬──────────┬──────────┬────────┐  │
│  │ Margen   │ Stock    │ Desperd. │ Servicio │ Ticket │  │
│  │ 68.5%    │ 4.2x     │ 3.8%     │ 4.2 min  │ $4.250 │  │
│  └──────────┴──────────┴──────────┴──────────┴────────┘  │
│                                                           │
│  [Filtros y Controles]                                    │
│  Períodos: [1M] [3M] [6M]  Actualización: Hoy 14:30       │
│                                                           │
│  [Gráfico 1: Ventas Semanales]                            │
│  Línea doble: Ventas vs Ganancia                          │
│                                                           │
│  [Gráfico 2: Ocupación por Horario]                       │
│  Barras por franja horaria con leyenda Alta/Media/Baja    │
│                                                           │
│  [Panel Inferior: Análisis de Riesgos]                     │
│  Sliders: Subida del dólar, demanda verano, competencia   │
│  costo energía, impacto total estimado                     │
│                                                           │
│  [Acciones]                                             │
│  Botón: Actualizar                                      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Pantalla: Simulador de Inversión

```
┌─────────────────────────────────────────────────────────┐
│  Simulador de Inversión                                 │
├─────────────────────────────────────────────────────────┤
│  Controles: inversión inicial, costo por pedido, pedidos │
│  diarios, ticket promedio                               │
│  Resultados: VAN, TIR, payback, viabilidad              │
│  Panel lateral: análisis de riesgos                     │
└─────────────────────────────────────────────────────────┘
```

### Pantalla: Análisis de Productos

```text
┌─────────────────────────────────────────────────────────┐
│  Análisis de Productos                                  │
├─────────────────────────────────────────────────────────┤
│  Tabla de rentabilidad por producto                     │
│  Columnas: Producto, Categoría, Precio, Costo, Margen,  │
│  Ventas                                                 │
│  Debajo: ventas semanales, ocupación por horario        │
└─────────────────────────────────────────────────────────┘
```

### Pantalla: Analíticas y Alertas

```text
┌─────────────────────────────────────────────────────────┐
│  Analíticas / Alertas y Recomendaciones                 │
├─────────────────────────────────────────────────────────┤
│  Panel de recomendaciones                              │
│  - Stock bajo                                           │
│  - Oportunidad de venta                                 │
│  - Margen negativo                                      │
│  - Tendencia positiva                                   │
│  Panel de riesgos con sliders e impacto estimado        │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Flujos de Datos

### Flujo 1: Cargar Simulación Predeterminada

```
Usuario accede Dashboard
         ↓
GET /api/v1/simulations/scenarios/default
         ↓
Backend calcula 3 escenarios automáticos
         ↓
Frontend renderiza gráficos + tablas
         ↓
Usuario ve Favorable, Normal, Desfavorable
```

### Flujo 2: Análisis de Sensibilidad

```
Usuario ajusta sliders
         ↓
Frontend envía: PUT /api/v1/simulations/1/sensitivity
         ↓
Backend recalcula con nuevos parámetros
         ↓
Gráficos se actualizan en tiempo real
         ↓
Recomendaciones se regeneran
```

---

## 🎯 Detalles de Implementación

### 1. Modelo de Datos (TypeScript)

```typescript
// types/kpi.ts
export interface KPIBase {
  pediosDiarios: number;
  ticketPromedio: number;
  margenBruto: number;
  ventasDigitalesPct: number;
  ingresoMensual: number;
}

export interface ScenarioVariation {
  name: 'favorable' | 'normal' | 'desfavorable';
  pedidosVariation: number;        // -20%, +5%, +20%
  ticketVariation: number;         // -10%, +8%, +15%
  margenVariation: number;         // -15%, +2%, +10%
  ventasDigitalesVariation: number; // -50%, +50%, +100%
}

export interface Projection {
  mes: number;
  pediosDiarios: number;
  ticketPromedio: number;
  ingresosDiarios: number;
  ingresosAcumulado: number;
  margenBrutoDiario: number;
  margenAcumulado: number;
}

export interface Simulation {
  id: string;
  escenario: 'favorable' | 'normal' | 'desfavorable';
  parametros: KPIBase;
  proyecciones: Projection[];
  recomendaciones: string[];
  createdAt: Date;
}
```

### 2. Lógica de Cálculo

```typescript
// services/simulation.service.ts
export class SimulationService {
  // Escenarios predefinidos
  private scenarios: ScenarioVariation[] = [
    {
      name: 'favorable',
      pedidosVariation: 1.2,         // +20%
      ticketVariation: 1.15,         // +15%
      margenVariation: 1.1,          // +10%
      ventasDigitalesVariation: 2.0  // +100%
    },
    {
      name: 'normal',
      pedidosVariation: 1.05,        // +5%
      ticketVariation: 1.08,         // +8%
      margenVariation: 1.02,         // +2%
      ventasDigitalesVariation: 1.5  // +50%
    },
    {
      name: 'desfavorable',
      pedidosVariation: 0.8,         // -20%
      ticketVariation: 0.9,          // -10%
      margenVariation: 0.85,         // -15%
      ventasDigitalesVariation: 0.5  // -50%
    }
  ];

  projectKPIs(baseKpi: KPIBase, scenario: ScenarioVariation, months: number): Projection[] {
    const projections: Projection[] = [];

    for (let mes = 1; mes <= months; mes++) {
      const pediosDiarios = baseKpi.pediosDiarios * scenario.pedidosVariation;
      const ticketPromedio = baseKpi.ticketPromedio * scenario.ticketVariation;
      const ingresosDiarios = pediosDiarios * ticketPromedio;
      const ingresosMes = ingresosDiarios * 30;
      
      const margenUnitario = baseKpi.margenBruto * scenario.margenVariation;
      const margenBrutoDiario = pediosDiarios * margenUnitario;
      const margenMes = margenBrutoDiario * 30;

      projections.push({
        mes,
        pediosDiarios,
        ticketPromedio,
        ingresosDiarios,
        ingresosAcumulado: ingresosMes * mes,
        margenBrutoDiario,
        margenAcumulado: margenMes * mes
      });
    }

    return projections;
  }

  generateRecommendations(scenario: ScenarioVariation, projections: Projection[]): string[] {
    const recommendations: string[] = [];

    if (scenario.name === 'favorable') {
      recommendations.push(
        'Expandir presencia en canales digitales',
        'Contratar personal adicional',
        'Invertir en equipamiento y mejoras'
      );
    } else if (scenario.name === 'normal') {
      recommendations.push(
        'Mantener operaciones actuales',
        'Optimizar costos operacionales',
        'Fortalecer programa de lealtad'
      );
    } else {
      recommendations.push(
        'Revisar estructura de precios',
        'Reducir costos no esenciales',
        'Acelerar estrategia digital'
      );
    }

    return recommendations;
  }
}
```

---

## ✅ Checklist de Implementación

### FASE 1: Backend (Semana 1)
- [ ] Crear modelos TypeScript
- [ ] Implementar SimulationService
- [ ] Crear endpoints REST con Next.js
- [ ] Tests unitarios (80% cobertura)
- [ ] Documentación OpenAPI

### FASE 2: Frontend (Semana 2)
- [ ] Crear componentes UI
- [ ] Integrar con API
- [ ] Gráficos con Recharts
- [ ] Responsividad (mobile-first)
- [ ] Accesibilidad

### FASE 3: Pulido (Semana 3)
- [ ] Exportar reportes (PDF)
- [ ] Persistencia de simulaciones
- [ ] Historial y comparativas
- [ ] Documentación usuario
- [ ] QA y testing

### Alcance de la Demo
- No se contempla despliegue por ahora.
- El foco está en validar UX, cálculos de negocio y simulaciones.
- La arquitectura debe quedar lista para desplegar más adelante sin reescritura mayor.

---

## 🎨 Paleta de Colores

```
Favorable:      #10b981 (verde)
Normal:         #f59e0b (ámbar)
Desfavorable:   #ef4444 (rojo)
Neutral:        #6b7280 (gris)
Highlight:      #3b82f6 (azul)
```

---

## 📈 KPIs de Éxito

- ✅ Dashboard carga en < 2 segundos
- ✅ Proyecciones precisas (validación manual)
- ✅ 100% de funcionalidades implementadas
- ✅ Cobertura de tests > 80%
- ✅ Usabilidad: 3 clics máximo para cualquier acción

---

**Versión**: 1.0.0
**Fecha**: 2026-05-03
**Estado**: 📋 Listo para Desarrollo

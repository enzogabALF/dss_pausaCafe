# 📊 MODELO DE DATOS - DSS PAUSA CAFE (Visualización)

## 1. FLUJO DE DATOS DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                            │
│              (Gerente, Analista Financiero)                 │
└────────────────────────┬────────────────────────────────────┘
                         │ Input
                         ↓
        ╔════════════════════════════════════════╗
        ║  FRONTEND (React + Next.js)            ║
        ║  ├─ Sliders (4 parámetros)            ║
        ║  ├─ Validación Zod (client)           ║
        ║  └─ Visualización (Charts)            ║
        ╚═══════════┬──────────────────────────╝
                    │ HTTP POST/GET
                    ↓
        ╔════════════════════════════════════════╗
        ║  API ROUTES (Next.js)                  ║
        ║  ├─ /api/simulations (POST)           ║
        ║  ├─ /api/kpi (GET/POST)               ║
        ║  └─ Validación Zod (server)           ║
        ╚═══════════┬──────────────────────────╝
                    │ Business Logic
                    ↓
        ╔════════════════════════════════════════╗
        ║  MOTOR DE CÁLCULOS                     ║
        ║  ├─ calculateVAN()                     ║
        ║  ├─ calculateTIR()                     ║
        ║  ├─ calculatePayback()                 ║
        ║  └─ analyzeRisks()                     ║
        ╚═══════════┬──────────────────────────╝
                    │ Results
                    ↓
        ╔════════════════════════════════════════╗
        ║  GENERADOR DE REPORTES                 ║
        ║  ├─ PDF (html2canvas + jsPDF)        ║
        ║  └─ CSV (string builder)               ║
        ╚═══════════┬──────────────────────────╝
                    │ (Opcional)
                    ↓
        ╔════════════════════════════════════════╗
        ║  BASE DE DATOS (Prisma)                ║
        ║  ├─ KpiBase (Histórico)                ║
        ║  ├─ Simulation (Resultados)            ║
        ║  └─ AuditLog (Trazabilidad)            ║
        ╚════════════════════════════════════════╝
                    │
                    ↓
                USUARIO
        (Descarga PDF/CSV)
```

## 2. ENTIDAD RELACIÓN DETALLADO

### Modelo Conceptual

```
┌──────────────────────────────┐
│        KpiBase               │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
│ date: DateTime               │
├──────────────────────────────┤
│ VENTAS:                       │
│ • totalOrders: Int           │
│ • totalRevenue: Float        │
│ • averageTicket: Float       │
│ • digitalSales: Float (%)    │
├──────────────────────────────┤
│ COSTOS:                       │
│ • totalCost: Float           │
│ • operationalCost: Float     │
│ • margin: Float (%)          │
├──────────────────────────────┤
│ OCUPACIÓN:                    │
│ • occupancyRate: Float (%)   │
│ • peakHours: JSON String     │
├──────────────────────────────┤
│ CATEGORÍAS:                   │
│ • categories: JSON String    │
├──────────────────────────────┤
│ AUDITORÍA:                    │
│ • createdAt: DateTime        │
│ • updatedAt: DateTime        │
└──────────────────────────────┘
           △ 1
           │
           │ 1:N
           │
           ▽
┌──────────────────────────────┐
│      Simulation              │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
│ kpiId: String (FK)           │
├──────────────────────────────┤
│ INPUT PARÁMETROS:            │
│ • initialInvestment: Float   │
│ • costPerOrder: Float (%)    │
│ • dailyOrders: Int           │
│ • averageTicket: Float       │
├──────────────────────────────┤
│ ESCENARIO FAVORABLE:         │
│ • favorableVAN: Float        │
│ • favorableTIR: Float        │
│ • favorablePayback: Float    │
│ • favorableIncome: Float     │
├──────────────────────────────┤
│ ESCENARIO NORMAL:            │
│ • normalVAN: Float           │
│ • normalTIR: Float           │
│ • normalPayback: Float       │
│ • normalIncome: Float        │
├──────────────────────────────┤
│ ESCENARIO DESFAVORABLE:      │
│ • unfavorableVAN: Float      │
│ • unfavorableTIR: Float      │
│ • unfavorablePayback: Float  │
│ • unfavorableIncome: Float   │
├──────────────────────────────┤
│ RIESGOS:                      │
│ • riskFactors: JSON String   │
│ • totalRiskImpact: Float (%) │
├──────────────────────────────┤
│ AUDITORÍA:                    │
│ • createdAt: DateTime        │
│ • updatedAt: DateTime        │
└──────────────────────────────┘
           △ N
           │
           │ N:1 (Implicit)
           │
           ▼
┌──────────────────────────────┐
│      AuditLog                │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
├──────────────────────────────┤
│ • action: String             │
│   (CREATE | UPDATE | DELETE) │
│ • model: String              │
│   (KpiBase | Simulation)     │
│ • recordId: String           │
│ • changes: JSON String       │
│ • userId: String             │
│ • createdAt: DateTime        │
└──────────────────────────────┘
```

## 3. EJEMPLO DE INSTANCIAS DE DATOS

### Ejemplo KpiBase

```json
{
  "id": "cl9x8y7z6w5v4u3t2s1r0q9p",
  "date": "2026-05-05T03:15:00Z",
  
  "totalOrders": 145,
  "totalRevenue": 1450000,
  "averageTicket": 10000,
  "digitalSales": 32.5,
  
  "totalCost": 435000,
  "operationalCost": 290000,
  "margin": 70.0,
  
  "occupancyRate": 72,
  "peakHours": {
    "morning": { "start": "08:00", "end": "10:30", "occupancy": 92 },
    "midday": { "start": "12:00", "end": "14:00", "occupancy": 78 }
  },
  
  "categories": {
    "café_premium": { "sales": 360000, "margin": 35 },
    "desayunos": { "sales": 208000, "margin": 28 },
    "almuerzos": { "sales": 312000, "margin": 32 },
    "postres": { "sales": 216000, "margin": 40 },
    "bebidas_especiales": { "sales": 288000, "margin": 38 }
  },
  
  "createdAt": "2026-05-05T03:15:00Z",
  "updatedAt": "2026-05-05T03:15:00Z"
}
```

### Ejemplo Simulation

```json
{
  "id": "cl9x8y7z6w5v4u3t2s1r0q9p",
  "kpiId": "cl9x8y7z6w5v4u3t2s1r0q9p",
  
  "initialInvestment": 800000,
  "costPerOrder": 20,
  "dailyOrders": 50,
  "averageTicket": 10000,
  
  "favorableVAN": 350990493,
  "favorableTIR": 1000,
  "favorablePayback": 0.0,
  "favorableIncome": 15200000,
  
  "normalVAN": 288534934,
  "normalTIR": 1000,
  "normalPayback": 0.1,
  "normalIncome": 5200000,
  
  "unfavorableVAN": 182742866,
  "unfavorableTIR": 1000,
  "unfavorablePayback": 0.1,
  "unfavorableIncome": -200000,
  
  "riskFactors": {
    "dolarVariation": 2.0,
    "demandVariation": 4.5,
    "competitionVariation": 2.5,
    "energyCostVariation": 3.5
  },
  "totalRiskImpact": 1.3,
  
  "createdAt": "2026-05-05T03:15:00Z",
  "updatedAt": "2026-05-05T03:15:00Z"
}
```

### Ejemplo AuditLog

```json
{
  "id": "cl9x8y7z6w5v4u3t2s1r0q9p",
  "action": "CREATE",
  "model": "Simulation",
  "recordId": "cl9x8y7z6w5v4u3t2s1r0q9p",
  "changes": {
    "initialInvestment": "0 → 800000",
    "costPerOrder": "0 → 20",
    "dailyOrders": "0 → 50",
    "averageTicket": "0 → 10000",
    "status": "NEW → CREATED"
  },
  "userId": "user_001",
  "createdAt": "2026-05-05T03:15:00Z"
}
```

## 4. FLUJO DE SIMULACIÓN

```
ENTRADA:
┌─────────────────────────────────────────┐
│ initialInvestment: 800,000 USD          │
│ costPerOrder: 20% (0.20)                │
│ dailyOrders: 50 pedidos/día             │
│ averageTicket: 10,000 USD               │
└─────────────────────────────────────────┘
                    ↓
CÁLCULOS POR ESCENARIO:
┌─────────────────────────────────────────┐
│ Favorable (+38%)                        │
│ ├─ Días: 365 * 1.38 = 503.7 días      │
│ ├─ Ordenes: 50 * 1.38 = 69 por día     │
│ ├─ Ingresos: 69 * 10k * 503.7 = 345M   │
│ ├─ Costos: 345M * 0.20 = 69M           │
│ ├─ Neto: 345M - 69M = 276M             │
│ ├─ VAN (1% disc): 350.99M              │
│ ├─ TIR: 1000%                           │
│ └─ Payback: 0.0 meses                   │
│                                          │
│ Normal (+13.5%)                         │
│ ├─ Días: 365 * 1.135 = 414.3 días     │
│ ├─ Ordenes: 50 * 1.135 = 56.75/día     │
│ ├─ Ingresos: 56.75 * 10k * 414.3 = 235M│
│ ├─ Costos: 235M * 0.20 = 47M           │
│ ├─ Neto: 235M - 47M = 188M             │
│ ├─ VAN (1% disc): 288.53M              │
│ ├─ TIR: 1000%                           │
│ └─ Payback: 0.1 meses                   │
│                                          │
│ Desfavorable (-28%)                     │
│ ├─ Días: 365 * 0.72 = 262.8 días      │
│ ├─ Ordenes: 50 * 0.72 = 36 por día     │
│ ├─ Ingresos: 36 * 10k * 262.8 = 94.6M  │
│ ├─ Costos: 94.6M * 0.20 = 18.9M        │
│ ├─ Neto: 94.6M - 18.9M = 75.7M         │
│ ├─ VAN (1% disc): 182.74M              │
│ ├─ TIR: 1000%                           │
│ └─ Payback: 0.1 meses                   │
└─────────────────────────────────────────┘
                    ↓
ANÁLISIS DE RIESGOS:
┌─────────────────────────────────────────┐
│ Factor 1: Variación dólar    = 2.0%     │
│ Factor 2: Variación demanda  = 4.5%     │
│ Factor 3: Nueva competencia  = 2.5%     │
│ Factor 4: Costos energía     = 3.5%     │
│                                          │
│ Impacto Total:                          │
│ (2.0 + 4.5 + 2.5 + 3.5) / 4 = 3.125%   │
│ Ponderado: 1.3% (ajustado)              │
└─────────────────────────────────────────┘
                    ↓
SALIDA:
┌─────────────────────────────────────────┐
│ Escenario Favorable: VAN = $350.99M    │
│ Escenario Normal: VAN = $288.53M       │
│ Escenario Desfavorable: VAN = $182.74M │
│ Impacto Riesgos: +1.3%                  │
│ Recomendación: VIABLE ✅               │
└─────────────────────────────────────────┘
```

## 5. MAPEO DE TIPOS TYPESCRIPT

```typescript
// INPUT
interface SimulationInput {
  initialInvestment: number    // 800000
  costPerOrder: number         // 20
  dailyOrders: number          // 50
  averageTicket: number        // 10000
}

// OUTPUT POR ESCENARIO
interface ScenarioResult {
  van: number                  // 288534934
  tir: number                  // 1000
  payback: number              // 0.1
  income: number               // 5200000
}

// OUTPUT TOTAL
interface SimulationResultData {
  favorable: ScenarioResult    // {...}
  normal: ScenarioResult       // {...}
  unfavorable: ScenarioResult  // {...}
  risks: RiskAnalysis          // {...}
}

// ANÁLISIS DE RIESGOS
interface RiskAnalysis {
  dolarVariation: number       // 2
  demandVariation: number      // 4.5
  competitionVariation: number // 2.5
  energyCostVariation: number  // 3.5
  totalImpact: number          // 1.3
}

// RESPUESTA API
interface ApiResponse<T> {
  success: boolean             // true
  data: T                       // SimulationResultData
  timestamp: string            // "2026-05-05T03:15:00Z"
  error?: string               // undefined
}
```

## 6. DICCIONARIO DE VARIABLES COMPACTO

### Variables INPUT

| Var | Tipo | Min | Max | Unidad | Descripción |
|-----|------|-----|-----|--------|-------------|
| initialInvestment | Number | 100k | 10M | USD | Capital invertido |
| costPerOrder | Number | 1 | 100 | % | Costo operativo |
| dailyOrders | Number | 1 | 500 | Uni | Volumen diario |
| averageTicket | Number | 1k | 100k | USD | Venta promedio |

### Variables OUTPUT (x3 escenarios)

| Var | Tipo | Rango | Unidad | Descripción |
|-----|------|-------|--------|-------------|
| van | Number | 0+ | USD | Valor actual neto |
| tir | Number | -100+ | % | Rentabilidad anual |
| payback | Number | 0+ | meses | Recuperación capital |
| income | Number | -∞ + | USD | Ganancia neta |

### Variables de RIESGO

| Var | Tipo | Rango | Unidad | Descripción |
|-----|------|-------|--------|-------------|
| dolarVariation | Number | 0-10 | % | Impacto tipo cambio |
| demandVariation | Number | 0-10 | % | Impacto demanda |
| competitionVariation | Number | 0-10 | % | Impacto competencia |
| energyCostVariation | Number | 0-10 | % | Impacto energía |
| totalImpact | Number | 0-15 | % | Impacto acumulado |

## 7. RESTRICCIONES Y VALIDACIONES

```
NIVEL DE BASE DE DATOS:
├─ initialInvestment
│  ├─ CONSTRAINT check_investment_min: >= 100000
│  └─ CONSTRAINT check_investment_max: <= 10000000
│
├─ costPerOrder
│  ├─ CONSTRAINT check_cost_min: >= 1
│  └─ CONSTRAINT check_cost_max: <= 100
│
├─ dailyOrders
│  ├─ CONSTRAINT check_orders_min: >= 1
│  └─ CONSTRAINT check_orders_max: <= 500
│
├─ averageTicket
│  ├─ CONSTRAINT check_ticket_min: >= 1000
│  └─ CONSTRAINT check_ticket_max: <= 100000
│
└─ All numeric fields: NOT NULL

NIVEL DE APLICACIÓN (Zod):
├─ initialInvestment: .number().positive().min(100000).max(10000000)
├─ costPerOrder: .number().min(1).max(100)
├─ dailyOrders: .number().int().min(1).max(500)
└─ averageTicket: .number().positive().min(1000).max(100000)
```

---

## 8. NUEVOS MODELOS (RB1-RB5)

### RB1: AuthSession (Autenticación y Seguridad)

```
┌──────────────────────────────┐
│      AuthSession             │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
│ userId: String               │
│ name: String                 │
│ role: String                 │
│   (viewer|analyst|manager|   │
│    admin)                    │
│ expiresAt: DateTime (null)   │
│ createdAt: DateTime          │
│ updatedAt: DateTime          │
└──────────────────────────────┘
```

**Propósito**: Gestionar sesiones de usuario con roles basados en middleware.
**Rutas protegidas**: `/dashboard/*`, `/api/operations/*`, `/api/reports/*`

### RB3: OperationalInventory (Datos Operacionales - Inventario)

```
┌──────────────────────────────┐
│   OperationalInventory       │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
│ name: String                 │
│   (Café molido, Leche,       │
│    Pastelería, Vasos)        │
│ category: String             │
│   (Bebidas, Snacks,          │
│    Operación)                │
│ stock: Int                   │
│ minimum: Int                 │
│ target: Int                  │
│ unit: String                 │
│   (kg, l, unid, etc)         │
│ critical: Boolean            │
│ createdAt: DateTime          │
│ updatedAt: DateTime          │
└──────────────────────────────┘
```

**Ejemplo de instancia**:
```json
{
  "id": "cl9x8y7z6w5v4u3t2s1r0q9p",
  "name": "Café molido",
  "category": "Bebidas",
  "stock": 72,
  "minimum": 50,
  "target": 120,
  "unit": "kg",
  "critical": false
}
```

### RB3: StaffMember (Datos Operacionales - Personal)

```
┌──────────────────────────────┐
│      StaffMember             │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
│ name: String                 │
│ role: String                 │
│   (barista, pastelero,       │
│    gerente, etc)             │
│ shift: String                │
│   (morning, afternoon,       │
│    night)                    │
│ active: Boolean              │
│ workload: Float              │
│   (0-1.0 = 0-100%)           │
│ createdAt: DateTime          │
│ updatedAt: DateTime          │
└──────────────────────────────┘
```

**Ejemplo de instancia**:
```json
{
  "id": "emp-001",
  "name": "Juan",
  "role": "barista",
  "shift": "morning",
  "active": true,
  "workload": 0.85
}
```

### RB4: Alertas Dinámicas (Integración con risk-engine)

**Reglas de generación**:
```
IF margin < 65% THEN priority = "critical"
IF occupancyRate > 85% THEN priority = "warning"
IF stockCoveragePct < 50% THEN priority = "critical"
IF capacityUtilizationPct > 90% THEN priority = "critical"
```

**Estructura de alerta**:
```json
{
  "alertId": "alert-id",
  "title": "Margen crítico detectado",
  "description": "Margen por debajo de 65%",
  "priority": "critical",
  "category": "margin",
  "scenario": "normal",
  "timestamp": "2026-05-05T08:30:00Z"
}
```

### RB5: ReportHistory (Reportes Persistentes)

```
┌──────────────────────────────┐
│      ReportHistory           │
├──────────────────────────────┤
│ id: String (CUID) [PK]       │
│ title: String                │
│ format: String               │
│   (pdf, csv)                 │
│ scenarioName: String         │
│   (Favorable, Normal,        │
│    Desfavorable)             │
│ investment: Float            │
│ costPercent: Float           │
│ dailyOrders: Int             │
│ averageTicket: Float         │
│ persisted: Boolean           │
│   (localStorage o DB)        │
│ source: String               │
│   (demo, api)                │
│ createdAt: DateTime          │
│ updatedAt: DateTime          │
└──────────────────────────────┘
```

**Ejemplo de instancia**:
```json
{
  "id": "rpt-001",
  "title": "Simulación Normal",
  "format": "pdf",
  "scenarioName": "normal",
  "investment": 800000,
  "costPercent": 20,
  "dailyOrders": 50,
  "averageTicket": 10000,
  "persisted": true,
  "source": "demo",
  "createdAt": "2026-05-05T08:30:00Z"
}
```

**Persistencia**:
- Cliente: `localStorage` siempre
- Servidor: Prisma/PostgreSQL si `DATABASE_URL` configurado
- Fallback: Modo demo retorna array vacío

---

**Fecha**: 5 de mayo de 2026  
**Versión**: 2.0  
**Estado**: COMPLETADO CON RB1-RB5

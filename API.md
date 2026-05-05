# API Documentation - DSS Pausa Cafe

## Modo de Ejecucion (MVP)

El proyecto funciona en modo demo sin base de datos.

- Sin `DATABASE_URL`: la API responde con datos mock/fallback y `persisted: false`.
- Con `DATABASE_URL`: intenta persistir en Prisma y responde `persisted: true` cuando aplica.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Simulaciones

#### POST /simulations
Ejecuta una simulación de inversión con parámetros dados.

**Request Body:**
```json
{
  "initialInvestment": 1000000,
  "costPerOrder": 45,
  "dailyOrders": 50,
  "averageTicket": 4250
}
```

**Response:**
```json
{
  "success": true,
  "persisted": false,
  "simulationId": null,
  "data": {
    "favorable": {
      "van": 5234567,
      "tir": 42.5,
      "payback": 8.3,
      "income": 15234000
    },
    "normal": {
      "van": 1234567,
      "tir": 18.2,
      "payback": 14.2,
      "income": 5234000
    },
    "unfavorable": {
      "van": -234567,
      "tir": -2.5,
      "payback": null,
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
  "timestamp": "2026-05-03T10:30:00Z"
}
```

#### GET /simulations/health
Verifica el estado de la API.

**Response:**
```json
{
  "status": "ok",
  "message": "API de simulaciones operativa (modo demo sin persistencia)",
  "persisted": false,
  "data": [],
  "timestamp": "2026-05-03T10:30:00Z"
}
```

### KPIs

#### GET /kpi
Obtiene los KPIs actuales de la cafetería.

**Response:**
```json
{
  "success": true,
  "source": "fallback-mock",
  "data": {
    "date": "2026-05-03",
    "totalOrders": 50,
    "totalRevenue": 210000,
    "averageTicket": 4250,
    "digitalSales": 15,
    "totalCost": 67500,
    "operationalCost": 42000,
    "margin": 68.5,
    "occupancyRate": 72,
    "categories": {
      "Bebidas Calientes": { "sales": 2840, "margin": 72 },
      "Bebidas Frías": { "sales": 392, "margin": 75 },
      "Pastelería": { "sales": 873, "margin": 67.9 },
      "Comida": { "sales": 739, "margin": 62.4 }
    }
  },
  "timestamp": "2026-05-03T10:30:00Z"
}
```

#### POST /kpi
Guarda nuevos KPIs.

**Request Body:**
```json
{
  "totalOrders": 50,
  "totalRevenue": 210000,
  "averageTicket": 4250,
  ...
}
```

**Response:**
```json
{
  "success": true,
  "persisted": false,
  "message": "Sin DATABASE_URL: KPI aceptado en modo demo (no persistido)",
  "data": { ... },
  "timestamp": "2026-05-03T10:30:00Z"
}
```

## Error Handling

### Error Response Format
```json
{
  "error": "Faltan parámetros requeridos",
  "statusCode": 400
}
```

### Common Status Codes
- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Parámetros inválidos
- `500 Internal Server Error` - Error del servidor

## Tipos TypeScript

Ver `lib/types.ts` para todos los tipos compartidos.

### SimulationInput
```typescript
interface SimulationInput {
  initialInvestment: number;
  costPerOrder: number;
  dailyOrders: number;
  averageTicket: number;
}
```

### ScenarioResult
```typescript
interface ScenarioResult {
  van: number;
  tir: number;
  payback: number;
  income: number;
}
```

## Uso en Cliente React

```typescript
import { useSimulation } from '@/lib/hooks';

export function MyComponent() {
  const { loading, error, result, runSimulation } = useSimulation();

  const handleSimulate = async () => {
    await runSimulation({
      initialInvestment: 1000000,
      costPerOrder: 45,
      dailyOrders: 50,
      averageTicket: 4250
    });
  };

  return (
    // JSX aquí
  );
}
```

---

# 🔐 Nuevos Endpoints - RB1 a RB5

## RB1: Autenticación y Seguridad

### GET /auth
Obtiene la sesión actual del usuario.

**Response:**
```json
{
  "authenticated": true,
  "role": "manager",
  "userId": "demo-user",
  "timestamp": "2026-05-05T08:30:00Z"
}
```

### POST /auth
Establece el rol de la sesión actual (para modo demo).

**Request Body:**
```json
{
  "role": "analyst"
}
```

**Response:**
```json
{
  "authenticated": true,
  "role": "analyst",
  "message": "Rol actualizado exitosamente",
  "timestamp": "2026-05-05T08:30:00Z"
}
```

**Roles disponibles:** `viewer`, `analyst`, `manager`, `admin`

**Rutas protegidas:**
- `/dashboard/*` - Requiere rol ≥ analyst
- `/api/operations/*` - Requiere rol ≥ analyst
- `/api/reports/*` - Requiere rol ≥ manager

---

## RB2: Simulador Persistente

Documentado en la sección anterior.
- Guardar escenarios: `localStorage` (cliente) + `/api/simulations` (servidor opcional)
- Reutilizar escenarios: UI panel `SavedScenariosPanel` con rename/delete

---

## RB3: Datos Operacionales

### GET /operations
Obtiene snapshot de inventario y personal.

**Response:**
```json
{
  "success": true,
  "data": {
    "inventory": [
      {
        "itemId": "coffee-ground",
        "name": "Café molido",
        "category": "Bebidas",
        "current": 72,
        "target": 120,
        "unit": "kg"
      },
      {
        "itemId": "milk",
        "name": "Leche",
        "category": "Bebidas",
        "current": 48,
        "target": 100,
        "unit": "l"
      }
    ],
    "staff": [
      {
        "staffId": "emp-001",
        "name": "Juan",
        "role": "barista",
        "shift": "morning",
        "workload": 0.85,
        "active": true
      }
    ],
    "metrics": {
      "stockCoveragePct": 51.2,
      "criticalItemsCount": 0,
      "activeStaffCount": 3,
      "capacityUtilizationPct": 67.5
    }
  },
  "timestamp": "2026-05-05T08:30:00Z"
}
```

### POST /operations
Crea o actualiza snapshot operativo.

**Request Body:**
```json
{
  "inventory": [ /* items */ ],
  "staff": [ /* staff */ ]
}
```

---

## RB4: Alertas Reales

### GET /alerts
Genera alertas dinámicas desde KPIs y datos operacionales.

**Response:**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "alertId": "margin-critical",
        "title": "Margen crítico detectado",
        "description": "Margen por debajo de 65%",
        "priority": "critical",
        "category": "margin",
        "scenario": "normal",
        "timestamp": "2026-05-05T08:30:00Z"
      },
      {
        "alertId": "occupancy-high",
        "title": "Ocupación elevada",
        "description": "Ocupación por encima de 85%",
        "priority": "warning",
        "category": "occupancy",
        "scenario": "favorable",
        "timestamp": "2026-05-05T08:30:00Z"
      }
    ],
    "summary": {
      "critical": 1,
      "warning": 2,
      "info": 3
    }
  },
  "timestamp": "2026-05-05T08:30:00Z"
}
```

### POST /alerts
Genera alertas con parámetros personalizados.

**Request Body:**
```json
{
  "kpiMargin": 68.5,
  "occupancyRate": 72,
  "stockCoveragePct": 51.2,
  "capacityUtilizationPct": 67.5
}
```

**Reglas de alertas:**
- **Critical**: Margen < 65%, Ocupación > 85%, Stock crítico, Capacidad > 90%
- **Warning**: Margen 65-70%, Ocupación 75-85%, Capacidad 75-90%
- **Info**: Operación estable

---

## RB5: Reportes Persistentes

### GET /reports
Obtiene historial de exportaciones (PDF/CSV).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "reportId": "rpt-001",
      "scenario": "normal",
      "format": "pdf",
      "parameters": {
        "initialInvestment": 800000,
        "costPerOrder": 20,
        "dailyOrders": 50,
        "averageTicket": 10000
      },
      "timestamp": "2026-05-05T08:15:00Z",
      "fileName": "Simulación_Normal_2026-05-05.pdf"
    }
  ],
  "timestamp": "2026-05-05T08:30:00Z"
}
```

### POST /reports
Registra una nueva exportación de reporte.

**Request Body:**
```json
{
  "scenario": "normal",
  "format": "pdf",
  "parameters": {
    "initialInvestment": 800000,
    "costPerOrder": 20,
    "dailyOrders": 50,
    "averageTicket": 10000
  },
  "fileName": "Simulación_Normal_2026-05-05.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "reportId": "rpt-002",
  "persisted": true,
  "message": "Reporte registrado exitosamente",
  "timestamp": "2026-05-05T08:30:00Z"
}
```

**Persistencia:**
- Cliente: `localStorage` siempre
- Servidor: `Prisma/PostgreSQL` si `DATABASE_URL` configurado

---

## Proteción de Middleware

Todas las rutas protegidas requieren autenticación. El middleware valida el rol y retorna:

- **API Routes**: HTTP 403 Forbidden si acceso denegado
- **Page Routes**: Redirect a `/` si acceso denegado

Configuración en `middleware.ts`.

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

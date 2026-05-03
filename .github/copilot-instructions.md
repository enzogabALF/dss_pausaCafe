---
name: "DSS Pausa Cafe"
description: "Sistema de Soporte a la Toma de Decisiones para cafetería Pausa Cafe. TypeScript full-stack con React + Express, priorizando escalabilidad y usabilidad."
---

# Instrucciones Copilot - DSS Pausa Cafe

## Contexto del Proyecto

Estamos construyendo un **Sistema de Soporte a la Toma de Decisiones (DSS)** para la cafetería Pausa Cafe. El proyecto prioriza:

1. **Escalabilidad**: Arquitectura modular que permite crecer de 1 a N sucursales
2. **Usabilidad**: Interfaz intuitiva para staff sin experiencia técnica
3. **Datos Accionables**: Análisis que generen decisiones reales de negocio
4. **Calidad**: Test-first, type-safe, bien documentado

## Stack Tecnológico

### Backend
- **Node.js 18+** + **TypeScript** (strict mode)
- **Express.js** para API REST
- **PostgreSQL** + **Prisma ORM**
- **Redis** para caché
- **Zod** para validación

### Frontend
- **React 18+** + **TypeScript**
- **TanStack Query** para estado del servidor
- **Zustand** para estado UI
- **Shadcn/ui** + **Tailwind CSS**
- **Recharts** para gráficos

## Principios de Desarrollo (OBLIGATORIOS)

### ✅ TEST-FIRST (No Negociable)
Toda lógica de negocio se especifica con tests primero. TDD obligatorio:

```typescript
// ❌ NO: Escribir código sin tests
const calculateMargin = (price, cost) => (price - cost) / price * 100;

// ✅ SÍ: Tests primero
describe('calculateMargin', () => {
  it('should calculate margin correctly', () => {
    expect(calculateMargin(100, 60)).toBe(40);
  });
});
```

### ✅ TYPESCRIPT STRICT
- Todos los tipos explícitos
- `noImplicitAny: true`, `strict: true`
- No `any` sin justificación documentada
- Interfaces para contratos

### ✅ API-FIRST DESIGN
- Endpoints RESTful: `/api/v1/resource[/id][/action]`
- Respuestas JSON estándar: `{ data: {...}, error: null, meta: {...} }`
- Documentación OpenAPI incluida

### ✅ DECISIONES DE NEGOCIO EXPLÍCITAS
- Todo cambio en fórmulas/alertas debe justificar el por qué
- Constantes con nombres significativos (no magic numbers)
- Recomendaciones incluyen la lógica detrás

## Estructura de Módulos

```
backend/src/
├── modules/
│   ├── auth/          # Autenticación y autorización
│   ├── products/      # Catálogo de productos
│   ├── inventory/     # Gestión de inventario
│   ├── sales/         # Registro de ventas
│   ├── analytics/     # ⭐ CORE DSS: Análisis y predicciones
│   └── dashboard/     # KPIs y visualizaciones
├── services/          # Lógica transversal
├── middleware/        # Auth, validación, error handling
└── utils/             # Helpers y utilities
```

El módulo **analytics** es el corazón del DSS y debe cuidarse especialmente.

## Patrones de Codificación

### Servicios (Lógica de Negocio)

```typescript
// src/services/analytics.service.ts
import { z } from 'zod';

export class AnalyticsService {
  /** 
   * Calcula margen de ganancia por producto en un período.
   * Fórmula: (precio - costo_variable) / precio * 100
   * @returns Margen en porcentaje (0-100)
   */
  async calculateMarginByProduct(productId: string, period: DateRange) {
    const sales = await this.getSalesData(productId, period);
    const costs = await this.getCostData(productId);
    
    if (sales.length === 0) {
      return []; // Fallback: sin datos, sin recomendación
    }
    
    return sales.map(sale => ({
      date: sale.date,
      revenue: sale.quantity * sale.price,
      variableCost: sale.quantity * costs.variableCost,
      margin: ((sale.price - costs.variableCost) / sale.price) * 100,
    }));
  }
}
```

### Endpoints (API Routes)

```typescript
// src/routes/analytics.ts
import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get(
  '/api/v1/analytics/margin/:productId',
  authenticate,
  authorize(['manager', 'analyst']),
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { startDate, endDate } = req.query;
      
      const result = await analyticsService.calculateMarginByProduct(
        productId,
        { start: new Date(startDate), end: new Date(endDate) }
      );
      
      res.json({
        data: result,
        error: null,
        meta: { count: result.length, timestamp: new Date() }
      });
    } catch (error) {
      res.status(400).json({
        data: null,
        error: error.message,
        meta: { timestamp: new Date() }
      });
    }
  }
);

export default router;
```

### Componentes React

```typescript
// frontend/src/components/dashboard/SalesChart.tsx
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

export function SalesChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sales', 'daily'],
    queryFn: () => fetch('/api/v1/analytics/sales/daily')
      .then(r => r.json())
      .then(r => r.data),
  });
  
  if (isLoading) return <Skeleton className="w-full h-80" />;
  if (error) return <div>Error cargando datos</div>;
  if (!data?.length) return <div>Sin datos disponibles</div>;
  
  return (
    <BarChart data={data} width={600} height={300}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="revenue" fill="#8884d8" />
    </BarChart>
  );
}
```

## Flujo de Trabajo

### 1. Crear Nueva Feature
1. Especificar con tests primero
2. Implementar servicio/lógica (rojo → verde → refactor)
3. Crear endpoint o componente
4. Documentar cambios en API
5. PR con descripción clara

### 2. Trabajar en Analytics (CORE DSS)
- Todas las predicciones se validan contra datos reales
- Margen de error aceptable: ±15%
- Documentar supuestos del modelo
- Incluir fallback para datos insuficientes
- Tests con datos históricos reales

### 3. Mejorar Usabilidad
- Máximo 3 clics para completar tarea
- Errores en lenguaje claro (sin códigos técnicos)
- Confirmación para acciones destructivas
- Tooltips para campos complejos
- Sin jerga técnica en UI

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia backend + frontend
npm run build            # Compila ambos
npm test                 # Ejecuta tests

# Base de Datos
npm run db:migrate       # Corre migraciones
npm run db:seed          # Carga datos de prueba
npm run db:studio        # Abre Prisma Studio

# Calidad
npm run lint             # Verifica estilo
npm run format           # Auto-formatea
npm run type-check       # Valida TypeScript
```

## Checklist para PRs

- [ ] Tests escritos PRIMERO y pasando
- [ ] TypeScript sin errores (`npm run type-check`)
- [ ] Cobertura mínima 80% (lógica DSS)
- [ ] Documentación actualizada
- [ ] Linting y formatting aplicados
- [ ] Cambios de API documentados (endpoint, request, response)
- [ ] No introducir `any` sin justificación
- [ ] Fórmulas de negocio tienen comentarios explicativos
- [ ] Fallbacks para casos sin datos
- [ ] Título descriptivo: "feat(analytics): add margin calculation"
- [ ] Descripción clara: qué, por qué, impact

## Referencias

- **Constitución**: `.specify/memory/constitution.md`
- **API Docs**: `docs/API.md` (en desarrollo)
- **Database Schema**: `database/schema.sql`
- **Troubleshooting**: Pedir ayuda en PRs

## Preguntas Frecuentes

**P: ¿Puedo usar modelo ML complejo?**
→ Mantener simple inicialmente. Si justifica, documentar supuestos y fallback.

**P: ¿Qué si el usuario no entiende la recomendación?**
→ UI fallida. Simplificar o agregar tooltip explicativo.

**P: ¿Siempre tests unitarios?**
→ Sí para lógica DSS. Para UI, test de integración suficiente.

**P: ¿Cómo manejar errores?**
→ Try-catch en servicios, middleware centralizador, logging estructurado.

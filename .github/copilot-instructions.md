---
name: "DSS Pausa Cafe"
description: "Sistema de Soporte a la Toma de Decisiones para cafetería Pausa Cafe. TypeScript full-stack con Next.js + React, priorizando escalabilidad y usabilidad."
---

# Instrucciones Copilot - DSS Pausa Cafe

## Contexto del Proyecto

Estamos construyendo un **Sistema de Soporte a la Toma de Decisiones (DSS)** para la cafetería Pausa Cafe. El proyecto prioriza:

1. **Escalabilidad**: Arquitectura modular que permite crecer de 1 a N sucursales
2. **Usabilidad**: Interfaz intuitiva para staff sin experiencia técnica
3. **Datos Accionables**: Análisis que generen decisiones reales de negocio
4. **Calidad**: Test-first, type-safe, bien documentado

## Stack Tecnológico

### Backend / Full-Stack
- **Next.js 15+** con App Router
- **TypeScript** (strict mode)
- **Route Handlers** en `app/api/`
- **PostgreSQL** + **Prisma ORM** (opcional en MVP demo)
- **Zod** para validación

### Frontend
- **React 19** + **TypeScript**
- **Estado local** y hooks propios
- **Tailwind CSS**
- **Recharts** para gráficos
- **jsPDF + html2canvas** para exportación

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
dss_pausaCafe/
├── app/
│   ├── api/           # Route handlers (simulations, kpi)
│   ├── analytics/     # Analíticas y pronósticos
│   ├── alerts/        # Alertas y recomendaciones
│   ├── products/      # Productos y rentabilidad
│   ├── simulator/     # Simulador financiero
│   └── components/    # UI reutilizable
├── lib/               # Simulación, validaciones, exports, tipos
├── prisma/            # Esquema y persistencia opcional
└── __tests__/         # Tests Vitest
```

El módulo **simulator** es el corazón del DSS y el módulo **analytics** complementa el análisis de negocio.

## Patrones de Codificación

### Servicios (Lógica de Negocio)

```typescript
// lib/simulation.ts
export class AnalyticsService {
  /** 
   * Calcula margen de ganancia por producto en un período.
   * Fórmula: (precio - costo_variable) / precio * 100
   * @returns Margen en porcentaje (0-100)
   */
  // La lógica real vive en helpers puros del proyecto actual.
}
```

### Endpoints (API Routes)

```typescript
// app/api/simulations/route.ts
export async function POST(req: NextRequest) {
  // Validar con Zod, ejecutar runSimulation y devolver resultados.
}
```

### Componentes React

```typescript
// app/page.tsx o app/simulator/page.tsx
// Componentes de dashboard y simulador con hooks propios, Tailwind y Recharts.
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

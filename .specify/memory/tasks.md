# Tasks: Pausa Cafe DSS Demo

**Input**: Specification and implementation plan for a demo DSS for Pausa Cafe.
**Scope**: Next.js 15 + TypeScript + Tailwind front-end, PostgreSQL + Prisma data layer as optional persistence, no deployment in this phase.
**Organization**: Tasks are grouped by user story and by pending backlog so each block can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in different files
- **[Story]**: Maps task to a specific user story
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the demo foundation and shared project structure.

- [x] T001 Create the Next.js App Router skeleton and base layout in `app/layout.tsx`, `app/page.tsx`, and `app/globals.css`
- [x] T002 Configure Tailwind theme, dark palette, and design tokens in `tailwind.config.ts` and `app/globals.css`
- [x] T003 [P] Configure Prisma client and environment access in `lib/prisma.ts`, `lib/env.ts`, and `.env.example`
- [x] T004 [P] Define shared TypeScript domain types for KPIs, scenarios, products, and alerts in `types/kpi.ts`, `types/simulation.ts`, and `types/product.ts`
- [x] T005 Create the initial navigation shell with the sidebar sections from the annex in `components/navigation/Sidebar.tsx` and `components/navigation/Header.tsx`

**Checkpoint**: The application shell and shared foundations are ready.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data and calculation infrastructure required by every user story.

**⚠️ CRITICAL**: No user story work begins until this phase is complete.

- [x] T006 Create the Prisma schema for `KpiBase`, `Simulation`, `Product`, `RiskFactor`, and `Recommendation` in `prisma/schema.prisma`
- [x] T007 [P] Create the first Prisma migration and seed data for Pausa Cafe KPIs and sample products in `prisma/migrations/*` and `prisma/seed.ts`
- [x] T008 Implement KPI calculation helpers for revenue, margin, ticket average, and digital sales in `lib/calculations/kpi.ts`
- [x] T009 Implement scenario generation for favorable, normal, and unfavorable projections in `lib/simulation/scenario-engine.ts`
- [x] T010 Implement financial formulas for investment simulation, VAN, TIR, and payback in `lib/calculations/financial.ts`
- [x] T011 Implement alert and risk scoring utilities in `lib/alerts/risk-engine.ts`
- [x] T012 Create shared API response helpers and error handling in `lib/api/response.ts` and `lib/api/errors.ts`

**Checkpoint**: Data, formulas, and shared utilities are ready for all stories.

---

## Phase 3: User Story 1 - Dashboard Ejecutivo (Priority: P1) 🎯 MVP

**Goal**: Show an executive dashboard matching the annex: KPI cards, sales trend chart, occupancy chart, and risk analysis panel.

**Independent Test**: Open the dashboard and verify the main metrics, charts, and risk controls render with the current KPIs.

### Tests for User Story 1

- [x] T013 [P] [US1] Add unit tests for KPI aggregation in `tests/unit/lib/calculations/kpi.test.ts`
- [x] T014 [P] [US1] Add component tests for executive KPI cards and charts in `tests/components/dashboard.test.tsx`

### Implementation for User Story 1

- [x] T015 [US1] Build the executive dashboard page in `app/dashboard/page.tsx`
- [x] T016 [P] [US1] Create KPI summary cards for margin, stock rotation, waste, service time, and ticket in `components/dashboard/KpiSummaryCards.tsx`
- [x] T017 [P] [US1] Create the weekly sales trend chart in `components/dashboard/WeeklySalesChart.tsx`
- [x] T018 [P] [US1] Create the hourly occupancy bar chart in `components/dashboard/HourlyOccupancyChart.tsx`
- [x] T019 [US1] Create the risk analysis slider panel and update action in `components/dashboard/RiskAnalysisPanel.tsx`
- [x] T020 [US1] Wire the dashboard to the API route handler in `app/api/dashboard/route.ts`
- [x] T021 [US1] Add loading and empty states for dashboard data in `app/dashboard/loading.tsx`

**Checkpoint**: The dashboard executive experience works end-to-end.

---

## Phase 4: User Story 2 - Simulador de Inversión (Priority: P2)

**Goal**: Allow the user to evaluate investment scenarios using VAN, TIR, payback, and viability signals.

**Independent Test**: Enter values for initial investment, cost per order, daily orders, and ticket average, then confirm the simulator returns financial metrics and viability.

### Tests for User Story 2

- [x] T022 [P] [US2] Add unit tests for VAN, TIR, and payback calculations in `tests/unit/lib/calculations/financial.test.ts`
- [x] T023 [P] [US2] Add component tests for the investment simulator form and results panel in `tests/components/simulator.test.tsx`

### Implementation for User Story 2

- [x] T024 [US2] Create the investment simulator page in `app/simulator/page.tsx`
- [x] T025 [P] [US2] Create the input controls for investment, cost per order, daily orders, and ticket average in `components/simulator/InvestmentForm.tsx`
- [x] T026 [P] [US2] Create the financial results cards for VAN, TIR, payback, and viability in `components/simulator/FinancialResults.tsx`
- [x] T027 [US2] Create the scenario summary cards for investment outcomes in `components/simulator/ScenarioOutcomeCards.tsx`
- [x] T028 [US2] Connect the simulator to the financial calculation service in `app/api/simulator/route.ts`
- [x] T029 [US2] Add the risk panel for external factors in `components/simulator/InvestmentRiskPanel.tsx`

**Checkpoint**: The investment simulator is usable without the dashboard story.

---

## Phase 5: User Story 3 - Análisis de Productos (Priority: P3)

**Goal**: Display product profitability and sales performance in the same dark visual language from the annex.

**Independent Test**: Open the products page and verify the profitability table and related charts render from seeded data.

### Tests for User Story 3

- [x] T030 [P] [US3] Add unit tests for product margin calculations in `tests/unit/lib/calculations/product-margin.test.ts`
- [x] T031 [P] [US3] Add component tests for the product profitability table in `tests/components/products.test.tsx`

### Implementation for User Story 3

- [x] T032 [US3] Create the product analysis page in `app/products/page.tsx`
- [x] T033 [P] [US3] Create the profitability table in `components/products/ProductProfitabilityTable.tsx`
- [x] T034 [P] [US3] Create the product category badges and status indicators in `components/products/ProductCategoryBadge.tsx`
- [x] T035 [US3] Create the weekly sales chart for products in `components/products/ProductSalesChart.tsx`
- [x] T036 [US3] Create the hourly occupancy chart linked to product demand in `components/products/ProductDemandChart.tsx`
- [x] T037 [US3] Add the API route for product analysis data in `app/api/products/route.ts`

**Checkpoint**: Product analysis can be reviewed independently from the other modules.

---

## Phase 6: User Story 4 - Analíticas, Alertas y Recomendaciones (Priority: P4)

**Goal**: Surface alerts, risk signals, and action-oriented recommendations in the analytics and alerts views.

**Independent Test**: Load analytics and alerts pages, then verify alerts, recommendations, and risk estimations update from the base KPIs.

### Tests for User Story 4

- [x] T038 [P] [US4] Add unit tests for alert scoring and recommendation logic in `tests/unit/lib/alerts/risk-engine.test.ts`
- [x] T039 [P] [US4] Add component tests for alerts and recommendations panels in `tests/components/alerts.test.tsx`

### Implementation for User Story 4

- [x] T040 [US4] Create the analytics page in `app/analytics/page.tsx`
- [x] T041 [US4] Create the alerts and recommendations page in `app/alerts/page.tsx`
- [x] T042 [P] [US4] Create the alerts list with priority states in `components/alerts/AlertsList.tsx`
- [x] T043 [P] [US4] Create the recommendations panel in `components/alerts/RecommendationsPanel.tsx`
- [x] T044 [US4] Create the risk factor sliders and impact summary in `components/alerts/RiskFactorPanel.tsx`
- [x] T045 [US4] Create the API route for alerts and recommendations in `app/api/alerts/route.ts`
- [x] T046 [US4] Implement the recommendation rules based on KPIs and scenario outputs in `lib/recommendations/recommendation-engine.ts`

**Checkpoint**: Alerts and recommendations are visible and actionable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improve usability, consistency, and demo readiness across the app.

- [x] T047 [P] Add responsive behavior and mobile layout refinements across `app/**` and `components/**`
- [x] T048 [P] Improve accessibility labels, contrast, and keyboard navigation in reusable UI components
- [x] T049 Consolidate shared chart styles and card variants in `components/ui/` and `styles/`
- [x] T050 Verify demo copy, labels, and KPI language across `app/**` and `components/**` match Pausa Cafe
- [x] T051 Update `README.md` and the implementation plan with the final demo flow and navigation structure

**Checkpoint**: The demo is polished and consistent with the annex visuals.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phases 3-6)**: Depend on Foundational completion
- **Polish (Phase 7)**: Depends on the selected user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational; recommended MVP first
- **User Story 2 (P2)**: Can start after Foundational; independent of the dashboard
- **User Story 3 (P3)**: Can start after Foundational; independent of the other stories
- **User Story 4 (P4)**: Can start after Foundational; consumes shared calculations and KPI outputs

### Within Each User Story

- Tests, if included, should be written before implementation
- Models and calculations before UI wiring
- Services before route handlers
- Independent story completion before moving to the next priority

### Parallel Opportunities

- Tasks marked [P] can run in parallel when they touch different files
- Each user story can be handled independently once the foundation is complete
- The simulator, products, and alerts pages can be developed by different people in parallel

---

## MVP Recommendation

1. Complete Phase 1 and Phase 2
2. Deliver User Story 1 as the MVP dashboard
3. Validate the executive dashboard against the annex images
4. Add the investment simulator next
5. Then complete products and alerts views

---

## Notes

- No deployment tasks are included because this is a demo phase only
- Keep the dark theme and sidebar layout aligned with the annex images
- Avoid generic dashboard patterns that conflict with the provided mockups
- Prefer small, independent tasks that can be validated story by story

---

## Phase 8: Refactorización y Testing (Option B)

**Purpose**: Asegurar la calidad del MVP implementado resolviendo discrepancias de tipos y agregando cobertura de pruebas automatizadas según los Criterios de Aceptación (CA-1 a CA-5).

### Tipado y Errores de Compilación
- [x] T052 Corregir error TS2322 en `Sidebar.tsx` relacionado al tipo de ruta (`RouteImpl`).
- [x] T053 Corregir configuración de Zod en `lib/validations.ts` (error `required_error` y tipo `ZodError`).
- [x] T054 Corregir tipado implícito `any` en `InvestmentControls.tsx`.
- [x] T055 Configurar correctamente ESLint en el proyecto e integrarlo (`npm run lint`).

### Testing Framework
- [x] T056 Instalar y configurar framework de testing (Jest o Vitest + React Testing Library).
- [x] T057 Configurar scripts de test en `package.json` (`test`, `test:watch`).

### Unit y Component Tests
- [x] T058 (CA-1) Escribir Unit Tests para `lib/simulation.ts` validando el cálculo exacto de los escenarios Favorable (+38%), Normal (+13.5%) y Desfavorable (-28%).
- [x] T059 (CA-2) Escribir Component Tests para las visualizaciones de KPIs y dashboard.
- [x] T060 (CA-4) Escribir Unit Tests para el motor de recomendaciones en `lib/alerts/risk-engine.ts`.
- [x] T061 (CA-5) Escribir Component Tests para `InvestmentControls.tsx` verificando que los inputs actualicen correctamente los cálculos.

---

## Phase 9: Backlog de Requerimientos Faltantes

**Purpose**: Cerrar las brechas detectadas entre la especificación funcional actualizada y lo que el MVP ya implementa.

### Objetivo
- Completar los requerimientos de negocio que todavía no están cubiertos por el repositorio actual.
- Mantener el orden de entrega: primero seguridad y persistencia, luego datos operativos y alertas reales.

### Tests para el backlog

- [x] T062 [P] [RB1] Add tests for authentication guard and role access in `tests/unit/auth/auth-guard.test.ts`
- [x] T063 [P] [RB2] Add tests for saved scenario persistence and reuse in `tests/unit/lib/simulation/saved-scenarios.test.ts`
- [x] T064 [P] [RB3] Add tests for inventory and staff operational data in `tests/unit/lib/operations/operations-data.test.ts`
- [x] T065 [P] [RB4] Add tests for real alert generation from KPI and stock thresholds in `tests/unit/lib/alerts/real-alerts.test.ts`
- [x] T066 [P] [RB5] Add tests for report metadata and history tracking in `tests/unit/lib/export/reports.test.ts`

### Implementation for the backlog

- [x] T067 [RB1] Implement authentication and role-based access in `app/api/auth/route.ts`, `lib/auth.ts`, and `components/navigation/Header.tsx`
- [x] T068 [RB1] Protect sensitive pages and API routes with session checks in `app/**` and `app/api/**`
- [x] T069 [RB2] Implement save, edit, and reuse flows for simulations in `app/api/simulations/route.ts`, `lib/simulation.ts`, and `app/simulator/page.tsx`
- [x] T070 [RB2] Add a saved scenarios panel in `app/components/simulator/SavedScenariosPanel.tsx`
- [x] T071 [RB3] Implement operational inventory and staff models in `prisma/schema.prisma`, `lib/types.ts`, and `app/api/operations/route.ts`
- [x] T072 [RB3] Add an operational data dashboard panel for stock and capacity in `app/dashboard/page.tsx` and `app/components/dashboard/OperationalStatusPanel.tsx`
- [x] T073 [RB4] Replace mock alerts with rule-based alert generation from live KPI and operational data in `lib/alerts/risk-engine.ts` and `app/api/alerts/route.ts`
- [x] T074 [RB4] Wire alerts UI to generated alerts in `app/alerts/page.tsx` and `app/components/alerts/AlertsList.tsx`
- [x] T075 [RB5] Persist export metadata and report history in `app/api/reports/route.ts`, `lib/export-utils.ts`, and `prisma/schema.prisma`
- [x] T076 [RB5] Add report history and download reuse UI in `app/components/reports/ReportHistoryPanel.tsx`

### Non-functional validation backlog

- [ ] T077 [P] Measure response times for dashboard and simulator under load in `tests/performance/**`
- [ ] T078 [P] Validate 5-user concurrent access scenario against local/demo limits in `tests/performance/concurrency.test.ts`
- [ ] T079 [P] Add browser compatibility smoke checks for Chrome, Edge, and Firefox in `tests/e2e/browser-compatibility.spec.ts`
- [x] T080 Document fiabilidad, disponibilidad, and recovery expectations in `IMPLEMENTATION_PLAN.md` and `README.md`

### Checkpoint

- The MVP is already usable for simulation, KPI visualization, analytics, alerts, export, and documentation.
- The backlog above covers the missing business and non-functional requirements identified during validation.
- After this phase, the next implementation pass should start with RB1 and RB2.

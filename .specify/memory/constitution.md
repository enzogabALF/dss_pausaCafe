# Pausa Cafe DSS Constitution

## Core Principles

### I. Escalabilidad por Diseño
Cada módulo debe diseñarse considerando crecimiento futuro: múltiples sucursales, aumentos de volumen de datos, y nuevas funcionalidades. La arquitectura de microservicios permite que cada módulo escale independientemente. Las decisiones de diseño deben justificar su impacto en escalabilidad.

### II. Usabilidad Primero
La interfaz debe ser intuitiva para staff sin experiencia técnica. Cada pantalla debe responder a una necesidad real de negocio. Las métricas de UX (tiempo de tarea, clics necesarios, tasa de error) son KPIs del producto, no afterthought.

### III. Datos Impulsados por Decisiones
Todo análisis debe responder una pregunta de negocio específica. Los dashboards muestran insights accionables, no solo números. Cada gráfico tiene una recomendación asociada. Los modelos predictivos se validan contra decisiones reales del negocio.

### IV. Test-First Obligatorio
Toda lógica de negocio (análisis, predicciones, cálculos financieros) se especifica con tests primero. Cobertura mínima 80%. Los tests de integración validan que los módulos DSS producen recomendaciones consistentes.

### V. Observabilidad Estructurada
Logging JSON en producción. Cada cambio de inventario, cada recomendación, cada decisión se registra con trazabilidad. Los errores incluyen contexto suficiente para diagnóstico.

## Arquitectura y Decisiones Técnicas

### Stack Backend/Full-Stack
- **Framework**: Next.js 15+ con App Router
- **Lenguaje**: TypeScript (strict mode)
- **Base de Datos**: PostgreSQL (single source of truth)
- **Caché**: Redis (si se requiere en fases posteriores)
- **Validación**: Zod (runtime type safety)
- **ORM**: Prisma (type-safe queries)
- **Autenticación**: JWT + bcrypt si el módulo de acceso se incorpora

### Stack Frontend
- **Framework**: Next.js 15+ (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Estado**: TanStack Query (server state) + Zustand (UI state)
- **UI**: Shadcn/ui + Tailwind CSS (accesibilidad + consistencia)
- **Gráficos**: Recharts (curva de aprendizaje baja)
- **Formularios**: React Hook Form (performance)

### Principios Arquitectónicos
- **Separación de Responsabilidades**: Cada módulo tiene una única razón de cambio
- **API-First**: UI y route handlers consumen contratos bien definidos
- **Stateless Services**: La lógica debe poder ejecutarse sin depender de sesión local
- **CQRS Ligero**: Lecturas complejas se optimizan por separado
- **Event-Driven para Analytics**: Cambios de inventario/ventas publican eventos cuando se implemente ese flujo

## Módulos y Responsabilidades

### auth/
- Autenticación JWT
- Gestión de usuarios y roles
- Control de acceso basado en roles (RBAC)

### products/
- Catálogo de productos
- Definición de categorías
- Gestión de precios y costos
- Fórmulas de rentabilidad

### inventory/
- Seguimiento de stock en tiempo real
- Alertas de stock bajo
- Predicción de expiraciones
- Sugerencias de reorden

### sales/
- Registro de transacciones
- Análisis de ticket promedio
- Patrones de compra por hora/día
- Combinaciones de productos

### analytics/
- Análisis de demanda
- Predicción de ventas (modelos simples: MA, exponencial)
- Recomendaciones de preparación
- Análisis de margen por producto

### dashboard/
- KPIs en tiempo real
- Visualizaciones interactivas
- Alertas por excepción
- Reportes exportables (PDF, Excel)

### nextjs-app/
- Páginas y layouts con App Router
- Route handlers para simulaciones
- Componentes de dashboard reutilizables
- Server Components donde simplifiquen la entrega

## Estándares de Desarrollo

### Código
- **TypeScript**: `strict: true`, `noImplicitAny: true`
- **Naming**: camelCase para variables/funciones, PascalCase para tipos/clases
- **Máximo 80 caracteres** de línea (readability)
- **Funciones puras** cuando sea posible
- **No magic numbers**: constantes nombradas

### Testing
- **Unitarios**: Lógica de negocio aislada
- **Integración**: API routes + base de datos
- **E2E**: Flujos críticos (login, crear producto, registrar venta)
- **Cobertura**: 80% mínimo para lógica DSS

### Base de Datos
- Migraciones versionadas con Prisma
- Seeds para datos de prueba
- Índices en campos de búsqueda/filtro
- Foreign keys con integridad referencial
- Auditoría en tablas críticas (created_at, updated_at, updated_by)

### API REST
- Endpoints RESTful: `/api/v1/resource[/id][/action]`
- Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)
- Respuestas JSON con estructura estándar: `{ data: {...}, error: null, meta: {...} }`
- Documentación OpenAPI/Swagger incluida

### Versionado
- **Semver**: MAJOR.MINOR.PATCH (ej: 1.2.3)
- **Breaking changes**: Require mayor version
- **Changelog**: Documentado en CHANGELOG.md

## Flujo de Desarrollo

### Ramas
- `main`: Producción, protegida, requiere PR aprobado
- `develop`: Integración, rama base para PRs
- `feature/DSS-XXX`: Desarrollo de features
- `hotfix/DSS-XXX`: Correcciones críticas

### Pull Requests
1. Descripción clara: qué se cambió y por qué
2. Tests incluidos o actualizados
3. Documentación de cambios en API o UI
4. Code review de al menos 2 personas
5. CI/CD (tests + linting) debe pasar
6. Squash commits antes de merge

### Deployment
- Esta demo no se despliega todavía.
- Si se decide desplegar después, se documentará un plan específico de infraestructura.
- La prioridad actual es validar negocio, experiencia y cálculo de escenarios.

## Decisiones DSS Específicas

### Modelos Predictivos
- **Complejidad**: Mantener simple inicialmente (promedios móviles, regresión lineal)
- **Entrenamiento**: Datos últimos 90 días
- **Validación**: Se compara predicción vs realidad, margen de error aceptable ±15%
- **Reentrenamiento**: Automático cada 7 días

### Fórmulas Financieras
- **Costo Variable**: suma de ingredientes + empaque
- **Costo Fijo**: asignado por producto basado en overhead
- **Margen Bruto**: (precio - costo variable) / precio * 100
- **Rentabilidad Real**: margen bruto - costo fijo asignado
- Todas las fórmulas son configurables por gerente

### Alertas
- **Stock Bajo**: cuando cantidad ≤ punto de reorden
- **Producto Sobrante**: cuando fecha de vencimiento - hoy < 2 días
- **Venta Baja**: cuando promedio horario < 20% del histórico
- **Margen Crítico**: cuando margen neto < 5%

## Seguridad

### Autenticación y Autorización
- JWT con expiración 24 horas
- Refresh tokens de 30 días
- Roles: Admin, Manager, Staff, Analyst
- Permissions granulares por módulo

### Encriptación
- Contraseñas: bcrypt con salt (min 12 rondas)
- Datos sensibles (costos): encriptados en reposo
- Conexión HTTPS obligatoria en producción
- Variables de entorno nunca en repo

### Auditoría
- Log de quién cambió qué y cuándo
- No se permiten deletes, solo soft deletes con razón
- Access logs para cambios de precios/costos

## Governance

Esta Constitución prevalece sobre todas las prácticas previas. Los cambios a la Constitución requieren:
1. Propuesta documentada con justificación
2. Aprobación del tech lead y product owner
3. Plan de migración si afecta código existente
4. Notificación al equipo

Todas las PRs se evalúan contra estos principios. La complejidad injustificada debe ser rechazada. Los trade-offs se documentan explícitamente.

**Version**: 1.0.0 | **Ratificada**: 2026-05-03 | **Última Enmienda**: 2026-05-03

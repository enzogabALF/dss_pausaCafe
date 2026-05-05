# DSS Pausa Cafe

![Versión](https://img.shields.io/badge/version-0.1.0-blue)
![Estado](https://img.shields.io/badge/estado-MVP%20Demo-brightgreen)
![Stack](https://img.shields.io/badge/stack-Next.js%2015%20%7C%20React%2019%20%7C%20TypeScript-111827)

## Descripción

DSS Pausa Cafe es un sistema de soporte de decisiones para la cafetería Pausa Cafe. El proyecto está orientado a un MVP académico/demo y permite analizar indicadores del negocio, simular escenarios de inversión y revisar alertas, analíticas y métricas operativas en una interfaz oscura y responsive.

La aplicación funciona en modo demo incluso sin base de datos. Cuando `DATABASE_URL` no está configurado, el sistema usa respuestas mock y mantiene operativo el flujo principal.

## Funcionalidades principales

### Core MVP
- Dashboard ejecutivo con KPIs, ventas y ocupación.
- Simulador de inversión con VAN, TIR, payback y tres escenarios.
- Vista de productos con análisis de rentabilidad.
- Vista de analíticas con tendencias y proyecciones.
- Vista de alertas con recomendaciones por escenario.
- API REST para simulaciones y KPIs.

### Nuevas Funcionalidades (RB1-RB5)
- **Autenticación**: Sistema de roles (viewer, analyst, manager, admin) con middleware de protección
- **Simulador Persistente**: Guardar, editar, renombrar y reutilizar escenarios desde la UI
- **Dashboard Operativo**: Panel de estado operativo con inventario (Café, Leche, Pastelería, Vasos) y utilización de personal
- **Alertas Reales**: Generación dinámica de alertas desde motor de reglas (márgenes críticos, ocupación alta, stock bajo, capacidad saturada)
- **Reportes Persistentes**: Historial de exportaciones con metadatos (escenario, parámetros, timestamp), descargable en PDF/CSV
- **Exportación**: Resultados a PDF y CSV con metadatos de simulación
- **Persistencia**: Opcional con Prisma y PostgreSQL; localStorage para fallback

## Rutas de la aplicación

- `/` Dashboard principal.
- `/simulator` Simulador de inversión.
- `/products` Análisis de productos.
- `/analytics` Analíticas y tendencias.
- `/alerts` Alertas y recomendaciones.

## Requisitos

- Node.js 18 o superior.
- npm 9 o superior.
- Windows, macOS o Linux.

## Instalación

1. Clona el repositorio.
2. Instala dependencias con `npm install`.
3. Inicia el proyecto con `npm run dev`.
4. Abre `http://localhost:3000`.

Si quieres usar persistencia real:

1. Configura `DATABASE_URL` en un archivo `.env.local`.
2. Crea la base de datos PostgreSQL.
3. Ejecuta `npx prisma generate`.
4. Ejecuta las migraciones de Prisma.

## Uso rápido del simulador

1. Abre `/simulator`.
2. Ajusta los parámetros:
   - Inversión inicial.
   - Costo por pedido.
   - Pedidos diarios.
   - Ticket promedio.
3. Haz clic en `Ejecutar Simulación`.
4. Revisa VAN, TIR, payback y viabilidad.
5. Usa `Guardar escenario actual` para recuperar ese caso después.
6. Usa `Reutilizar` para volver a cargar un escenario guardado.

## Modo demo

Cuando la base de datos no está disponible, la app sigue funcionando con datos de fallback.

- `GET /api/kpi` retorna KPIs mock.
- `POST /api/simulations` calcula la simulación en memoria.
- El simulador puede mostrar resultados, exportarlos y guardar escenarios localmente.

## API principal

### `POST /api/simulations`
Ejecuta una simulación financiera.

Ejemplo:

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

### `GET /api/kpi`
Obtiene los indicadores actuales del negocio.

## Stack tecnológico

- Next.js 15.3.1
- React 19
- TypeScript 5.8
- Tailwind CSS 3.4
- Zod 4.4
- Prisma 6.12
- Vitest
- jsPDF
- html2canvas

## Scripts disponibles

- `npm run dev` Inicia el servidor de desarrollo.
- `npm run build` Genera el build de producción.
- `npm run start` Ejecuta la app construida.
- `npm run lint` Ejecuta el lint.
- `npm run test` Ejecuta Vitest.
- `npm run test:watch` Ejecuta Vitest en modo observación.

## Estructura general

```text
app/
  api/
  alerts/
  analytics/
  components/
  products/
  simulator/
lib/
prisma/
public/
__tests__/
```

## Documentación complementaria

- `INSTALLATION.md` para la instalación paso a paso.
- `GUIA_USO_SIMULADOR.md` para el uso detallado del simulador.
- `API.md` para la documentación de endpoints.
- `IMPLEMENTATION_PLAN.md` para el plan técnico.
- `ESPECIFICACION_TECNICA.md` para el detalle funcional y de calidad.
- `MODELO_DATOS.md` para el modelo de datos.
- `SUMARIO_TECNICO.md` para una vista resumida del proyecto.

## Pruebas

Se incluyen pruebas automatizadas con Vitest para el motor de simulación, el componente de inversión y el flujo de escenarios guardados.

Para ejecutar las pruebas:

```bash
npm run test
```

## Estado del proyecto

El repositorio contiene un MVP funcional y completamente operacional con:

### ✅ Implementado (RB1-RB5)
- **RB1**: Autenticación y roles (middleware, session-based, protección de rutas)
- **RB2**: Simulador persistente (guardar/editar/reutilizar escenarios en localStorage + API opcional)
- **RB3**: Datos operacionales (inventario de stock, personal, métricas de capacidad en dashboard)
- **RB4**: Alertas reales (motor de reglas conectado a KPIs y datos operacionales)
- **RB5**: Reportes persistentes (historial de exportaciones, metadatos de simulaciones)

### ✅ Testing
- 13 tests automatizados con Vitest (auth, operations, alerts, reports, components)
- Cobertura de Unit Tests y Component Tests

### ⏳ Pendiente (No-funcional, opcional)
- T077: Performance testing bajo carga
- T078: Validación de concurrencia (5+ usuarios)
- T079: Compatibilidad de navegadores

La base de datos es opcional: el sistema sigue funcionando en modo demo sin `DATABASE_URL`.

## Fiabilidad y Recuperación

- La aplicacion debe seguir funcionando en modo demo aunque no exista `DATABASE_URL`.
- Si Prisma o PostgreSQL fallan, las rutas principales devuelven respuestas mock o degradadas sin bloquear el simulador.
- Las simulaciones y escenarios guardados en el navegador se pueden recuperar desde `localStorage` mientras dure el perfil del usuario.
- La disponibilidad objetivo es la de una demo local estable; no se define un SLA de produccion en esta fase.

## Licencia

Proyecto académico/demo para uso interno y educativo.

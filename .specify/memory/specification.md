# Especificación DSS - Pausa Cafe - Simulación de Escenarios

## 📊 Datos Actuales de la Cafetería Pausa Cafe

### KPIs Base (Estado Actual)

| KPI | Valor | Unidad | Descripción |
|-----|-------|--------|-------------|
| **Ingresos Mensuales** | $15,000,000 | COP | Flujo de 50 clientes/día × $10k ticket promedio |
| **Ticket Promedio** | $10,000 | COP | 1 bebida + 1 producto de acompañamiento |
| **Pedidos Diarios** | 50 | pedidos | ~1,500 pedidos/mes |
| **Margen Bruto/Venta** | $5,000 | COP | 50% de margen (Precio $10k - Costo $5k) |
| **Ventas Digitales** | 15% | % | Redes sociales, plataformas de delivery |
| **Ventas Presenciales** | 85% | % | In-store, mostrador |

### Cálculos Derivados
- **Ingresos Diarios**: $500,000 (50 pedidos × $10,000)
- **Ingresos Mensuales**: $15,000,000 (30 días)
- **Margen Bruto Diario**: $250,000 (50 pedidos × $5,000)
- **Margen Bruto Mensual**: $7,500,000 (30 días)

---

## 🎯 Requisitos Funcionales

### RF-1: Motor de Simulación Multiescenario
El sistema debe generar automáticamente 3 escenarios de proyección basados en variaciones de los KPIs:
- **Escenario FAVORABLE**: Crecimiento optimista
- **Escenario NORMAL**: Continuidad con ligeros cambios
- **Escenario DESFAVORABLE**: Contracción o desafíos

### RF-2: Proyecciones Temporales
El sistema debe proyectar KPIs para:
- 1 semana
- 1 mes
- 3 meses
- 6 meses

### RF-3: Comparativa Visual
Dashboard que muestre:
- Valores actuales vs proyecciones
- Variación porcentual por escenario
- Gráficos de tendencia (líneas)
- Tablas comparativas

### RF-4: Recomendaciones Accionables
Cada escenario incluye recomendaciones:
- **Favorable**: Cómo maximizar oportunidades
- **Normal**: Optimizaciones operacionales
- **Desfavorable**: Planes de contingencia

### RF-5: Sensibilidad
Permitir variar manualmente:
- Ticket promedio
- Cantidad de pedidos
- Margen bruto
- Mix digital/presencial

### RF-6: Gestión de Inventario y Personal
El sistema debe permitir registrar y consultar información operativa del negocio, incluyendo:
- Inventario o stock disponible
- Personal o capacidad operativa
- Eventos de reposición o faltantes
- Relación entre demanda y capacidad de atención

### RF-7: Alertas Automáticas
El sistema debe emitir alertas ante situaciones críticas como:
- Faltantes de stock
- Baja de ventas
- Aumento de costos
- Caída de margen
- Riesgo operacional por falta de personal

### RF-8: Reportes y Exportación
El sistema debe permitir generar reportes de resultados para consulta posterior, incluyendo:
- PDF con resultados de simulación
- CSV o tabla descargable
- Resumen ejecutivo por escenario
- Historial de consultas o ejecuciones

### RF-9: Seguridad y Acceso
El sistema debe requerir autenticación mediante usuario y contraseña para acceder a la información, y debe controlar el acceso por rol.

### RF-10: Gestión de Escenarios Guardados
El sistema debe permitir guardar, editar y reutilizar escenarios de simulación previamente creados, conservando sus parámetros y resultados.

---

## 👤 Historias de Usuario

### HU-1: Simular escenarios de negocio
Como gerente de Pausa Cafe, quiero simular escenarios favorable, normal y desfavorable para anticipar el impacto en ingresos y rentabilidad, y así tomar decisiones con base en datos.

### HU-2: Revisar KPIs en un dashboard
Como administrador, quiero ver los KPIs principales en un panel visual para entender rápidamente el estado del negocio sin revisar reportes manuales.

### HU-3: Ajustar variables de simulación
Como analista, quiero modificar pedidos diarios, ticket promedio, margen bruto y porcentaje digital para evaluar cómo cambian los resultados bajo distintos supuestos.

### HU-4: Comparar escenarios
Como gerente, quiero comparar los tres escenarios en una misma pantalla para identificar cuál representa mayor riesgo u oportunidad.

### HU-5: Obtener recomendaciones accionables
Como dueño de la cafetería, quiero que el sistema me sugiera acciones concretas para cada escenario, de modo que pueda responder con rapidez ante cambios en el negocio.

### HU-6: Gestionar inventario y capacidad operativa
Como administrador, quiero registrar stock, capacidad y personal disponible para entender cómo afectan al negocio las variaciones operativas.

### HU-7: Recibir alertas críticas
Como gerente, quiero recibir alertas cuando exista faltante de stock, baja de ventas o aumento de costos, para actuar a tiempo.

### HU-8: Generar reportes
Como analista, quiero exportar reportes de resultados para analizarlos o compartirlos luego.

### HU-9: Iniciar sesión en el sistema
Como usuario autorizado, quiero autenticación por usuario y contraseña para acceder solo a la información que me corresponde.

### HU-10: Guardar y reutilizar escenarios
Como analista, quiero guardar simulaciones previas para compararlas, editarlas y reutilizarlas sin volver a capturar todo desde cero.

---

## 🧩 Casos de Uso

### CU-1: Ejecutar simulación de escenarios
**Actor principal:** Gerente

**Precondiciones:** El usuario ha ingresado al sistema y existen valores base de KPIs.

**Flujo principal:**
1. El usuario abre el módulo de simulación.
2. El sistema carga los KPIs actuales.
3. El usuario selecciona el horizonte de proyección.
4. El sistema calcula los escenarios favorable, normal y desfavorable.
5. El sistema muestra resultados, gráficas y recomendaciones.

**Postcondición:** Los resultados quedan visibles para análisis y posible guardado.

### CU-2: Ajustar parámetros de sensibilidad
**Actor principal:** Analista

**Precondiciones:** Existe una simulación cargada.

**Flujo principal:**
1. El usuario cambia uno o más parámetros de entrada.
2. El sistema recalcula las proyecciones.
3. El sistema actualiza KPIs, gráficas y recomendaciones.

**Postcondición:** La simulación refleja el nuevo escenario definido por el usuario.

### CU-3: Consultar recomendaciones por escenario
**Actor principal:** Gerente

**Precondiciones:** El sistema ya generó al menos una simulación.

**Flujo principal:**
1. El usuario selecciona un escenario.
2. El sistema muestra las recomendaciones asociadas.
3. El usuario revisa acciones sugeridas y alertas.

**Postcondición:** El usuario conoce las acciones recomendadas para ese escenario.

### CU-4: Gestionar inventario operativo
**Actor principal:** Administrador

**Precondiciones:** El usuario ha iniciado sesión.

**Flujo principal:**
1. El usuario accede al módulo operativo.
2. El sistema muestra stock, capacidad y personal.
3. El usuario actualiza datos operativos.
4. El sistema guarda los cambios y recalcula alertas si aplica.

**Postcondición:** La información operativa queda registrada para análisis.

### CU-5: Guardar y reutilizar escenario
**Actor principal:** Analista

**Precondiciones:** Existe una simulación calculada.

**Flujo principal:**
1. El usuario selecciona guardar escenario.
2. El sistema almacena los parámetros y resultados.
3. El usuario abre el escenario guardado en otra sesión.
4. El sistema recarga los datos para editar o comparar.

**Postcondición:** El escenario queda disponible para reutilización.

---

## ✅ Criterios de Aceptación

### CA-1: Simulación de escenarios
- El sistema debe generar exactamente 3 escenarios: favorable, normal y desfavorable.
- Cada escenario debe mostrar ingresos, margen bruto, pedidos diarios y ticket promedio proyectados.
- La simulación debe completarse sin intervención técnica del usuario.

### CA-2: Visualización de KPIs
- El dashboard debe mostrar los KPIs base con valores actuales.
- Los KPIs deben actualizarse al cambiar el horizonte temporal o los parámetros.
- La información debe presentarse de forma clara y legible en desktop y móvil.

### CA-3: Comparación entre escenarios
- El usuario debe poder comparar los tres escenarios en una sola vista.
- Deben mostrarse diferencias porcentuales frente al estado actual.
- Los gráficos deben distinguir claramente cada escenario por color o estilo.

### CA-4: Recomendaciones accionables
- Cada escenario debe incluir al menos 3 recomendaciones.
- Las recomendaciones deben estar redactadas en lenguaje de negocio, no técnico.
- El escenario desfavorable debe mostrar alertas o acciones de contingencia.

### CA-5: Sensibilidad
- El usuario debe poder modificar pedidos diarios, ticket promedio, margen bruto y ventas digitales.
- Al cambiar un parámetro, la simulación debe recalcularse automáticamente o con una acción explícita de confirmar.
- Los resultados deben reflejar los nuevos valores de entrada sin inconsistencias.

### CA-6: Gestión de inventario y personal
- El sistema debe mostrar stock, capacidad y personal disponible de forma consistente.
- Los cambios operativos deben reflejarse en el dashboard o en el módulo operativo.
- La información debe quedar lista para alimentar alertas y recomendaciones.

### CA-7: Alertas automáticas
- El sistema debe emitir alertas cuando se detecten condiciones críticas.
- Las alertas deben ser visibles y clasificarse por prioridad.
- Cada alerta debe indicar el motivo y la acción sugerida.

### CA-8: Reportes y exportación
- El sistema debe generar reportes descargables sin pérdida de formato relevante.
- El reporte debe incluir parámetros de entrada, escenarios y riesgos.
- El archivo exportado debe poder consultarse posteriormente.

### CA-9: Seguridad y acceso
- El sistema debe pedir credenciales para entrar a áreas protegidas.
- Los usuarios deben ver solo las funciones permitidas por su rol.
- Las acciones sensibles deben quedar asociadas a un usuario autenticado.

### CA-10: Escenarios guardados
- El usuario debe poder guardar un escenario calculado.
- El usuario debe poder abrir y editar un escenario previamente guardado.
- El sistema debe conservar los parámetros originales y los resultados asociados.

---

## 🔐 Requerimientos No Funcionales

### RNF-1: Rendimiento de respuesta
El sistema debe responder a las solicitudes del usuario en un tiempo máximo de 3 segundos en el 95% de las operaciones.

### RNF-2: Concurrencia
El sistema debe soportar al menos 5 usuarios concurrentes sin degradación significativa del rendimiento.

### RNF-3: Cálculo financiero
El sistema debe procesar cálculos de simulación (VAN, TIR, Payback) en menos de 2 segundos.

### RNF-4: Seguridad
El sistema debe requerir autenticación por usuario y contraseña, registrar logs de actividad y preservar la integridad de los datos.

### RNF-5: Fiabilidad
El sistema debe mantener una tasa de error menor al 5% y recuperarse automáticamente ante fallos menores sin pérdida de datos.

### RNF-6: Disponibilidad
El sistema debe estar disponible al menos el 95% del tiempo y accesible por internet cuando esté desplegado.

### RNF-7: Mantenibilidad
El sistema debe permitir mantenimiento y actualización por parte del equipo de desarrollo sin afectar significativamente su funcionamiento, y debe contar con documentación básica suficiente.

### RNF-8: Portabilidad
El sistema debe ser accesible desde diferentes navegadores web (Chrome, Edge y Firefox).

---

## 📈 Modelos de Simulación por Escenario

### ESCENARIO FAVORABLE (Optimista)

**Variaciones de KPIs (vs. estado actual)**

| KPI | Estado Actual | Variación | Valor Favorable |
|-----|--------------|-----------|-----------------|
| Pedidos Diarios | 50 | +20% | 60 |
| Ticket Promedio | $10,000 | +15% | $11,500 |
| Margen Bruto/Venta | $5,000 | +10% | $5,500 |
| Ventas Digitales | 15% | +100% (adicional) | 30% |
| Ventas Presenciales | 85% | -15% | 70% |

**Resultados Proyectados**

| Métrica | Actual | Favorable | Diferencia |
|---------|--------|-----------|-----------|
| Ingresos Diarios | $500,000 | $690,000 | +$190,000 (+38%) |
| Ingresos Mensuales | $15,000,000 | $20,700,000 | +$5,700,000 (+38%) |
| Margen Bruto Diario | $250,000 | $363,000 | +$113,000 (+45%) |
| Margen Bruto Mensual | $7,500,000 | $10,890,000 | +$3,390,000 (+45%) |

**Supuestos**
- Inflación: 0% (neutral)
- Capacidad operativa: +20% (1 barista adicional)
- Promociones: Combos de bebida + pastelería
- Implementación: Ampliar presencia en redes sociales
- Plazo: 3-6 meses

---

### ESCENARIO NORMAL (Continuidad)

**Variaciones de KPIs (vs. estado actual)**

| KPI | Estado Actual | Variación | Valor Normal |
|-----|--------------|-----------|-------------|
| Pedidos Diarios | 50 | +5% | 52.5 (~53) |
| Ticket Promedio | $10,000 | +8% | $10,800 |
| Margen Bruto/Venta | $5,000 | +2% | $5,100 |
| Ventas Digitales | 15% | +50% (adicional) | 22.5% |
| Ventas Presenciales | 85% | -7.5% | 77.5% |

**Resultados Proyectados**

| Métrica | Actual | Normal | Diferencia |
|---------|--------|--------|-----------|
| Ingresos Diarios | $500,000 | $567,400 | +$67,400 (+13.5%) |
| Ingresos Mensuales | $15,000,000 | $17,022,000 | +$2,022,000 (+13.5%) |
| Margen Bruto Diario | $250,000 | $268,200 | +$18,200 (+7.3%) |
| Margen Bruto Mensual | $7,500,000 | $8,046,000 | +$546,000 (+7.3%) |

**Supuestos**
- Inflación: 3% (histórico)
- Capacidad operativa: Sin cambios
- Crecimiento orgánico: Aumento natural de clientela
- Plazo: 3-6 meses

---

### ESCENARIO DESFAVORABLE (Pesimista)

**Variaciones de KPIs (vs. estado actual)**

| KPI | Estado Actual | Variación | Valor Desfavorable |
|-----|--------------|-----------|-------------------|
| Pedidos Diarios | 50 | -20% | 40 |
| Ticket Promedio | $10,000 | -10% | $9,000 |
| Margen Bruto/Venta | $5,000 | -15% | $4,250 |
| Ventas Digitales | 15% | -50% (retroceso) | 7.5% |
| Ventas Presenciales | 85% | +7.5% | 92.5% |

**Resultados Proyectados**

| Métrica | Actual | Desfavorable | Diferencia |
|---------|--------|--------------|-----------|
| Ingresos Diarios | $500,000 | $360,000 | -$140,000 (-28%) |
| Ingresos Mensuales | $15,000,000 | $10,800,000 | -$4,200,000 (-28%) |
| Margen Bruto Diario | $250,000 | $170,000 | -$80,000 (-32%) |
| Margen Bruto Mensual | $7,500,000 | $5,100,000 | -$2,400,000 (-32%) |

**Supuestos**
- Inflación: 8% (crisis)
- Competencia: 2-3 nuevas cafeterías en zona
- Capacidad operativa: Reducción a 1 barista
- Ciclo económico: Contracción de demanda
- Plazo: 3-6 meses (si no se toman medidas)

---

## 🎛️ Factores de Variación (Input del Usuario)

El usuario puede ajustar manualmente:

### Parámetros de Entrada
```
slider_pedidos_diarios: [40-80]              # Rango: -20% a +60%
slider_ticket_promedio: [8000-12000]         # Rango: -20% a +20%
slider_margen_bruto: [4000-6000]             # Rango: -20% a +20%
slider_ventas_digitales: [10%-50%]           # Rango: realista
slider_inflacion_mensual: [0%-10%]           # Rango: 0% a 10%
periodos_proyeccion: [1-6]                   # Meses
```

### Fórmulas de Cálculo Dinámico

```
ingresos_diarios = pedidos_diarios × ticket_promedio
ingresos_mensuales = ingresos_diarios × 30 × (1 + inflacion_mensual)^meses

margen_bruto_diario = pedidos_diarios × margen_bruto_unitario
margen_bruto_mensual = margen_bruto_diario × 30 × (1 + inflacion_mensual)^meses

ingreso_digital = ingresos_mensual × (ventas_digitales / 100)
ingreso_presencial = ingresos_mensual × (ventas_presenciales / 100)
```

---

## 🖼️ Referencia Visual del Anexo

Las imágenes del anexo muestran una interfaz oscura, tipo panel ejecutivo, con las siguientes pantallas y componentes. La especificación debe seguir esta misma estructura visual y funcional.

### Navegación Principal
- Dashboard Ejecutivo
- Simulador de Inversión
- Análisis de Productos
- Analíticas
- Alertas y Recomendaciones
- Configuración

### Dashboard Ejecutivo
- Tarjetas KPI superiores con métricas resumidas
- Gráfico de ventas semanales con línea de ventas y línea de ganancia
- Gráfico de ocupación por horario con barras por franja
- Panel de análisis de riesgos con sliders
- Botón de actualización de datos

### Simulador de Inversión
- Control de inversión inicial
- Costo por pedido
- Pedidos diarios
- Ticket promedio
- Indicadores de resultado: VAN, TIR, payback y viabilidad
- Panel lateral de riesgos con impacto estimado

### Análisis de Productos
- Tabla de rentabilidad por producto
- Columnas: producto, categoría, precio, costo, margen y ventas
- Gráficos complementarios de ventas semanales y ocupación por horario

### Analíticas / Alertas y Recomendaciones
- Listado de alertas con prioridad y mensaje de acción
- Recomendaciones operativas en lenguaje de negocio
- Panel de riesgos con efectos estimados por factor externo

### Criterios de Ajuste Visual
- Tema oscuro predominante
- Barra lateral fija para navegación
- Cards con bordes redondeados y contraste alto
- Gráficos embebidos en paneles compactos
- Espaciado suficiente para lectura rápida en pantalla de gestión

---

## 📋 Recomendaciones por Escenario

### FAVORABLE
✅ **Acciones Recomendadas**
- Invertir en marketing digital (ROI alto)
- Expandir línea de productos complementarios
- Contratar 1-2 baristas adicionales
- Mejorar infraestructura (máquina de café, equipo)
- Considerar segundo punto de venta

✅ **Indicadores de Éxito**
- Margen bruto > $350k diarios
- Ticket promedio > $11k
- Tasa de digitalización > 25%

### NORMAL
⚠️ **Acciones Recomendadas**
- Mantener operaciones actuales
- Optimizar costos (negociar con proveedores)
- Impulsar ventas digitales (bajo costo, alto margen)
- Retención de clientes con programa de lealtad
- Monitorear competencia

⚠️ **Indicadores de Éxito**
- Mantener margen > 50%
- Crecer 5-10% anual
- Reducir costos operativos 2-3%

### DESFAVORABLE
🚨 **Acciones Recomendadas**
- Reducir costos no esenciales
- Revisar precios y estructura de costos
- Aumentar ofertas y promociones
- Acelerar presencia en canales digitales
- Considerar diferenciación (espacio único, atención personal)

🚨 **Indicadores de Alerta**
- Margen bruto < $170k diarios
- Ticket promedio < $9k
- Pérdida de clientes recurrentes

---

## 🎨 Visualizaciones Requeridas

### Dashboard Principal
1. **Cards KPI** (4 columnas)
   - Ingresos Proyectados
   - Margen Bruto Proyectado
   - Pedidos Proyectados
   - Ticket Promedio Proyectado

2. **Gráfico Comparativo** (Líneas)
   - Eje X: Tiempo (semana 1-24)
   - Eje Y: Ingresos (COP)
   - 3 líneas: Favorable, Normal, Desfavorable

3. **Tabla Comparativa**
   - Filas: KPIs
   - Columnas: Actual, Favorable, Normal, Desfavorable, Variación %

4. **Tabla de Recomendaciones**
   - Escenario | Acción | Prioridad | Plazo

### Filtros Interactivos
- Horizonte temporal (1, 3, 6 meses)
- Escenarios (marcar/desmarcar)
- Periodos (semanal, mensual)

---

## 🔧 Arquitectura de Datos

### Base de Datos

#### Tabla: `kpi_base`
```sql
CREATE TABLE kpi_base (
  id UUID PRIMARY KEY,
  pedidos_diarios INTEGER,
  ticket_promedio DECIMAL(10,2),
  margen_bruto DECIMAL(10,2),
  ventas_digitales_pct DECIMAL(5,2),
  ingreso_mensual DECIMAL(15,2),
  fecha_registro TIMESTAMP,
  estado ENUM('actual', 'proyectado'),
  escenario ENUM('favorable', 'normal', 'desfavorable'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `simulaciones`
```sql
CREATE TABLE simulaciones (
  id UUID PRIMARY KEY,
  nombre VARCHAR(255),
  escenario ENUM('favorable', 'normal', 'desfavorable'),
  parametros JSONB,
  resultados JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Estructura JSON de Parámetros
```json
{
  "pedidos_diarios": 50,
  "ticket_promedio": 10000,
  "margen_bruto": 5000,
  "ventas_digitales_pct": 15,
  "inflacion_mensual": 0.03,
  "periodos_meses": 6,
  "fecha_inicio": "2026-05-03",
  "capacidad_operativa": "normal"
}
```

### Estructura JSON de Resultados
```json
{
  "escenario": "favorable",
  "proyecciones": [
    {
      "mes": 1,
      "pedidos_diarios": 60,
      "ticket_promedio": 11500,
      "ingresos_diarios": 690000,
      "ingresos_acumulado": 690000,
      "margen_bruto_diario": 363000,
      "margen_acumulado": 363000
    },
    ...
  ],
  "resumen": {
    "ingresos_6meses": 20700000,
    "margen_6meses": 10890000,
    "variacion_porcentual": 38
  }
}
```

---

## 🚀 Fases de Implementación

### FASE 1: MVP (Semana 1-2)
- [x] Especificación completa
- [ ] Modelo de datos
- [ ] API /api/v1/simulations
- [ ] Componente Dashboard básico
- [ ] Tests unitarios

### FASE 2: Mejoras (Semana 3-4)
- [ ] Gráficos interactivos
- [ ] Sliders para sensibilidad
- [ ] Exportar reportes (PDF)
- [ ] Historial de simulaciones

### FASE 3: Optimización (Semana 5+)
- [ ] Predicciones basadas en ML
- [ ] Integración con datos reales
- [ ] Sistema de alertas
- [ ] Comparación con competencia

---

## 📝 Fórmulas Clave

```
# Proyección Lineal Simple
Valor_Mes_N = Valor_Base × (1 + Tasa_Crecimiento)^N

# Con Inflación
Valor_Real = Valor_Nominal / (1 + Inflacion)^N

# Margen de Contribución
Margen_Unitario = Precio_Venta - Costo_Variable

# Punto de Equilibrio
Cantidad_Equilibrio = Costos_Fijos / Margen_Contribucion_Unitario

# Margen Bruto %
Margen_Bruto_Pct = (Margen_Unitario / Precio_Venta) × 100
```

---

## 📖 Glosario

| Término | Definición |
|---------|-----------|
| **KPI** | Key Performance Indicator - Indicador clave de desempeño |
| **Margen Bruto** | Ingresos - Costo de Bienes Vendidos |
| **Ticket Promedio** | Ingreso total / Cantidad de transacciones |
| **Escenario** | Proyección futura bajo diferentes supuestos |
| **Sensibilidad** | Análisis de cómo cambios en inputs afectan outputs |
| **Inflación** | Aumento general de precios en la economía |

---

**Versión**: 1.0.0
**Fecha**: 2026-05-03
**Estado**: ✅ Aprobada

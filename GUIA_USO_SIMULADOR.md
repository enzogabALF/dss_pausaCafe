# Guía de Uso del Simulador - DSS Pausa Cafe

## 📌 Índice Rápido

1. [Acceso a la Aplicación](#acceso)
2. [Interfaz del Simulador](#interfaz)
3. [Ejecutar una Simulación](#ejecutar)
4. [Interpretar Resultados](#interpretar)
5. [Casos de Uso Prácticos](#casos)
6. [Exportar Resultados](#exportar)
7. [Preguntas Frecuentes](#faq)

---

## <a name="acceso"></a>🌐 Acceso a la Aplicación

### Iniciar Servidor

```bash
# Terminal
cd dss_pausaCafe
npm run dev
```

### Abrir en Navegador

- **URL**: http://localhost:3000
- **Navegadores soportados**: Chrome, Firefox, Edge, Safari
- **Requisitos**: JavaScript habilitado

### Navegación

```
Página de Inicio
    ├── Dashboard (/dashboard)
    ├── Simulador (/simulator) ← AQUÍ
    ├── Productos (/products)
    ├── Analíticas (/analytics)
    └── Alertas (/alerts)
```

Haz click en **"Simulador"** en la barra lateral para acceder.

---

## <a name="interfaz"></a>🎮 Interfaz del Simulador

### Componentes Principales

```
┌─────────────────────────────────────────────────────┐
│ DSS PAUSA CAFE - SIMULADOR                          │
├─────────────────────────────────────────────────────┤
│                                                       │
│ 📊 CONTROLES DE INVERSIÓN (Izquierda)               │
│ ├── Inversión Inicial      [slider]  $X,XXX,XXX    │
│ ├── Costo por Orden         [slider]  $XX           │
│ ├── Pedidos Diarios         [slider]  XX            │
│ ├── Ticket Promedio         [slider]  $XX,XXX      │
│ └── [Ejecutar Simulación]                           │
│                                                       │
│ 📈 RESULTADOS (Derecha)                             │
│ ├── Card Escenario Favorable                        │
│ ├── Card Escenario Normal                           │
│ ├── Card Escenario Desfavorable                     │
│ ├── Gráfico de Flujos Mensuales                     │
│ └── Panel de Riesgos                                │
│                                                       │
│ 📥 EXPORTAR                                          │
│ ├── [Exportar PDF]                                  │
│ └── [Exportar CSV]                                  │
└─────────────────────────────────────────────────────┘
```

---

## <a name="ejecutar"></a>⚙️ Ejecutar una Simulación

### Paso 1: Ajustar Parámetros

En la sección **"CONTROLES DE INVERSIÓN"**, ajusta los 4 sliders:

#### 1️⃣ Inversión Inicial
- **Rango**: $100,000 - $10,000,000
- **¿Qué es?**: Monto inicial a invertir en equipamiento, reforma, etc.
- **Ejemplo**: $800,000

```
Slider: ██████████████░░░░░░ → $800,000
```

**Impacto**: Mayor inversión = Payback más largo pero potencial mayor

---

#### 2️⃣ Costo por Orden
- **Rango**: $10 - $100
- **¿Qué es?**: Costo promedio de producción de cada pedido
- **Ejemplo**: $20

```
Slider: ██████░░░░░░░░░░░░░░ → $20
```

**Impacto**: Mayor costo = Margen menor pero puede reflejar mejor calidad

---

#### 3️⃣ Pedidos Diarios
- **Rango**: 10 - 200
- **¿Qué es?**: Número promedio de pedidos que recibe la cafetería diariamente
- **Ejemplo**: 50

```
Slider: ██████████░░░░░░░░░░ → 50 órdenes/día
```

**Impacto**: Más pedidos = Mayor ingresos pero requiere más capacidad

---

#### 4️⃣ Ticket Promedio
- **Rango**: $1,000 - $50,000
- **¿Qué es?**: Valor promedio de cada pedido en pesos
- **Ejemplo**: $10,000

```
Slider: ████████████░░░░░░░░ → $10,000
```

**Impacto**: Mayor ticket = Mayor ingreso por pedido

---

### Paso 2: Ejecutar Simulación

1. Una vez ajustados todos los parámetros
2. Haz click en el botón verde **"Ejecutar Simulación"**
3. Verás un indicador de carga (spinner)
4. Los resultados aparecerán en **menos de 1 segundo**

```
┌─────────────────────┐
│ ⏳ Calculando...     │  ← Mientras se procesa
└─────────────────────┘

↓ (instantáneamente)

┌──────────────────────────────────────────────┐
│ ✓ RESULTADOS LISTOS                          │
│                                               │
│ 🟢 FAVORABLE    │ 🟡 NORMAL    │ 🔴 DESFA... │
│ VAN $350.9M     │ VAN $288.5M  │ VAN $182.7M │
│ TIR 1000%       │ TIR 1000%    │ TIR 1000%   │
│ Payback 0 meses │ Payback 0.1m │ Payback 0.1m│
└──────────────────────────────────────────────┘
```

---

## <a name="interpretar"></a>📊 Interpretar Resultados

### Tarjetas de Escenarios (Cards)

Cada escenario muestra 3 indicadores clave:

#### **VAN (Valor Actual Neto)**

```
Fórmula: VAN = ∑(Flujo_t / (1 + r)^t) - Inversión_inicial
         donde r = 1% (tasa de descuento)
```

**¿Qué significa?**
- El valor en pesos de todos los flujos futuros, descontados al presente
- Indica cuánto DINERO REAL adicional genera la inversión

**Interpretación:**
- **VAN > 0**: Rentable ✅ (ganancia segura)
- **VAN = 0**: Punto de equilibrio (retorna lo invertido)
- **VAN < 0**: No rentable ❌ (pérdida potencial)

**Ejemplo:**
```
VAN = $350,990,493
→ Si inviertes $800,000 hoy, en 24 meses tendrás
  $350.9M en "ganancia real" (descontada por inflación)
```

---

#### **TIR (Tasa Interna de Retorno)**

```
Fórmula: TIR = la tasa r que hace VAN = 0
```

**¿Qué significa?**
- El porcentaje anualizado de rentabilidad de tu inversión
- Como una "tasa de interés" que genera el proyecto

**Interpretación:**
- **TIR > 10%**: Muy bueno 🚀
- **TIR 5-10%**: Aceptable
- **TIR < 5%**: Mediocre
- **TIR < 0%**: Pérdida

**Ejemplo:**
```
TIR = 1000%
→ Tu dinero crece 10x por año (extremadamente optimista)
  (Este valor es típico en simulaciones ideales)
```

---

#### **Payback (Período de Recuperación)**

```
Fórmula: Payback = Meses hasta recuperar Inversión_inicial
```

**¿Qué significa?**
- Cuánto tiempo tarda en recuperar tu inversión inicial
- Medida de riesgo: más corto = menos riesgo

**Interpretación:**
- **Payback 0-6 meses**: Excelente (recuperas rápido)
- **Payback 6-12 meses**: Bueno
- **Payback 12-24 meses**: Aceptable
- **Payback > 24 meses**: Lento (alto riesgo)
- **Payback = null/∞**: Nunca se recupera

**Ejemplo:**
```
Payback = 0.1 meses ≈ 3 días
→ Recuperas toda tu inversión en menos de 1 semana
  (muy optimista, pero posible en escenarios favorables)
```

---

### Panel de Riesgos

Muestra 4 factores de incertidumbre evaluados:

| Factor | Rango | Interpretación |
|--------|-------|----------------|
| 💱 Dólar | 0-10% | Impacto si el dólar sube |
| 👥 Demanda | 0-10% | Riesgo si baja la demanda |
| 🏢 Competencia | 0-10% | Presión de competidores |
| ⚡ Energía | 0-10% | Volatilidad de servicios |

**Impacto Total**: Suma ponderada de todos los factores

```
Ejemplo:
┌─────────────────┐
│ ANÁLISIS RIESGOS│
├─────────────────┤
│ Dólar:    2%    │
│ Demanda:  4.5%  │
│ Compet:   2.5%  │
│ Energía:  3.5%  │
├─────────────────┤
│ TOTAL:    1.3%  │ ← Impacto combinado
└─────────────────┘
```

---

### Gráfico de Flujos Mensuales

Muestra proyección de **ingresos netos por mes durante 24 meses**:

```
Ingresos
   ↑
   │     ✓ FAVORABLE (línea roja)
   │      /‾‾‾‾‾‾‾
   │     /         \
   │    /  ✓ NORMAL (línea azul)
   │   /    /‾‾‾‾‾
   │  /    /      \
   │ /    /  ✓ DESFAV. (línea gris)
   │/____/________\_____ → Meses (0-24)
   0    6    12    18   24

```

**Leer el gráfico:**
- Línea ascendente = Proyecto crece
- Línea plana = Estancamiento
- Línea descendente = Declive (riesgoso)

---

## <a name="casos"></a>💼 Casos de Uso Prácticos

### Caso 1: Evaluar Expansión Local

**Escenario**: Pausa Cafe quiere abrir una sucursal nueva

**Parámetros**:
```
Inversión Inicial:   $2,000,000 (local + equipos + personal)
Costo por Orden:     $25 (incluye alquiler prorrateado)
Pedidos Diarios:     80 (menos que sede principal)
Ticket Promedio:     $9,000 (similar mercado)
```

**Análisis**:
1. Ejecuta simulación
2. Si VAN > $500M en escenario normal → GO
3. Si Payback < 12 meses → GO
4. Revisa riesgos (competencia local puede ser un factor)

---

### Caso 2: Optimizar Márgenes

**Escenario**: Mejorar eficiencia operativa

**Prueba 1** - Costo actual:
```
Costo por Orden: $30
```

**Prueba 2** - Optimización:
```
Costo por Orden: $20 (mejor proceso)
```

**Comparar**: ¿Cuánto mejora el VAN? ¿Vale la pena invertir en automatización?

---

### Caso 3: Decisión de Inversor

**Escenario**: Presentar a posible inversor

**Parámetros base**:
```
Inversión: $800,000
Órdenes: 50
Ticket: $10,000
Costo: $20
```

**Presentar 3 escenarios** (ya calcula el sistema):
- 🟢 **Optimista** (Favorable): VAN $350.9M
- 🟡 **Base Case** (Normal): VAN $288.5M
- 🔴 **Pesimista** (Desfavorable): VAN $182.7M

**Conclusión**: "Incluso en el peor escenario, el proyecto es rentable"

---

### Caso 4: Análisis de Sensibilidad

**Escenario**: "¿Cuál parámetro impacta más?"

**Proceso**:
1. Fija 3 parámetros
2. Ajusta solo 1 (ej: pedidos diarios)
3. Observa cómo cambia VAN y TIR
4. Repite con otros parámetros

**Ejemplo**:
```
Inversión: $800,000 | Costo: $20 | Ticket: $10,000

Pedidos Diarios = 30  → VAN $100M
Pedidos Diarios = 50  → VAN $288M ← Línea base
Pedidos Diarios = 80  → VAN $500M

Conclusión: La demanda (pedidos) es el factor CRÍTICO
→ Invertir en marketing para aumentar ventas
```

---

## <a name="exportar"></a>📥 Exportar Resultados

Después de ejecutar una simulación, puedes exportar los resultados:

### Opción 1: Exportar a PDF

**Botón**: "Descargar PDF"

**Contenido del PDF**:
- Parámetros de entrada
- 3 cards de escenarios
- Gráfico de flujos
- Análisis de riesgos
- Recomendaciones

**Uso**: Enviar por email, presentar en reuniones

### Opción 2: Exportar a CSV

**Botón**: "Descargar CSV"

**Contenido del CSV**:
- Tabla con 24 filas (meses)
- Columnas: Mes, Flujo_Favorable, Flujo_Normal, Flujo_Desfa
- Compatible con Excel/Sheets

**Uso**: Análisis adicional, gráficos propios, integración con datos

---

## <a name="faq"></a>❓ Preguntas Frecuentes

### P: "¿Por qué el TIR es 1000%?"
R: Es la máxima rentabilidad que el modelo puede calcular. En escenarios reales sería 15-50%. Los valores altos reflejan que es un modelo optimista (ideal para MVP).

---

### P: "¿Qué significa 'Payback = null'?"
R: Significa que la inversión NUNCA se recupera (flujos negativos permanentes). Es un escenario de crisis.

---

### P: "¿Puedo cambiar parámetros después de simular?"
R: Sí. Ajusta los sliders y haz click en "Ejecutar Simulación" nuevamente. Los resultados se actualizan al instante.

---

### P: "¿La simulación es en tiempo real?"
R: Sí. Calcula instantáneamente en tu navegador (sin conexión a internet necesaria).

---

### P: "¿Dónde se guardan mis simulaciones?"
R: En modo demo (sin BD), se pierden al cerrar el navegador. Con BD configurada, se guardan en la base de datos.

---

### P: "¿Puedo usar valores negativos?"
R: No. Los sliders solo permiten valores positivos. Si necesitas "crédito", usa inversión = 0.

---

### P: "¿Qué pasa si dejo los parámetros igual y ejecuto dos veces?"
R: Obtendrás exactamente los mismos resultados (determinístico, no aleatorio).

---

### P: "¿Puedo exportar sin ejecutar simulación?"
R: No. Necesitas ejecutar una simulación primero para tener datos que exportar.

---

### P: "¿Cuál es el escenario 'correcto' a presentar?"
R: Usa el **Normal** (🟡) como base. Menciona Favorable como potencial y Desfavorable como riesgo.

---

## 📞 Ayuda Adicional

- Ver [README.md](./README.md) para descripción general
- Ver [API.md](./API.md) para detalles técnicos
- Contacta al autor si necesitas ayuda

---

**¡Felicidades! Ya sabes usar el simulador. ¡A presentar! 🚀**

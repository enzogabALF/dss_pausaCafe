# Guía de Uso del Simulador - DSS Pausa Cafe

## Objetivo

Esta guía explica cómo usar el simulador de inversión del proyecto DSS Pausa Cafe, cómo interpretar sus resultados y cómo reutilizar escenarios guardados. El simulador funciona tanto en modo demo como con base de datos opcional.

## Acceso

1. Inicia la aplicación con `npm run dev`.
2. Abre `http://localhost:3000`.
3. En la barra lateral entra a `Simulador`.

Si estás trabajando en este workspace, el proyecto ya está dentro de `dss_pausaCafe` y no necesitas volver a clonarlo.

## Qué verás en pantalla

La vista del simulador está compuesta por tres bloques:

- Panel izquierdo: controles de inversión.
- Panel central: resultados financieros, exportación y escenarios guardados.
- Panel derecho: análisis de riesgos.

## Parámetros de entrada

Los controles disponibles son estos:

- Inversión inicial.
- Costo por pedido.
- Pedidos diarios.
- Ticket promedio.

Valores por defecto:

- Inversión inicial: `800000`
- Costo por pedido: `20`
- Pedidos diarios: `50`
- Ticket promedio: `10000`

Rangos permitidos:

- Inversión inicial: `100000` a `10000000`
- Costo por pedido: `1` a `100`
- Pedidos diarios: `1` a `500`
- Ticket promedio: `1000` a `100000`

## Cómo ejecutar una simulación

1. Ajusta los cuatro sliders.
2. Revisa que no aparezcan errores de validación.
3. Haz clic en `Ejecutar Simulación`.
4. Espera a que la tarjeta indique que el cálculo terminó.
5. Revisa los resultados del escenario normal y la comparación entre escenarios.

Si algún valor queda fuera de rango, el botón se deshabilita y la UI muestra un mensaje de corrección.

## Cómo interpretar los resultados

La tarjeta principal muestra cuatro indicadores del escenario normal:

- VAN.
- TIR.
- Payback.
- Viabilidad.

Debajo verás la comparación de los tres escenarios:

- Favorable.
- Normal.
- Desfavorable.

Interpretación básica:

- VAN positivo: el proyecto genera valor.
- TIR alta: el retorno esperado es más atractivo.
- Payback corto: recuperas la inversión más rápido.
- Viabilidad positiva: el escenario normal sigue siendo favorable.

## Panel de riesgos

El panel de riesgos resume cuatro factores:

- Variación del dólar.
- Variación de la demanda.
- Competencia.
- Costo de energía.

Este bloque sirve como apoyo para entender qué tan sensible es la simulación frente a factores externos.

## Exportar resultados

Cuando ya tienes una simulación ejecutada, puedes descargar el análisis en dos formatos:

- `Descargar PDF`
- `Descargar CSV`

Usa PDF si necesitas una versión visual del análisis. Usa CSV si quieres llevar los resultados a una hoja de cálculo.

## Guardar y reutilizar escenarios

El simulador también permite guardar casos para revisarlos después.

### Guardar un escenario

1. Ejecuta una simulación.
2. Haz clic en `Guardar escenario actual`.
3. El caso se guarda localmente en el navegador.

### Reutilizar un escenario

1. En la lista de escenarios guardados, selecciona `Reutilizar`.
2. El simulador recupera esos valores en los controles.
3. Puedes volver a ejecutar la simulación con los mismos parámetros.

### Eliminar un escenario

1. En el escenario guardado, haz clic en `Eliminar`.
2. El caso se borra de la lista local.

Nota: el guardado actual usa almacenamiento local del navegador, así que los escenarios se mantienen en ese equipo y navegador mientras no borres el almacenamiento.

## Modo demo y base de datos

El simulador funciona sin base de datos. En modo demo:

- La simulación responde desde la lógica interna.
- Los KPI se obtienen con fallback mock.
- Puedes usar exportación y escenarios guardados.

Si configuras `DATABASE_URL`, el proyecto puede usar Prisma para persistencia real.

## Casos de uso recomendados

### Evaluar una inversión nueva

1. Usa valores aproximados del proyecto real.
2. Ejecuta la simulación.
3. Compara los tres escenarios.
4. Revisa si el escenario normal sigue siendo viable.

### Comparar alternativas

1. Guarda un escenario base.
2. Cambia solo un parámetro.
3. Vuelve a ejecutar.
4. Compara VAN, TIR y Payback entre ambas simulaciones.

### Preparar una presentación

1. Ejecuta una simulación.
2. Descarga el PDF.
3. Si necesitas tabular datos, descarga también el CSV.

## Mensajes de la interfaz

Durante el uso del simulador puedes ver estos estados:

- `⏳ Simulando...`: el cálculo está en progreso.
- `⚠️ Por favor, corrige los errores antes de continuar`: hay valores inválidos.
- `⚡ Los parámetros cambiaron...`: editaste valores y aún no recalculaste.

## Solución rápida de problemas

### No aparece ningún resultado

- Verifica que hayas pulsado `Ejecutar Simulación`.
- Revisa que no haya errores de validación.

### El botón está deshabilitado

- Algún valor quedó fuera de rango.
- Corrige el parámetro marcado con error.

### El escenario no se guarda

- Asegúrate de que la simulación se haya ejecutado primero.
- Verifica que el navegador permita almacenamiento local.

### No carga la app

- Confirma que `npm run dev` esté corriendo.
- Abre `http://localhost:3000`.

## Resumen rápido

- Ajusta 4 parámetros.
- Ejecuta la simulación.
- Revisa VAN, TIR, Payback y riesgos.
- Exporta a PDF o CSV si lo necesitas.
- Guarda escenarios para reutilizarlos después.

## Relación con la documentación técnica

Si necesitas la versión más formal o técnica del simulador, revisa:

- `README.md`
- `INSTALLATION.md`
- `ESPECIFICACION_TECNICA.md`
- `MODELO_DATOS.md`
- `SUMARIO_TECNICO.md`

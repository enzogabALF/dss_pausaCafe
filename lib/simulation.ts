/**
 * Lógica de cálculo para simulaciones de inversión
 * Calcula VAN, TIR, Payback para 3 escenarios: Favorable, Normal, Desfavorable
 */

export interface SimulationInput {
  initialInvestment: number; // Inversión inicial
  costPerOrder: number; // Costo por pedido (%)
  dailyOrders: number; // Pedidos diarios
  averageTicket: number; // Ticket promedio
}

export interface ScenarioResult {
  van: number;
  tir: number;
  payback: number;
  income: number;
}

export interface SimulationResult {
  favorable: ScenarioResult;
  normal: ScenarioResult;
  unfavorable: ScenarioResult;
  risks: RiskAnalysis;
}

export interface RiskAnalysis {
  dolarVariation: number;
  demandVariation: number;
  competitionVariation: number;
  energyCostVariation: number;
  totalImpact: number;
}

/**
 * Calcula flujo de caja mensual
 */
function calculateMonthlyFlow(
  dailyOrders: number,
  averageTicket: number,
  costPerOrder: number,
  variationFactor: number = 1
): number {
  const adjustedOrders = dailyOrders * variationFactor;
  const monthlyRevenue = adjustedOrders * 30 * averageTicket;
  const monthlyCost = adjustedOrders * 30 * (averageTicket * (costPerOrder / 100));
  return monthlyRevenue - monthlyCost;
}

/**
 * Calcula VAN (Valor Actual Neto)
 */
function calculateVAN(
  initialInvestment: number,
  monthlyFlows: number[],
  discountRate: number = 0.01
): number {
  let van = -initialInvestment;
  for (let i = 0; i < monthlyFlows.length; i++) {
    van += monthlyFlows[i] / Math.pow(1 + discountRate, i + 1);
  }
  return van;
}

/**
 * Calcula TIR (Tasa Interna de Retorno)
 */
function calculateTIR(
  initialInvestment: number,
  monthlyFlows: number[]
): number {
  let tir = 0;
  let precision = 0.0001;
  let maxIterations = 1000;
  let low = -0.99;
  let high = 10;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    tir = (low + high) / 2;
    let van = -initialInvestment;

    for (let i = 0; i < monthlyFlows.length; i++) {
      van += monthlyFlows[i] / Math.pow(1 + tir, i + 1);
    }

    if (Math.abs(van) < precision) {
      break;
    }

    if (van > 0) {
      low = tir;
    } else {
      high = tir;
    }
  }

  return tir * 100; // Convertir a porcentaje
}

/**
 * Calcula Payback Period (meses necesarios para recuperar inversión)
 */
function calculatePayback(
  initialInvestment: number,
  monthlyFlows: number[]
): number {
  let accumulated = 0;
  for (let i = 0; i < monthlyFlows.length; i++) {
    accumulated += monthlyFlows[i];
    if (accumulated >= initialInvestment) {
      const fraction =
        (initialInvestment - (accumulated - monthlyFlows[i])) /
        monthlyFlows[i];
      return i + fraction;
    }
  }
  return monthlyFlows.length;
}

/**
 * Calcula análisis de riesgos
 */
function calculateRisks(): RiskAnalysis {
  return {
    dolarVariation: 2, // 2% impacto
    demandVariation: 4.5, // 4.5% impacto
    competitionVariation: 2.5, // 2.5% impacto
    energyCostVariation: 3.5, // 3.5% impacto
    totalImpact: 1.3, // 1.3% impacto total
  };
}

/**
 * Función principal de simulación
 */
export function runSimulation(input: SimulationInput): SimulationResult {
  const { initialInvestment, costPerOrder, dailyOrders, averageTicket } =
    input;

  // Generar flujos de 24 meses
  const monthlyFlows24 = Array(24).fill(0);

  // ESCENARIO FAVORABLE (+38%)
  const favorableFlows = monthlyFlows24.map(() =>
    calculateMonthlyFlow(dailyOrders, averageTicket, costPerOrder, 1.38)
  );
  const favorableVAN = calculateVAN(initialInvestment, favorableFlows);
  const favorableTIR = calculateTIR(initialInvestment, favorableFlows);
  const favorablePayback = calculatePayback(initialInvestment, favorableFlows);
  const favorableIncome = favorableFlows.reduce((a, b) => a + b, 0);

  // ESCENARIO NORMAL (+13.5%)
  const normalFlows = monthlyFlows24.map(() =>
    calculateMonthlyFlow(dailyOrders, averageTicket, costPerOrder, 1.135)
  );
  const normalVAN = calculateVAN(initialInvestment, normalFlows);
  const normalTIR = calculateTIR(initialInvestment, normalFlows);
  const normalPayback = calculatePayback(initialInvestment, normalFlows);
  const normalIncome = normalFlows.reduce((a, b) => a + b, 0);

  // ESCENARIO DESFAVORABLE (-28%)
  const unfavorableFlows = monthlyFlows24.map(() =>
    calculateMonthlyFlow(dailyOrders, averageTicket, costPerOrder, 0.72)
  );
  const unfavorableVAN = calculateVAN(initialInvestment, unfavorableFlows);
  const unfavorableTIR = calculateTIR(initialInvestment, unfavorableFlows);
  const unfavorablePayback = calculatePayback(
    initialInvestment,
    unfavorableFlows
  );
  const unfavorableIncome = unfavorableFlows.reduce((a, b) => a + b, 0);

  const risks = calculateRisks();

  return {
    favorable: {
      van: favorableVAN,
      tir: favorableTIR,
      payback: favorablePayback,
      income: favorableIncome,
    },
    normal: {
      van: normalVAN,
      tir: normalTIR,
      payback: normalPayback,
      income: normalIncome,
    },
    unfavorable: {
      van: unfavorableVAN,
      tir: unfavorableTIR,
      payback: unfavorablePayback,
      income: unfavorableIncome,
    },
    risks,
  };
}

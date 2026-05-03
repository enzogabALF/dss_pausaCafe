/**
 * Tipos compartidos en toda la aplicación
 */

// Escenarios disponibles
export type Scenario = 'favorable' | 'normal' | 'unfavorable';
export type ScenarioLabel = 'Favorable' | 'Normal' | 'Desfavorable';

export const SCENARIO_MAP: Record<Scenario, ScenarioLabel> = {
  favorable: 'Favorable',
  normal: 'Normal',
  unfavorable: 'Desfavorable',
};

// Prioridades de alertas
export type AlertPriority = 'critical' | 'warning' | 'info';
export type AlertPriorityLabel = 'Crítica' | 'Advertencia' | 'Información';

export const ALERT_PRIORITY_MAP: Record<AlertPriority, AlertPriorityLabel> = {
  critical: 'Crítica',
  warning: 'Advertencia',
  info: 'Información',
};

// KPI
export interface KpiData {
  date: string;
  totalOrders: number;
  totalRevenue: number;
  averageTicket: number;
  digitalSales: number;
  totalCost: number;
  operationalCost: number;
  margin: number;
  occupancyRate: number;
  categories: Record<
    string,
    {
      sales: number;
      margin: number;
    }
  >;
}

// Simulación
export interface SimulationParams {
  initialInvestment: number;
  costPerOrder: number;
  dailyOrders: number;
  averageTicket: number;
}

export interface ScenarioResult {
  van: number;
  tir: number;
  payback: number;
  income: number;
}

export interface SimulationResultData {
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

// API Responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  error?: string;
}

// Alert
export interface Alert {
  id: string;
  title: string;
  description: string;
  priority: AlertPriority;
  category: string;
  scenario: Scenario;
  timestamp: string;
  actionable: boolean;
}

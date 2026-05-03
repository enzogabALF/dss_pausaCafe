import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SimulationResult, SimulationInput } from './simulation';
import { RiskAnalysis } from './types';

export async function exportResultsAsPDF(
  result: SimulationResult,
  risks: RiskAnalysis,
  params: {
    investment: number;
    costPercent: number;
    dailyOrders: number;
    averageTicket: number;
  }
): Promise<void> {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    doc.setFontSize(18);
    doc.text('REPORTE DE SIMULACIÓN', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Fecha
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, yPosition);
    yPosition += 8;

    // Parámetros de entrada
    doc.setFontSize(12);
    doc.text('PARÁMETROS DE ENTRADA', 20, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.text(`• Inversión Inicial: $${formatCurrency(params.investment)}`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Costo por Pedido: ${params.costPercent}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Pedidos Diarios: ${params.dailyOrders}`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Ticket Promedio: $${formatCurrency(params.averageTicket)}`, 25, yPosition);
    yPosition += 12;

    // Resultados Normales
    doc.setFontSize(12);
    doc.text('ESCENARIO NORMAL', 20, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.text(`• VAN (24 meses): $${formatCurrency(result.normal.van)}`, 25, yPosition);
    yPosition += 5;
    doc.text(`• TIR: ${result.normal.tir.toFixed(2)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Payback: ${result.normal.payback.toFixed(1)} meses`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Ingreso Total: $${formatCurrency(result.normal.income)}`, 25, yPosition);
    yPosition += 12;

    // Escenarios Comparados
    doc.setFontSize(12);
    doc.text('ANÁLISIS DE ESCENARIOS', 20, yPosition);
    yPosition += 6;
    doc.setFontSize(10);

    doc.text('Favorable (+38%):', 25, yPosition);
    yPosition += 4;
    doc.text(`  VAN: $${formatCurrency(result.favorable.van)} | Payback: ${result.favorable.payback.toFixed(1)} meses`, 30, yPosition);
    yPosition += 8;

    doc.text('Normal (+13.5%):', 25, yPosition);
    yPosition += 4;
    doc.text(`  VAN: $${formatCurrency(result.normal.van)} | Payback: ${result.normal.payback.toFixed(1)} meses`, 30, yPosition);
    yPosition += 8;

    doc.text('Desfavorable (-28%):', 25, yPosition);
    yPosition += 4;
    doc.text(`  VAN: $${formatCurrency(result.unfavorable.van)} | Payback: ${result.unfavorable.payback.toFixed(1)} meses`, 30, yPosition);
    yPosition += 12;

    // Análisis de Riesgos
    doc.setFontSize(12);
    doc.text('ANÁLISIS DE RIESGOS', 20, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.text(`• Variación Dólar: ${risks.dolarVariation.toFixed(2)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Variación Demanda: ${risks.demandVariation.toFixed(2)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Variación Competencia: ${risks.competitionVariation.toFixed(2)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Variación Energía: ${risks.energyCostVariation.toFixed(2)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Impacto Total: ${risks.totalImpact.toFixed(2)}%`, 25, yPosition);
    yPosition += 12;

    // Viabilidad
    const isViable = result.normal.van > 0;
    doc.setFontSize(12);
    doc.text(`VIABILIDAD: ${isViable ? '✓ VIABLE' : '✗ NO VIABLE'}`, 20, yPosition);

    // Descargar
    doc.save(`simulacion-${new Date().getTime()}.pdf`);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    throw error;
  }
}

export function exportResultsAsCSV(
  result: SimulationResult,
  risks: RiskAnalysis,
  params: {
    investment: number;
    costPercent: number;
    dailyOrders: number;
    averageTicket: number;
  }
): void {
  try {
    const rows = [
      ['REPORTE DE SIMULACIÓN - PAUSA CAFE'],
      [`Fecha: ${new Date().toLocaleDateString('es-ES')}`],
      [],
      ['PARÁMETROS DE ENTRADA'],
      ['Inversión Inicial', `$${formatCurrency(params.investment)}`],
      ['Costo por Pedido', `${params.costPercent}%`],
      ['Pedidos Diarios', params.dailyOrders.toString()],
      ['Ticket Promedio', `$${formatCurrency(params.averageTicket)}`],
      [],
      ['ESCENARIO NORMAL'],
      ['VAN (24 meses)', `$${formatCurrency(result.normal.van)}`],
      ['TIR', `${result.normal.tir.toFixed(2)}%`],
      ['Payback', `${result.normal.payback.toFixed(1)} meses`],
      ['Ingreso Total', `$${formatCurrency(result.normal.income)}`],
      [],
      ['ANÁLISIS DE ESCENARIOS'],
      ['Escenario', 'VAN', 'Payback (meses)', 'TIR (%)'],
      ['Favorable (+38%)', `$${formatCurrency(result.favorable.van)}`, result.favorable.payback.toFixed(1), result.favorable.tir.toFixed(2)],
      ['Normal (+13.5%)', `$${formatCurrency(result.normal.van)}`, result.normal.payback.toFixed(1), result.normal.tir.toFixed(2)],
      ['Desfavorable (-28%)', `$${formatCurrency(result.unfavorable.van)}`, result.unfavorable.payback.toFixed(1), result.unfavorable.tir.toFixed(2)],
      [],
      ['ANÁLISIS DE RIESGOS'],
      ['Factor', 'Impacto (%)'],
      ['Variación Dólar', risks.dolarVariation.toFixed(2)],
      ['Variación Demanda', risks.demandVariation.toFixed(2)],
      ['Variación Competencia', risks.competitionVariation.toFixed(2)],
      ['Variación Energía', risks.energyCostVariation.toFixed(2)],
      ['Impacto Total', risks.totalImpact.toFixed(2)],
      [],
      ['VIABILIDAD', result.normal.van > 0 ? 'VIABLE' : 'NO VIABLE'],
    ];

    // Convertir a CSV
    const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    // Descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `simulacion-${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al generar CSV:', error);
    throw error;
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

import { NextRequest, NextResponse } from 'next/server';
import { runSimulation, SimulationInput } from '@/lib/simulation';

/**
 * POST /api/simulations
 * Ejecuta una simulación de inversión
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar entrada
    const { initialInvestment, costPerOrder, dailyOrders, averageTicket } =
      body;

    if (
      !initialInvestment ||
      !costPerOrder ||
      !dailyOrders ||
      !averageTicket
    ) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    const input: SimulationInput = {
      initialInvestment: parseFloat(initialInvestment),
      costPerOrder: parseFloat(costPerOrder),
      dailyOrders: parseInt(dailyOrders),
      averageTicket: parseFloat(averageTicket),
    };

    // Ejecutar simulación
    const result = runSimulation(input);

    return NextResponse.json(
      {
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en simulación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/simulations/health
 * Verifica estado de la API
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'API de simulaciones operativa',
    timestamp: new Date().toISOString(),
  });
}

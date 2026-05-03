import { NextRequest, NextResponse } from 'next/server';
import { runSimulation, SimulationInput } from '@/lib/simulation';
import { SimulationInputSchema } from '@/lib/validations';
import { getPrismaClient, hasDatabaseUrl } from '@/lib/prisma';

/**
 * POST /api/simulations
 * Ejecuta una simulación de inversión con validación Zod
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar entrada con Zod
    const validation = SimulationInputSchema.safeParse(body);

    if (!validation.success) {
      // Organizar errores por campo
      const errors: Record<string, string> = {};
      
      if (validation.error?.issues) {
        validation.error.issues.forEach((issue: any) => {
          const field = issue.path?.[0] ? String(issue.path[0]) : 'general';
          errors[field] = issue.message;
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Validación fallida',
          errors,
        },
        { status: 400 }
      );
    }

    const input: SimulationInput = validation.data;

    // Ejecutar simulación
    const result = runSimulation(input);

    let persisted = false;
    let simulationId: string | undefined;

    if (hasDatabaseUrl()) {
      try {
        const prisma = getPrismaClient();
        const totalRevenue = input.dailyOrders * 30 * input.averageTicket;
        const totalCost = totalRevenue * (input.costPerOrder / 100);
        const margin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;

        const latestKpi = await prisma.kpiBase.findFirst({
          orderBy: { createdAt: 'desc' },
        });

        const kpi =
          latestKpi ||
          (await prisma.kpiBase.create({
            data: {
              totalOrders: input.dailyOrders,
              totalRevenue,
              averageTicket: input.averageTicket,
              digitalSales: 15,
              totalCost,
              operationalCost: totalCost * 0.62,
              margin,
              occupancyRate: 72,
              peakHours: JSON.stringify(['08:00', '12:00', '17:00']),
              categories: JSON.stringify({
                General: { sales: totalRevenue, margin },
              }),
            },
          }));

        const createdSimulation = await prisma.simulation.create({
          data: {
            initialInvestment: input.initialInvestment,
            costPerOrder: input.costPerOrder,
            dailyOrders: input.dailyOrders,
            averageTicket: input.averageTicket,
            favorableVAN: result.favorable.van,
            favorableTIR: result.favorable.tir,
            favorablePayback: result.favorable.payback,
            favorableIncome: result.favorable.income,
            normalVAN: result.normal.van,
            normalTIR: result.normal.tir,
            normalPayback: result.normal.payback,
            normalIncome: result.normal.income,
            unfavorableVAN: result.unfavorable.van,
            unfavorableTIR: result.unfavorable.tir,
            unfavorablePayback: result.unfavorable.payback,
            unfavorableIncome: result.unfavorable.income,
            riskFactors: JSON.stringify(result.risks),
            totalRiskImpact: result.risks.totalImpact,
            kpiId: kpi.id,
          },
        });

        persisted = true;
        simulationId = createdSimulation.id;
      } catch (dbError) {
        console.warn('No se pudo persistir simulación, se devuelve cálculo en modo demo:', dbError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        persisted,
        simulationId,
        data: result,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en simulación:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/simulations/health
 * Verifica estado de la API
 */
export async function GET(req: NextRequest) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({
      status: 'ok',
      message: 'API de simulaciones operativa (modo demo sin persistencia)',
      timestamp: new Date().toISOString(),
      persisted: false,
      data: [],
    });
  }

  try {
    const prisma = getPrismaClient();
    const items = await prisma.simulation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        createdAt: true,
        initialInvestment: true,
        dailyOrders: true,
        averageTicket: true,
        normalVAN: true,
        normalTIR: true,
        normalPayback: true,
      },
    });

    return NextResponse.json({
      status: 'ok',
      message: 'API de simulaciones operativa',
      timestamp: new Date().toISOString(),
      persisted: true,
      data: items,
    });
  } catch (error) {
    console.warn('Historial no disponible, devolviendo lista vacía:', error);
    return NextResponse.json({
      status: 'ok',
      message: 'API de simulaciones operativa (historial no disponible)',
      timestamp: new Date().toISOString(),
      persisted: false,
      data: [],
    });
  }
}

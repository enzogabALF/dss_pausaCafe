import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient, hasDatabaseUrl } from '@/lib/prisma';

const MOCK_KPI = {
  date: new Date().toISOString().split('T')[0],
  totalOrders: 50,
  totalRevenue: 210000,
  averageTicket: 4250,
  digitalSales: 15,
  totalCost: 67500,
  operationalCost: 42000,
  margin: 68.5,
  occupancyRate: 72,
  categories: {
    'Bebidas Calientes': { sales: 2840, margin: 72 },
    'Bebidas Frías': { sales: 392, margin: 75 },
    Pasteleria: { sales: 873, margin: 67.9 },
    Comida: { sales: 739, margin: 62.4 },
  },
};

/**
 * GET /api/kpi
 * Obtiene los KPIs actuales de la cafetería
 */
export async function GET(req: NextRequest) {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        {
          success: true,
          data: MOCK_KPI,
          source: 'mock',
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    let latest = null;
    try {
      const prisma = getPrismaClient();
      latest = await prisma.kpiBase.findFirst({
        orderBy: { createdAt: 'desc' },
      });
    } catch (dbError) {
      console.warn('DB no disponible para KPI, usando mock:', dbError);
      return NextResponse.json(
        {
          success: true,
          data: MOCK_KPI,
          source: 'fallback-mock',
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    if (!latest) {
      return NextResponse.json(
        {
          success: true,
          data: MOCK_KPI,
          source: 'mock',
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    const kpiData = {
      date: latest.date.toISOString().split('T')[0],
      totalOrders: latest.totalOrders,
      totalRevenue: latest.totalRevenue,
      averageTicket: latest.averageTicket,
      digitalSales: latest.digitalSales,
      totalCost: latest.totalCost,
      operationalCost: latest.operationalCost,
      margin: latest.margin,
      occupancyRate: latest.occupancyRate,
      categories: JSON.parse(latest.categories || '{}'),
    };

    return NextResponse.json(
      {
        success: true,
        data: kpiData,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error obteniendo KPIs:', error);
    return NextResponse.json(
      { error: 'Error al obtener KPIs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/kpi
 * Guarda nuevos KPIs
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        {
          success: true,
          persisted: false,
          message: 'Sin DATABASE_URL: KPI aceptado en modo demo (no persistido)',
          data: body,
          timestamp: new Date().toISOString(),
        },
        { status: 201 }
      );
    }

    const prisma = getPrismaClient();
    const categories =
      typeof body.categories === 'string'
        ? body.categories
        : JSON.stringify(body.categories ?? {});

    const created = await prisma.kpiBase.create({
      data: {
        date: body.date ? new Date(body.date) : new Date(),
        totalOrders: Number(body.totalOrders ?? 0),
        totalRevenue: Number(body.totalRevenue ?? 0),
        averageTicket: Number(body.averageTicket ?? 0),
        digitalSales: Number(body.digitalSales ?? 0),
        totalCost: Number(body.totalCost ?? 0),
        operationalCost: Number(body.operationalCost ?? 0),
        margin: Number(body.margin ?? 0),
        occupancyRate: Number(body.occupancyRate ?? 0),
        peakHours:
          typeof body.peakHours === 'string'
            ? body.peakHours
            : JSON.stringify(body.peakHours ?? {}),
        categories,
      },
    });

    return NextResponse.json(
      {
        success: true,
        persisted: true,
        message: 'KPIs guardados correctamente',
        data: {
          ...body,
          id: created.id,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error guardando KPIs:', error);
    return NextResponse.json(
      { error: 'Error al guardar KPIs' },
      { status: 500 }
    );
  }
}

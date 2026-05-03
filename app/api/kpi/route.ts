import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/kpi
 * Obtiene los KPIs actuales de la cafetería
 */
export async function GET(req: NextRequest) {
  try {
    // Datos mock - en producción vendrían de la base de datos
    const kpiData = {
      date: new Date().toISOString().split('T')[0],
      totalOrders: 50,
      totalRevenue: 210000, // $210.000
      averageTicket: 4250,
      digitalSales: 15,
      totalCost: 67500,
      operationalCost: 42000,
      margin: 68.5,
      occupancyRate: 72,
      categories: {
        'Bebidas Calientes': { sales: 2840, margin: 72 },
        'Bebidas Frías': { sales: 392, margin: 75 },
        'Pastelería': { sales: 873, margin: 67.9 },
        'Comida': { sales: 739, margin: 62.4 },
      },
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

    // En producción: guardar en base de datos con Prisma
    // await prisma.kpiBase.create({ data: body });

    return NextResponse.json(
      {
        success: true,
        message: 'KPIs guardados correctamente',
        data: body,
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

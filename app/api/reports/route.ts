import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient, hasDatabaseUrl } from '@/lib/prisma';

export async function GET() {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({
      success: true,
      persisted: false,
      data: [],
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const prisma = getPrismaClient();
    const data = await prisma.reportHistory.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      persisted: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('No se pudo leer el historial de reportes:', error);
    return NextResponse.json({
      success: true,
      persisted: false,
      data: [],
      timestamp: new Date().toISOString(),
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!hasDatabaseUrl()) {
    return NextResponse.json(
      {
        success: true,
        persisted: false,
        data: body,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  }

  try {
    const prisma = getPrismaClient();
    const created = await prisma.reportHistory.create({
      data: {
        title: String(body.title ?? 'Reporte de simulación'),
        format: String(body.format ?? 'pdf'),
        scenarioName: String(body.scenarioName ?? 'Escenario normal'),
        investment: Number(body.investment ?? 0),
        costPercent: Number(body.costPercent ?? 0),
        dailyOrders: Number(body.dailyOrders ?? 0),
        averageTicket: Number(body.averageTicket ?? 0),
        persisted: Boolean(body.persisted ?? true),
        source: String(body.source ?? 'database'),
      },
    });

    return NextResponse.json(
      {
        success: true,
        persisted: true,
        data: created,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.warn('No se pudo guardar el historial de reportes:', error);
    return NextResponse.json(
      {
        success: true,
        persisted: false,
        data: body,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  }
}

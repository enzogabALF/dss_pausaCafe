import { NextRequest, NextResponse } from 'next/server';
import { generateAlerts } from '@/lib/alerts/risk-engine';
import { buildOperationsSnapshot } from '@/lib/operations';

const DEMO_KPI = {
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

export async function GET() {
  const alerts = generateAlerts(DEMO_KPI, buildOperationsSnapshot());

  return NextResponse.json({
    success: true,
    data: alerts,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const kpi = body.kpi ?? DEMO_KPI;
  const operations = body.operations ?? buildOperationsSnapshot();

  return NextResponse.json(
    {
      success: true,
      persisted: false,
      data: generateAlerts(kpi, operations),
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}

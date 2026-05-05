import { NextRequest, NextResponse } from 'next/server';
import { buildOperationsSnapshot } from '@/lib/operations';

export async function GET() {
  const snapshot = buildOperationsSnapshot();

  return NextResponse.json({
    success: true,
    data: snapshot,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const snapshot = buildOperationsSnapshot(body);

  return NextResponse.json(
    {
      success: true,
      persisted: false,
      data: snapshot,
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { INVOICES, JWT_SECRET } from '../../data';

interface JwtPayload {
  user_id: number;
  username: string;
  role: string;
}

function getPayload(request: NextRequest): JwtPayload | null {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.slice(7), JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = getPayload(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const invoice = INVOICES.find(inv => inv.id === Number(id));

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  if (invoice.is_admin && payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({ invoice });
}

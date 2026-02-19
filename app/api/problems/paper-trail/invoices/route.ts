import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { INVOICES, JWT_SECRET } from '../data';

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

export async function GET(request: NextRequest) {
  const payload = getPayload(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const invoices = INVOICES
    .filter(inv => inv.user_id === payload.user_id)
    .map(({ id, vendor, amount, is_admin }) => ({ id, vendor, amount, is_admin }));

  return NextResponse.json({ invoices });
}

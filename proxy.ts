import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get('browser-id')) {
    response.cookies.set('browser-id', uuidv4(), {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

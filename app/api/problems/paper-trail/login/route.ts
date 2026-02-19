import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { USERS, JWT_SECRET } from '../data';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const user = USERS.find(u => u.username === username && u.password === password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { user_id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    );

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

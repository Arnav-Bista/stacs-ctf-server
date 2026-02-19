import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://127.0.0.1:3210/wetterbericht');
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Wetterbericht service unavailable' },
      { status: 503 }
    );
  }
}

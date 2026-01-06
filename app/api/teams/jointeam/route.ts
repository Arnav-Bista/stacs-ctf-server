import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { joinKey } = await request.json();

        if (!joinKey) {
            return NextResponse.json(
                { error: 'Join key is required' },
                { status: 400 }
            );
        }

        const getTeam = db.prepare("SELECT * FROM teams WHERE join_key = ?");
        const team = getTeam.get(joinKey);

        if (!team) {
            return NextResponse.json(
                { error: 'Invalid join key' },
                { status: 404 }
            );
        }

        

        return NextResponse.json(team, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to join team' },
            { status: 500 }
        );
    }
}
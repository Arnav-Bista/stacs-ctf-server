import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

// GET - Retrieve comments for the current browser-id
export async function GET(request: NextRequest) {
  try {
    const browserId = request.cookies.get('browser-id')?.value;

    if (!browserId) {
      return NextResponse.json({ error: 'No browser-id found' }, { status: 400 });
    }

    const comments = db.prepare(`
      SELECT id, data, created_at
      FROM xss_comments
      WHERE browser_id = ?
      ORDER BY created_at DESC
    `).all(browserId);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST - Create a new comment for the current browser-id
export async function POST(request: NextRequest) {
  try {
    const browserId = request.cookies.get('browser-id')?.value;

    if (!browserId) {
      return NextResponse.json({ error: 'No browser-id found' }, { status: 400 });
    }

    const { comment } = await request.json();

    if (!comment || typeof comment !== 'string' || !comment.trim()) {
      return NextResponse.json({ error: 'Invalid comment' }, { status: 400 });
    }

    const result = db.prepare(`
      INSERT INTO xss_comments (browser_id, data)
      VALUES (?, ?)
    `).run(browserId, comment);

    return NextResponse.json({
      success: true,
      commentId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

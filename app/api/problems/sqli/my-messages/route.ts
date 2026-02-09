import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Store browser-id -> username, password mapping
const sessionMap: Map<string, [string, string]> = new Map();

interface Data {
  username?: string;
  password?: string;
}

interface Message {
  id: number;
  to_user: string;
  from_user: string;
  content: string;
}

async function initializeDatabase(db: any) {
  // Create users table
  await db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Create messages table
  await db.exec(`
    CREATE TABLE messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      to_user TEXT NOT NULL,
      from_user TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);

  // Insert admin user
  await db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    ['admin', 'super_secret_admin_password_999']
  );

  await db.run(
    `INSERT INTO messages (to_user, from_user, content) VALUES (?, ?, ?)`,
    ['public', 'system', 'Welcome to the messaging system!']
  );
  await db.run(
    `INSERT INTO messages (to_user, from_user, content) VALUES (?, ?, ?)`,
    ['public', 'moderator', 'Please keep all messages respectful.']
  );

  await db.run(
    `INSERT INTO messages (to_user, from_user, content) VALUES (?, ?, ?)`,
    ['admin', 'hr', 'Your quarterly review is scheduled for next week.']
  );

  await db.run(
    `INSERT INTO messages (to_user, from_user, content) VALUES (?, ?, ?)`,
    ['admin', 'it-support', 'Your laptop warranty expires in 30 days.']
  );
  await db.run(
    `INSERT INTO messages (to_user, from_user, content) VALUES (?, ?, ?)`,
    ['admin', 'ceo', 'Great job on the project! Here is your bonus code: flag_{every-statement-needs-parameters}']
  );
  await db.run(
    `INSERT INTO messages (to_user, from_user, content) VALUES (?, ?, ?)`,
    ['admin', 'security', 'Please update your password by end of month.']
  );
}

async function handleRegister(browserId: string, username: string, password: string) {
  // Check if browser-id already registered
  if (sessionMap.has(browserId)) {
    return NextResponse.json(
      { message: "You are already registered in this session!" },
      { status: 400 }
    );
  }

  let db = null;
  try {
    db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    });

    await initializeDatabase(db);

    // SAFE: Using parameterized query
    await db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, password]
    );

    // Store username and password in session
    sessionMap.set(browserId, [username, password]);

    return NextResponse.json({
      message: "Registration successful! You can now view your messages."
    });

  } catch (error) {
    return NextResponse.json(
      { message: String(error) },
      { status: 500 }
    );
  } finally {
    if (db) {
      await db.close();
    }
  }
}

async function handleGetMessages(browserId: string) {
  // Check if browser-id is registered
  if (!sessionMap.has(browserId)) {
    return NextResponse.json(
      { message: "You must register first!", messages: [] },
      { status: 401 }
    );
  }

  const [username, password] = sessionMap.get(browserId)!;
  let db = null;
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    });

    await initializeDatabase(db);

    // VULNERABLE: Using string concatenation instead of parameterized query
    const query = `SELECT * FROM messages WHERE to_user = '${username}' OR to_user = 'public'`;

    // Set query timeout (5 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Query timeout: execution took too long'));
      }, 5000);
    });

    const queryPromise = db.all(query);
    const result = await Promise.race([queryPromise, timeoutPromise]) as Message[];

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return NextResponse.json({
      message: "Messages retrieved successfully",
      messages: result
    });

  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const errorMessage = String(error);
    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { message: "Query timeout: execution took too long", messages: [] },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { message: errorMessage, messages: [] },
      { status: 500 }
    );
  } finally {
    if (db) {
      await db.close();
    }
  }
}

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action");
  const browserId = request.cookies.get('browser-id')?.value;

  if (!browserId) {
    return NextResponse.json(
      { message: "Browser ID not found" },
      { status: 400 }
    );
  }

  if (action === "register") {
    const data = await request.json() as Data;

    if (!data.username || !data.password) {
      return NextResponse.json(
        { message: "Username and password cannot be empty!" },
        { status: 400 }
      );
    }

    return handleRegister(browserId, data.username, data.password);
  }

  if (action === "get-messages") {
    return handleGetMessages(browserId);
  }

  if (action === "reset") {
    sessionMap.delete(browserId);
    return NextResponse.json({
      message: "Session reset successfully!"
    });
  }

  return NextResponse.json(
    { message: "Invalid action" },
    { status: 400 }
  );
}

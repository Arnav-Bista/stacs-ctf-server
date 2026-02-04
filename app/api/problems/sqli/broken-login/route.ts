import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

interface BrokenLogin {
  username?: string,
  password?: string,
}

export async function POST(request: NextRequest) {
  // TODO: Rate Limit (team-based)
  let db = null;
  let timeoutId: NodeJS.Timeout | null = null;
  try {
    const { username, password } = await request.json() as BrokenLogin;
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password required" },
        { status: 400 }
      );
    }

    db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT
      )
    `);

    await db.exec(`
      INSERT INTO users (id, username, password)
      VALUES (1, 'noobysqlinjection', 'youre_cracking_this_password_already??')
    `);

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    // Set query timeout (5 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Query timeout: execution took too long'));
      }, 5000);
    });

    const queryPromise = db.all(query);
    const result = await Promise.race([queryPromise, timeoutPromise]) as any[];

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (result.length > 0) {
      return NextResponse.json({
        success: true,
        message: "flag_{sql_injection_was_on_another_short}"
      });
    }
    else {
      return NextResponse.json({
        success: false,
        message: "Invalid Username or Password"
      }, { status: 401 });
    }
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const errorMessage = String(error);
    if (errorMessage.includes('timeout')) {
      return NextResponse.json({
        success: false,
        message: "Query timeout: execution took too long"
      }, { status: 408 });
    }
    return NextResponse.json({
      success: false,
      message: errorMessage
    }, { status: 500 });
  }
  finally {
    if (db) {
      await db.close();
    }
  }
}

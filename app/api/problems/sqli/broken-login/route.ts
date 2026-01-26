import { NextRequest, NextResponse } from "next/server";
import Database from 'better-sqlite3';

interface BrokenLogin {
  username?: string,
  password?: string,
}

export async function POST(request: NextRequest) {
  // TODO: Rate Limit
  try {
    const { username, password } = await request.json() as BrokenLogin;
    if (!username || !password ) {
      return NextResponse.json(
        { success: false, message: "Username and password required" },
        { status: 400 }
      );
    }

    const db = new Database(":memory:");

    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT
      )
    `);

    db.exec(`
      INSERT INTO users (id, username, password)
      VALUES (1, 'noobysqlinjection', 'youre_cracking_this_password_already??')
    `);

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const result = db.prepare(query).all();
    console.log(result);
    
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
    return NextResponse.json({
      success: false,
      message: String(error)
    }, { status: 500 });
  }
}

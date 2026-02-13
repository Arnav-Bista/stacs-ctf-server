import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

interface LookAtMyItems {
  query?: string
}

export async function POST(request: NextRequest) {
  let db = null;
  let timeoutId: NodeJS.Timeout | null = null;
  // TODO: Rate Limit (team-based)
  try {
    const { query: input } = await request.json() as LookAtMyItems;

    if (!input) {
      return NextResponse.json(
        { success: false, message: "Field cannot be empty" },
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
      );
    `);

    await db.exec(`
      CREATE TABLE items (
        id INTEGER PRIMARY KEY,
        name TEXT,
        details TEXT,
        price TEXT
      );
    `);

    await db.exec(`
      INSERT INTO users (id, username, password)
      VALUES (1, 'xX_admin_Xx', 'flag_{they-can-use-any-attack-vectors!}')
    `);

    let items = [
      ['FreakBob Plushie', 'The Freakiest of SpongeBob', '£79.99'],
      ['STACS Membership', 'Bang for your Buck! Get it while you can!', '£3.00'],
      ['The No Meal Deal', `The Tesco Mealdeal except theres no Meal and it is just a deal`, '£4.50 (£3.80 with CC)'],
      ['Hints for this CTF!', 'We may be bribed', '£999.99'],
      ['The Flag', 'The one and only (we need funding)', '£999.99'],
      ['Your Smile', ':) (This was kinda cringe)', 'Priceless'],
    ];

    for (let item of items) {
      await db.exec(`
      INSERT INTO items (name, details, price)
      VALUES ('${item[0]}', '${item[1]}', '${item[2]}')`
      );
    }


    const query = `SELECT * FROM items WHERE name LIKE '%${input}%'`;

    // Set query timeout (5 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Query timeout: execution took too long'));
      }, 5000);
    });

    const queryPromise = db.all(query);
    const result = await Promise.race([queryPromise, timeoutPromise]) as any[];
    return NextResponse.json(result);
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const errorMessage = String(error);
    console.log(errorMessage);
    // TODO: Decide whether to give or not give error messages
    if (errorMessage.includes('timeout')) {
      return NextResponse.json("Query timeout: execution took too long", { status: 408 });
    }
    return NextResponse.json(errorMessage, { status: 500 });
  }
  finally {
    if (db) {
      await db.close();
    }
  }
}

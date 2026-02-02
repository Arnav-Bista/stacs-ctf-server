import { NextRequest, NextResponse } from "next/server";
import Database from 'better-sqlite3';

interface LookAtMyItems {
  query?: string
}

export async function POST(request: NextRequest) {
  // TODO: Rate Limit
  try {
    const { query: input } = await request.json() as LookAtMyItems;

    if (!input) {
      return NextResponse.json(
        { success: false, message: "Field cannot be empty" },
        { status: 400 }
      );
    }
    const db = new Database(":memory:");

    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT
      );
    `);

    db.exec(`
      CREATE TABLE items (
        id INTEGER PRIMARY KEY,
        name TEXT,
        details TEXT,
        price TEXT
      );
    `);

    db.exec(`
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
      db.exec(`
      INSERT INTO items (name, details, price)
      VALUES ('${item[0]}', '${item[1]}', '${item[2]}')`
      );
    }


    const query = `SELECT * FROM items WHERE name LIKE '%${input}%'`;
    const result = db.prepare(query).all();
    return NextResponse.json(result);
  } catch (error) {
    console.log(String(error));
    // TODO: Decide whether to give or not give error messages
    return NextResponse.json(String(error), { status: 500 });
  }
}

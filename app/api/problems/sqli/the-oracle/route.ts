import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

interface TheOracle {
  itemName?: string
}

export const maxDuration = 30; // Allow longer execution time for delays
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let db = null;
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    const { itemName: input } = await request.json() as TheOracle;

    if (!input) {
      return NextResponse.json(
        { message: "Item name cannot be empty", inStock: false },
        { status: 400 }
      );
    }

    db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE items (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        stock INTEGER
      );
    `);

    await db.exec(`
      CREATE TABLE secrets (
        id INTEGER PRIMARY KEY,
        flag TEXT
      );
    `);

    // Insert decoy items
    const items = [
      ['Ancient Scroll', 'Whispers of forgotten knowledge', 3],
      ['Crystal Ball', 'See what you seek, if you dare', 1],
      ['Mystic Herbs', 'For brewing powerful concoctions', 12],
      ['Tarot Deck', 'The cards never lie', 2],
      ['Rune Stones', 'Cast your fate', 7],
    ];

    for (const item of items) {
      await db.exec(`
        INSERT INTO items (name, description, stock)
        VALUES ('${item[0]}', '${item[1]}', ${item[2]})
      `);
    }

    await db.exec(`
      INSERT INTO secrets (flag)
      VALUES ('flag_{timing_is_everything_in_sql}')
    `);

    const query = `SELECT * FROM items WHERE name = '${input}'`;

    // Set query timeout (15 seconds to allow for delays)
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Query timeout: execution took too long'));
      }, 15000);
    });

    const queryPromise = db.all(query);
    const result = await Promise.race([queryPromise, timeoutPromise]) as any[];

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (result.length > 0) {
      return NextResponse.json({
        message: "We have it in stock!",
        inStock: true
      });
    } else {
      return NextResponse.json({
        message: "We don't have it in stock.",
        inStock: false
      });
    }

  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const errorMessage = String(error);

    // Don't reveal timeout errors differently
    if (errorMessage.includes('timeout')) {
      return NextResponse.json({
        message: "We don't have it in stock.",
        inStock: false
      });
    }

    // Return "not in stock" for all errors
    return NextResponse.json({
      message: "We don't have it in stock.",
      inStock: false
    });

  } finally {
    if (db) {
      await db.close();
    }
  }
}

import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getTeamId } from "./misc";

export async function GET() {
  const teams = db.prepare("SELECT * FROM teams");
  try {
    const result = teams.all();
    return NextResponse.json(
      result
    );
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    )
  }
}

export interface CreateTeamsInput {
  name: string;
}

export async function POST(request: NextRequest) {
  const data = await request.json() as Partial<CreateTeamsInput>;
  if (!data.name) {
    return NextResponse.json(
      { error: "Name is required, silly!" },
      { status: 400 }
    );
  }
  if (data.name.length < 3) {
    return NextResponse.json(
      { error: "Team name must be at least 3 characters long." },
      { status: 400 }
    );
  }
  if (data.name.length > 50) {
    return NextResponse.json(
      { error: "Team name must be at most 50 characters long." },
      { status: 400 }
    );
  }
  try {
    if (await getTeamId(data.name)) {
      return NextResponse.json(
        { error: "Team already exsist." },
        { status: 409 }
      );
    }
    let joinKey: number = 0;
    let keyExists = true;
    const check = db.prepare("SELECT id FROM teams WHERE join_key = ?");
    while (keyExists) {
      joinKey = Math.floor(Math.random() * 900000) + 100000;
      keyExists = check.get(joinKey) !== undefined;
    }
    const insert = db.prepare("INSERT INTO teams (name, join_key) VALUES (?, ?)");
    const result = insert.run(data.name, String(joinKey));
    let id = result.lastInsertRowid;
    const team = { id: Number(id), name: data.name, join_key: String(joinKey) };
    return NextResponse.json(
      { team }
    );
  }
  catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: e },
      { status: 500 }
    )
  }

}


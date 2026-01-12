import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tracked = db.prepare("SELECT flag_id FROM team_flags WHERE team_id = ?");
  const team = Number.parseInt(request.nextUrl.searchParams.get("team_id") ?? "");

  if (Number.isNaN(team)) {
    return NextResponse.json({ error: "What kinda team_id is that vro 🥀" }, { status: 400 });
  }

  try {
    const data = tracked.all(team);
    return NextResponse.json(data);
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}


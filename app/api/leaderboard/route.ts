import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

function getLeaderboardData(lastId: number) {
  const stmt = db.prepare(`
  SELECT teams.id as teamId, team_flags.id, name, found_at FROM teams 
  JOIN team_flags ON teams.id = team_flags.team_id 
  JOIN flags ON team_flags.flag_id = flags.id 
  WHERE team_flags.id > ?
  ORDER BY team_flags.id ASC`);
  const rows = stmt.all(lastId);
  return rows;
}

export async function GET(request: NextRequest) {
  const lastId = request.nextUrl.searchParams.get("lastId") ?? "0";
  let lastIdNum = Number.parseInt(lastId);
  if (Number.isNaN(lastIdNum)) {
    lastIdNum = 0;
  }
  try {
    const data = getLeaderboardData(lastIdNum);
    return NextResponse.json(data);
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}


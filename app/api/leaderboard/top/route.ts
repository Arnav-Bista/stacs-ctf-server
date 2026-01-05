import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

function getStandings() {
  // Taken from calculate_score.sql
  const stmt = db.prepare(`
    WITH multipliers AS (select flag_id, 100.0 / count(flag_id) as multiplier from team_flags group by flag_id)
    SELECT
      teams.id, 
      name,
      ROUND(SUM(points * multiplier),2) as score
    FROM
      teams 
      INNER JOIN team_flags on team_flags.team_id = teams.id 
      INNER JOIN flags on team_flags.flag_id = flags.id
      INNER JOIN multipliers on team_flags.flag_id = multipliers.flag_id
    GROUP BY 
      teams.id
    ORDER BY 
      score
    DESC;
  `);
  const rows = stmt.all();
  return rows;
}

export async function GET() {
  try {
    const data = getStandings();
    return NextResponse.json(data);
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}


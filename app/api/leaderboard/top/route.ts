import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


// 1.25 -> 1.1 -> 1.05 -> Base
// + Remove Projected
function getStandings() {
  // Taken from calculate_score.sql
  const stmt = db.prepare(`
    WITH ranked_finds AS (
      SELECT
        team_id,
        flag_id,
        ROW_NUMBER() OVER (PARTITION BY flag_id ORDER BY id ASC) as rank
      FROM team_flags
    ),
    multipliers AS (
      SELECT
        team_id,
        flag_id,
        CASE rank
          WHEN 1 THEN 1.25
          WHEN 2 THEN 1.10
          WHEN 3 THEN 1.05
          ELSE 1.0
        END as multiplier
      FROM ranked_finds
    )
    SELECT
      teams.id,
      name,
      ROUND(SUM(points * multiplier), 2) as score
    FROM
      teams
      INNER JOIN team_flags ON team_flags.team_id = teams.id
      INNER JOIN flags ON team_flags.flag_id = flags.id
      INNER JOIN multipliers ON team_flags.flag_id = multipliers.flag_id AND team_flags.team_id = multipliers.team_id
    GROUP BY
      teams.id
    ORDER BY
      score DESC;
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


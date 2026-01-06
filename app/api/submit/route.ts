import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import Flag from "@/app/lib/types/flag";
import { getTeamById } from "../teams/misc";

interface SubmitFlagData {
  id: string,
  flag: string
}

export async function POST(request: NextRequest) {
  try {

    const data = await request.json() as Partial<SubmitFlagData>;
    if (!data.id) {
      return NextResponse.json(
        { error: "You need a team ID." },
        { status: 400 }
      );
    }

    const teamId = await getTeamById(data.id);
    if (!teamId) {
      return NextResponse.json(
        { error: "Team not found." },
        { status: 404 }
      );
    }

    if (!data.flag) {
      return NextResponse.json(
        { error: "You need a flag to submit a flag." },
        { status: 400 }
      );
    }

    // Check if flag exists
    const flagIdStmt = db.prepare("SELECT * FROM flags WHERE flag = ?");
    const flagId = flagIdStmt.get(data.flag) as Partial<Flag>;
    if (!flagId || !flagId.id) {
      return NextResponse.json(
        { error: "Flag not found" },
        { status: 404 }
      );
    }
    // Check if flag is already collected
    const alreadyCollectedStmt = db.prepare(
      "SELECT COUNT(*) as count FROM team_flags WHERE team_id = ? AND flag_id = ?"
    );
    const alreadyColected: any = alreadyCollectedStmt.get([teamId, flagId.id]);
    if (alreadyColected.count != 0) {
      return NextResponse.json(
        { error: "Flag already collected." },
        { status: 409 }
      );
    }

    // Insert
    const submitStmt = db.prepare("INSERT INTO team_flags (team_id, flag_id) VALUES (?, ?)");
    const submit = submitStmt.run([teamId, flagId.id]);

    return NextResponse.json(
      { id: submit.lastInsertRowid }
    );

  }
  catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e, er: "unknown" },
      { status: 500 }
    );
  }



}

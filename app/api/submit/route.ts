import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import Flag from "@/app/lib/types/flag";
import { getTeamById } from "../teams/misc";
import checkRateLimit from "@/app/lib/rateLimit";

interface SubmitFlagData {
  id: string,
  flag: string
}

const MIN_DELAY = 500;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
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

    if (!checkRateLimit(teamId)) {
      return NextResponse.json(
        { error: "Rate Limited! Y'all Submitting too fast." },
        { status: 429 }
      )
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
    if (e instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Did you forget the data? Wait why are you hitting this endpoint manually?" },
        { status: 400 }
      );
    }

    console.log(e);
    return NextResponse.json(
      { error: "How did we get here? Reach out to the STACS Devs Team :)" },
      { status: 500 }
    );
  }
  finally {
    const remainingTime = MIN_DELAY - (Date.now() - startTime);
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }
  }
}

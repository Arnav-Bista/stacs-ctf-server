import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const discovery_list = db.prepare("SELECT flags.id, COUNT(flag_id) AS discovered FROM flags LEFT JOIN team_flags ON flag_id = flags.id GROUP BY flags.id;");

  try {
    const data = discovery_list.all();
    return NextResponse.json(
      data
    );
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}

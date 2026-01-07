import db from "@/app/lib/db";
import CtfConfig from "@/app/lib/types/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ctfConfig = db.prepare("select * from config");
    const result: any[] = ctfConfig.all();
    const parsed: CtfConfig = Object.fromEntries(result.map(r => [r.key, r.value]));
    return NextResponse.json(
      parsed
    );
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    )
  }
}

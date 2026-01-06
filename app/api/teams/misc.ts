import db from "@/app/lib/db";

/*
* Returns the id if the team name exists
* Otherwise returns null
*/
export async function getTeamId(name: string): Promise<number | null> {
  const teamStmt = db.prepare("SELECT id FROM teams WHERE name = ?");
  const teamId: any = teamStmt.get(name);
  if (!teamId || !teamId.id) {
    return null;
  }

  return teamId.id;
}

export async function getTeamById(id: string): Promise<number | null> {
  const teamStmt = db.prepare("SELECT id FROM teams WHERE id = ?");
  const teamId: any = teamStmt.get(id);
  if (!teamId || !teamId.id) {
    return null;
  }
  return teamId.id;
}

import Database from 'better-sqlite3';
import { join } from 'path';


const db = new Database(join(process.cwd(), "database.db"));
db.pragma('foreign_keys = ON');
db.exec(`
  CREATE TABLE IF NOT EXISTS flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flag TEXT NOT NULL,
    points INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    join_key TEXT UNIQUE NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS team_flags (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      team_id INTEGER NOT NULL,
      flag_id INTEGER NOT NULL,
      found_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(team_id, flag_id),  
      FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
      FOREIGN KEY (flag_id) REFERENCES flags(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_team_flags_team_id ON team_flags(team_id);
  CREATE INDEX IF NOT EXISTS idx_team_flags_flag_id ON team_flags(flag_id);
  CREATE INDEX IF NOT EXISTS idx_team_flags_id_found_at ON team_flags(id, found_at);

  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`
);


export default db;

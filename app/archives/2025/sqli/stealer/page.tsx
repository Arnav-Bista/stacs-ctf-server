"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Database } from "sql.js";
import { initializeSqlJs } from "@/utils/initSqlJs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FlagSubmission } from "@/app/submit/flag-submission";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";

export default function SQLiTables() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ error: boolean, message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function init() {
      const SQL = await initializeSqlJs();
      const db = new SQL.Database();

      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          name TEXT,
          password TEXT
        )
      `);
      // Given this login
      db.run(`
        INSERT INTO users (username, name, password)
        VALUES ('tester', 'TestMaxer 900', 'password')
      `);
      // Not expected to crack this
      // Insert GoofMaster9000
      db.run(`
        INSERT INTO users (username, name, password)
        VALUES ('GoofMaster9000', 'GoofMaster9000', 'cracking_this_password_is_not_the_intended_challenge')
      `);

      // Insert GoofMasters from 8900 to 8999
      for (let i = 8900; i < 9000; i++) {
        db.run(`
          INSERT INTO users (username, name, password)
          VALUES ('GoofMaster${i}', 'GoofMaster${i}', 'default_password_${i}')
        `);
      }

      setDb(db);
      setIsLoading(false);
    }
    init();
  }, []);

  async function simulatePasswordChange() {
    if (!db) return;
    try {
      db.run(` UPDATE users SET password = 'injections-allow-scary-triggers_this_is_the_fl@g!' WHERE username = 'GoofMaster9000'`);
      setMessage({
        error: false,
        message: "Password changed successfully"
      });
    } catch (error) {
      setMessage({
        error: true,
        message: String(error)
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    try {
      // SQL Injection Vulnerability 
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      const result = db.exec(query);
      console.log(result);
      if (result.length > 0 && result[0].values.length > 0) {
        setMessage({
          error: false,
          message: `Welcome ${result[0].values[0][2]}`
        });
      } else {
        setMessage({
          error: true,
          message: "Invalid username or password"
        });
      }
    } catch (error) {
      setMessage({
        error: true,
        message: String(error)
      });
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-2">
        <FlagSubmissionPopover />
        <Link href="/archives/2025/engineering" className="mb-4"> <Button>Back</Button> </Link>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access the new system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete='off' onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

            </div>
            {message && (
              <div className={`text-sm font-medium ${message.error ? 'text-destructive' : 'text-green-500'}`}>
                {message.message}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Initializing..." : "Login"}
            </Button>
            <Button type="button" className="w-full" disabled={isLoading} onClick={simulatePasswordChange}>
              {isLoading ? "Initializing..." : "Simulate user changing their password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

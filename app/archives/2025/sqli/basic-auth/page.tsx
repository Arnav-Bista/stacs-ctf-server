"use client";


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Database } from "sql.js";
import { initializeSqlJs } from "@/utils/initSqlJs";
import { FlagSubmission } from "@/app/submit/flag-submission";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";
export default function SQLiAuth() {
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
          password TEXT
        )
      `);

      // Not expected to crack this
      db.run(`
        INSERT INTO users (username, password)
        VALUES ('noobysqlinjection', 'cracking_this_password_is_not_the_intended_challenge')
      `);

      setDb(db);
      setIsLoading(false);
    }
    init();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    try {
      // SQL Injection Vulnerability 
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      const result = db.exec(query);
      if (result.length > 0 && result[0].values.length > 0) {
        setMessage({
          error: false,
          message: "flag_{this-is-why-you-use-sql-parameters}"
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
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="flex gap-2">
        <FlagSubmissionPopover />
        <Link href="/archives/2025/engineering" className="mb-4"> <Button>Back</Button> </Link>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access the system.</CardDescription>
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

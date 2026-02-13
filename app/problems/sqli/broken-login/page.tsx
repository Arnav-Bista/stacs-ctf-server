"use client";


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";
import { useRouter } from "next/navigation";

interface BrokenLogin {
  success: boolean,
  message: string
}

export default function SQLiAuth() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ error: boolean, message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const request = await fetch("/api/problems/sqli/broken-login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const data = await request.json() as BrokenLogin;
      setMessage({
        error: !data.success,
        message: data.message
      })
    }
    catch (e) {
      setMessage({
        error: true,
        message: String(e)
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="flex gap-2 mb-4">
        <FlagSubmissionPopover />
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access the super secure system. Credits to AYS (Academy of Youtube Shorts)</CardDescription>
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
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

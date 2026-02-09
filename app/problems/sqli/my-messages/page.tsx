"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  to_user: string;
  from_user: string;
  content: string;
}

interface RegisterResponse {
  message: string;
}

interface MessagesResponse {
  message: string;
  messages: Message[];
}

export default function MyMessages() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ error: boolean; message: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setStatusMessage(null);

      const request = await fetch("/api/problems/sqli/my-messages?action=register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await request.json() as RegisterResponse;

      if (request.ok) {
        setIsRegistered(true);
        setStatusMessage({
          error: false,
          message: data.message
        });
      } else {
        setStatusMessage({
          error: true,
          message: data.message
        });
      }
    } catch (e) {
      setStatusMessage({
        error: true,
        message: String(e)
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetMessages() {
    try {
      setIsLoading(true);
      setStatusMessage(null);

      const request = await fetch("/api/problems/sqli/my-messages?action=get-messages", {
        method: "POST",
        body: JSON.stringify({})
      });

      const data = await request.json() as MessagesResponse;

      if (request.ok) {
        setMessages(data.messages);
        setStatusMessage({
          error: false,
          message: `Found ${data.messages.length} message(s)`
        });
      } else {
        setStatusMessage({
          error: true,
          message: data.message
        });
      }
    } catch (e) {
      setStatusMessage({
        error: true,
        message: String(e)
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReset() {
    try {
      setIsLoading(true);
      setStatusMessage(null);

      const request = await fetch("/api/problems/sqli/my-messages?action=reset", {
        method: "POST",
        body: JSON.stringify({})
      });

      const data = await request.json() as RegisterResponse;

      if (request.ok) {
        // Reset local state
        setIsRegistered(false);
        setUsername("");
        setPassword("");
        setMessages([]);
        setStatusMessage({
          error: false,
          message: data.message
        });
      } else {
        setStatusMessage({
          error: true,
          message: data.message
        });
      }
    } catch (e) {
      setStatusMessage({
        error: true,
        message: String(e)
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="flex gap-2 mb-4">
        <FlagSubmissionPopover />
        <Button onClick={() => router.back()}>Back</Button>
        <Button onClick={handleReset} variant="outline" disabled={isLoading}>
          Reset
        </Button>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>My Messages</CardTitle>
          <CardDescription>
            Register to access your personal messaging system. Your username is stored securely!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isRegistered ? (
            <form autoComplete="off" onSubmit={handleRegister} className="space-y-4">
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
              {statusMessage && (
                <div className={`text-sm font-medium ${statusMessage.error ? 'text-destructive' : 'text-green-500'}`}>
                  {statusMessage.message}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register/Login"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Button onClick={handleGetMessages} className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "View My Messages"}
              </Button>

              {statusMessage && (
                <div className={`text-sm font-medium ${statusMessage.error ? 'text-destructive' : 'text-green-500'}`}>
                  {statusMessage.message}
                </div>
              )}

              {messages.length > 0 && (
                <div className="space-y-3 mt-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-sm text-muted-foreground">
                          From: {message.from_user}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          To: {message.to_user}
                        </div>
                      </div>
                      <div className="text-sm">{message.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

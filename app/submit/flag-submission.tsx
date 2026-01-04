"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

enum MessageType {
  INFO,
  ERROR,
  SUCCESS
}

interface Message {
  messageType: MessageType,
  message: string
}

export function FlagSubmission({ className }: { className?: string }) {
  const [teamName, setTeamName] = useState(() => {
    const lastTeamName = localStorage.getItem("lastTeamName");
    return lastTeamName || '';
  });
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState<Message>({ messageType: MessageType.INFO, message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("lastTeamName", teamName);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, flag }),
      });

      if (!response.ok) {
        const res = await response.json();
        if (response.status === 409) {
          setMessage({ messageType: MessageType.INFO, message: 'Flag already submitted.' });
          return;
        }
        setMessage({ messageType: MessageType.ERROR, message: res.error || 'Failed to submit flag. Please try again.' });
        return;
      }

      setMessage({ messageType: MessageType.SUCCESS, message: 'Flag submitted successfully!' });
      setFlag('');
      return;
    } catch (error) {
      setMessage({ messageType: MessageType.ERROR, message: 'Failed to submit flag. Please try again.' });
      return;
    }
  }

  return (
    <Card className={`${className}`}>
      <CardHeader className="px-0 pt-0">
        <CardTitle>Submit Flag</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <form autoComplete='off' onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              name="teamName"
              type="text"
              required
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flag">Flag</Label>
            <Input
              id="flag"
              name="flag"
              type="text"
              required
              placeholder="Enter the flag"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Flag
          </Button>
        </form>
        {message.message && (
          <div className={`mt-4 text-sm ${message.messageType === MessageType.ERROR ? 'text-destructive' :
            message.messageType === MessageType.SUCCESS ? 'text-green-600' :
              'text-orange-500'
            }`}>
            {message.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

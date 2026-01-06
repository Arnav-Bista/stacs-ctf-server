"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Team from "../lib/types/team";

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

  const [flag, setFlag] = useState('');
  const [team, setTeam] = useState<Team | null>(null);
  const [message, setMessage] = useState<Message>({ messageType: MessageType.INFO, message: '' });

  useEffect(() => {
    const storedTeam = localStorage.getItem('team');
    if (storedTeam) {
      setTeam(JSON.parse(storedTeam));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage({ messageType: MessageType.INFO, message: '' });

    if (!team) {
      setMessage({ messageType: MessageType.ERROR, message: 'You must be part of a team to submit flags.' });
      return;
    }
    const { id } = team;

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, flag }),
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
      {team && <>
      <CardHeader className="px-0 pt-0">
        <CardTitle>Submit Flag for team: {team?.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <form autoComplete='off' onSubmit={handleSubmit} className="space-y-6">
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
          <Button variant="outline" className="w-full" onClick={() => {
            window.location.href = '/';
          }}>
            Back to Home
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
    </>}
    {!team && <>
    <CardHeader className="px-0 pt-0">
      <CardTitle>You are not part of a team!</CardTitle>
    </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="text-center">
          Please register or join a team first before submitting flags.
        </div>
        <Button className="mt-4 w-full" onClick={() => window.location.href = '/teams'}>
          Go to Teams Page
        </Button>
      </CardContent>
    </>}
  </Card>
  );
}

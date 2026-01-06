'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Loader } from '@/components/ui/loader';
import Link from "next/link";

interface Message {
  isError: boolean,
  message: string
}

export default function TeamRegistration() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [joinKey, setJoinKey] = useState('');
  const [regmessage, setRegMessage] = useState<Message>({ isError: false, message: '' });
  const [joinmessage, setJoinMessage] = useState<Message>({ isError: false, message: '' });
  const [loading, setLoading] = useState(true);

  // Check if team already assigned
  useEffect(() => {
    const timeout = setTimeout(() => {
      const storedTeam = localStorage.getItem("team");

      if (storedTeam) {
        router.push("/teams/myteam");
      } else {
        setLoading(false);
      }
    }, 300); // Minimum loading time for better UX, reduces flicker :)

    return () => clearTimeout(timeout);
  }, [router]);

  async function handleSubmitNewTeam(e: React.FormEvent) {
    e.preventDefault();
    setRegMessage({ isError: false, message: '' });

    if (!teamName.trim()) {
      setRegMessage({ isError: true, message: 'Team name is required.' });
      return;
    }

    if (teamName.length < 3) {
      setRegMessage({ isError: true, message: 'Team name must be at least 3 characters long.' });
      return;
    }

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(typeof data.error === 'string' ? data.error : 'Failed to create team');
      }


      const data = await response.json();
      const team = data.team;
      localStorage.setItem('team', JSON.stringify(team));


      setRegMessage({
        isError: false,
        message: 'Team registered successfully!'
      });

      // Redirect to team page
      router.push('/teams/myteam');

    } catch (e) {
      setRegMessage({
        isError: true,
        message: e instanceof Error ? e.message : 'Something went wrong'
      });
    }
  }

  async function handleJoinTeam(e: React.FormEvent) {
    e.preventDefault();
    setJoinMessage({ isError: false, message: '' });

    if (!joinKey.trim()) {
      setJoinMessage({ isError: true, message: 'Join key is required.' });
      return;
    }

    if (joinKey.length !== 6) {
      setJoinMessage({ isError: true, message: 'Join key must be exactly 6 digits long.' });
      return;
    }

    try {
      const response = await fetch('/api/teams/jointeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ joinKey }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(typeof data.error === 'string' ? data.error : 'Failed to join team');
      }

      const team = await response.json();
      localStorage.setItem('team', JSON.stringify(team));

      setJoinMessage({
        isError: false,
        message: 'Joined team successfully!'
      });
      // Redirect to team page
      router.push('/teams/myteam');
    } catch (e) {
      setJoinMessage({
        isError: true,
        message: e instanceof Error ? e.message : 'Something went wrong'
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      {loading && (
        <Loader />
      )}

      {!loading && ( <>
      {/* Register a New Team Card */}
      <Card className="max-w-md w-full mr-10">
        <CardHeader>
          <CardTitle className="text-center">Register A New Team</CardTitle>
        </CardHeader>
        <CardContent>
          <form autoComplete='off' className="space-y-6" onSubmit={handleSubmitNewTeam}>
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

            {regmessage.message && (
              <div className={`text-sm mt-2 ${regmessage.isError ? 'text-red-600' : 'text-green-600'}`}>
                {regmessage.message}
              </div>
            )}

            <div>
              <Button className="w-full" type="submit">Register Team</Button>
            </div>
            <div className="flex justify-center">
              <Link href="/"><Button>Back</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>


      {/* Join a Team Card */}
      <Card className="max-w-md w-full ml-10">
        <CardHeader>
          <CardTitle className="text-center">Join a Team</CardTitle>
        </CardHeader>
        <CardContent>
          <form autoComplete='off' className="space-y-6" onSubmit={handleJoinTeam}>
        <div className="space-y-2">
          <Label htmlFor="joinKey">Join Key (6 digits)</Label>
          <Input
            id="joinKey"
            name="joinKey"
            type="text"
            required
            placeholder="Enter your 6-digit join key"
            value={joinKey}
            onChange={(e) => setJoinKey(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
          />
        </div>

        {joinmessage.message && (
          <div className={`text-sm mt-2 ${joinmessage.isError ? 'text-red-600' : 'text-green-600'}`}>
            {joinmessage.message}
          </div>
        )}

        <div>
          <Button className="w-full" type="submit">Join Team</Button>
        </div>
        <div className="flex justify-center">
          <Link href="/"><Button>Back</Button></Link>
        </div>
          </form>
        </CardContent>
      </Card>
      </>)}
    </div>
  );
}

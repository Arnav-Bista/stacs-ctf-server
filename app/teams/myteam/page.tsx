'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import Team from '@/app/lib/types/team';


export default function TeamView() {
    const router = useRouter();
    const [team, setTeam] = useState<Team>(() => {
        const storedTeam = typeof window !== 'undefined' ? localStorage.getItem('team') : null;
        return storedTeam ? JSON.parse(storedTeam) : { id: 0, name: '', join_key: '' };
    });

    useEffect(() => {
        if (team.id === 0 && team.name === '') {
            router.push('/teams');
        }
    }, [router, team]);

    function leaveTeam(){
        localStorage.removeItem('team');
        router.push('/teams');
    }


    return (
        <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-center">Your Team: {team.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Label className="mb-2 text-lg font-semibold">Team ID:</Label>
                <Input type="text" value={team.id} readOnly className="mb-4 text-center text-lb font-bold" />
                <Label className="mb-2 text-lg font-semibold">Join Key: (Give this to your teammates to join your team)</Label>
                <Input type="text" value={team.join_key} readOnly className="mb-4 text-center text-lb font-bold" />

                <Button className="w-full" onClick={() => router.push('/')}>Back to Home</Button>
                <Button className='w-full mt-2' variant="destructive" onClick={leaveTeam}>Leave Team</Button>
            </CardContent>
        </Card>
        </div>
    );
}

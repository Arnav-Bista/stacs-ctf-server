'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrophyIcon } from 'lucide-react';
import LeaderboardLoading from './loading';
import { PlottingData, RawDataPoint, Standings } from './types';
import Leaderboard from './leaderboard';
import { Dialog, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogContent } from '@/components/ui/dialog';

function transformData(rawData: RawDataPoint[]): PlottingData[] {
  let plottingData: PlottingData[] = [];
  let nameMappings = new Map<string, number>();
  let maxTime: number = 0;

  for (let i = 0; i < rawData.length; i++) {
    let currentEntry = rawData[i];
    let currentTime = new Date(currentEntry.found_at).getTime();
    maxTime = Math.max(maxTime, currentTime);

    if (nameMappings.get(currentEntry.name) === undefined) {
      nameMappings.set(currentEntry.name, plottingData.length);
      plottingData.push({
        id: currentEntry.teamId,
        name: currentEntry.name,
        data: [
          {
            found_at: currentTime - 1,
            count: 0
          }
        ]
      });
    }

    let plottingEntry = plottingData[nameMappings.get(currentEntry.name)!];
    plottingEntry.data.push({
      count: plottingEntry.data[plottingEntry.data.length - 1].count + 1,
      found_at: currentTime
    })
  }

  for (let i = 0; i < plottingData.length; i++) {
    const current = plottingData[i];
    const last = current.data[current.data.length - 1];
    if (last.found_at !== maxTime) {
      current.data.push({
        found_at: maxTime,
        count: last.count
      });
    }
  }
  return plottingData;
}

export default function LeaderboardPage() {
  const [rawData, setRawData] = useState<RawDataPoint[]>([]);
  const [standings, setStandings] = useState<Standings>([]);

  // TODO
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastDataId = useRef(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [standingRequest, graphRequest] = await Promise.all([
          fetch("/api/leaderboard/top"), fetch(`/api/leaderboard?lastId=${lastDataId.current}`)
        ])
        if (!graphRequest.ok || !standingRequest.ok) throw new Error('Failed to fetch data');
        const [standingData, graphData]: [Standings, RawDataPoint[]] = await Promise.all([standingRequest.json(), graphRequest.json()]);

        if (graphData.length !== 0) {
          console.log('Leaderboard data updated');
          lastDataId.current = graphData[graphData.length - 1].id;
          setRawData(prev => [...prev, ...graphData]);
          setStandings(standingData);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    // Every 15 seconds
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const transformedData = transformData(rawData).sort((a, b) => b.data[b.data.length - 1].count - a.data[a.data.length - 1].count);

  return (
    <div className='flex flex-col p-8'>
      <div className='flex gap-4 items-center'>
        <Link href="/"><Button>&lt;</Button></Link>
        <TrophyIcon />
        <h1>Leaderboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              How does scoring work?
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md">
            <DialogHeader>
              <DialogTitle>The Scoring System</DialogTitle>
              <DialogDescription>
                A new system that adapts to problem difficulty as you play.
              </DialogDescription>
            </DialogHeader>
            <p>
              We heard you! We&apos;ve made a new scoring system for the CTF. Each flag has a set amount of <strong>POINTS</strong>. 
            </p>
            <p>
              This is allocated based on the difficult we think the problem is. However, a problem that we find hard might be really easy for you and vice versa.
            </p>
            <p>
              Now for each flag, we keep track of how many teams also captured it. Then the real score for you is going to be given by <strong>POINTS</strong> * (100 / num_found).
            </p>

            <p>
              This means if you&apos;re the only one that found a flag, you get 100× the base points. But if 100 teams found it, you only get 1× the base points. So harder problems—ones fewer teams solve—are worth way more
            </p>
          </DialogContent>
        </Dialog>
      </div>
      {
        isLoading ? <LeaderboardLoading /> :
          <Leaderboard
            data={transformedData}
            standings={standings}
            startTime={
              new Date("2025-02-15T15:00:00").getTime()
            }
            endTime={
              new Date("2025-02-15T21:00:00").getTime()
            }
          />
      }
    </div>
  );
}

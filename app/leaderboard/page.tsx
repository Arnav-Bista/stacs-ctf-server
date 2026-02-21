'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrophyIcon } from 'lucide-react';
import LeaderboardLoading from './loading';
import { PlottingData, RawDataPoint, Standings } from './types';
import Leaderboard from './leaderboard';
import { Dialog, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogContent } from '@/components/ui/dialog';
import CtfConfig from '@/app/lib/types/config';
import { Loader } from '@/components/ui/loader';

async function fetchConfig(): Promise<CtfConfig | null> {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) throw new Error('Failed to fetch config');
    return await response.json();
  } catch (error) {
    console.error('Error fetching config:', error);
    return null;
  }
}

async function fetchStandings(): Promise<Standings | null> {
  try {
    const response = await fetch("/api/leaderboard/top");
    if (!response.ok) throw new Error('Failed to fetch standings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching standings:', error);
    return null;
  }
}

async function fetchGraphData(lastId: number): Promise<RawDataPoint[] | null> {
  try {
    const response = await fetch(`/api/leaderboard?lastId=${lastId}`);
    if (!response.ok) throw new Error('Failed to fetch graph data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching graph data:', error);
    return null;
  }
}

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
  const [config, setConfig] = useState<CtfConfig | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const lastDataId = useRef(0);
    
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHost(localStorage.getItem('host') === 'true')
  }, [])

  useEffect(() => {
    async function initialize() {
      // Fetch config + initial data
      const [configData, initialStandings, initialGraph] = await Promise.all([
        fetchConfig(),
        fetchStandings(),
        fetchGraphData(lastDataId.current)
      ]);

      if (configData) setConfig(configData);
      if (initialStandings) setStandings(initialStandings);
      if (initialGraph && initialGraph.length > 0) {
        lastDataId.current = initialGraph[initialGraph.length - 1].id;
        setRawData(initialGraph);
      }
      setIsLoading(false);
    }

    async function pollData() {
      // Only poll live data
      const [graphData, newStandings] = await Promise.all([
        fetchGraphData(lastDataId.current),
        fetchStandings()
      ]);

      if (graphData && graphData.length > 0) {
        console.log('Leaderboard data updated');
        lastDataId.current = graphData[graphData.length - 1].id;
        setRawData(prev => [...prev, ...graphData]);
      }
      if (newStandings) setStandings(newStandings);
    }

    initialize();
    const intervalId = setInterval(pollData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const transformedData = transformData(rawData).sort((a, b) => b.data[b.data.length - 1].count - a.data[a.data.length - 1].count);

  const dataStart = rawData.length > 0 ? new Date(rawData[0].found_at).getTime() : null;
  const dataEnd = rawData.length > 0 ? new Date(rawData[rawData.length - 1].found_at).getTime() : null;

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
              Each flag has a base <strong>POINTS</strong> value set by the challenge author. Your final score for a flag depends on when your team captures it relative to other teams.
            </p>
            <p>
              The <strong>first</strong> team to find a flag earns <strong>1.25×</strong> the base points. The <strong>second</strong> team gets <strong>1.10×</strong>, the <strong>third</strong> gets <strong>1.05×</strong>, and everyone else gets the full base points (<strong>1.0×</strong>).
            </p>
            <p>
              So speed matters — the faster you find a flag, the bigger your bonus. Good luck!
            </p>
          </DialogContent>
        </Dialog>
      </div>
      {isHost && (
        <div className='mx-auto text-4xl font-bold mt-8'>
          hb257.teaching.cs.st-andrews.ac.uk
        </div>
      )}
      {
        isLoading ?
          <div className='w-full h-[80vh] flex items-center justify-center'>
            <Loader />
          </div> :
          <Leaderboard
            data={transformedData}
            standings={standings}
            startTime={config?.start ?? dataStart ?? new Date("2026-02-21T13:00:00").getTime()}
            endTime={config?.end ?? dataEnd ?? new Date("2026-02-21T17:00:00").getTime()}
          />
      }
    </div>
  );
}

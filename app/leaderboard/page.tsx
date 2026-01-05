'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrophyIcon } from 'lucide-react';
import LeaderboardLoading from './loading';
import { PlottingData, RawDataPoint, Standings } from './types';
import Leaderboard from './leaderboard';

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

  // return (
  //   <div className="flex flex-col lg:flex-row h-screen p-4 lg:p-6 gap-4 lg:gap-6">
  //     <div>
  //       <Link href="/"><Button>&lt;</Button></Link>
  //     </div>
  //     <Card className="w-full lg:w-[70%] p-4 lg:p-6">
  //       {isLoading ? (
  //         <div className="h-[calc(100vh-120px)] flex items-center justify-center">
  //           <div className="text-lg text-muted-foreground">Loading...</div>
  //         </div>
  //       ) : (
  //         <div className="h-[300px] lg:h-[calc(100vh-120px)]">
  //           <ResponsiveContainer width="100%" height="100%">
  //             <LineChart>
  //               <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
  //               <XAxis
  //                 dataKey="found_at"
  //                 className="text-sm text-muted-foreground"
  //                 type="number"
  //                 domain={[
  //                   new Date("2025-02-15T15:00:00").getTime(),
  //                 ]}
  //                 scale="time"
  //                 tickFormatter={(value) => {
  //                   const date = new Date(value);
  //                   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //                 }}
  //                 label={{
  //                   value: 'Time',
  //                 }}
  //               />
  //               <YAxis
  //                 dataKey="count"
  //                 className="text-sm text-muted-foreground"
  //                 label={{
  //                   value: 'Flags',
  //                   angle: -90,
  //                   position: 'insideLeft',
  //                   className: "text-muted-foreground"
  //                 }}
  //               />
  //               <Tooltip
  //                 contentStyle={{
  //                   backgroundColor: 'hsl(var(--card))',
  //                   border: '1px solid hsl(var(--border))',
  //                   borderRadius: '0.5rem',
  //                   color: 'hsl(var(--foreground))'
  //                 }}
  //                 labelClassName="text-muted-foreground"
  //                 itemStyle={{
  //                   color: 'hsl(var(--foreground))'
  //                 }}
  //                 labelFormatter={(value) => {
  //                   const date = new Date(value);
  //                   return date.toLocaleString('en-US', {
  //                     hour: '2-digit',
  //                     minute: '2-digit',
  //                     hour12: true
  //                   });
  //                 }}
  //                 itemSorter={(a) => (typeof a.value === 'number' ? -a.value : 0)}
  //                 formatter={(value, name) => [`${value} pts`, name]}
  //               />
  //               {currentStandings.map((standing) => {
  //                 const team = transformedData.find(t => t.name === standing.name)!;
  //                 return (
  //                   <Line
  //                     key={team.name}
  //                     type="stepAfter"
  //                     data={team.data}
  //                     dataKey="count"
  //                     name={team.name}
  //                     stroke={selectedTeam === team.name ? '#ffa07a' : 'hsl(var(--chart-1))'}
  //                     strokeWidth={selectedTeam === team.name ? 3 : 1.5}
  //                     dot={selectedTeam === team.name}
  //                     activeDot={{ r: 8 }}
  //                     opacity={selectedTeam ? (selectedTeam === team.name ? 1 : 0.3) : 1}
  //                   />
  //                 );
  //               })}
  //             </LineChart>
  //           </ResponsiveContainer>
  //         </div>
  //       )}
  //     </Card>
  //
  //     {/* Leaderboard section (30%) */}
  //     <Card className="w-full lg:w-[30%] p-4 lg:p-6">
  //       <h2 className="text-xl font-semibold mb-6">Leaderboard</h2>
  //       <div className="space-y-2">
  //         {currentStandings.map((team, index) => (
  //           <div
  //             key={team.name}
  //             className={`p-2 lg:p-3 rounded-md cursor-pointer transition-all
  //               ${selectedTeam === team.name
  //                 ? 'bg-muted scale-105'
  //                 : 'hover:bg-muted/50'
  //               }`}
  //             onClick={() => setSelectedTeam(team.name === selectedTeam ? null : team.name)}
  //           >
  //             <div className="flex items-center justify-between">
  //               <div className="flex items-center gap-1 lg:gap-2">
  //                 <span className="font-semibold">{index + 1}.</span>
  //                 <div
  //                   className="w-3 h-3 rounded-full"
  //                   style={{
  //                     backgroundColor: selectedTeam === team.name ? '#ffa07a' : 'hsl(var(--chart-1))'
  //                   }}
  //                 />
  //                 <span>{team.name}</span>
  //               </div>
  //               <span className="font-bold">
  //                 {team.count} Flags
  //               </span>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </Card>
  //   </div>
  // );
}

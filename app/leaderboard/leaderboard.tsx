"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlottingData, Standings } from "./types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { schemeTableau10 } from "d3-scale-chromatic";
import { ChartContainer } from "@/components/ui/chart";


interface LeaderboardProps {
  data: PlottingData[],
  standings: Standings,
  startTime: number,
  endTime: number,
}

const LINE_STYLES = [
  '',           // solid 
  '5 5',        // dashed
  '2 2',        // dotted
  '10 5 2 5',   // dash-dot
];

/// Returns a unique style - Cycles ever 10 * 4 = 40 entries
function assignLineStyle(id: number) {
  return {
    color: schemeTableau10[id % 10],
    dasharray: LINE_STYLES[Math.floor(id / 10) % 4]
  }
}

/// Expects PlottingData to be ordered!
export default function Leaderboard(props: LeaderboardProps) {
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <div className="flex flex-wrap gap-4 p-8 w-full">
      <Card className="flex-[2] min-w-[40rem]">
        <CardHeader>
          <CardTitle>Flags over Time</CardTitle>
          <CardDescription>Final scoring applies a multiplier based on solve difficulty — standings may change</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            desktop: {
              label: "Desktop",
              color: "var(--chart-1)",
            },
          }}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="found_at"
                type="number"
                domain={[
                  props.startTime
                ]}
                scale="time"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }}
                label={{
                  value: 'Time',
                }}
              />
              <YAxis
                dataKey="count"
                className="text-sm text-muted-foreground"
                label={{
                  value: 'Flags',
                  angle: -90,
                  position: 'insideLeft',
                  className: "text-muted-foreground"
                }}
              />
              {
                props.data.map(team => {
                  const styles = assignLineStyle(team.id);
                  return (
                    <Line
                      key={team.name}
                      type="stepAfter"
                      data={team.data}
                      dataKey="count"
                      name={team.name}
                      stroke={styles.color}
                      strokeDasharray={styles.dasharray}
                      opacity={selectedTeam ? (selectedTeam === team.name ? 1 : 0.3) : 1}
                      dot={false}
                    />
                  );
                })
              }
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    
      {/* THIS COULD BE RECYCLED INTO ONE COMPONENT BUT I AM TOO LAZY */}

      <Card className="flex-1 min-w-[20rem] flex flex-col h-min">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Current Standings</CardTitle>
          <CardDescription>Let&apos;s see where you stand!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
          <div className="flex justify-between font-semibold text-sm text-muted-foreground border-b pb-2">
            <div className="flex gap-4 items-center">
              <span className="w-4 text-right">#</span>
              <span className="w-6"></span>
              <span>Team</span>
            </div>
            <span className="text-left ml-2">Flags</span>
          </div>
          {
            props.data.map((team, i) => {
              const styles = assignLineStyle(team.id);
              return (
                <div key={i} className="flex justify-between">
                  <div className="flex gap-4 items-center min-w-0 flex-1">
                    <h2 className="w-4 text-right font-bold flex-shrink-0">{i + 1}</h2>
                    <LineStyleDisplay {...styles} />
                    <span className="overflow-ellipsis overflow-hidden text-nowrap min-w-0">{team.name}</span>
                  </div>
                  <span className="text-left ml-2 flex-shrink-0">{team.data[team.data.length - 1].count}</span>
                </div>
              );
            })
          }
        </CardContent>
      </Card>

      <Card className="flex-[1_1_100%]">
        <CardHeader>
          <CardTitle>Projected Score Standings</CardTitle>
          <CardDescription>Applies the projected multiplier based on problem difficulty</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between font-semibold text-sm text-muted-foreground border-b pb-2">
            <div className="flex gap-2 items-center">
              <span className="w-4 text-right">#</span>
              <span className="w-6"></span>
              <span>Team</span>
            </div>
            <span className="text-left ml-2">Score</span>
          </div>
          {
            props.standings.map((team, i) => {
              const styles = assignLineStyle(team.id);
              return (
                <div key={i} className="flex justify-between">
                  <div className="flex gap-2 items-center min-w-0 flex-1">
                    <h2 className="w-4 text-right font-bold flex-shrink-0">{i + 1}</h2>
                    <LineStyleDisplay {...styles} />
                    <span className="overflow-ellipsis overflow-hidden text-nowrap min-w-0">{team.name}</span>
                  </div>
                  <span className="text-left ml-2 flex-shrink-0">{Number(team.score).toFixed(2)}</span>
                </div>
              );
            })
          }
        </CardContent>
      </Card>
    </div>
  );
}
function LineStyleDisplay(styles: { color: string; dasharray: string; }) {
  return <svg width="24" height="24" className="flex-shrink-0">
    <line
      x1="4"
      y1="12"
      x2="20"
      y2="12"
      stroke={styles.color}
      strokeDasharray={styles.dasharray}
      strokeWidth="2" />
  </svg>;
}

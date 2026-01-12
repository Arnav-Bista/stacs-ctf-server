"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Team from "../lib/types/team";

export interface ProblemTracker {
  found_flag_ids: Set<number>,
  isLoading: boolean,
  isError: boolean
}

type IntermeidateData = {
  flag_id: number
}[]

const ProblemTrackerContext = createContext<ProblemTracker | null>(null);

export function ProblemTrackerProvider({ children }: { children?: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Set<number> | null>(null);
  useEffect(() => {
    async function fetchData(team_id: string | number) {
      setLoading(true);

      try {
        const response = await fetch(`/api/teams/tracker?team_id=${team_id}`);
        const data: IntermeidateData = await response.json();
        const set: Set<number> = new Set();
        data.forEach(e => set.add(e.flag_id));
        setData(set);
      }
      catch (e) {
        setError(e as Error);
      }
      finally {
        setLoading(false);
      }
    }

    const rawTeamData = localStorage.getItem("team");
    try {
      if (rawTeamData) {
        const team: Team = JSON.parse(rawTeamData);
        fetchData(team.id);
      }
    }
    catch (e) {
      console.error("Could not parse the 'team' localStorage.");
    }
  }, []);

  return (
    <ProblemTrackerContext.Provider value={{
      found_flag_ids: data ?? new Set(),
      isError: error === null,
      isLoading: loading
    }}>
      {children}
    </ProblemTrackerContext.Provider>
  );
}

export function useTrackerData() {
  const context = useContext(ProblemTrackerContext);
  if (context === undefined) {
    throw new Error('useTrackerData must be used within ProblemTrackerProvider');
  }
  return context;
}

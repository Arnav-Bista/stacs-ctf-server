"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Team from "../lib/types/team";

// My naming skills are not the best I admit

export interface ProblemTracker {
  found_flag_ids: Set<number>,
  flag_found_count_map: Map<number, number> | null,
  isLoading: boolean,
  isError: boolean
}

type IntermeidateDataTracker = {
  flag_id: number
}[]

type IntermeidateDataFlagFound = {
  id: number,
  discovered: number
}[]

const ProblemTrackerContext = createContext<ProblemTracker | null>(null);


async function fetchFlagTracker(team_id: string | number | null): Promise<Set<number> | null> {
  if (team_id === null) {
    return null;
  }
  try {
    const response = await fetch(`/api/teams/tracker?team_id=${team_id}`);
    const data: IntermeidateDataTracker = await response.json();
    const set: Set<number> = new Set();
    data.forEach(e => set.add(e.flag_id));
    return set;
  }
  catch (e) {
    return null;
  }
}

async function fetchFlagsFound(): Promise<Map<number, number> | null> {
  try {
    const response = await fetch("/api/flags/discovered");
    const data: IntermeidateDataFlagFound = await response.json();
    const map: Map<number, number> = new Map();
    data.forEach(e => map.set(e.id, e.discovered));
    return map;
  }
  catch (e) {
    return null;
  }
}


export function ProblemTrackerProvider({ children }: { children?: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Set<number> | null>(null);
  const [flagFoundData, setFlagFoundData] = useState<Map<number, number> | null>(null);
  useEffect(() => {

    async function fetchData(team_id: string | number | null) {
      setLoading(true);
      try {
        const [selfTracker, flagFoundTracker] = await Promise.all([fetchFlagTracker(team_id), fetchFlagsFound()]);
        setData(selfTracker ?? new Set())
        setFlagFoundData(flagFoundTracker);
      }
      catch (e) {
        setError(e as Error)
      }
      finally {
        setLoading(false);
      }
    }

    let team_id = null;
    const rawTeamData = localStorage.getItem("team");
    try {
      if (rawTeamData) {
        const team: Team = JSON.parse(rawTeamData);
        team_id = team.id;
      }
    }
    catch (e) {
      console.error("Could not parse the 'team' localStorage.");
    }

    fetchData(team_id);
  }, []);

  return (
    <ProblemTrackerContext.Provider value={{
      found_flag_ids: data ?? new Set(),
      flag_found_count_map: flagFoundData,
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

export type RawDataPoint = {
  teamId: number;
  id: number;
  name: string;
  found_at: number;
};

export interface PlottingData {
  id: number,
  name: string,
  data: Array<{
    found_at: number,
    count: number
  }>
}

export type Standings = {
  id: number, 
  name: string, 
  score: number
}[]

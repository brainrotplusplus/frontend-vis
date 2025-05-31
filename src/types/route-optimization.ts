export interface RouteAlert {
  route: string;
  status: string;
  utilization: number;
  issue: string | null;
}

export interface TransferHub {
  name: string;
  connections: number;
  efficiency: number;
  passengers: number;
}

export interface DemandDataPoint {
  hour: string;
  demand: number;
  capacity: number;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  weight: number;
}

export interface OptimizationData {
  issue: string;
  explanation: string;
  beforeData: { hour: string; passengers: number }[];
  afterData: { hour: string; passengers: number }[];
  improvements: {
    waitTime: { before: string; after: string };
    utilization: { before: string; after: string };
    satisfaction: { before: string; after: string };
  };
}

import type {
  DemandDataPoint,
  HeatmapPoint,
  RouteAlert,
  TransferHub,
  OptimizationData,
} from "../types/route-optimization";
import type { TramRoute } from "../components/optimization/TramLineMap";

// Tram routes data for Kraków
export const tramRoutes: Record<string, TramRoute> = {
  "Trasa 15": {
    id: "15",
    name: "Trasa 15",
    color: "#e5484d",
    stops: [
      {
        id: "15-1",
        name: "Dworzec Główny",
        lat: 50.0677,
        lng: 19.9456,
        isTerminal: true,
      },
      { id: "15-2", name: "Galeria Krakowska", lat: 50.0693, lng: 19.9447 },
      { id: "15-3", name: "Rondo Mogilskie", lat: 50.0784, lng: 19.9364 },
      { id: "15-4", name: "Teatr Bagatela", lat: 50.0721, lng: 19.9281 },
      {
        id: "15-5",
        name: "Plac Wszystkich Świętych",
        lat: 50.0656,
        lng: 19.9298,
      },
      { id: "15-6", name: "Rynek Główny", lat: 50.0619, lng: 19.9368 },
      { id: "15-7", name: "Stradom", lat: 50.0534, lng: 19.9423 },
      { id: "15-8", name: "Wawel", lat: 50.0544, lng: 19.9356 },
      { id: "15-9", name: "Most Grunwaldzki", lat: 50.0478, lng: 19.9334 },
      {
        id: "15-10",
        name: "Salwator",
        lat: 50.0456,
        lng: 19.9123,
        isTerminal: true,
      },
    ],
    path: [
      { lat: 50.0677, lng: 19.9456 },
      { lat: 50.0693, lng: 19.9447 },
      { lat: 50.0784, lng: 19.9364 },
      { lat: 50.0721, lng: 19.9281 },
      { lat: 50.0656, lng: 19.9298 },
      { lat: 50.0619, lng: 19.9368 },
      { lat: 50.0534, lng: 19.9423 },
      { lat: 50.0544, lng: 19.9356 },
      { lat: 50.0478, lng: 19.9334 },
      { lat: 50.0456, lng: 19.9123 },
    ],
  },
  "Trasa 7": {
    id: "7",
    name: "Trasa 7",
    color: "#f59e0b",
    stops: [
      {
        id: "7-1",
        name: "Os. Piastów",
        lat: 50.0945,
        lng: 19.8876,
        isTerminal: true,
      },
      { id: "7-2", name: "Bronowice Małe", lat: 50.0892, lng: 19.8923 },
      { id: "7-3", name: "AGH", lat: 50.0648, lng: 19.9137 },
      { id: "7-4", name: "Filharmonia", lat: 50.0634, lng: 19.9223 },
      {
        id: "7-5",
        name: "Plac Wszystkich Świętych",
        lat: 50.0656,
        lng: 19.9298,
      },
      { id: "7-6", name: "Poczta Główna", lat: 50.0623, lng: 19.9412 },
      { id: "7-7", name: "Kazimierz", lat: 50.0516, lng: 19.9461 },
      { id: "7-8", name: "Podgórze", lat: 50.0389, lng: 19.9489 },
      {
        id: "7-9",
        name: "Bonarka",
        lat: 50.0234,
        lng: 19.9523,
        isTerminal: true,
      },
    ],
    path: [
      { lat: 50.0945, lng: 19.8876 },
      { lat: 50.0892, lng: 19.8923 },
      { lat: 50.0648, lng: 19.9137 },
      { lat: 50.0634, lng: 19.9223 },
      { lat: 50.0656, lng: 19.9298 },
      { lat: 50.0623, lng: 19.9412 },
      { lat: 50.0516, lng: 19.9461 },
      { lat: 50.0389, lng: 19.9489 },
      { lat: 50.0234, lng: 19.9523 },
    ],
  },
  "Trasa 23": {
    id: "23",
    name: "Trasa 23",
    color: "#00d47e",
    stops: [
      {
        id: "23-1",
        name: "Dworzec Główny",
        lat: 50.0677,
        lng: 19.9456,
        isTerminal: true,
      },
      { id: "23-2", name: "Politechnika", lat: 50.0625, lng: 19.9215 },
      { id: "23-3", name: "Krowodrza Górka", lat: 50.0823, lng: 19.9089 },
      { id: "23-4", name: "Azory", lat: 50.0989, lng: 19.8934 },
      {
        id: "23-5",
        name: "Balice",
        lat: 50.0777,
        lng: 19.7848,
        isTerminal: true,
      },
    ],
    path: [
      { lat: 50.0677, lng: 19.9456 },
      { lat: 50.0625, lng: 19.9215 },
      { lat: 50.0823, lng: 19.9089 },
      { lat: 50.0989, lng: 19.8934 },
      { lat: 50.0777, lng: 19.7848 },
    ],
  },
  "Trasa 42": {
    id: "42",
    name: "Trasa 42",
    color: "#8b5cf6",
    stops: [
      {
        id: "42-1",
        name: "Rondo Matecznego",
        lat: 50.0234,
        lng: 19.9123,
        isTerminal: true,
      },
      { id: "42-2", name: "Wieczysta", lat: 50.0356, lng: 19.9256 },
      { id: "42-3", name: "Teatr Słowackiego", lat: 50.0678, lng: 19.9356 },
      { id: "42-4", name: "Dworzec Główny", lat: 50.0677, lng: 19.9456 },
      { id: "42-5", name: "Nowa Huta Centrum", lat: 50.0775, lng: 20.0339 },
      {
        id: "42-6",
        name: "Plac Centralny",
        lat: 50.0801,
        lng: 20.0398,
        isTerminal: true,
      },
    ],
    path: [
      { lat: 50.0234, lng: 19.9123 },
      { lat: 50.0356, lng: 19.9256 },
      { lat: 50.0678, lng: 19.9356 },
      { lat: 50.0677, lng: 19.9456 },
      { lat: 50.0823, lng: 19.9578 },
      { lat: 50.0775, lng: 20.0339 },
      { lat: 50.0801, lng: 20.0398 },
    ],
  },
};

export const demandData: DemandDataPoint[] = [
  { hour: "06:00", demand: 45, capacity: 60 },
  { hour: "07:00", demand: 85, capacity: 60 },
  { hour: "08:00", demand: 95, capacity: 60 },
  { hour: "09:00", demand: 70, capacity: 60 },
  { hour: "10:00", demand: 40, capacity: 60 },
  { hour: "11:00", demand: 35, capacity: 60 },
  { hour: "12:00", demand: 55, capacity: 60 },
  { hour: "13:00", demand: 50, capacity: 60 },
  { hour: "14:00", demand: 45, capacity: 60 },
  { hour: "15:00", demand: 60, capacity: 60 },
  { hour: "16:00", demand: 75, capacity: 60 },
  { hour: "17:00", demand: 90, capacity: 60 },
  { hour: "18:00", demand: 85, capacity: 60 },
  { hour: "19:00", demand: 65, capacity: 60 },
];

// Sample heatmap data points for Kraków transport demand
export const heatmapPoints: HeatmapPoint[] = [
  // Main Market Square & Old Town - High demand
  { lat: 50.0619, lng: 19.9368, weight: 0.95 }, // Rynek Główny (Main Square)
  { lat: 50.0614, lng: 19.9383, weight: 0.88 },
  { lat: 50.0625, lng: 19.9355, weight: 0.85 },

  // Kraków Główny Station area - Very High demand
  { lat: 50.0677, lng: 19.9456, weight: 0.98 }, // Main Railway Station
  { lat: 50.0685, lng: 19.9441, weight: 0.92 },
  { lat: 50.067, lng: 19.947, weight: 0.89 },

  // Kazimierz District - High demand
  { lat: 50.0516, lng: 19.9461, weight: 0.82 },
  { lat: 50.0501, lng: 19.9485, weight: 0.78 },

  // Jagiellonian University area - High demand
  { lat: 50.0614, lng: 19.9228, weight: 0.8 },
  { lat: 50.0628, lng: 19.9214, weight: 0.75 },

  // Galeria Krakowska Shopping Center
  { lat: 50.0693, lng: 19.9447, weight: 0.85 },

  // Wawel Castle area
  { lat: 50.0544, lng: 19.9356, weight: 0.72 },

  // Business District (around Rondo Mogilskie)
  { lat: 50.0784, lng: 19.9364, weight: 0.78 },
  { lat: 50.0798, lng: 19.9381, weight: 0.74 },

  // Podgórze District - Medium demand
  { lat: 50.0389, lng: 19.9489, weight: 0.65 },
  { lat: 50.0356, lng: 19.9523, weight: 0.62 },

  // Nowa Huta - Medium demand
  { lat: 50.0775, lng: 20.0339, weight: 0.68 },
  { lat: 50.0801, lng: 20.0298, weight: 0.64 },
  { lat: 50.0834, lng: 20.0412, weight: 0.61 },

  // Bronowice - Medium demand
  { lat: 50.0892, lng: 19.8876, weight: 0.58 },
  { lat: 50.0934, lng: 19.8923, weight: 0.55 },

  // Kraków Airport area
  { lat: 50.0777, lng: 19.7848, weight: 0.52 },

  // Residential suburbs - Lower demand
  { lat: 50.0234, lng: 19.9123, weight: 0.35 },
  { lat: 50.1089, lng: 19.9678, weight: 0.32 },
  { lat: 50.0445, lng: 20.0789, weight: 0.28 },
  { lat: 50.0123, lng: 19.8567, weight: 0.25 },
  { lat: 50.1234, lng: 19.8234, weight: 0.3 },
];

export const routeAlerts: RouteAlert[] = [
  {
    route: "Trasa 15",
    status: "overloaded",
    utilization: 95,
    issue: "Zatłoczenie w godzinach szczytu",
  },
  {
    route: "Trasa 7",
    status: "underutilized",
    utilization: 25,
    issue: "Niskie wykorzystanie",
  },
  { route: "Trasa 23", status: "optimal", utilization: 75, issue: null },
  {
    route: "Trasa 42",
    status: "overloaded",
    utilization: 88,
    issue: "Niewystarczająca częstotliwość",
  },
];

export const transferHubs: TransferHub[] = [
  {
    name: "Dworzec Centralny",
    connections: 8,
    efficiency: 92,
    passengers: 15420,
  },
  {
    name: "Węzeł Uniwersytecki",
    connections: 5,
    efficiency: 78,
    passengers: 8930,
  },
  {
    name: "Dzielnica Handlowa",
    connections: 6,
    efficiency: 85,
    passengers: 12100,
  },
  {
    name: "Terminal Lotniczy",
    connections: 4,
    efficiency: 95,
    passengers: 6750,
  },
];

// Optimization data for different routes
export const optimizationData: Record<string, OptimizationData> = {
  "Trasa 15": {
    issue: "Zatłoczenie w godzinach szczytu",
    explanation:
      "Analiza pokazuje, że Trasa 15 osiąga 95% wykorzystania w godzinach 7:00-9:00 i 17:00-19:00. AI zaleca zwiększenie częstotliwości kursów o 40% w tych godzinach oraz wprowadzenie dodatkowych wagonów.",
    beforeData: [
      { hour: "06:00", passengers: 45 },
      { hour: "07:00", passengers: 95 },
      { hour: "08:00", passengers: 95 },
      { hour: "09:00", passengers: 70 },
      { hour: "10:00", passengers: 40 },
      { hour: "11:00", passengers: 35 },
      { hour: "12:00", passengers: 55 },
      { hour: "13:00", passengers: 50 },
      { hour: "14:00", passengers: 45 },
      { hour: "15:00", passengers: 60 },
      { hour: "16:00", passengers: 75 },
      { hour: "17:00", passengers: 95 },
      { hour: "18:00", passengers: 95 },
      { hour: "19:00", passengers: 80 },
    ],
    afterData: [
      { hour: "06:00", passengers: 45 },
      { hour: "07:00", passengers: 75 },
      { hour: "08:00", passengers: 75 },
      { hour: "09:00", passengers: 60 },
      { hour: "10:00", passengers: 40 },
      { hour: "11:00", passengers: 35 },
      { hour: "12:00", passengers: 55 },
      { hour: "13:00", passengers: 50 },
      { hour: "14:00", passengers: 45 },
      { hour: "15:00", passengers: 60 },
      { hour: "16:00", passengers: 70 },
      { hour: "17:00", passengers: 75 },
      { hour: "18:00", passengers: 75 },
      { hour: "19:00", passengers: 65 },
    ],
    improvements: {
      waitTime: { before: "12 min", after: "8 min" },
      utilization: { before: "95%", after: "75%" },
      satisfaction: { before: "62%", after: "89%" },
    },
  },
  "Trasa 7": {
    issue: "Niskie wykorzystanie",
    explanation:
      "Trasa 7 ma tylko 25% wykorzystania. AI sugeruje zmniejszenie częstotliwości kursów o 30% oraz przekierowanie części taboru na bardziej obciążone trasy w godzinach szczytu.",
    beforeData: [
      { hour: "06:00", passengers: 15 },
      { hour: "07:00", passengers: 25 },
      { hour: "08:00", passengers: 30 },
      { hour: "09:00", passengers: 20 },
      { hour: "10:00", passengers: 15 },
      { hour: "11:00", passengers: 12 },
      { hour: "12:00", passengers: 18 },
      { hour: "13:00", passengers: 16 },
      { hour: "14:00", passengers: 14 },
      { hour: "15:00", passengers: 20 },
      { hour: "16:00", passengers: 25 },
      { hour: "17:00", passengers: 28 },
      { hour: "18:00", passengers: 22 },
      { hour: "19:00", passengers: 18 },
    ],
    afterData: [
      { hour: "06:00", passengers: 18 },
      { hour: "07:00", passengers: 35 },
      { hour: "08:00", passengers: 42 },
      { hour: "09:00", passengers: 28 },
      { hour: "10:00", passengers: 20 },
      { hour: "11:00", passengers: 15 },
      { hour: "12:00", passengers: 25 },
      { hour: "13:00", passengers: 22 },
      { hour: "14:00", passengers: 18 },
      { hour: "15:00", passengers: 28 },
      { hour: "16:00", passengers: 35 },
      { hour: "17:00", passengers: 38 },
      { hour: "18:00", passengers: 32 },
      { hour: "19:00", passengers: 25 },
    ],
    improvements: {
      waitTime: { before: "15 min", after: "12 min" },
      utilization: { before: "25%", after: "45%" },
      satisfaction: { before: "45%", after: "72%" },
    },
  },
};

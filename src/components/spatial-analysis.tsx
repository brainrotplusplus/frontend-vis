"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "$/components/ui/card";
import { Button } from "$/components/ui/button";
import { Badge } from "$/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "$/components/ui/tabs";
import { MapPin, Users, Accessibility, TrendingUp, Plus } from "lucide-react";
import { ChartContainer, ChartTooltip } from "$/components/ui/chart";
import {
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const accessibilityData = [
  { area: "Centrum", coverage: 95, population: 45000, score: "Doskonały" },
  {
    area: "Północne Przedmieścia",
    coverage: 72,
    population: 32000,
    score: "Dobry",
  },
  {
    area: "Strefa Przemysłowa",
    coverage: 45,
    population: 18000,
    score: "Słaby",
  },
  {
    area: "Wschodnia Dzielnica Mieszkaniowa",
    coverage: 68,
    population: 28000,
    score: "Dobry",
  },
  {
    area: "Dzielnica Uniwersytecka",
    coverage: 88,
    population: 22000,
    score: "Bardzo Dobry",
  },
];

const densityCorrelation = [
  { density: 120, usage: 85, area: "Centrum Miasta" },
  { density: 95, usage: 72, area: "Dzielnica Biznesowa" },
  { density: 80, usage: 65, area: "Dzielnica Mieszkaniowa A" },
  { density: 60, usage: 45, area: "Przedmieścia" },
  { density: 150, usage: 95, area: "Uniwersytet" },
  { density: 40, usage: 30, area: "Strefa Przemysłowa" },
  { density: 110, usage: 78, area: "Centrum Handlowe" },
];

const suggestedStops = [
  {
    id: "stop1",
    location: "Klonowa i 5 Ulica",
    priority: "Wysoki",
    reason: "Duży ruch pieszych, 800m przerwy",
    impact: 1200,
    coordinates: { lat: 50.0845, lng: 19.9176 },
  },
  {
    id: "stop2",
    location: "Wejście do Parku Technologicznego",
    priority: "Wysoki",
    reason: "Główne centrum zatrudnienia",
    impact: 950,
    coordinates: { lat: 50.0723, lng: 19.9281 },
  },
  {
    id: "stop3",
    location: "Centrum Społeczności",
    priority: "Średni",
    reason: "Ośrodek usług społecznych",
    impact: 600,
    coordinates: { lat: 50.0534, lng: 19.9412 },
  },
  {
    id: "stop4",
    location: "Plaza Handlowa",
    priority: "Średni",
    reason: "Aktywność komercyjna",
    impact: 750,
    coordinates: { lat: 50.0912, lng: 19.8734 },
  },
];

// Areas with poor transport coverage
const excludedAreas = [
  {
    id: "area1",
    name: "Północne Przedmieścia",
    center: { lat: 50.1123, lng: 19.9123 },
    radius: 800,
    severity: "high", // high, medium, low
    population: 15000,
  },
  {
    id: "area2",
    name: "Strefa Przemysłowa",
    center: { lat: 50.0234, lng: 19.8567 },
    radius: 1200,
    severity: "high",
    population: 8000,
  },
  {
    id: "area3",
    name: "Wschodnie Osiedle",
    center: { lat: 50.0789, lng: 20.0123 },
    radius: 600,
    severity: "medium",
    population: 12000,
  },
  {
    id: "area4",
    name: "Południowe Przedmieścia",
    center: { lat: 50.0123, lng: 19.9789 },
    radius: 900,
    severity: "medium",
    population: 18000,
  },
];

// Popular routes with usage intensity
const popularRoutes = [
  {
    id: "route1",
    name: "Trasa 4",
    path: [
      { lat: 50.0677, lng: 19.9456 },
      { lat: 50.0725, lng: 19.9234 },
      { lat: 50.0823, lng: 19.9089 },
      { lat: 50.0912, lng: 19.8956 },
    ],
    intensity: 95, // 0-100
    dailyUsers: 35000,
  },
  {
    id: "route2",
    name: "Trasa 11",
    path: [
      { lat: 50.0614, lng: 19.9228 },
      { lat: 50.0567, lng: 19.9345 },
      { lat: 50.0534, lng: 19.9412 },
      { lat: 50.0489, lng: 19.9567 },
    ],
    intensity: 78,
    dailyUsers: 28000,
  },
  {
    id: "route3",
    name: "Trasa 18",
    path: [
      { lat: 50.0833, lng: 19.9425 },
      { lat: 50.0789, lng: 19.9567 },
      { lat: 50.0723, lng: 19.9681 },
      { lat: 50.0677, lng: 19.9789 },
    ],
    intensity: 62,
    dailyUsers: 21000,
  },
];

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function TransportCoverageMap() {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-[300px] bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg flex items-center justify-center border border-red-200">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-red-400 mx-auto mb-2" />
          <p className="text-red-600 font-medium">
            Mapa Wykluczenia Transportowego
          </p>
          <p className="text-sm text-red-500">Wymagany klucz API Google Maps</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="h-[300px] w-full rounded-lg overflow-hidden">
        <Map
          defaultCenter={{ lat: 50.0647, lng: 19.945 }}
          defaultZoom={12}
          mapId="kraków-coverage"
          style={{ width: "100%", height: "100%" }}
          disableDefaultUI={true}
          zoomControl={true}
          colorScheme="LIGHT"
        >
          {excludedAreas.map((area) => (
            <AdvancedMarker
              key={area.id}
              position={area.center}
              title={area.name}
            >
              <div className="relative">
                {/* Exclusion circle */}
                <div
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{
                    width: `${Math.max(area.radius / 10, 60)}px`,
                    height: `${Math.max(area.radius / 10, 60)}px`,
                    backgroundColor:
                      area.severity === "high" ? "#ef4444" : "#f97316",
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                    top: "50%",
                  }}
                />

                {/* Area marker */}
                <div
                  className={`w-4 h-4 rounded-full border-2 relative z-10 ${
                    area.severity === "high"
                      ? "bg-red-500 border-red-400"
                      : "bg-orange-500 border-orange-400"
                  }`}
                ></div>
              </div>
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

function StopPlanningMap() {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-[400px] bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-lg flex items-center justify-center border border-blue-200">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-2" />
          <p className="text-blue-600 font-medium">
            Mapa Planowania Przystanków
          </p>
          <p className="text-sm text-blue-500">
            Wymagany klucz API Google Maps
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <Map
          defaultCenter={{ lat: 50.0647, lng: 19.945 }}
          defaultZoom={13}
          mapId="kraków-stops"
          style={{ width: "100%", height: "100%" }}
          disableDefaultUI={true}
          zoomControl={true}
          colorScheme="LIGHT"
        >
          {/* Suggested stops */}
          {suggestedStops.map((stop) => (
            <AdvancedMarker
              key={stop.id}
              position={stop.coordinates}
              title={stop.location}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  stop.priority === "Wysoki"
                    ? "bg-red-500 border-red-400"
                    : "bg-orange-500 border-orange-400"
                }`}
              >
                <Plus className="h-3 w-3 text-white" />
              </div>
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

function RoutePopularityMap() {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-[300px] bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center border border-purple-200">
        <div className="text-center">
          <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
          <p className="text-purple-600 font-medium">
            Mapa Cieplna Popularności Tras
          </p>
          <p className="text-sm text-purple-500">
            Wymagany klucz API Google Maps
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="h-[300px] w-full rounded-lg overflow-hidden">
        <Map
          defaultCenter={{ lat: 50.0647, lng: 19.945 }}
          defaultZoom={13}
          mapId="kraków-popularity"
          style={{ width: "100%", height: "100%" }}
          disableDefaultUI={true}
          zoomControl={true}
          colorScheme="LIGHT"
        >
          {popularRoutes.map((route) => (
            <div key={route.id}>
              {/* Route markers at start and end */}
              <AdvancedMarker
                position={route.path[0]}
                title={`${route.name} - Start`}
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor:
                      route.intensity > 80
                        ? "#dc2626"
                        : route.intensity > 60
                        ? "#ea580c"
                        : "#eab308",
                    borderColor:
                      route.intensity > 80
                        ? "#b91c1c"
                        : route.intensity > 60
                        ? "#c2410c"
                        : "#ca8a04",
                  }}
                />
              </AdvancedMarker>

              <AdvancedMarker
                position={route.path[route.path.length - 1]}
                title={`${route.name} - Koniec`}
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor:
                      route.intensity > 80
                        ? "#dc2626"
                        : route.intensity > 60
                        ? "#ea580c"
                        : "#eab308",
                    borderColor:
                      route.intensity > 80
                        ? "#b91c1c"
                        : route.intensity > 60
                        ? "#c2410c"
                        : "#ca8a04",
                  }}
                />
              </AdvancedMarker>
            </div>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

export function SpatialAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Analiza Przestrzenna
        </h2>
        <p className="text-muted-foreground">
          Analiza wzorców przestrzennych i optymalizacja rozmieszczenia
          infrastruktury transportowej
        </p>
      </div>

      <Tabs defaultValue="accessibility" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accessibility">Dostępność Transportu</TabsTrigger>
          <TabsTrigger value="stops">Planowanie Przystanków</TabsTrigger>
          <TabsTrigger value="density">Gęstość Zabudowy</TabsTrigger>
          <TabsTrigger value="improvements">Ulepszenia Dostępności</TabsTrigger>
        </TabsList>

        <TabsContent value="accessibility" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Analiza Pokrycia Według Obszaru</CardTitle>
                <CardDescription>
                  Dostępność transportu w różnych obszarach miasta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessibilityData.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{area.area}</h4>
                        <p className="text-sm text-muted-foreground">
                          Populacja: {area.population.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {area.coverage}%
                        </div>
                        <Badge
                          variant={
                            area.score === "Doskonały"
                              ? "default"
                              : area.score === "Bardzo Dobry" ||
                                area.score === "Dobry"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {area.score}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mapa Wykluczenia Transportowego</CardTitle>
                <CardDescription>
                  Obszary z ograniczonym lub brakiem dostępu do transportu
                  publicznego
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransportCoverageMap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stops" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sugerowane Lokalizacje Przystanków</CardTitle>
                <CardDescription>
                  Optymalne lokalizacje dla nowych przystanków na podstawie
                  analizy popytu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedStops.map((stop, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{stop.location}</h4>
                        <Badge
                          variant={
                            stop.priority === "Wysoki"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {stop.priority} Priorytet
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {stop.reason}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>Szac. {stop.impact} pasażerów dziennie</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mapa Planowania Przystanków</CardTitle>
                <CardDescription>
                  Interaktywna mapa do optymalnego rozmieszczenia przystanków
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StopPlanningMap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="density" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Korelacja Gęstości i Wykorzystania</CardTitle>
                <CardDescription>
                  Związek między gęstością zabudowy a wykorzystaniem transportu
                  publicznego
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    usage: {
                      label: "Wykorzystanie Transportu",
                      color: "#3b82f6",
                    },
                    density: {
                      label: "Gęstość Zabudowy",
                      color: "#8b5cf6",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      data={densityCorrelation}
                      margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                    >
                      <XAxis
                        dataKey="density"
                        name="Gęstość Zabudowy"
                        type="number"
                        domain={["dataMin - 10", "dataMax + 10"]}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                        tickLine={{ stroke: "#cbd5e1" }}
                        label={{
                          value: "Gęstość Zabudowy (osoby/km²)",
                          position: "insideBottom",
                          offset: -10,
                          style: {
                            textAnchor: "middle",
                            fill: "#475569",
                            fontSize: "12px",
                          },
                        }}
                      />
                      <YAxis
                        dataKey="usage"
                        name="Wykorzystanie Transportu"
                        type="number"
                        domain={["dataMin - 5", "dataMax + 5"]}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                        tickLine={{ stroke: "#cbd5e1" }}
                        label={{
                          value: "Wykorzystanie Transportu (%)",
                          angle: -90,
                          position: "insideLeft",
                          style: {
                            textAnchor: "middle",
                            fill: "#475569",
                            fontSize: "12px",
                          },
                        }}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg border-slate-200">
                                <p className="font-semibold text-slate-900 mb-2">
                                  {data.area}
                                </p>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-600">
                                    <span className="font-medium">
                                      Gęstość:
                                    </span>{" "}
                                    {data.density} osób/km²
                                  </p>
                                  <p className="text-sm text-slate-600">
                                    <span className="font-medium">
                                      Wykorzystanie:
                                    </span>{" "}
                                    {data.usage}%
                                  </p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter
                        dataKey="usage"
                        fill="#3b82f6"
                        stroke="#1e40af"
                        strokeWidth={2}
                        r={6}
                        fillOpacity={0.8}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mapa Cieplna Popularności Tras</CardTitle>
                <CardDescription>
                  Wizualna reprezentacja wzorców wykorzystania istniejących tras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RoutePopularityMap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rekomendacje Dostępności</CardTitle>
                <CardDescription>
                  Ulepszenia dla osób z niepełnosprawnościami
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Accessibility className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">
                      Dostępność dla Wózków Inwalidzkich
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Instalacja ramp i wind na 12 priorytetowych stacjach
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Szacowany Koszt: 2.4M PLN</span>
                    <Button size="sm">Zobacz Szczegóły</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Accessibility className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Komunikaty Dźwiękowe</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modernizacja systemów audio dla pasażerów z wadami wzroku
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Szacowany Koszt: 800K PLN</span>
                    <Button size="sm">Zobacz Szczegóły</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Accessibility className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium">Wskazówki Tactile</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Instalacja nawierzchni tactile na wszystkich głównych
                    przystankach
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Szacowany Koszt: 1.2M PLN</span>
                    <Button size="sm">Zobacz Szczegóły</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priorytet Implementacji</CardTitle>
                <CardDescription>
                  Zalecany porządek ulepszania dostępności
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Etap 1: Stacje o wysokim ruchu
                    </span>
                    <Badge>6 miesięcy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Etap 2: Huby Transferowe
                    </span>
                    <Badge variant="secondary">12 miesięcy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Etap 3: Pozostała Sieć
                    </span>
                    <Badge variant="outline">18 miesięcy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

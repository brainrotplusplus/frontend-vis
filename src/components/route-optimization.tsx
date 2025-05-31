"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "$/components/ui/card";
import { Button } from "$/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "$/components/ui/tabs";
import { AlertTriangle, CheckCircle } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "$/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";

// Import extracted components and data
import { GoogleMapsHeatmap } from "./optimization/GoogleMapsHeatmap";
import { OptimizationDrawer } from "./optimization/OptimizationDrawer";
import {
  demandData,
  heatmapPoints,
  routeAlerts,
} from "../data/route-optimization";
import type { RouteAlert } from "../types/route-optimization";
import { SuggestedRoutes } from "./optimization/SuggestedRoutes";
import { TransferOptimization } from "./optimization/TransferOptimization";

export function RouteOptimization() {
  const [isOptimizationDrawerOpen, setIsOptimizationDrawerOpen] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteAlert | null>(null);

  const handleOptimizeClick = (route: RouteAlert) => {
    setSelectedRoute(route);
    setIsOptimizationDrawerOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Optymalizacja Tras i Rozkładów
        </h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Optymalizacja tras i rozkładów transportu publicznego na podstawie
          analizy popytu w czasie rzeczywistym
        </p>
      </div>

      <Tabs defaultValue="heatmap" className="space-y-6">
        <TabsList className="linear-tabs">
          <TabsTrigger value="heatmap" className="linear-tab">
            Mapa Cieplna Popytu
          </TabsTrigger>
          <TabsTrigger value="frequency" className="linear-tab">
            Optymalizacja Częstotliwości
          </TabsTrigger>
          <TabsTrigger value="routes" className="linear-tab">
            Sugestie Tras
          </TabsTrigger>
          <TabsTrigger value="transfers" className="linear-tab">
            Optymalizacja Przesiadki
          </TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="linear-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-semibold">
                  Popyt Godzinowy vs Pojemność
                </CardTitle>
                <CardDescription className="text-white/60">
                  Popyt pasażerów w czasie rzeczywistym w porównaniu z dostępną
                  pojemnością
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    demand: { label: "Popyt", color: "#074feb" },
                    capacity: { label: "Pojemność", color: "#00e0ff" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={demandData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <XAxis
                        dataKey="hour"
                        tick={{ fill: "#8a90b8", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                        tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                      />
                      <YAxis
                        tick={{ fill: "#8a90b8", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                        tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                        domain={[0, 100]}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "rgba(16, 20, 58, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="demand"
                        stroke="#074feb"
                        strokeWidth={3}
                        dot={{ fill: "#074feb", strokeWidth: 2, r: 4 }}
                        activeDot={{
                          r: 6,
                          fill: "#074feb",
                          stroke: "#ffffff",
                          strokeWidth: 2,
                        }}
                        strokeDasharray="0"
                      />
                      <Line
                        type="monotone"
                        dataKey="capacity"
                        stroke="#00e0ff"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#00e0ff", strokeWidth: 2, r: 3 }}
                        activeDot={{
                          r: 5,
                          fill: "#00e0ff",
                          stroke: "#ffffff",
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="linear-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-white font-semibold">
                  Mapa Cieplna Popytu
                </CardTitle>
                <CardDescription className="text-white/60">
                  Geograficzny rozkład popytu pasażerów w czasie rzeczywistym na
                  mapie Krakowa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GoogleMapsHeatmap points={heatmapPoints} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="frequency" className="space-y-6">
          <Card className="linear-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-white font-semibold">
                Alerty Wydajności Tras
              </CardTitle>
              <CardDescription className="text-white/60">
                Monitorowanie wykorzystania i wydajności tras w czasie
                rzeczywistym
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeAlerts.map((route, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        ${
                          route.status === "overloaded"
                            ? "bg-red-500/20 border border-red-500/30"
                            : route.status === "underutilized"
                            ? "bg-yellow-500/20 border border-yellow-500/30"
                            : "bg-green-500/20 border border-green-500/30"
                        }
                      `}
                      >
                        {route.status === "overloaded" ? (
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        ) : route.status === "underutilized" ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {route.route}
                        </h4>
                        {route.issue && (
                          <p className="text-sm text-white/60">{route.issue}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`
                        px-3 py-1 text-xs font-medium rounded-lg
                        ${
                          route.status === "optimal"
                            ? "linear-badge"
                            : "linear-badge-destructive"
                        }
                      `}
                      >
                        {route.utilization}% wykorzystania
                      </span>
                      <Button
                        size="sm"
                        className="linear-button px-4 py-2 text-sm"
                        onClick={() => handleOptimizeClick(route)}
                      >
                        Optymalizuj
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SuggestedRoutes />
          </div>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-6">
          <TransferOptimization />
        </TabsContent>
      </Tabs>

      <OptimizationDrawer
        isOpen={isOptimizationDrawerOpen}
        onClose={() => setIsOptimizationDrawerOpen(false)}
        route={selectedRoute}
      />
    </div>
  );
}

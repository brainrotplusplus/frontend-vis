"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "$/components/ui/card";
import { Badge } from "$/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "$/components/ui/select";
import { Button } from "$/components/ui/button";
import { Music, Trophy, Calendar, Trash2 } from "lucide-react";

// Import new smaller components
import { Event, TimelineDataItem } from "./demand-forecasting/types";
import {
  baseTimelineData,
  seasonalData,
  anomaliesData,
  createDefaultEvents,
} from "./demand-forecasting/data";
import { TimelineChart } from "./demand-forecasting/timeline-chart";
import { CalendarTimeline } from "./demand-forecasting/calendar-timeline";
import { EventsMap } from "./demand-forecasting/events-map";
import { EventManagement } from "./demand-forecasting/event-management";
import { SeasonalChart } from "./demand-forecasting/seasonal-chart";
import { AnomaliesDetection } from "./demand-forecasting/anomalies-detection";

export function DemandForecasting() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [events, setEvents] = useState<Event[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("demand-forecast-events");
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      setEvents(parsed.length > 0 ? parsed : createDefaultEvents());
    } else {
      setEvents(createDefaultEvents());
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("demand-forecast-events", JSON.stringify(events));
  }, [events]);

  // Merge base data with dynamic events
  const timelineData: TimelineDataItem[] = baseTimelineData.map((item) => {
    const event = events.find((e) => e.date === item.date);
    return {
      ...item,
      event: event
        ? { name: event.name, type: event.type, impact: event.impact }
        : null,
    };
  });

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Inteligentne Prognozowanie Popytu
        </h2>
        <p className="text-lg text-muted-foreground mt-2">
          Zaawansowana analiza czasowa łącząca wzorce pogodowe, wydarzenia
          miejskie i trendy sezonowe
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 miesiące</SelectItem>
            <SelectItem value="6months">6 miesięcy</SelectItem>
            <SelectItem value="12months">12 miesięcy</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="outline" className="text-sm">
          Dokładność: 91.2%
        </Badge>

        {/* Event Management */}
        <EventManagement
          onAddEvent={addEvent}
          isSheetOpen={isSheetOpen}
          onSheetOpenChange={setIsSheetOpen}
        />
      </div>

      {/* Current Events List and Map */}
      {events.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aktywne Wydarzenia</CardTitle>
              <CardDescription>
                Zarządzaj wydarzeniami wpływającymi na prognozy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.map((event) => {
                  const availableDates = baseTimelineData.map((item) => ({
                    value: item.date,
                    label: item.dayLabel,
                  }));

                  return (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex justify-center">
                          {event.type === "music" ? (
                            <Music className="h-5 w-5 text-primary" />
                          ) : event.type === "sports" ? (
                            <Trophy className="h-5 w-5 text-primary" />
                          ) : (
                            <Calendar className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {
                              availableDates.find((d) => d.value === event.date)
                                ?.label
                            }{" "}
                            • {event.attendees.toLocaleString()} uczestników
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">+{event.impact}%</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lokalizacje Wydarzeń</CardTitle>
              <CardDescription>
                Mapa pokazująca rozmieszczenie wydarzeń w Krakowie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventsMap events={events} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Timeline Visualization */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl">
            Oś Czasowa Popytu Transportowego
          </CardTitle>
          <CardDescription>
            Interaktywna wizualizacja łącząca prognozy, warunki pogodowe i
            wydarzenia miejskie
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {/* Timeline Chart */}
          <TimelineChart data={timelineData} />

          {/* Calendar Timeline */}
          <CalendarTimeline data={timelineData} />
        </CardContent>
      </Card>

      {/* Bottom Section: Seasonal & Anomalies */}
      <div className="grid gap-6 md:grid-cols-2">
        <SeasonalChart data={seasonalData} />
        <AnomaliesDetection data={anomaliesData} />
      </div>
    </div>
  );
}

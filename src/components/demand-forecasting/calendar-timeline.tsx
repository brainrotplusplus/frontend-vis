import { Badge } from "$/components/ui/badge";
import { TimelineDataItem } from "./types";
import { WeatherIcon, EventIcon } from "./icons";

interface CalendarTimelineProps {
  data: TimelineDataItem[];
}

export const CalendarTimeline = ({ data }: CalendarTimelineProps) => {
  return (
    <div className="space-y-4">
      {/* Calendar Cells Row for Events */}
      <div className="flex items-center justify-between gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1">
            <div
              className={`h-[110px] border rounded-lg p-2 flex flex-col ${
                item.event
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="text-xs font-medium text-center mb-1">
                {item.dayLabel}
              </div>
              {item.event ? (
                <div className="text-center space-y-1 flex-1 flex flex-col justify-center">
                  <div className="flex justify-center">
                    <EventIcon
                      type={item.event.type}
                      className="h-4 w-4 text-primary"
                    />
                  </div>
                  <div className="text-xs font-medium leading-tight">
                    {item.event.name}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs mx-auto scale-75"
                  >
                    +{item.event.impact}%
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-1 text-xs text-muted-foreground">
                  Brak wydarzeń
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Weather Forecast Row */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-3 text-center">
          Prognoza Pogody i Wpływ na Ruch
        </h4>
        <div className="flex items-start justify-between">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center h-[80px] justify-between"
            >
              {/* Weather */}
              <div className="flex flex-col items-center space-y-1">
                <WeatherIcon weather={item.weather} className="h-6 w-6" />
                <span className="text-xs text-muted-foreground font-medium">
                  {item.temperature}°C
                </span>
              </div>

              {/* Impact indicator */}
              <div className="flex flex-col items-center space-y-1">
                {item.weatherImpact !== 0 && (
                  <>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.weatherImpact > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        item.weatherImpact > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.weatherImpact > 0 ? "+" : ""}
                      {item.weatherImpact}%
                    </span>
                  </>
                )}
                {item.weatherImpact === 0 && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <span className="text-xs text-muted-foreground">0%</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

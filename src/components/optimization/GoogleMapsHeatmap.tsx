"use client";

import { useEffect, useRef } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import type { HeatmapPoint } from "../../types/route-optimization";

// Component to handle heatmap layer
function HeatmapLayer({ points }: { points: HeatmapPoint[] }) {
  const map = useMap();
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(
    null
  );

  useEffect(() => {
    if (!map || !window.google?.maps?.visualization) {
      return;
    }

    // Create heatmap layer with optimized settings
    const heatmapData = points.map((point) => ({
      location: new google.maps.LatLng(point.lat, point.lng),
      weight: point.weight,
    }));

    if (heatmapRef.current) {
      heatmapRef.current.setMap(null);
    }

    heatmapRef.current = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
      radius: 30, // Reduced from 50 for better performance
      opacity: 0.7, // Slightly reduced opacity
      maxIntensity: 1,
      dissipating: true,
      gradient: [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(255, 0, 0, 1)",
      ],
    });

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
      }
    };
  }, [map, points]);

  return null;
}

interface GoogleMapsHeatmapProps {
  points: HeatmapPoint[];
}

export function GoogleMapsHeatmap({ points }: GoogleMapsHeatmapProps) {
  // You should replace this with your actual Google Maps API key
  // For demo purposes, using a placeholder
  const API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "your_api_key_here";

  if (API_KEY === "your_api_key_here") {
    return (
      <div className="h-[300px] bg-gradient-to-br from-slate-900/20 to-slate-800/20 rounded-xl border border-white/10 p-4 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/20">
            <MapPin className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <p className="text-white/80 font-medium">Google Maps Heatmap</p>
            <p className="text-sm text-white/50">
              Dodaj klucz API Google Maps do .env.local
            </p>
            <p className="text-xs text-white/40 mt-1">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[300px] rounded-xl overflow-hidden border border-white/10">
      <APIProvider apiKey={API_KEY} libraries={["visualization"]}>
        <Map
          defaultCenter={{ lat: 50.0647, lng: 19.945 }} // Kraków center
          defaultZoom={11}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          clickableIcons={false}
          keyboardShortcuts={false}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          restriction={{
            latLngBounds: {
              north: 50.15,
              south: 49.98,
              east: 20.15,
              west: 19.75,
            },
            strictBounds: false,
          }}
          minZoom={9}
          maxZoom={15}
          styles={[
            // Simplified dark theme styles for better performance
            {
              elementType: "geometry",
              stylers: [{ color: "#1a1a2e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#8a90b8" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#16213e" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#304a7d" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#0e1626" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#283d6a" }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#283d6a" }],
            },
          ]}
        >
          <HeatmapLayer points={points} />
        </Map>
      </APIProvider>
    </div>
  );
}

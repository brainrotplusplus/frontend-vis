"use client";

import { useState } from "react";
import { SidebarProvider } from "$/components/ui/sidebar";
import { AppSidebar } from "$/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "$/components/ui/sidebar";
import { RouteOptimization } from "$/components/route-optimization";
import { SpatialAnalysis } from "$/components/spatial-analysis";
import { DemandForecasting } from "$/components/demand-forecasting";
import { LoadingShell } from "$/components/ui/loading-shell";

export default function TransportDashboard() {
  const [activeSection, setActiveSection] = useState("routes");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
    // Small delay to allow fade-out animation
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "routes":
        return <RouteOptimization />;
      case "spatial":
        return <SpatialAnalysis />;
      case "forecasting":
        return <DemandForecasting />;
      default:
        return <RouteOptimization />;
    }
  };

  // Show loading shell on first visit
  if (isInitialLoading) {
    return <LoadingShell onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div
      className={`transition-opacity duration-700 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <SidebarProvider>
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/8 bg-black/20 backdrop-blur-md px-4">
            <SidebarTrigger className="-ml-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200" />
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Panel Optymalizacji Transportu Publicznego
              </h1>
            </div>
          </header>
          <div
            className="flex flex-1 flex-col gap-6 p-6 overflow-auto"
            style={{ overflowX: "hidden" }}
          >
            {renderContent()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

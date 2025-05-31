"use client";

import {
  MapPin,
  TrendingUp,
  Route,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Logo } from "$/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "$/components/ui/sidebar";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function AppSidebar({
  activeSection,
  setActiveSection,
}: AppSidebarProps) {
  const menuItems = [
    {
      id: "routes",
      title: "Optymalizacja Tras",
      subtitle: "i Rozkładów",
      icon: Route,
      description: "Optymalizacja tras i rozkładów",
      subsections: [
        { id: "heatmap", title: "Mapa Cieplna Popytu" },
        { id: "frequency", title: "Optymalizacja Częstotliwości" },
        { id: "suggested-routes", title: "Sugestie Tras" },
        { id: "transfers", title: "Optymalizacja Przesiadki" },
      ],
    },
    {
      id: "spatial",
      title: "Analiza",
      subtitle: "Przestrzenna",
      icon: MapPin,
      description: "Analiza wzorców przestrzennych",
      subsections: [
        { id: "accessibility", title: "Dostępność Transportu" },
        { id: "stops", title: "Planowanie Przystanków" },
        { id: "density", title: "Gęstość Zabudowy" },
        { id: "improvements", title: "Ulepszenia Dostępności" },
      ],
    },
    {
      id: "forecasting",
      title: "Prognozowanie",
      subtitle: "Popytu",
      icon: TrendingUp,
      description: "Przewidywanie popytu",
      subsections: [
        { id: "timeline", title: "Oś Czasowa Popytu" },
        { id: "events", title: "Zarządzanie Wydarzeniami" },
        { id: "seasonal", title: "Analiza Sezonowa" },
        { id: "anomalies", title: "Wykrywanie Anomalii" },
      ],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sidebar className="linear-sidebar w-64">
      <SidebarHeader className="border-b border-white/6 p-4">
        <div className="flex items-center justify-center">
          <Logo className="h-16 w-auto" width={140} height={91} />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-1">
            Sekcje Panelu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className={`
                      w-full p-3 rounded-lg transition-all duration-200 group h-auto
                      ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                          : "hover:bg-white/5 border border-transparent hover:border-white/10"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div
                        className={`
                        flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 flex-shrink-0
                        ${
                          activeSection === item.id
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                            : "bg-white/10 text-white/70 group-hover:bg-white/15 group-hover:text-white/90"
                        }
                      `}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between">
                          <div
                            className={`
                            font-medium text-sm leading-tight mb-1
                            ${
                              activeSection === item.id
                                ? "text-white"
                                : "text-white/80 group-hover:text-white"
                            }
                          `}
                          >
                            <div>{item.title}</div>
                            <div>{item.subtitle}</div>
                          </div>
                          {activeSection === item.id ? (
                            <ChevronDown className="h-3 w-3 text-white/60" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-white/40" />
                          )}
                        </div>
                        <p
                          className={`
                          text-xs leading-snug
                          ${
                            activeSection === item.id
                              ? "text-white/70"
                              : "text-white/50 group-hover:text-white/60"
                          }
                        `}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </SidebarMenuButton>

                  {/* Subsections - always show expanded */}
                  <div className="mt-2 ml-3 space-y-1 border-l border-white/10 pl-3">
                    {item.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => scrollToSection(subsection.id)}
                        className="w-full text-left px-2 py-1.5 text-xs text-white/60 hover:text-white/80 hover:bg-white/5 rounded transition-all duration-150"
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

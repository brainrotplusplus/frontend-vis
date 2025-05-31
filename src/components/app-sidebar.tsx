"use client";

import { Bus, MapPin, TrendingUp, Route } from "lucide-react";
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
    },
    {
      id: "spatial",
      title: "Analiza",
      subtitle: "Przestrzenna",
      icon: MapPin,
      description: "Analiza wzorców przestrzennych",
    },
    {
      id: "forecasting",
      title: "Prognozowanie",
      subtitle: "Popytu",
      icon: TrendingUp,
      description: "Przewidywanie popytu",
    },
  ];

  return (
    <Sidebar className="linear-sidebar w-64">
      <SidebarHeader className="border-b border-white/6 p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/25">
            <Bus className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              TramwAI
            </h2>
            <p className="text-xs text-white/60 font-medium">
              Analityka Transportu
            </p>
          </div>
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

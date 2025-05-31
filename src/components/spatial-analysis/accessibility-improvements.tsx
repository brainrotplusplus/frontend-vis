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
import { Accessibility } from "lucide-react";

export function AccessibilityImprovements() {
  return (
    <div id="improvements" className="space-y-6">
      <h3 className="text-xl font-medium text-white/60">
        Ulepszenia Dostępności
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="linear-card">
          <CardHeader>
            <CardTitle className="text-white font-semibold">
              Rekomendacje Dostępności
            </CardTitle>
            <CardDescription className="text-white/60">
              Ulepszenia dla osób z niepełnosprawnościami
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Accessibility className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-white">
                  Dostępność dla Wózków Inwalidzkich
                </h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Instalacja ramp i wind na 12 priorytetowych stacjach
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">
                  Szacowany Koszt: 2.4M PLN
                </span>
                <Button size="sm" className="linear-button">
                  Zobacz Szczegóły
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Accessibility className="h-5 w-5 text-green-400" />
                <h4 className="font-medium text-white">Komunikaty Dźwiękowe</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Modernizacja systemów audio dla pasażerów z wadami wzroku
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">
                  Szacowany Koszt: 800K PLN
                </span>
                <Button size="sm" className="linear-button">
                  Zobacz Szczegóły
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Accessibility className="h-5 w-5 text-purple-400" />
                <h4 className="font-medium text-white">Wskazówki Tactile</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Instalacja nawierzchni tactile na wszystkich głównych
                przystankach
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">
                  Szacowany Koszt: 1.2M PLN
                </span>
                <Button size="sm" className="linear-button">
                  Zobacz Szczegóły
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="linear-card">
          <CardHeader>
            <CardTitle className="text-white font-semibold">
              Priorytet Implementacji
            </CardTitle>
            <CardDescription className="text-white/60">
              Zalecany porządek ulepszania dostępności
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-sm font-medium text-white">
                  Etap 1: Stacje o wysokim ruchu
                </span>
                <Badge className="linear-badge">6 miesięcy</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-sm font-medium text-white">
                  Etap 2: Huby Transferowe
                </span>
                <Badge variant="secondary">12 miesięcy</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-sm font-medium text-white">
                  Etap 3: Pozostała Sieć
                </span>
                <Badge variant="outline">18 miesięcy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { StatusBadge } from "@/app/components/StatusBadge";
import { Clock, CheckSquare } from "lucide-react";

interface GameSession {
  id: number;
  emoji: string;
  name: string;
  status: "free" | "occupied" | "overtime";
  clientName?: string;
  timeElapsed?: number;
  maxTime?: number;
}

const games: GameSession[] = [
  { id: 1, emoji: "🎯", name: "Catan", status: "occupied", clientName: "Juan Pérez", timeElapsed: 95, maxTime: 90 },
  { id: 2, emoji: "🃏", name: "Exploding Kittens", status: "free" },
  { id: 3, emoji: "🏰", name: "Carcassonne", status: "occupied", clientName: "María López", timeElapsed: 35, maxTime: 45 },
  { id: 4, emoji: "🎲", name: "Yahtzee", status: "free" },
  { id: 5, emoji: "🧙", name: "Munchkin", status: "occupied", clientName: "Carlos Díaz", timeElapsed: 48, maxTime: 60 },
  { id: 6, emoji: "🌍", name: "Pandemic", status: "free" },
  { id: 7, emoji: "👪", name: "Dixit", status: "occupied", clientName: "Ana Rojas", timeElapsed: 22, maxTime: 30 },
  { id: 8, emoji: "♟️", name: "Ajedrez", status: "occupied", clientName: "Luis Torres", timeElapsed: 75, maxTime: 60 },
  { id: 9, emoji: "🎭", name: "Codenames", status: "free" },
  { id: 10, emoji: "🚂", name: "Ticket to Ride", status: "occupied", clientName: "Sofia Gómez", timeElapsed: 52, maxTime: 60 },
  { id: 11, emoji: "🃏", name: "UNO", status: "free" },
  { id: 12, emoji: "🏛️", name: "7 Wonders", status: "occupied", clientName: "Pedro Sánchez", timeElapsed: 25, maxTime: 30 },
];

const pieceChecklist = [
  "Todas las cartas (52 piezas)",
  "Fichas de jugador (12 piezas)",
  "Dados (2 piezas)",
  "Tablero principal",
  "Manual de instrucciones"
];

export default function GamesControl() {
  const freeGames = games.filter(g => g.status === "free").length;
  const occupiedGames = games.filter(g => g.status === "occupied" || g.status === "overtime").length;
  const overtimeGames = games.filter(g => g.status === "overtime" || (g.timeElapsed && g.maxTime && g.timeElapsed > g.maxTime)).length;

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        CONTROL DE JUEGOS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard glowColor="purple" className="p-5 text-center">
          <div className="text-sm text-[rgba(240,240,255,0.6)] mb-2">Libres</div>
          <div
            className="text-5xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#10b981',
              textShadow: '0 0 15px rgba(16,185,129,0.6)'
            }}
          >
            {freeGames}
          </div>
        </GlassCard>

        <GlassCard glowColor="blue" className="p-5 text-center">
          <div className="text-sm text-[rgba(240,240,255,0.6)] mb-2">Ocupados</div>
          <div
            className="text-5xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#3b82f6',
              textShadow: '0 0 15px rgba(59,130,246,0.6)'
            }}
          >
            {occupiedGames}
          </div>
        </GlassCard>

        <GlassCard glowColor="pink" className="p-5 text-center">
          <div className="text-sm text-[rgba(240,240,255,0.6)] mb-2">Tiempo Extra</div>
          <div
            className="text-5xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ef4444',
              textShadow: '0 0 15px rgba(239,68,68,0.6)'
            }}
          >
            {overtimeGames}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {games.map(game => {
          const isOvertime = game.timeElapsed && game.maxTime && game.timeElapsed > game.maxTime;
          const timePercentage = game.timeElapsed && game.maxTime ? (game.timeElapsed / game.maxTime) * 100 : 0;

          return (
            <GlassCard
              key={game.id}
              glowColor={isOvertime ? "pink" : game.status === "occupied" ? "blue" : "purple"}
              className="p-5"
            >
              <div className="text-4xl mb-3 text-center">{game.emoji}</div>

              <h3 className="text-lg mb-2 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {game.name}
              </h3>

              <div className="mb-3 text-center">
                <StatusBadge
                  status={isOvertime ? "urgent" : game.status === "occupied" ? "occupied" : "available"}
                >
                  {isOvertime ? "OVERTIME" : game.status === "occupied" ? "OCUPADO" : "LIBRE"}
                </StatusBadge>
              </div>

              {game.clientName && (
                <>
                  <div className="text-sm text-[rgba(240,240,255,0.7)] mb-2 text-center">
                    {game.clientName}
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4" />
                      <span
                        className={`text-xl ${isOvertime ? "text-[#ef4444]" : "text-[#22d3ee]"}`}
                        style={{ fontFamily: 'Share Tech Mono, monospace' }}
                      >
                        {game.timeElapsed} min
                      </span>
                    </div>

                    <div className="text-xs text-center text-[rgba(240,240,255,0.5)] mb-2">
                      Máximo: {game.maxTime} min
                    </div>

                    <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOvertime ? "bg-[#ef4444]" : "bg-[#10b981]"
                        }`}
                        style={{ width: `${Math.min(timePercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <NeonButton variant="success" className="flex-1 text-sm py-2">
                      LIBERAR
                    </NeonButton>
                    <NeonButton variant="secondary" className="px-3 text-sm py-2">
                      +30
                    </NeonButton>
                  </div>
                </>
              )}

              {game.status === "free" && (
                <NeonButton variant="primary" className="w-full text-sm py-2">
                  Asignar Cliente
                </NeonButton>
              )}
            </GlassCard>
          );
        })}
      </div>

      <GlassCard glowColor="cyan" className="p-6">
        <h2 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <CheckSquare className="w-5 h-5 text-[#22d3ee]" />
          Verificación de Piezas - Catan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pieceChecklist.map((item, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg p-3 cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-all"
            >
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#22d3ee]"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <NeonButton variant="success" className="flex-1">
            Confirmar Devolución Completa
          </NeonButton>
          <NeonButton variant="danger" className="flex-1">
            Reportar Pieza Faltante
          </NeonButton>
        </div>
      </GlassCard>
    </div>
  );
}

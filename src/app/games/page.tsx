"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { StatusBadge } from "@/app/components/StatusBadge";
import { ArrowLeft } from "lucide-react";

interface Game {
  id: number;
  emoji: string;
  name: string;
  category: string;
  difficulty: string;
  players: string;
  duration: string;
  price: number;
  available: boolean;
}

const games: Game[] = [
  { id: 1, emoji: "🎯", name: "Catan", category: "Estrategia", difficulty: "Media", players: "3-4", duration: "90min", price: 25, available: true },
  { id: 2, emoji: "🃏", name: "Exploding Kittens", category: "Cartas", difficulty: "Fácil", players: "2-5", duration: "15min", price: 15, available: true },
  { id: 3, emoji: "🏰", name: "Carcassonne", category: "Estrategia", difficulty: "Media", players: "2-5", duration: "45min", price: 20, available: false },
  { id: 4, emoji: "🎲", name: "Yahtzee", category: "Clásico", difficulty: "Fácil", players: "2-6", duration: "30min", price: 12, available: true },
  { id: 5, emoji: "🧙", name: "Munchkin", category: "Fiesta", difficulty: "Media", players: "3-6", duration: "60min", price: 22, available: true },
  { id: 6, emoji: "🌍", name: "Pandemic", category: "Estrategia", difficulty: "Alta", players: "2-4", duration: "60min", price: 28, available: false },
  { id: 7, emoji: "👪", name: "Dixit", category: "Familiar", difficulty: "Fácil", players: "3-6", duration: "30min", price: 18, available: true },
  { id: 8, emoji: "♟️", name: "Ajedrez", category: "Clásico", difficulty: "Alta", players: "2", duration: "60min", price: 10, available: true },
  { id: 9, emoji: "🎭", name: "Codenames", category: "Fiesta", difficulty: "Media", players: "4-8", duration: "15min", price: 20, available: true },
  { id: 10, emoji: "🚂", name: "Ticket to Ride", category: "Estrategia", difficulty: "Media", players: "2-5", duration: "60min", price: 25, available: false },
  { id: 11, emoji: "🃏", name: "UNO", category: "Cartas", difficulty: "Fácil", players: "2-10", duration: "20min", price: 10, available: true },
  { id: 12, emoji: "🏛️", name: "7 Wonders", category: "Estrategia", difficulty: "Alta", players: "3-7", duration: "30min", price: 30, available: true },
];

const categories = ["Todos", "Estrategia", "Familiar", "Cartas", "Clásico", "Fiesta"];

export default function GamesCatalog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredGames = selectedCategory === "Todos"
    ? games
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-[#f0f0ff]">
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#a855f7] hover:text-[#9333ea] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-4xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>CATÁLOGO DE JUEGOS</h1>
          <div className="w-20" />
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded transition-all
                ${selectedCategory === category
                  ? 'bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-[#a855f7]'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GlassCard key={game.id} glowColor={game.available ? "purple" : undefined} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{game.emoji}</div>
                <StatusBadge status={game.available ? "available" : "occupied"}>
                  {game.available ? "DISPONIBLE" : "OCUPADO"}
                </StatusBadge>
              </div>

              <h3 className="text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {game.name}
              </h3>

              <div className="space-y-1 mb-4 text-sm text-[rgba(240,240,255,0.7)]">
                <div className="flex justify-between">
                  <span>Categoría:</span>
                  <span className="text-[#a855f7]">{game.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dificultad:</span>
                  <span className="text-[#3b82f6]">{game.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jugadores:</span>
                  <span className="text-[#22d3ee]">{game.players}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duración:</span>
                  <span className="text-[#f472b6]">{game.duration}</span>
                </div>
              </div>

              <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[rgba(240,240,255,0.5)]">Precio</div>
                  <div className="text-2xl" style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    color: '#f472b6',
                    textShadow: '0 0 10px rgba(244, 114, 182, 0.5)'
                  }}>
                    Bs.{game.price}/hora
                  </div>
                </div>
                <NeonButton
                  variant="primary"
                  onClick={() => router.push('/reservations')}
                  className="px-4 py-2 text-sm"
                >
                  Reservar
                </NeonButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

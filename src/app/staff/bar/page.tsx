"use client";

import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { StatusBadge } from "@/app/components/StatusBadge";
import { AlertCircle, TrendingUp } from "lucide-react";

interface DrinkOrder {
  id: number;
  table: number;
  drink: string;
  specifications: string[];
  timeElapsed: number;
}

interface StockItem {
  name: string;
  emoji: string;
  current: number;
  max: number;
  status: "ok" | "low" | "critical";
}

const orders: DrinkOrder[] = [
  {
    id: 1,
    table: 7,
    drink: "Critical Hit Mojito",
    specifications: ["Hielo normal", "Extra menta", "Sin azúcar"],
    timeElapsed: 3
  },
  {
    id: 2,
    table: 14,
    drink: "Boss Fight Martini",
    specifications: ["Frozen", "Doble medida"],
    timeElapsed: 6
  },
  {
    id: 3,
    table: 9,
    drink: "Elixir Naranja",
    specifications: ["Hielo normal"],
    timeElapsed: 2
  },
];

const stockItems: StockItem[] = [
  { name: "Ron Blanco", emoji: "🥃", current: 2, max: 10, status: "critical" },
  { name: "Vodka Premium", emoji: "🍸", current: 4, max: 10, status: "low" },
  { name: "Tequila", emoji: "🌮", current: 7, max: 10, status: "ok" },
  { name: "Whisky", emoji: "🥃", current: 8, max: 10, status: "ok" },
  { name: "Vermut", emoji: "🍷", current: 3, max: 8, status: "low" },
  { name: "Granadina", emoji: "🍒", current: 1, max: 5, status: "critical" },
];

const topSales = [
  { name: "Critical Hit Mojito", count: 12 },
  { name: "Energy Boost", count: 9 },
  { name: "Boss Fight Martini", count: 7 },
  { name: "Poción de Maná", count: 6 },
];

export default function BarModule() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        MÓDULO DE BAR
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Cola de Pedidos
          </h2>

          {orders.map(order => {
            const isSlowOrder = order.timeElapsed > 5;

            return (
              <GlassCard
                key={order.id}
                glowColor={isSlowOrder ? "pink" : "blue"}
                className="p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-[rgba(240,240,255,0.6)]">Mesa</div>
                    <div
                      className="text-3xl"
                      style={{
                        fontFamily: 'Share Tech Mono, monospace',
                        color: '#3b82f6',
                        textShadow: '0 0 10px rgba(59,130,246,0.6)'
                      }}
                    >
                      #{order.table}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-2xl ${isSlowOrder ? "text-[#ef4444]" : "text-[#22d3ee]"}`}
                      style={{ fontFamily: 'Share Tech Mono, monospace' }}
                    >
                      {order.timeElapsed} min
                    </div>
                    {isSlowOrder && (
                      <div className="flex items-center gap-1 text-xs text-[#ef4444] mt-1">
                        <AlertCircle className="w-3 h-3" />
                        Lento
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {order.drink}
                </h3>

                <div className="mb-4">
                  <div className="text-xs text-[rgba(240,240,255,0.6)] mb-2">Especificaciones:</div>
                  <div className="flex flex-wrap gap-2">
                    {order.specifications.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[rgba(59,130,246,0.1)] border border-[#3b82f6] rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <NeonButton variant="success" className="flex-1">
                    LISTO
                  </NeonButton>
                  <NeonButton variant="danger" className="px-4">
                    ✕
                  </NeonButton>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <GlassCard glowColor="purple" className="p-6">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Control de Stock
            </h2>

            <div className="space-y-3">
              {stockItems.map((item, idx) => {
                const percentage = (item.current / item.max) * 100;

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <StatusBadge status={item.status}>
                        {item.status === "critical" ? "CRÍTICO" : item.status === "low" ? "BAJO" : "OK"}
                      </StatusBadge>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            item.status === "critical"
                              ? "bg-[#ef4444]"
                              : item.status === "low"
                              ? "bg-[#f59e0b]"
                              : "bg-[#10b981]"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span
                        className="text-xs"
                        style={{ fontFamily: 'Share Tech Mono, monospace' }}
                      >
                        {item.current}/{item.max}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard glowColor="cyan" className="p-6">
            <h2 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <TrendingUp className="w-5 h-5 text-[#22d3ee]" />
              Top Ventas Hoy
            </h2>

            <div className="space-y-3">
              {topSales.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, #a855f7, #3b82f6)`,
                        fontFamily: 'Share Tech Mono, monospace',
                        fontSize: '12px'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: '#f472b6',
                      textShadow: '0 0 10px rgba(244,114,182,0.5)'
                    }}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

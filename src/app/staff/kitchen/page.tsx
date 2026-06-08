"use client";

import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { Clock, AlertTriangle } from "lucide-react";

interface KitchenOrder {
  id: number;
  table: number;
  items: { name: string; quantity: number }[];
  allergyNotes?: string;
  timeElapsed: number;
  maxTime: number;
  status: "pending" | "preparing" | "ready";
}

const orders: KitchenOrder[] = [
  {
    id: 1,
    table: 5,
    items: [
      { name: "Pizza Gamer", quantity: 2 },
      { name: "Monster Burger", quantity: 1 }
    ],
    timeElapsed: 18,
    maxTime: 15,
    status: "pending"
  },
  {
    id: 2,
    table: 12,
    items: [
      { name: "Tacos Críticos", quantity: 3 }
    ],
    allergyNotes: "SIN CILANTRO - ALERGIA SEVERA",
    timeElapsed: 8,
    maxTime: 12,
    status: "preparing"
  },
  {
    id: 3,
    table: 3,
    items: [
      { name: "Monster Burger", quantity: 2 },
      { name: "Pizza Gamer", quantity: 1 }
    ],
    timeElapsed: 5,
    maxTime: 15,
    status: "preparing"
  },
];

const groupedQueue = {
  fryer: [
    { table: 5, item: "Papas Fritas" },
    { table: 12, item: "Aros de Cebolla" },
    { table: 18, item: "Papas Fritas" },
  ]
};

export default function KitchenModule() {
  const pendingCount = orders.filter(o => o.status === "pending").length;
  const preparingCount = orders.filter(o => o.status === "preparing").length;
  const completedToday = 18;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        MÓDULO DE COCINA
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard glowColor="purple" className="p-5 text-center">
          <div className="text-sm text-[rgba(240,240,255,0.6)] mb-2">Pendientes</div>
          <div
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#f59e0b',
              textShadow: '0 0 15px rgba(245,158,11,0.6)'
            }}
          >
            {pendingCount}
          </div>
        </GlassCard>

        <GlassCard glowColor="blue" className="p-5 text-center">
          <div className="text-sm text-[rgba(240,240,255,0.6)] mb-2">En Preparación</div>
          <div
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#3b82f6',
              textShadow: '0 0 15px rgba(59,130,246,0.6)'
            }}
          >
            {preparingCount}
          </div>
        </GlassCard>

        <GlassCard glowColor="cyan" className="p-5 text-center">
          <div className="text-sm text-[rgba(240,240,255,0.6)] mb-2">Listos Hoy</div>
          <div
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#10b981',
              textShadow: '0 0 15px rgba(16,185,129,0.6)'
            }}
          >
            {completedToday}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {orders.map(order => {
          const isOvertime = order.timeElapsed > order.maxTime;
          const timePercentage = (order.timeElapsed / order.maxTime) * 100;

          return (
            <GlassCard
              key={order.id}
              glowColor={isOvertime ? "pink" : order.status === "preparing" ? "blue" : "purple"}
              className="p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-[rgba(240,240,255,0.6)]">Mesa</div>
                  <div
                    className="text-2xl sm:text-3xl"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: '#a855f7',
                      textShadow: '0 0 10px rgba(168,85,247,0.6)'
                    }}
                  >
                    #{order.table}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span className={isOvertime ? "text-[#ef4444]" : ""}>
                      {order.timeElapsed} min
                    </span>
                  </div>
                  <div className="w-20 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOvertime ? "bg-[#ef4444]" : "bg-[#10b981]"
                      }`}
                      style={{ width: `${Math.min(timePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.08)]"
                  >
                    <span>{item.name}</span>
                    <span
                      className="font-bold"
                      style={{ fontFamily: 'Share Tech Mono, monospace', color: '#22d3ee' }}
                    >
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {order.allergyNotes && (
                <div className="bg-[#ef4444] border-2 border-[#dc2626] rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold mb-1">ALERTA DE ALERGIA</div>
                      <div className="text-sm">{order.allergyNotes}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {order.status === "pending" && (
                  <NeonButton variant="secondary" className="flex-1">
                    PREPARANDO
                  </NeonButton>
                )}
                {order.status === "preparing" && (
                  <>
                    <NeonButton variant="success" className="flex-1">
                      LISTO
                    </NeonButton>
                    <NeonButton variant="danger" className="px-4">
                      ✕
                    </NeonButton>
                  </>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard glowColor="purple" className="p-6">
        <h2 className="text-xl mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Cola Agrupada - Freidora
        </h2>
        <div className="space-y-2">
          {groupedQueue.fryer.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg p-3"
            >
              <span className="font-bold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                Mesa {item.table}
              </span>
              <span>{item.item}</span>
              <span className="text-[#f59e0b]">🍟</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

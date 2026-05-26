"use client";

import { useState } from "react";
import { GlassCard } from "../../components/GlassCard";
import { NeonButton } from "../../components/NeonButton";
import { Bell, Receipt, Clock, AlertCircle } from "lucide-react";

interface Table {
  id: number;
  status: "free" | "occupied" | "reserved";
  customers: number;
  waiter?: string;
}

interface Notification {
  id: number;
  table: number;
  type: "bill" | "ready" | "call" | "time";
  message: string;
  time: string;
}

const tables: Table[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: i % 5 === 0 ? "free" : i % 7 === 0 ? "reserved" : "occupied",
  customers: i % 3 === 0 ? 4 : i % 2 === 0 ? 2 : 6,
  waiter: i % 5 === 0 ? undefined : "Mesa"
}));

const notifications: Notification[] = [
  { id: 1, table: 7, type: "bill", message: "Solicita la cuenta", time: "Hace 2 min" },
  { id: 2, table: 12, type: "ready", message: "Pedido listo en cocina", time: "Hace 1 min" },
  { id: 3, table: 5, type: "call", message: "Llamado de mesero", time: "Hace 30 seg" },
  { id: 4, table: 18, type: "time", message: "Tiempo casi terminado", time: "Hace 5 min" },
];

export default function WaiterFloorMap() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const occupiedCount = tables.filter(t => t.status === "occupied").length;
  const freeCount = tables.filter(t => t.status === "free").length;
  const reservedCount = tables.filter(t => t.status === "reserved").length;

  const statusColors = {
    free: "bg-[#10b981] border-[#10b981]",
    occupied: "bg-[#ef4444] border-[#ef4444]",
    reserved: "bg-[#f59e0b] border-[#f59e0b]"
  };

  const notificationIcons = {
    bill: Receipt,
    ready: AlertCircle,
    call: Bell,
    time: Clock
  };

  const notificationColors = {
    bill: "#a855f7",
    ready: "#10b981",
    call: "#ef4444",
    time: "#f59e0b"
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        MAPA DEL SALÓN
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard glowColor="cyan" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Plano del Restaurante
              </h2>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-[rgba(240,240,255,0.6)]">Ocupadas: </span>
                  <span className="text-[#ef4444] font-bold">{occupiedCount}</span>
                </div>
                <div>
                  <span className="text-[rgba(240,240,255,0.6)]">Libres: </span>
                  <span className="text-[#10b981] font-bold">{freeCount}</span>
                </div>
                <div>
                  <span className="text-[rgba(240,240,255,0.6)]">Reservadas: </span>
                  <span className="text-[#f59e0b] font-bold">{reservedCount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#10b981] rounded"></div>
                <span>Libre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ef4444] rounded"></div>
                <span>Ocupada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
                <span>Reservada</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-6">
              {tables.map(table => (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table.id)}
                  className={`
                    aspect-square rounded-lg border-2 transition-all
                    flex flex-col items-center justify-center
                    ${statusColors[table.status]}
                    ${selectedTable === table.id ? "ring-4 ring-[#22d3ee] scale-110" : ""}
                    hover:scale-105
                  `}
                >
                  <div className="text-lg font-bold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {table.id}
                  </div>
                  {table.status === "occupied" && (
                    <div className="text-xs">👥 {table.customers}</div>
                  )}
                </button>
              ))}
            </div>

            {selectedTable && (
              <div className="bg-[rgba(34,211,238,0.1)] border border-[#22d3ee] rounded-lg p-4">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Mesa #{selectedTable}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <input
                    type="number"
                    placeholder="Nueva mesa"
                    className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-3 py-2 focus:border-[#22d3ee] focus:outline-none"
                  />
                  <NeonButton variant="secondary" className="w-full">
                    Transferir
                  </NeonButton>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <NeonButton variant="primary" className="text-sm py-2">
                    Pedido
                  </NeonButton>
                  <NeonButton variant="success" className="text-sm py-2">
                    Cuenta
                  </NeonButton>
                  <NeonButton variant="danger" className="text-sm py-2">
                    Liberar
                  </NeonButton>
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        <div>
          <GlassCard glowColor="purple" className="p-6">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Notificaciones Activas
            </h2>

            <div className="space-y-3">
              {notifications.map(notif => {
                const Icon = notificationIcons[notif.type];
                const color = notificationColors[notif.type];

                return (
                  <div
                    key={notif.id}
                    className="bg-[rgba(255,255,255,0.04)] border-l-4 rounded-lg p-3 transition-all hover:bg-[rgba(255,255,255,0.08)]"
                    style={{ borderColor: color }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="font-bold"
                            style={{ fontFamily: 'Share Tech Mono, monospace', color }}
                          >
                            Mesa {notif.table}
                          </span>
                          <span className="text-xs text-[rgba(240,240,255,0.5)]">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-sm text-[rgba(240,240,255,0.8)]">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <NeonButton variant="primary" className="w-full mt-4">
              Marcar Todas como Leídas
            </NeonButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

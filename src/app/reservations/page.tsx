"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { ArrowLeft } from "lucide-react";

interface Table {
  id: number;
  status: "free" | "occupied" | "reserved";
  capacity: number;
}

const tables: Table[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: i % 5 === 0 ? "occupied" : i % 7 === 0 ? "reserved" : "free",
  capacity: i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 2
}));

export default function Reservations() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    groupSize: "",
    estimatedTime: "",
    preferredGame: "",
    comments: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Reservación creada exitosamente!");
  };

  const statusColors = {
    free: "bg-[#10b981] border-[#10b981] hover:bg-[#059669]",
    occupied: "bg-[#ef4444] border-[#ef4444] cursor-not-allowed",
    reserved: "bg-[#f59e0b] border-[#f59e0b] cursor-not-allowed"
  };

  const freeTablesCount = tables.filter(t => t.status === "free").length;

  return (
    <div className="min-h-screen bg-[#050508] text-[#f0f0ff]">
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #a855f7 1px, transparent 1px),
            linear-gradient(to bottom, #a855f7 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#a855f7] hover:text-[#9333ea] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-4xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>RESERVACIONES</h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard glowColor="purple" className="p-6">
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Datos de Reservación
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                  placeholder="70123456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Fecha</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Hora</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Personas</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Tiempo Estimado</label>
                  <select
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="1h">1 hora</option>
                    <option value="2h">2 horas</option>
                    <option value="3h">3 horas</option>
                    <option value="4h+">4+ horas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Juego Preferido (opcional)</label>
                <input
                  type="text"
                  value={formData.preferredGame}
                  onChange={(e) => setFormData({ ...formData, preferredGame: e.target.value })}
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors"
                  placeholder="Ej: Catan, Carcassonne..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Comentarios</label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-4 py-2 focus:border-[#a855f7] focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Solicitudes especiales..."
                />
              </div>

              {selectedTable && (
                <div className="bg-[rgba(168,85,247,0.1)] border border-[#a855f7] rounded p-3">
                  <span className="text-sm">Mesa seleccionada: </span>
                  <span className="text-[#a855f7] font-bold">#{selectedTable}</span>
                </div>
              )}

              <NeonButton type="submit" variant="primary" className="w-full">
                Confirmar Reservación
              </NeonButton>
            </form>
          </GlassCard>

          <GlassCard glowColor="blue" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Mapa de Mesas
              </h2>
              <div className="text-sm">
                <span className="text-[rgba(240,240,255,0.6)]">Disponibles: </span>
                <span className="text-[#10b981] font-bold">{freeTablesCount}/20</span>
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

            <div className="grid grid-cols-5 gap-3">
              {tables.map(table => (
                <button
                  key={table.id}
                  onClick={() => table.status === "free" && setSelectedTable(table.id)}
                  disabled={table.status !== "free"}
                  className={`
                    aspect-square rounded-lg border-2 transition-all
                    flex flex-col items-center justify-center
                    ${statusColors[table.status]}
                    ${selectedTable === table.id ? "ring-4 ring-[#a855f7] scale-110" : ""}
                  `}
                >
                  <div className="text-lg font-bold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {table.id}
                  </div>
                  <div className="text-xs">{table.capacity}p</div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { Gamepad2, Users, Calendar } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050508] text-[#f0f0ff] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #a855f7 1px, transparent 1px),
            linear-gradient(to bottom, #a855f7 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#3b82f6] rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            MONSTER DOJO
          </h1>
        </div>
        <NeonButton onClick={() => router.push('/staff/login')} variant="secondary">
          Staff Login
        </NeonButton>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1
            className="text-7xl mb-6 tracking-widest"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)'
            }}
          >
            MONSTER DOJO
          </h1>
          <p className="text-2xl mb-12 text-[rgba(240,240,255,0.8)]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Gaming Restaurant &bull; La Paz, Bolivia
          </p>

          <div className="flex gap-4 justify-center">
            <NeonButton onClick={() => router.push('/games')} variant="primary">
              Ver Juegos
            </NeonButton>
            <NeonButton onClick={() => router.push('/reservations')} variant="secondary">
              Reservar Mesa
            </NeonButton>
            <NeonButton onClick={() => router.push('/menu')} variant="success">
              Ver Menú
            </NeonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <GlassCard glowColor="purple" className="p-6 text-center">
            <div className="text-5xl mb-2" style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#a855f7',
              textShadow: '0 0 15px rgba(168, 85, 247, 0.6)'
            }}>
              50+
            </div>
            <div className="text-lg text-[rgba(240,240,255,0.8)]">Juegos de Mesa</div>
          </GlassCard>

          <GlassCard glowColor="blue" className="p-6 text-center">
            <div className="text-5xl mb-2" style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#3b82f6',
              textShadow: '0 0 15px rgba(59, 130, 246, 0.6)'
            }}>
              20
            </div>
            <div className="text-lg text-[rgba(240,240,255,0.8)]">Mesas Disponibles</div>
          </GlassCard>

          <GlassCard glowColor="pink" className="p-6 text-center">
            <div className="text-5xl mb-2" style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#f472b6',
              textShadow: '0 0 15px rgba(244, 114, 182, 0.6)'
            }}>
              500+
            </div>
            <div className="text-lg text-[rgba(240,240,255,0.8)]">Jugadores al Mes</div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#a855f7] to-[#9333ea] rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>BIBLIOTECA ÉPICA</h3>
            <p className="text-[rgba(240,240,255,0.7)]">
              Estrategia, familiares, clásicos y más. Encuentra tu próximo juego favorito.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>ESPACIO PREMIUM</h3>
            <p className="text-[rgba(240,240,255,0.7)]">
              Mesas cómodas, ambiente gamer, perfecto para grupos y torneos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#f472b6] to-[#ec4899] rounded-lg flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>MENÚ GAMER</h3>
            <p className="text-[rgba(240,240,255,0.7)]">
              Snacks, bebidas y coctelería temática para potenciar tu experiencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

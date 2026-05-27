"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NeonButton } from "@/app/components/NeonButton";
import { Gamepad2, Users, Calendar, Menu, X } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-[#f0f0ff] relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#3b82f6] rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-6 h-6" />
          </div>
        </div>

        {/* Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-[#f0f0ff] hover:text-[#a855f7] transition-colors"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 bg-[rgba(10,0,21,0.95)] border-b border-[rgba(255,255,255,0.08)]">
          <button
            onClick={() => {
              router.push("/staff/login");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-[#f0f0ff] hover:text-[#3b82f6] transition-colors text-lg"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Staff Login
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-widest leading-tight"
            style={{
              fontFamily: "Orbitron, sans-serif",
              textShadow:
                "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)",
            }}
          >
            MONSTER DOJO
          </h1>

          <p
            className="text-xl sm:text-2xl mb-10 text-[rgba(240,240,255,0.8)]"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Gaming Restaurant &bull; La Paz, Bolivia
          </p>

          {/* Action buttons — stacked on mobile, horizontal on md+ */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-4 justify-center items-stretch md:items-center max-w-md md:max-w-none mx-auto">
            <NeonButton
              onClick={() => router.push("/games")}
              variant="primary"
              className="w-full md:w-auto px-8 py-4 text-lg"
            >
              Ver Juegos
            </NeonButton>
            <NeonButton
              onClick={() => router.push("/reservations")}
              variant="secondary"
              className="w-full md:w-auto px-8 py-4 text-lg"
            >
              Reservar Mesa
            </NeonButton>
            <NeonButton
              onClick={() => router.push("/menu")}
              variant="success"
              className="w-full md:w-auto px-8 py-4 text-lg"
            >
              Ver Menú
            </NeonButton>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16 md:mb-20">
          {/* Stat 1 — Purple */}
          <div className="p-6 text-center bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(168,85,247,0.3)] rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <div
              className="text-5xl mb-2"
              style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#a855f7",
                textShadow: "0 0 20px rgba(168, 85, 247, 0.7)",
              }}
            >
              50+
            </div>
            <div className="text-lg text-[rgba(240,240,255,0.8)]">
              Juegos de Mesa
            </div>
          </div>

          {/* Stat 2 — Blue */}
          <div className="p-6 text-center bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(59,130,246,0.3)] rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div
              className="text-5xl mb-2"
              style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#3b82f6",
                textShadow: "0 0 20px rgba(59, 130, 246, 0.7)",
              }}
            >
              20
            </div>
            <div className="text-lg text-[rgba(240,240,255,0.8)]">
              Mesas Disponibles
            </div>
          </div>

          {/* Stat 3 — Pink */}
          <div className="p-6 text-center bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(244,114,182,0.3)] rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(244,114,182,0.15)]">
            <div
              className="text-5xl mb-2"
              style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#f472b6",
                textShadow: "0 0 20px rgba(244, 114, 182, 0.7)",
              }}
            >
              500+
            </div>
            <div className="text-lg text-[rgba(240,240,255,0.8)]">
              Jugadores al Mes
            </div>
          </div>
        </div>

        {/* Features / Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Feature 1 — Purple icon */}
          <div className="text-center p-6 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:ring-2 hover:ring-[#a855f7]">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#a855f7] to-[#9333ea] rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h3
              className="text-xl mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              BIBLIOTECA ÉPICA
            </h3>
            <p className="text-[rgba(240,240,255,0.7)]">
              Estrategia, familiares, clásicos y más. Encuentra tu próximo juego
              favorito.
            </p>
          </div>

          {/* Feature 2 — Blue icon */}
          <div className="text-center p-6 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:ring-2 hover:ring-[#3b82f6]">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <h3
              className="text-xl mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              ESPACIO PREMIUM
            </h3>
            <p className="text-[rgba(240,240,255,0.7)]">
              Mesas cómodas, ambiente gamer, perfecto para grupos y torneos.
            </p>
          </div>

          {/* Feature 3 — Pink icon */}
          <div className="text-center p-6 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:ring-2 hover:ring-[#f472b6]">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#f472b6] to-[#ec4899] rounded-lg flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <h3
              className="text-xl mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              MENÚ GAMER
            </h3>
            <p className="text-[rgba(240,240,255,0.7)]">
              Snacks, bebidas y coctelería temática para potenciar tu
              experiencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

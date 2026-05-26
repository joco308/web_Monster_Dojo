"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { User, Lock } from "lucide-react";

interface Role {
  id: string;
  name: string;
  emoji: string;
  route: string;
  color: string;
}

const roles: Role[] = [
  { id: "admin", name: "Admin", emoji: "👑", route: "/staff/admin", color: "#a855f7" },
  { id: "bar", name: "Coctelería", emoji: "🍹", route: "/staff/bar", color: "#3b82f6" },
  { id: "waiter", name: "Mesero", emoji: "🗺️", route: "/staff/waiter", color: "#22d3ee" },
  { id: "kitchen", name: "Cocina", emoji: "🍳", route: "/staff/kitchen", color: "#f59e0b" },
];

export default function StaffLogin() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      router.push(role.route);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#f0f0ff] flex items-center justify-center relative overflow-hidden">
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

      <GlassCard glowColor="purple" className="w-full max-w-md p-8 relative z-10 mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            STAFF ACCESS
          </h1>
          <p className="text-sm text-[rgba(240,240,255,0.6)]">Selecciona tu rol para continuar</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${selectedRole === role.id
                  ? 'border-current shadow-[0_0_20px_currentColor]'
                  : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'
                }
              `}
              style={{ color: role.color }}
            >
              <div className="text-3xl mb-2">{role.emoji}</div>
              <div className="text-sm font-semibold text-[#f0f0ff]">{role.name}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(240,240,255,0.4)]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-10 py-2.5 focus:border-[#a855f7] focus:outline-none transition-colors"
                placeholder="usuario"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(240,240,255,0.4)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded px-10 py-2.5 focus:border-[#a855f7] focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <NeonButton
            type="submit"
            variant="primary"
            className="w-full"
          >
            Iniciar Sesión
          </NeonButton>
        </form>

        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <p className="text-xs text-center text-[rgba(240,240,255,0.4)] mb-2">
            Demo - Cualquier credencial funciona
          </p>
          <div className="text-xs text-center text-[rgba(240,240,255,0.3)]">
            <div>Usuario: admin / Contraseña: 1234</div>
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full mt-4 text-sm text-[#a855f7] hover:text-[#9333ea] transition-colors"
        >
          ← Volver al sitio público
        </button>
      </GlassCard>
    </div>
  );
}

"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Clock, LayoutDashboard, Utensils, Wine, Users, Gamepad2, Menu, X } from "lucide-react";

const navItems = [
  { path: "/staff/admin", label: "Dashboard", icon: LayoutDashboard, color: "#a855f7" },
  { path: "/staff/kitchen", label: "Cocina", icon: Utensils, color: "#f59e0b" },
  { path: "/staff/bar", label: "Bar", icon: Wine, color: "#3b82f6" },
  { path: "/staff/waiter", label: "Mesero", icon: Users, color: "#22d3ee" },
  { path: "/staff/games", label: "Juegos", icon: Gamepad2, color: "#f472b6" },
];

const roleMap: Record<string, string> = {
  admin: "Admin",
  kitchen: "Cocina",
  bar: "Coctelería",
  waiter: "Mesero",
  games: "Juegos",
};

export default function StaffLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("staff_role");
    if (!role) {
      router.push("/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  const currentRole = roleMap[pathname.split("/").pop() ?? ""] ?? "Staff";

  const currentTime = new Date().toLocaleTimeString("es-BO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-transparent text-[#f0f0ff] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-60
          md:static md:z-auto
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="bg-[rgba(255,255,255,0.02)] border-r border-[rgba(255,255,255,0.08)] flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[rgba(255,255,255,0.08)]">
            <div>
              <h1 className="text-xl tracking-wider" style={{ fontFamily: "Orbitron, sans-serif" }}>
                MONSTER DOJO
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-xs text-[rgba(240,240,255,0.6)]">{currentRole} &bull; Online</span>
              </div>
            </div>
            <button
              className="md:hidden text-[rgba(240,240,255,0.6)] hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2 text-sm text-[rgba(240,240,255,0.6)] mb-1">
              <Clock className="w-4 h-4" />
              <span>Hora Actual</span>
            </div>
            <div
              className="text-2xl"
              style={{ fontFamily: "Share Tech Mono, monospace", color: "#a855f7" }}
            >
              {currentTime}
            </div>
          </div>

          <nav className="flex-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => { router.push(item.path); setSidebarOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[rgba(168,85,247,0.2)] to-transparent border-l-4"
                        : "hover:bg-[rgba(255,255,255,0.04)]"
                    }
                  `}
                  style={isActive ? { borderColor: item.color } : {}}
                >
                  <Icon className="w-5 h-5" style={isActive ? { color: item.color } : {}} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
            <button
              onClick={() => { sessionStorage.removeItem("staff_role"); router.push("/login"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444] transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-auto relative z-10">
        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center p-2 border-b border-[rgba(255,255,255,0.08)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[rgba(240,240,255,0.6)] hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 text-sm font-semibold text-[rgba(240,240,255,0.6)]">
            {currentRole}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
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
  const [currentTime, setCurrentTime] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("staff_role");
    if (!role) {
      router.push("/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  useEffect(() => {
    const updateTime = () =>
      setCurrentTime(
        new Date().toLocaleTimeString("es-BO", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentRole = roleMap[pathname.split("/").pop() ?? ""] ?? "Staff";

  if (!authed) return null;

  return (
    <div className="min-h-dvh bg-background text-[#f0f0ff] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          lg:static lg:z-auto
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="bg-[#0a0a10] border-r border-white/10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
            <div>
              <h1 className="text-lg tracking-wider" style={{ fontFamily: "Orbitron, sans-serif" }}>
                MONSTER DOJO
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">{currentRole} &bull; Online</span>
              </div>
            </div>
            <button
              className="lg:hidden text-muted-foreground hover:text-white transition-colors"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Clock */}
          <div className="p-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
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

          {/* Navigation — scrollable */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-thin">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => { router.push(item.path); setSidebarOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    min-h-11 active:scale-[0.98]
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-900/40 to-transparent border-l-4 text-white"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }
                  `}
                  style={isActive ? { borderLeftColor: item.color } : {}}
                >
                  <Icon className="w-5 h-5 shrink-0" style={isActive ? { color: item.color } : {}} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-white/10 shrink-0">
            <button
              onClick={() => { sessionStorage.removeItem("staff_role"); router.push("/login"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-[#ef4444] hover:bg-red-500/10 transition-all min-h-11 active:scale-[0.98]"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile/tablet top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-2 border-b border-white/10 bg-background sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-muted-foreground hover:text-white transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-sm font-semibold text-muted-foreground">{currentRole}</span>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

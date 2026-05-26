import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { LogOut, Clock, LayoutDashboard, Utensils, Wine, Users, Gamepad2 } from "lucide-react";

interface StaffLayoutProps {
  children: ReactNode;
  role: string;
}

const navItems = [
  { path: "/staff/admin", label: "Dashboard", icon: LayoutDashboard, color: "#a855f7" },
  { path: "/staff/kitchen", label: "Cocina", icon: Utensils, color: "#f59e0b" },
  { path: "/staff/bar", label: "Bar", icon: Wine, color: "#3b82f6" },
  { path: "/staff/waiter", label: "Mesero", icon: Users, color: "#22d3ee" },
  { path: "/staff/games", label: "Juegos", icon: Gamepad2, color: "#f472b6" },
];

export function StaffLayout({ children, role }: StaffLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTime = new Date().toLocaleTimeString("es-BO", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="min-h-screen bg-[#050508] text-[#f0f0ff] flex">
      {/* Grid background */}
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

      {/* Sidebar */}
      <div className="w-60 bg-[rgba(255,255,255,0.02)] border-r border-[rgba(255,255,255,0.08)] flex flex-col relative z-10">
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
          <h1 className="text-xl tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            MONSTER DOJO
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
            <span className="text-xs text-[rgba(240,240,255,0.6)]">{role} • Online</span>
          </div>
        </div>

        {/* Clock Widget */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2 text-sm text-[rgba(240,240,255,0.6)] mb-1">
            <Clock className="w-4 h-4" />
            <span>Hora Actual</span>
          </div>
          <div className="text-2xl" style={{ fontFamily: 'Share Tech Mono, monospace', color: '#a855f7' }}>
            {currentTime}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all
                  ${isActive
                    ? 'bg-gradient-to-r from-[rgba(168,85,247,0.2)] to-transparent border-l-4'
                    : 'hover:bg-[rgba(255,255,255,0.04)]'
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

        {/* Logout */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
          <button
            onClick={() => navigate('/staff/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444] transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        {children}
      </div>
    </div>
  );
}

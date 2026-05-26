import { StaffLayout } from "../components/StaffLayout";
import { GlassCard } from "../components/GlassCard";
import { StatusBadge } from "../components/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, Users, ShoppingBag, Gamepad2, TrendingUp, AlertCircle } from "lucide-react";

const kpiData = [
  { label: "Ventas del Día", value: "Bs.2,840", icon: DollarSign, color: "#a855f7", change: "+12%" },
  { label: "Mesas Activas", value: "12/20", icon: Users, color: "#3b82f6", change: "60%" },
  { label: "Pedidos Pendientes", value: "4", icon: ShoppingBag, color: "#f59e0b", change: "-2" },
  { label: "Juegos Ocupados", value: "8/15", icon: Gamepad2, color: "#f472b6", change: "53%" },
  { label: "Clientes Hoy", value: "47", icon: TrendingUp, color: "#10b981", change: "+8" },
];

const liveOrders = [
  { id: 1, table: 5, items: "2x Pizza Gamer, 1x Energy Boost", status: "urgent", time: "5 min" },
  { id: 2, table: 12, items: "Critical Hit Mojito, Monster Burger", status: "preparing", time: "8 min" },
  { id: 3, table: 3, items: "3x Tacos Críticos", status: "ready", time: "12 min" },
  { id: 4, table: 18, items: "Boss Fight Martini, Elixir Naranja", status: "preparing", time: "3 min" },
];

const salesData = [
  { hour: "14:00", sales: 240 },
  { hour: "15:00", sales: 380 },
  { hour: "16:00", sales: 520 },
  { hour: "17:00", sales: 680 },
  { hour: "18:00", sales: 450 },
  { hour: "19:00", sales: 570 },
];

const alerts = [
  { id: 1, type: "critical", message: "Stock crítico: Ron Blanco (2 botellas)", icon: "🍾" },
  { id: 2, type: "warning", message: "Mesa 7: Tiempo de juego por vencer (5 min)", icon: "⏰" },
  { id: 3, type: "info", message: "Reservación próxima: Mesa 15 a las 19:30", icon: "📅" },
];

export function AdminDashboard() {
  return (
    <StaffLayout role="Admin">
      <div className="p-8">
        <h1 className="text-4xl mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          ADMIN DASHBOARD
        </h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <GlassCard key={index} glowColor="purple" className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}20`, border: `1px solid ${kpi.color}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-xs text-[#10b981]">{kpi.change}</span>
                </div>
                <div className="text-sm text-[rgba(240,240,255,0.6)] mb-1">{kpi.label}</div>
                <div
                  className="text-2xl"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    color: kpi.color,
                    textShadow: `0 0 10px ${kpi.color}60`
                  }}
                >
                  {kpi.value}
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Orders */}
          <GlassCard glowColor="blue" className="p-6 lg:col-span-1">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Pedidos en Vivo
            </h2>
            <div className="space-y-3">
              {liveOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                      Mesa {order.table}
                    </span>
                    <StatusBadge status={order.status as any}>
                      {order.status === "urgent" ? "URGENTE" : order.status === "preparing" ? "PREPARANDO" : "LISTO"}
                    </StatusBadge>
                  </div>
                  <p className="text-sm text-[rgba(240,240,255,0.7)] mb-2">{order.items}</p>
                  <div className="text-xs text-[rgba(240,240,255,0.5)]">Hace {order.time}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Sales Chart */}
          <GlassCard glowColor="purple" className="p-6 lg:col-span-2">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Ventas por Hora
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="hour"
                  stroke="rgba(240,240,255,0.5)"
                  style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '12px' }}
                />
                <YAxis
                  stroke="rgba(240,240,255,0.5)"
                  style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(168,85,247,0.5)',
                    borderRadius: '8px',
                    color: '#f0f0ff'
                  }}
                />
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Bar dataKey="sales" fill="url(#salesGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* System Alerts */}
        <GlassCard glowColor="cyan" className="p-6 mt-6">
          <h2 className="text-xl mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <AlertCircle className="w-5 h-5 text-[#22d3ee]" />
            Alertas del Sistema
          </h2>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border-l-4
                  ${alert.type === "critical" ? "bg-[rgba(239,68,68,0.1)] border-[#ef4444]" : ""}
                  ${alert.type === "warning" ? "bg-[rgba(245,158,11,0.1)] border-[#f59e0b]" : ""}
                  ${alert.type === "info" ? "bg-[rgba(34,211,238,0.1)] border-[#22d3ee]" : ""}
                `}
              >
                <span className="text-2xl">{alert.icon}</span>
                <span className="flex-1">{alert.message}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </StaffLayout>
  );
}

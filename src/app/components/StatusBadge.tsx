import { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  status: "available" | "occupied" | "reserved" | "urgent" | "preparing" | "ready" | "low" | "critical" | "ok";
  className?: string;
}

export function StatusBadge({ children, status, className = "" }: StatusBadgeProps) {
  const statusStyles = {
    available: "bg-[#10b981] border-[#10b981] text-white",
    occupied: "bg-[#ef4444] border-[#ef4444] text-white",
    reserved: "bg-[#f59e0b] border-[#f59e0b] text-white",
    urgent: "bg-[#ef4444] border-[#ef4444] text-white animate-pulse",
    preparing: "bg-[#f59e0b] border-[#f59e0b] text-white",
    ready: "bg-[#10b981] border-[#10b981] text-white",
    low: "bg-[#f59e0b] border-[#f59e0b] text-white",
    critical: "bg-[#ef4444] border-[#ef4444] text-white",
    ok: "bg-[#10b981] border-[#10b981] text-white",
  };

  return (
    <span
      className={`
        inline-block
        px-3 py-1
        rounded
        border
        ${statusStyles[status]}
        font-mono
        uppercase
        tracking-wider
        ${className}
      `}
      style={{ fontSize: "0.75rem" }}
    >
      {children}
    </span>
  );
}

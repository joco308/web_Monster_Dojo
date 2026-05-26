import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "purple" | "blue" | "pink" | "cyan";
}

export function GlassCard({ children, className = "", glowColor }: GlassCardProps) {
  const glowStyles = {
    purple: "border-t-[#a855f7]",
    blue: "border-t-[#3b82f6]",
    pink: "border-t-[#f472b6]",
    cyan: "border-t-[#22d3ee]",
  };

  return (
    <div
      className={`
        bg-[rgba(255,255,255,0.04)]
        border border-[rgba(255,255,255,0.08)]
        ${glowColor ? `border-t-2 ${glowStyles[glowColor]}` : ""}
        rounded-lg
        backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}

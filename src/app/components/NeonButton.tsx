import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  className?: string;
  type?: "button" | "submit";
}

export function NeonButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button"
}: NeonButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:from-[#9333ea] hover:to-[#7e22ce] shadow-[0_0_15px_rgba(168,85,247,0.5)]",
    secondary: "bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    success: "bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    danger: "bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] shadow-[0_0_15px_rgba(239,68,68,0.5)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-2.5
        ${variants[variant]}
        text-[#f0f0ff]
        transition-all
        duration-200
        clip-polygon
        ${className}
      `}
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
    >
      {children}
    </button>
  );
}

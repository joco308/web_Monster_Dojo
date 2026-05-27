import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Monster Dojo",
  description: "Gaming Restaurant • La Paz, Bolivia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="galaxy-bg">
          <div className="galaxy-stars" />
          <div className="galaxy-dust" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

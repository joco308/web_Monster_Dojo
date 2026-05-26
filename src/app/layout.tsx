import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Monster Dojo",
  description: "Gaming Restaurant • La Paz, Bolivia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

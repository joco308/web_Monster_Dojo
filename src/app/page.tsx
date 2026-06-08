"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { Gamepad2, Users, Calendar, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, cx: number, cy: number;
    let rafId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
    }

    function rng32(seed: number) {
      return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const r1 = rng32(42);
    const starLayers = [
      { count: 80, speed: 0.06, rMax: 0.8, aMax: 0.6, purple: 0.2, blue: 0.12, trail: false },
      { count: 70, speed: 0.18, rMax: 1.3, aMax: 0.85, purple: 0.3, blue: 0.12, trail: true },
      { count: 45, speed: 0.38, rMax: 2.2, aMax: 1.0, purple: 0.4, blue: 0.12, trail: true },
    ];
    const stars: {
      x: number; y: number; r: number; baseA: number;
      purple: boolean; blue: boolean;
      vx: number; vy: number;
      orbitR: number; orbitSpd: number; orbitPh: number;
      twinklePh: number; twinkleSpd: number;
      halo: boolean; haloColor: string;
      trail: boolean; tl: number;
    }[] = [];
    starLayers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = r1() * Math.PI * 2;
        stars.push({
          x: r1(), y: r1(),
          r: r1() * layer.rMax + 0.3,
          baseA: r1() * layer.aMax + 0.1,
          purple: r1() < layer.purple,
          blue: r1() < layer.blue,
          vx: Math.cos(angle) * layer.speed * (r1() * 0.8 + 0.4),
          vy: Math.sin(angle) * layer.speed * (r1() * 0.8 + 0.4),
          orbitR: r1() * 0.035 + 0.008,
          orbitSpd: r1() * 0.08 + 0.02,
          orbitPh: r1() * Math.PI * 2,
          twinklePh: r1() * Math.PI * 2,
          twinkleSpd: r1() * 0.9 + 0.2,
          halo: r1() < 0.10,
          haloColor: r1() < 0.5 ? "purple" : "blue",
          trail: layer.trail,
          tl: r1() * 0.5 + 0.3,
        });
      }
    });

    const r3 = rng32(13);
    const nebulae = Array.from({ length: 5 }, () => ({
      x: r3(), y: r3(),
      rx: r3() * 0.20 + 0.09,
      a: r3() * 0.08 + 0.025,
      color: r3() < 0.5 ? ([80, 30, 200] as const) : ([30, 10, 140] as const),
      speed: r3() * 0.014 + 0.005,
      phase: r3() * Math.PI * 2,
    }));

    const r4 = rng32(55);
    const meteors = Array.from({ length: 8 }, () => ({
      x: r4(), y: r4() * 0.7,
      angle: r4() * 0.5 + 0.1,
      len: r4() * 0.18 + 0.08,
      a: r4() * 0.9 + 0.4,
      period: r4() * 8 + 4,
      phase: r4() * Math.PI * 2,
    }));

    const r5 = rng32(77);
    const dust = Array.from({ length: 45 }, () => ({
      x: r5(), y: r5(),
      r: r5() * 1.1 + 0.3,
      a: r5() * 0.45 + 0.1,
      vx: (r5() - 0.5) * 0.00016,
      vy: -(r5() * 0.00014 + 0.00003),
      phase: r5() * Math.PI * 2,
      spd: r5() * 0.55 + 0.2,
    }));

    const r2 = rng32(99);
    const particles = Array.from({ length: 50 }, () => ({
      tFrac: r2(),
      offset: (r2() - 0.5) * 16,
      arm: r2() < 0.5 ? 0 : Math.PI,
      radius: r2() * 1.4 + 0.4,
      baseA: r2() * 0.65 + 0.2,
      speed: r2() * 0.002 + 0.0006,
      phase: r2() * Math.PI * 2,
    }));

    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);

      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.85);
      bg.addColorStop(0, "#1c0048");
      bg.addColorStop(0.35, "#130032");
      bg.addColorStop(0.7, "#09001a");
      bg.addColorStop(1, "#03000a");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      for (const n of nebulae) {
        const nx = (n.x + Math.sin(t * n.speed + n.phase) * 0.05) * W;
        const ny = (n.y + Math.cos(t * n.speed * 0.7 + n.phase) * 0.04) * H;
        const rx = n.rx * W;
        const grad = ctx!.createRadialGradient(nx, ny, 0, nx, ny, rx);
        const [cr, cg, cb] = n.color;
        const p = n.a * (0.7 + 0.3 * Math.sin(t * 0.3 + n.phase));
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${p})`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${p * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx!.fillStyle = grad;
        ctx!.fillRect(nx - rx, ny - rx, rx * 2, rx * 2);
      }

      const glowR = Math.min(W, H) * 0.17;
      const pulse = 0.22 + Math.sin(t * 0.45) * 0.04;
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, `rgba(110,55,230,${pulse})`);
      glow.addColorStop(0.55, `rgba(70,25,160,${pulse * 0.35})`);
      glow.addColorStop(1, "transparent");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, W, H);

      const fillPre = { purple: "rgba(210,175,255,", blue: "rgba(155,205,255,", white: "rgba(255,255,255," };
      const trailPre = { purple: "rgba(210,160,255,", white: "rgba(255,255,255," };
      const haloPre = { purple: "rgba(180,100,255,", blue: "rgba(100,160,255," };

      for (const s of stars) {
        const ox = s.orbitR * Math.cos(t * s.orbitSpd + s.orbitPh);
        const oy = s.orbitR * Math.sin(t * s.orbitSpd * 0.75 + s.orbitPh + 1.2);
        const raw_x = (((s.x + t * s.vx * 0.1 + ox) % 1) + 1) % 1;
        const raw_y = (((s.y + t * s.vy * 0.1 + oy) % 1) + 1) % 1;
        const sx = raw_x * W, sy = raw_y * H;
        const tw = Math.sin(t * s.twinkleSpd + s.twinklePh);
        const twinkle = s.baseA * (0.4 + 0.6 * tw);

        if (s.trail) {
          const tx = (((s.x + (t - s.tl) * s.vx * 0.1 + ox) % 1) + 1) % 1 * W;
          const ty = (((s.y + (t - s.tl) * s.vy * 0.1 + oy) % 1) + 1) % 1 * H;
          const tg = ctx!.createLinearGradient(tx, ty, sx, sy);
          tg.addColorStop(0, "transparent");
          tg.addColorStop(1, s.purple
            ? trailPre.purple + (twinkle * 0.7) + ")"
            : trailPre.white + (twinkle * 0.6) + ")");
          ctx!.beginPath();
          ctx!.moveTo(tx, ty);
          ctx!.lineTo(sx, sy);
          ctx!.strokeStyle = tg;
          ctx!.lineWidth = s.r * 0.8;
          ctx!.stroke();
        }

        if (s.halo) {
          const hc = s.haloColor === "purple"
            ? haloPre.purple + (twinkle * 0.45) + ")"
            : haloPre.blue + (twinkle * 0.4) + ")";
          const hg = ctx!.createRadialGradient(sx, sy, 0, sx, sy, s.r * 6);
          hg.addColorStop(0, hc);
          hg.addColorStop(1, "transparent");
          ctx!.fillStyle = hg;
          ctx!.beginPath();
          ctx!.arc(sx, sy, s.r * 6, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.purple
          ? fillPre.purple + twinkle + ")"
          : s.blue
            ? fillPre.blue + twinkle + ")"
            : fillPre.white + twinkle + ")";
        ctx!.fill();
      }

      for (const m of meteors) {
        const cycle = ((t / m.period + m.phase / (Math.PI * 2)) % 1);
        if (cycle > 0.09) continue;
        const progress = cycle / 0.09;
        const mx = (m.x + Math.cos(m.angle) * progress * m.len) * W;
        const my = (m.y + Math.sin(m.angle) * progress * m.len) * H;
        const tailX = (m.x + Math.cos(m.angle) * Math.max(0, progress - 0.35) * m.len) * W;
        const tailY = (m.y + Math.sin(m.angle) * Math.max(0, progress - 0.35) * m.len) * H;
        const fade = Math.sin(progress * Math.PI);
        const mg = ctx!.createLinearGradient(tailX, tailY, mx, my);
        mg.addColorStop(0, "transparent");
        mg.addColorStop(1, `rgba(225,205,255,${m.a * fade})`);
        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(mx, my);
        ctx!.strokeStyle = mg;
        ctx!.lineWidth = 1.5 * fade;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(mx, my, 2 * fade, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(245,235,255,${fade})`;
        ctx!.fill();
      }

      for (const d of dust) {
        const dx = (((d.x + t * d.vx * W + Math.sin(t * d.spd + d.phase) * 0.009) % 1) + 1) % 1 * W;
        const dy = (((d.y + t * d.vy * H) % 1) + 1) % 1 * H;
        const fa = d.a * (0.35 + 0.65 * Math.sin(t * d.spd * 1.6 + d.phase));
        ctx!.beginPath();
        ctx!.arc(dx, dy, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200,165,255,${fa})`;
        ctx!.fill();
      }

      const turns = 3.3, maxR = Math.min(W, H) * 0.50;
      const b = maxR / (turns * Math.PI * 2), steps = 1000, rot = t * 0.12;
      const passes = [
        { lw: 4.0, a: 0.08 },
        { lw: 2.2, a: 0.17 },
        { lw: 1.1, a: 0.46 },
        { lw: 0.45, a: 0.82 },
      ];

      [0, Math.PI].forEach((armOff, ai) => {
        for (const { lw, a } of passes) {
          ctx!.beginPath();
          for (let i = 0; i <= steps; i++) {
            const theta = (i / steps) * turns * Math.PI * 2;
            const ripple = 1 + 0.008 * Math.sin(theta * 3 - t * 1.2 + armOff);
            const r = b * theta * ripple;
            if (i === 0) {
              ctx!.moveTo(cx + r * Math.cos(theta + rot + armOff), cy + r * Math.sin(theta + rot + armOff));
            } else {
              ctx!.lineTo(cx + r * Math.cos(theta + rot + armOff), cy + r * Math.sin(theta + rot + armOff));
            }
          }
          ctx!.strokeStyle = `rgba(182,152,238,${ai === 0 ? a : a * 0.60})`;
          ctx!.lineWidth = lw;
          ctx!.lineCap = "round";
          ctx!.lineJoin = "round";
          ctx!.stroke();
        }
      });

      for (const p of particles) {
        const tFrac = (p.tFrac + t * p.speed) % 1;
        const theta = tFrac * turns * Math.PI * 2;
        const ripple = 1 + 0.008 * Math.sin(theta * 3 - t * 1.2 + p.arm);
        const r = b * theta * ripple + p.offset;
        const px = cx + r * Math.cos(theta + rot + p.arm);
        const py = cy + r * Math.sin(theta + rot + p.arm);
        const flicker = p.baseA * (0.5 + 0.5 * Math.sin(t * 1.8 + p.phase));
        ctx!.beginPath();
        ctx!.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(220,195,255,${flicker})`;
        ctx!.fill();
      }

      const cp = 0.7 + 0.15 * Math.sin(t * 1.0);
      const cg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 20);
      cg.addColorStop(0, `rgba(240,220,255,${cp})`);
      cg.addColorStop(0.4, "rgba(170,120,255,0.35)");
      cg.addColorStop(1, "transparent");
      ctx!.fillStyle = cg;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx!.fill();

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t * 0.18;
        const len = 12 + Math.sin(t * 0.9 + i) * 3;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx!.strokeStyle = `rgba(215,185,255,${0.22 + 0.1 * Math.sin(t * 1.1 + i)})`;
        ctx!.lineWidth = 0.7;
        ctx!.stroke();
      }

      rafId = requestAnimationFrame((ts) => frame(ts * 0.001));
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame((ts) => frame(ts * 0.001));

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`#spiral-bg{position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;display:block;}`}</style>
      <canvas ref={canvasRef} id="spiral-bg" />
      <div className="min-h-screen text-[#f0f0ff] relative overflow-hidden">
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#3b82f6] rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
          </div>
          <NeonButton onClick={() => router.push("/login")} variant="secondary">
            Staff Login
          </NeonButton>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <Image src="/logo.png" alt="logo imagen" width={500} height={500} className="mx-auto" />
            <p className="text-2xl mb-12 text-[rgba(240,240,255,0.8)]" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Gaming Restaurant &bull; La Paz, Bolivia
            </p>

            <div className="flex gap-4 justify-center">
              <button onClick={() => router.push("/games")}
                className="px-6 py-2.5 bg-black/20 border-2 border-[#a855f7] text-[#f0f0ff] font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,1)]">
                Ver Juegos
              </button>
              <button onClick={() => router.push("/reservations")}
                className="px-6 py-2.5 bg-black/20 border-2 border-[#a855f7] text-[#f0f0ff] font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,1)]">
                Reservar Mesa
              </button>
              <button onClick={() => router.push("/menu")}
                className="px-6 py-2.5 bg-black/20 border-2 border-[#a855f7] text-[#f0f0ff] font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,1)]">
                Ver Menú
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
            <GlassCard glowColor="purple" className="p-3 md:p-6 text-center">
              <div className="text-2xl md:text-5xl" style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#a855f7",
                textShadow: "0 0 15px rgba(168, 85, 247, 0.6)"
              }}>
                50+
              </div>
              <div className="text-[10px] md:text-lg text-[rgba(240,240,255,0.8)]">Juegos</div>
            </GlassCard>

            <GlassCard glowColor="blue" className="p-3 md:p-6 text-center">
              <div className="text-2xl md:text-5xl" style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#3b82f6",
                textShadow: "0 0 15px rgba(59, 130, 246, 0.6)"
              }}>
                20
              </div>
              <div className="text-[10px] md:text-lg text-[rgba(240,240,255,0.8)]">Mesas</div>
            </GlassCard>

            <GlassCard glowColor="pink" className="p-3 md:p-6 text-center">
              <div className="text-2xl md:text-5xl" style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#f472b6",
                textShadow: "0 0 15px rgba(244, 114, 182, 0.6)"
              }}>
                500+
              </div>
              <div className="text-[10px] md:text-lg text-[rgba(240,240,255,0.8)]">Jugadores</div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-20 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-gradient-to-br from-[#a855f7] to-[#9333ea] rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-[10px] md:text-xl leading-tight md:mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>BIBLIOTECA<br className="md:hidden" /> ÉPICA</h3>
              <p className="hidden md:block text-[rgba(240,240,255,0.7)]">
                Estrategia, familiares, clásicos y más. Encuentra tu próximo juego favorito.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-[10px] md:text-xl leading-tight md:mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>ESPACIO<br className="md:hidden" /> PREMIUM</h3>
              <p className="hidden md:block text-[rgba(240,240,255,0.7)]">
                Mesas cómodas, ambiente gamer, perfecto para grupos y torneos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-gradient-to-br from-[#f472b6] to-[#ec4899] rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-[10px] md:text-xl leading-tight md:mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>MENÚ<br className="md:hidden" /> GAMER</h3>
              <p className="hidden md:block text-[rgba(240,240,255,0.7)]">
                Snacks, bebidas y coctelería temática para potenciar tu experiencia.
              </p>
            </div>
          </div>

        </div>
          <footer className="relative z-10 border border-[rgba(255,255,255,0.08)] px-8 py-8 mt-20 bg-[#05000e]/90 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-sm uppercase tracking-widest mb-2" style={{ fontFamily: "Orbitron, sans-serif", color: "#a855f7" }}>
                  Contáctanos
                </h4>
                <a href="mailto:contacto@test.com" className="flex items-center gap-2 text-[rgba(240,240,255,0.7)] hover:text-[#a855f7] transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  contacto@dojomojo.bo
                </a>
              </div>
              <div className="flex items-center gap-6">
                <a href="https://facebook.com/test" target="_blank" rel="noopener noreferrer" className="text-[rgba(240,240,255,0.6)] hover:text-[#a855f7] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                </a>
                <a href="https://instagram.com/test" target="_blank" rel="noopener noreferrer" className="text-[rgba(240,240,255,0.6)] hover:text-[#a855f7] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center mt-6 text-xs text-[rgba(240,240,255,0.3)]">
              &copy; {new Date().getFullYear()} Dojo Mojo Gaming Restaurant. Todos los derechos reservados.
            </div>
          </footer>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/app/components/GlassCard";
import { NeonButton } from "@/app/components/NeonButton";
import { ArrowLeft, Plus, AlertTriangle } from "lucide-react";

interface MenuItem {
  id: number;
  emoji: string;
  name: string;
  description: string;
  ingredients: string;
  allergyWarning?: string;
  price: number;
  available: boolean;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    emoji: "🍕",
    name: "Pizza Gamer",
    description: "Pizza personal con pepperoni y queso extra",
    ingredients: "Masa artesanal, mozzarella, pepperoni, salsa especial",
    price: 35,
    available: true,
    category: "Snacks"
  },
  {
    id: 2,
    emoji: "🍔",
    name: "Monster Burger",
    description: "Hamburguesa doble con papas fritas",
    ingredients: "Carne angus, queso cheddar, tocino, lechuga, tomate",
    allergyWarning: "Contiene gluten y lácteos",
    price: 42,
    available: true,
    category: "Snacks"
  },
  {
    id: 3,
    emoji: "🌮",
    name: "Tacos Críticos",
    description: "Trio de tacos al pastor",
    ingredients: "Carne al pastor, cilantro, cebolla, piña",
    price: 28,
    available: false,
    category: "Snacks"
  },
  {
    id: 4,
    emoji: "🥤",
    name: "Energy Boost",
    description: "Bebida energética sabor frutas",
    ingredients: "Mix de frutas, cafeína, taurina",
    price: 15,
    available: true,
    category: "Bebidas"
  },
  {
    id: 5,
    emoji: "🧃",
    name: "Poción de Maná",
    description: "Limonada con menta fresca",
    ingredients: "Limón natural, menta, hielo, azúcar",
    price: 12,
    available: true,
    category: "Bebidas"
  },
  {
    id: 6,
    emoji: "🍺",
    name: "Cerveza Artesanal",
    description: "Cerveza local de la casa",
    ingredients: "Malta, lúpulo, levadura",
    price: 18,
    available: true,
    category: "Bebidas"
  },
  {
    id: 7,
    emoji: "🍹",
    name: "Critical Hit Mojito",
    description: "Mojito clásico con toque de frutos rojos",
    ingredients: "Ron blanco, menta, lima, frutos rojos, soda",
    price: 32,
    available: true,
    category: "Coctelería"
  },
  {
    id: 8,
    emoji: "🍸",
    name: "Boss Fight Martini",
    description: "Martini con vodka premium",
    ingredients: "Vodka premium, vermut seco, aceituna",
    price: 38,
    available: true,
    category: "Coctelería"
  },
  {
    id: 9,
    emoji: "🍊",
    name: "Elixir Naranja",
    description: "Cóctel tropical sin alcohol",
    ingredients: "Jugo de naranja, granadina, sprite, hielo",
    price: 22,
    available: true,
    category: "Coctelería"
  },
];

const categories = ["Snacks", "Bebidas", "Coctelería"];

export default function DigitalMenu() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Snacks");

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-[#f0f0ff]">
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#a855f7] hover:text-[#9333ea] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-4xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>MENÚ DIGITAL</h1>
          <div className="w-20" />
        </div>

        <div className="flex gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-8 py-3 rounded-lg transition-all
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-[#a855f7]'
                }
              `}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <GlassCard key={item.id} glowColor="purple" className="p-5 relative">
              {!item.available && (
                <div className="absolute inset-0 bg-[rgba(239,68,68,0.9)] rounded-lg flex items-center justify-center z-10">
                  <span
                    className="text-4xl tracking-widest"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      textShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    AGOTADO
                  </span>
                </div>
              )}

              <div className="text-5xl mb-3">{item.emoji}</div>

              <h3 className="text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {item.name}
              </h3>

              <p className="text-sm text-[rgba(240,240,255,0.8)] mb-3">
                {item.description}
              </p>

              <div className="text-xs text-[rgba(240,240,255,0.6)] mb-3">
                <span className="font-semibold">Ingredientes:</span> {item.ingredients}
              </div>

              {item.allergyWarning && (
                <div className="flex items-start gap-2 bg-[rgba(245,158,11,0.1)] border border-[#f59e0b] rounded p-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#f59e0b]">{item.allergyWarning}</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div>
                  <div
                    className="text-3xl"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      color: '#f472b6',
                      textShadow: '0 0 10px rgba(244, 114, 182, 0.5)'
                    }}
                  >
                    Bs.{item.price}
                  </div>
                </div>
                <button
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all"
                  disabled={!item.available}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

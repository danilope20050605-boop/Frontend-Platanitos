import { Flame, Home, Star, ChevronDown } from "lucide-react";

const categories = [
  { name: "Categorías", icon: null, hasArrow: true },
  { name: "Ofertas", icon: <Flame className="w-4 h-4 text-orange-500" /> },
  { name: "Mujeres", icon: "👩" },
  { name: "Hombres", icon: "👨" },
  { name: "Niñas", icon: "👧", hasArrow: true },
  { name: "Niños", icon: "👦", hasArrow: true },
  { name: "Hogar", icon: <Home className="w-4 h-4 text-gray-600" /> },
  { name: "Novedades", icon: <Star className="w-4 h-4 text-yellow-500" /> },
];

export function CategoriaBar() {
  return (
    <nav className="w-full bg-white border-b overflow-x-auto no-scrollbar">
      <div className="container mx-auto flex items-center justify-start md:justify-center gap-6 py-3 px-4">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap"
          >
            {cat.icon && <span>{cat.icon}</span>}
            <span>{cat.name}</span>
            {cat.hasArrow && <ChevronDown className="w-3 h-3 text-gray-400" />}
          </button>
        ))}
      </div>
    </nav>
  );
}

import { useLocation, Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Heart, ShoppingCart, User, LogOut } from "lucide-react"; 
import { useEffect, useState } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registro";

  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, [location]);

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    alert("Has cerrado sesión.");
    navigate("/");
  };

  return (
    <header className="w-full border-b bg-white p-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src="/logo-platanitos.png" alt="Logo" className="h-10" />
        </Link>

        {!isAuthPage && (
          <div className="relative flex-1 max-w-2xl">
            <Input
              placeholder="Busca lo que necesitas"
              className="w-full rounded-full bg-slate-100 pr-10 border-none h-11"
            />
            <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          </div>
        )}

        <div className="flex items-center gap-6 text-sm font-medium">
          {!isAuthPage && (
            <>
              <div className="flex flex-col items-center cursor-pointer">
                <Heart className="h-6 w-6" />
                <span className="text-[10px]">Favoritos</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-[10px]">Carrito</span>
              </div>
            </>
          )}

          {usuario ? (
            <button 
              onClick={handleCerrarSesion} 
              className="flex flex-col items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-6 w-6" />
              <span className="text-[10px] font-bold max-w-[65px] truncate">
                Salir ({usuario.nombres.split(" ")[0]})
              </span>
            </button>
          ) : (
            <Link to="/login" className="flex flex-col items-center">
              <User className="h-6 w-6" />
              <span className="text-[10px]">Cuenta</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

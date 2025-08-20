'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/icons/logoAzul.svg";
import polpaNet from "@/assets/icons/Polpa Net(1).svg";
import { CompanyNameTag } from "@/components/Auth/CompanyNameTag";
import Link from "next/link";
import logout from "@/assets/icons/logout-01.svg";
import { useRouter } from "next/navigation";
import { clearAuth, isTokenValid } from "@/utils/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Menu, X } from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const token = localStorage.getItem('token');

    if (!token || !isTokenValid(token)) {
      clearAuth();
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isClient]);

  if (!isClient || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-30">

      <header className="px-4 lg:px-[64px] xl:px-[140px] py-3 flex justify-between items-center h-19 text-preto-forelight border-b border-cinza-forelight bg-white relative">
        
        <nav className="flex gap-16 items-center">
          <Link className="flex gap-3.5 items-center" href="/">
            {/* <Image width={36} height={52} src={logo} alt="logo icon" /> */}
            <Image src={polpaNet} alt="Polpa Net logo" />
          </Link>
          <ul className="hidden lg:flex gap-10">
            <Link className="font-bold hover:translate-y-[2px] transition-all" href="/">Ofertas</Link>
            <Link className="font-bold hover:translate-y-[2px] transition-all" href="/oferta/create">Criar Oferta</Link>
            <Link className="font-bold hover:translate-y-[2px] transition-all" href="/config">Configurações</Link>
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <CompanyNameTag />
          <button
            onClick={handleLogout}
            className="px-2.5 cursor-pointer py-1.5 rounded-lg border border-cinza-forelight flex gap-2 font-bold text-preto-forelight items-center"
          >
            <Image src={logout} alt="logout icon" />
            Sair
          </button>
        </div>

        {/* Botão hamburguer mobile */}
        <button 
          className="lg:hidden p-2" 
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-cinza-forelight flex flex-col gap-4 p-4 shadow-lg lg:hidden z-50">
            <Link 
              className="font-bold" 
              href="/" 
              onClick={() => setMenuOpen(false)}
            >
              Oferta
            </Link>
            <Link 
              className="font-bold" 
              href="/oferta/create" 
              onClick={() => setMenuOpen(false)}
            >
              Criar Oferta
            </Link>
                        <Link 
              className="font-bold" 
              href="/user" 
              onClick={() => setMenuOpen(false)}
            >
              Ver Perfil
            </Link>
                        <Link 
              className="font-bold" 
              href="/config" 
              onClick={() => setMenuOpen(false)}
            >
              Configurações
            </Link>
            <div className="flex flex-col gap-4">
              <CompanyNameTag />
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-cinza-forelight flex gap-2 font-bold text-preto-forelight items-center"
              >
                <Image src={logout} alt="logout icon" />
                Sair
              </button>
            </div>
          </div>
        )}
      </header>
      </div>
      {/* Conteúdo */}
      <main className="px-4 lg:px-[64px] xl:px-[140px] inset-shadow-sm inset-shadow-[#cddbe2] bg-azul-lighter-forelight w-full py-11 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

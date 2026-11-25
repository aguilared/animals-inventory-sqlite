"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/compat/router";
import useUser from "../hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";

const links = [
  { href: "/animalss/ganados/live", label: "Ganado Vivos" },
  { href: "/animalss/animalsOwnersVacas", label: "Vacas" },
  { href: "/animalss/animalsMautesLives", label: "Mautes" },
  { href: "/animalss/animalsBestiasLives", label: "Bestias" },
  { href: "/animalss/animalsCarnerosLives", label: "Carneros" },
  { href: "/animalss/ganados/histo", label: "Ganado Historia" },
  { href: "/animalss/animals/live", label: "AnimalsVivos" },
  { href: "/animalss/animals/histo", label: "AnimalsHistoria" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isUser, clearUser } = useUser();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const logout = async () => {
    console.error("HaciendoLogout y isUser", isUser);
    try {
      await axios.get("/api/auth/logout");
      clearUser();
      setIsOpen(false);
      router.push("/");
      toast.success("You Are DesLoogeded");
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-700 rounded px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo y título */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center text-white shrink-0"
        >
          <Image
            src="/static/images/logo200.jpg"
            width={70}
            height={50}
            alt="Gonzalera Ranch Logo"
            style={{ objectFit: "cover" }}
            className="rounded"
          />
          <span className="ml-3 font-semibold text-lg sm:text-xl tracking-tight">
            Gonzalera Ranch - Inventorys
          </span>
        </Link>

        {/* Botón hamburguesa (visible en pantallas menores a lg) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Abrir o cerrar menú de navegación"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded text-gray-200 hover:text-white hover:bg-gray-600 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú horizontal en pantallas grandes */}
        <div className="hidden lg:flex lg:items-center lg:gap-4 text-sm">
          <Link
            href="/"
            className="text-white hover:text-teal-300 whitespace-nowrap"
          >
            Home
          </Link>

          {links.map(({ key, href, label }) => (
            <Link
              key={key}
              href={href}
              className="text-white hover:text-teal-300 whitespace-nowrap"
            >
              {label}
            </Link>
          ))}

          {isUser ? (
            <button
              onClick={logout}
              className="px-4 py-1.5 border rounded text-white border-white hover:border-teal-300 hover:text-teal-300 whitespace-nowrap"
            >
              LogOut
            </button>
          ) : (
            <Link
              href="/login/"
              className="px-4 py-1.5 border rounded text-white border-white hover:border-teal-300 hover:text-teal-300 whitespace-nowrap"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Drawer lateral derecho */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Fondo oscuro al hacer clic cierra el Drawer */}
          <div onClick={closeMenu} className="fixed inset-0 bg-black/50" />

          {/* Panel lateral */}
          <aside className="relative z-10 w-72 max-w-[80vw] bg-gray-800 h-full p-4 flex flex-col justify-between shadow-xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-700">
                <span className="font-semibold text-white text-base">
                  Gonzalera Ranch
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                  className="p-1.5 rounded text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col space-y-1 text-sm">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="py-1.5 px-2.5 rounded text-white hover:bg-gray-700"
                >
                  Home
                </Link>

                {links.map(({ key, href, label }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={closeMenu}
                    className="py-1.5 px-2.5 rounded text-white hover:bg-gray-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-gray-700">
              {isUser ? (
                <button
                  onClick={logout}
                  className="w-full text-center px-3 py-2 border rounded text-white border-white hover:bg-gray-700 text-sm"
                >
                  LogOut
                </button>
              ) : (
                <Link
                  href="/login/"
                  onClick={closeMenu}
                  className="block w-full text-center px-3 py-2 border rounded text-white border-white hover:bg-gray-700 text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

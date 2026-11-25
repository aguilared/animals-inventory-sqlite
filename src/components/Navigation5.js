"use client";
import { useState } from "react";
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

  return (
    <nav className="bg-gray-700 rounded px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo y título */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
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

        {/* Botón hamburguesa (visible solo en pantallas menores a lg) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Abrir o cerrar menú de navegación"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded text-gray-200 hover:text-white hover:bg-gray-600 focus:outline-none"
        >
          {isOpen ? (
            // Ícono X (cerrar)
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Ícono hamburguesa (abrir)
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
          )}
        </button>

        {/* Menú en pantallas grandes (lg y superiores) */}
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

      {/* Menú desplegable en pantallas pequeñas / medianas */}
      {isOpen && (
        <div className="lg:hidden mt-2 pt-2 border-t border-gray-600 flex flex-col space-y-0.5 text-sm">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="py-1 px-2 rounded text-white hover:bg-gray-600"
          >
            Home
          </Link>

          {links.map(({ key, href, label }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-1 px-2 rounded text-white hover:bg-gray-600"
            >
              {label}
            </Link>
          ))}

          <div className="pt-1.5">
            {isUser ? (
              <button
                onClick={logout}
                className="w-full text-center px-3 py-1.5 border rounded text-white border-white hover:bg-gray-600"
              >
                LogOut
              </button>
            ) : (
              <Link
                href="/login/"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-3 py-1.5 border rounded text-white border-white hover:bg-gray-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

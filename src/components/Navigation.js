"use client"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const links = [
  { href: "/animals/", label: "List" },
  { href: "/animals/admin", label: "Admin" },
  { href: "/animals/animalsCardOwners", label: "Historico" },
  { href: "/animals/animalsCardOwnersLive", label: "Live" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navigation = () => {
  const router = useRouter();
  const { isUser, loadUser, clearUser } = useUser(); //to Global

  const logout = async () => {
    console.error("HaciendoLogout y isUser", isUser);
    try {
      await axios.get("/api/auth/logout");
      clearUser();
      router.push("/");
      toast.success(" You Are DesLoogeded");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="flex rounded items-center justify-between flex-wrap bg-gray-700 p-2 py-1">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image
          src={"/static/images/logo.jpg"}
          width={70}
          height={50}
          alt=""
          style={{ objectFit: "cover" }}
        />

        <span className="sm:inline-block font-semibold text-xl tracking-tight">
          Gonzalera Ranch - Inventory
        </span>
      </div>

      <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="text-sm sm:flex-grow">
          <Link
            href="/"
            className="mt-4 sm:mt-0 text-white hover:text-white mr-4"
          >
            Home
          </Link>
          

          {links.map(({ key, href, label }) => (
            <Link
              key={key}
              href={href}
              className="mt-1 sm:mt-0 text-white hover:text-white mr-4"
            >
              {label}
            </Link>
          ))}
          {isUser ? (
            <button
              onClick={() => logout()}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
            >
              LogOut
            </button>
          ) : (
            <Link
              href="/login/"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

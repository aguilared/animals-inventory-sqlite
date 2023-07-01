import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/animals/", label: "List" },
  { href: "/animals/animalsCardOwners", label: "Select" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navigation = () => (
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
      </div>
    </div>
  </nav>
);

export default Navigation;

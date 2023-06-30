import Link from "next/link";

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
      <svg
        className="fill-current h-8 w-8 mr-2"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
      </svg>

      <span className="sm:inline-block font-semibold text-xl tracking-tight">
        Gonzalera Ranch - Animals Inventory
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

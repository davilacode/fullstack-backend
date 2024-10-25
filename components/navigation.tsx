"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { route: "/", name: "Dashboard" },
  { route: "/tracking", name: "Rastreo" },
  { route: "/send", name: "Enviar" },
]

const Navigation = () => {
  const pathname = usePathname();
  return ( 
    <ul className="flex gap-3">
      {routes.map(({ route, name }) => (
        <li key={route}>
          <Link href={route || "/"} className={pathname === route ? "active" : "" }>
            {name} 
          </Link>
        </li>
      ))}
    </ul>
   );
}
 
export default Navigation;
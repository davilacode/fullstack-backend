"use client"

import Link from "next/link";

const routes = [
  { route: "/", name: "Dashboard" },
  { route: "/tracking", name: "Rastreo" },
  { route: "/send", name: "Enviar" },
]

const Navigation = () => {
  return ( 
    <ul className="flex gap-3">
      {routes.map(({ route, name }) => (
        <li key={route}>
          <Link href={route || "/"}>
            {name} 
          </Link>
        </li>
      ))}
    </ul>
   );
}
 
export default Navigation;
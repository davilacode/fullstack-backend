import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Navigation from "@/components/navigation";

import Logo from "@/app/logo.svg";


export const Header = () => {
  return (
    <header className="py-2 shadow-md">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4">
        <nav className="flex items-center">
          <Link href="/" className="inline-flex items-center gap-4 me-4">
            <Image src={Logo} alt="Logo" width={80} />
            <h1 className="font-bold">Envío de paquetería</h1>
          </Link>
          <Navigation />
        </nav>
        <UserButton />
      </div>
    </header>
  );
}
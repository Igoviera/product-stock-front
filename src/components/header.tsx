"use client";

import Link from "next/link";
import { BadgePlus, ClipboardList, House, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white">
      <div className="h-16 flex items-center justify-between px-5">
        <Link href="/" className="text-2xl font-bold">
          Autoflex
        </Link>
        <nav className="hidden md:flex gap-4 font-medium">
          <Link
            href="/"
            className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
          >
            Página Inicial
          </Link>

          <Link
            href="/registered-product"
            className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
          >
            Produtos cadastrados
          </Link>

          <Link
            href="/raw-material"
            className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
          >
            Cadastrar Matéria Prima
          </Link>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-white text-black">
              <nav className="flex flex-col gap-4 mt-8 pl-5">
                <Link href="/">
                  <div className="flex gap-2">
                    <House /> Página Inicial
                  </div>
                </Link>
                <Link href="/registered-product">
                  <div className="flex gap-2">
                    <ClipboardList />
                    Produtos cadastrados
                  </div>
                </Link>
                <Link href="/raw-material">
                  <div className="flex gap-2">
                    <BadgePlus />
                    Cadastrar Matéria Prima
                  </div>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

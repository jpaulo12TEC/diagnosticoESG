import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 p-2 shadow-lg bg-gradient-to-r from-gray-800 via-gray-500 via-gray-300 to-gray-100 z-50 transition-all duration-300 hover:h-auto h-[60px]">
    <div className="px-4 flex justify-between items-center w-full">
  
      {/* Logo - sempre à esquerda */}
      <div className="flex justify-start mt-1">
        <Link href="/">
          <Image
            src="/12header.png"
            alt="Logo da 12TEC"
            width={90}
            height={50}
            priority
            className="cursor-pointer"
          />
        </Link>
      </div>
  
      {/* Título - centralizado, visível em telas maiores */}
    {/* Texto "Fale com consultor" centralizado */}
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
      <Link href="/resultado#consultor">
        <p className="text-white text-sm font-semibold font-montserrat tracking-wide cursor-pointer hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
          Fale com nosso consultor
        </p>
      </Link>
    </div>
  
      {/* Imagem + ComboBox - à direita */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
        >
          ☰
        </button>
  
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-900">
            <Link href="https://www.12tec.com.br" target="_blank" className="block px-4 py-2 hover:bg-gray-200">
              12TEC
            </Link>
            <Link href="https://esg.12tec.com.br" target="_blank" className="block px-4 py-2 hover:bg-gray-200">
              12TEC ESG
            </Link>
          </div>
        )}
      </div>
  
    </div>
  </header>
  
  );
}

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

return (
  <header className="
    fixed top-0 left-0 right-0 p-2
    bg-transparent
    z-50 transition-all duration-300 hover:h-auto h-[60px]
    backdrop-blur-sm border-b border-gray-400 
  ">
    <div className="px-4 flex justify-between items-center w-full">

      {/* Logo - sempre à esquerda */}
      <div className="flex justify-start mt-0">
        <Link href="/">
          <Image
            src="/12teclogo.svg"
            alt="Logo da 12TEC"
            width={150}
            height={50}
            priority
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Título - centralizado */}
      <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
        <h1 className="text-white text-xl sm:text-3xl font-extrabold italic font-montserrat tracking-wide">
          {/* Seu título */}
        </h1>
      </div>

      {/* Links diretos no header - sempre à direita */}
      <nav className="flex gap-6 text-green-800 font-montserrat font-semibold text-sm sm:text-base">
        <Link href="https://www.12tec.com.br" target="_blank" className="hover:underline">
          Site
        </Link>
        <Link href="https://esg.12tec.com.br" target="_blank" className="hover:underline">
          Sobre o ESG
        </Link>
          <Link href="https://esg.12tec.com.br" target="_blank" className="hover:underline">
          Fale conosco
        </Link>
      </nav>

    </div>
  </header>
);


}






// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
//       <div className="flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold">12TEC</Link>
//         <nav>
//           <Link href="/" className="mr-4 hover:text-gray-200">Início</Link>
//           <Link href="/formulario" className="mr-4 hover:text-gray-200">Formulário</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }
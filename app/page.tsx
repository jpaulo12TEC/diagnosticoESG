"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com"; // Importando a biblioteca
import Header from "../components/Header"; // Importando o Header
import { motion } from "framer-motion";


    // Evitar que localStorage seja acessado fora do ambiente do cliente
    if (typeof window !== "undefined") {
      localStorage.clear(); // Limpeza apenas no ambiente cliente
    }

export default function Home() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState(""); // Novo campo para telefone
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Para armazenar mensagens de erro
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  




  // ✅ Recupera a empresa apenas quando o componente é montado (evita erro no Next.js)
  useEffect(() => {
    const empresaSalva = localStorage.getItem("empresa");
    if (empresaSalva) {
      setEmpresa(empresaSalva);
      console.log(empresaSalva);
    }
  }, []);

  // ✅ Sempre que a empresa mudar, salva no localStorage
  useEffect(() => {
    if (empresa) {
      localStorage.setItem("empresa", empresa);
      console.log("Salvando empresa no localStorage:", empresa);
    }
  }, [empresa]);

  // ✅ Faz o mesmo para o nome
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nome");
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }
  }, []);

  useEffect(() => {
    if (nome) {
      localStorage.setItem("nome", nome);
    }
  }, [nome]);





  // Verifica se os campos estão preenchidos
  const isDisabled = nome.trim() === "" || email.trim() === "" || telefone.trim() === "" || 
  empresa.trim() === "";

  const handleSubmit = async () => {
    setLoading(true); // Inicia o carregamento

    const templateParams = {
      nome,
      email,
      telefone,
      empresa, // Adicionando nome da empresa
    };

    try {
      // Envia o e-mail com o EmailJS
      const response = await emailjs.send(
        "service_le3higp",
        "template_zfmnuvf",
        templateParams,
        "cIh-FjNPxiEs0Axze"
      );

      if (response.status === 200) {
     // Salva os dados no localStorage antes de redirecionar
      localStorage.setItem("nome", nome);
      localStorage.setItem("empresa", empresa);
        router.push("/formulario"); // Redireciona após sucesso
      } else {
        setError("Erro ao enviar o e-mail. Tente novamente.");
      }
    } catch (error) {
      setError("Erro ao enviar o e-mail. Tente novamente.");
      console.error("Erro ao enviar e-mail:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };






  const carrosselItens = [
    {
      id: 1,
      titulo: "Transforme seu ESG",
      descricao: "Soluções tecnológicas sob medida para evoluir seu desempenho ambiental, social e de governança.",
      imagem: "/carrossel1.jpg",
    },
    {
      id: 2,
      titulo: "Consultoria Especializada",
      descricao: "Especialistas que guiam sua empresa nas práticas mais avançadas de ESG.",
      imagem: "/carrossel2.jpg",
    },
    {
      id: 3,
      titulo: "Resultados Reais",
      descricao: "Acompanhamento de indicadores para demonstrar e potencializar resultados sustentáveis.",
      imagem: "/carrossel3.jpg",
    },
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);

const mudarSlide = (index: number) => {
  setIndiceAtual(index);
};













  
  return (


    
<div
className="min-h-screen bg-gradient-to-br from-gray-300 via-white to-green-100  flex flex-col items-center justify-start pt-20 sm:pt-0 p-0 space-y-10 sm:space-y-2 lg:space-y-5"

>

<Header /> {/* Usando o Header */}

{showIntro && (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in"
    onClick={() => setShowIntro(false)} // Fecha ao clicar fora
  >
    
    <div className="bg-opacity-60 flex relative items-center justify-center rounded-3xl p-10 animate-fade-in">

            {/* Botão de fechar dentro do modal */}
      <div className="absolute top-1 right-1 z-10">
        <button
          onClick={() => setShowIntro(false)}
          className="text-black bg-white hover:bg-red-700 hover:text-white rounded-full w-8 h-8 flex items-center justify-center text-xl shadow"
          aria-label="Fechar"
        >
          &times;
        </button>
      </div>



    {/* Modal principal */}
          <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >



      {/* Lado esquerdo: texto promocional ESG */}
      <div className="bg-gradient-to-br from-emerald-100 via-white to-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-emerald-900 mb-4 leading-snug">
          Transforme sua Gestão Documental<br />em Vantagem Competitiva ESG
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Uma má organização de documentos pode prejudicar seus indicadores ambientais, sociais e de governança. Com uma gestão eficaz, você fortalece a transparência e a credibilidade da sua empresa.
        </p>
        <p className="text-gray-700 text-base">
          Converse com um especialista e descubra como sua empresa pode avançar.
        </p>
      </div>
      
      {/* Lado direito: imagem de fundo com botão */}
      <div
        className="relative p-10 flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/People.jpg')" }}
      >
        <a
          href="https://wa.me/55799998870125?text=Olá!%20Tenho%20interesse%20em%20melhorar%20meu%20índice%20ESG%20com%20gestão%20documental."
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 flex items-center gap-3 bg-white text-emerald-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          <svg className="w-8 h-9" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20.52 3.48A11.938 11.938 0 0012.003 0C5.374 0 .007 5.367 0 12c0 2.114.555 4.173 1.607 5.993L0 24l6.15-1.607A11.94 11.94 0 0012.003 24C18.627 24 24 18.627 24 12c0-3.192-1.247-6.192-3.48-8.52zM12.003 21.82c-1.797 0-3.565-.49-5.107-1.41l-.364-.217-3.649.955.973-3.554-.237-.373C2.488 15.108 2 13.568 2 12c0-5.522 4.48-10.003 10.003-10.003 2.671 0 5.184 1.038 7.07 2.922 1.886 1.885 2.922 4.398 2.922 7.07 0 5.522-4.48 10.003-10.003 10.003zm5.316-7.444l-1.512-.762c-.203-.102-.44-.156-.673-.102-.2.049-.497.24-.683.444-.155.174-.273.38-.384.586-.138.26-.283.297-.517.198l-.187-.089a8.94 8.94 0 01-2.257-1.71 8.91 8.91 0 01-1.706-2.254c-.092-.178-.064-.38.096-.508.203-.174.406-.352.582-.544.19-.208.38-.41.557-.621.08-.096.146-.205.194-.32.089-.21.049-.426-.102-.624l-.76-1.507c-.133-.263-.282-.363-.522-.372l-.182-.008c-.45 0-.895.233-1.148.608-.275.405-.55.806-.818 1.213-.37.554-.542 1.163-.493 1.798.048.674.287 1.334.61 1.925.417.748.942 1.44 1.526 2.077.94 1.027 2.015 1.92 3.267 2.57.826.423 1.72.715 2.626.812.715.077 1.385-.077 1.956-.538.397-.319.79-.648 1.165-.994.313-.292.367-.715.185-1.13z"
            />
          </svg>
          Falar no WhatsApp
        </a>
      </div>
    </div>
    </div>
  </div>
)}





{/* Container Principal */}
{/* Container Principal */}
<div className="flex flex-col-reverse lg:flex-row w-full max-w-[1400px] mx-auto px-4  py-20  gap-10 flex-grow-0">
  {/* Lado Esquerdo - Texto e Serviços */}
  <div className="lg:w-1/2 mt-20">
  <h1 className="text-3xl tracking-wide sm:text-4xl lg:text-5xl font-montserrat font-normal text-green-900 leading-tight tracking-wider">
    12TEC Solutions  oferece <br />
    <span className="font-black">Consultoria</span> avançada, <br />
    forte e estratégica <br />
    em <span className="font-black">ESG</span>
  </h1>
  <p className="mt-4 text-gray-600 text-lg">
    Guiando decisões inteligentes para um futuro de sucesso e crescimento empresarial
  </p>

    {/* Serviços */}

{/* Serviços */}
<div className="w-full mt-10 p-6">
  <div className="flex items-center mb-8">
    <div className="flex-grow h-px bg-gray-300"></div>
    <h2 className="px-4 text-2xl font-semibold text-gray-700 whitespace-nowrap">
      Nossos serviços
    </h2>
    <div className="flex-grow h-px bg-gray-300"></div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
    {/* Diagnóstico ESG - 1/4 */}
    <a
      href="https://wa.me/55799998870125?text=Olá! Gostaria de saber mais sobre o Diagnóstico ESG da minha empresa."
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow p-6 hover:shadow-md transition flex items-center gap-4 min-h-[120px] cursor-pointer scale-95 opacity-80 hover:opacity-100 col-span-1"
    >
      <div>
        <h3 className="text-base font-semibold text-green-900 mb-1">Diagnóstico ESG</h3>
        <p className="text-gray-600 text-xs">
          Descubra o nível de maturidade ESG da sua empresa e se adeque as novas realidades do mercado.
        </p>
      </div>
    </a>

    {/* Gestão Documental - 2/4 */}
    <a
      href="https://wa.me/55799998870125?text=Olá! Tenho interesse em saber mais sobre as soluções de Gestão Documental."
      target="_blank"
      rel="noopener noreferrer"
      className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-[1.03] flex items-center gap-6 min-h-[200px] cursor-pointer overflow-hidden col-span-1 lg:col-span-2"
    >
      {/* Faixa de fundo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-100 to-emerald-200 rotate-2 scale-150 z-0"></div>

      {/* Selo PNG no canto superior direito */}
<img
  src="/Selo.png"
  alt="Selo"
  className="absolute top-0 right-0 w-10 h-10 z-10"
/>

      {/* Selo: + Procurado */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute top-2 left-2 z-10 bg-emerald-600 text-white mb-2 text-[10px] px-2 py-0.5 rounded-full shadow-sm font-semibold tracking-wider"
      >
        Recomendado
      </motion.div>

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-green-900 mt-3 mb-3">Gestão Documental</h3>
        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
          <li>Conformidade com portais corporativos</li>
          <li>Atendimento a requisitos de grandes contratantes</li>
          <li>Evite bloqueios e atrasos contratuais</li>
          <li>Atualização contínua de documentos</li>
          <li>Facilitamos sua aprovação em portais de fornecedores</li>
        </ul>
      </div>
    </a>

    {/* Soluções Ambientais - 1/4 */}
    <a
      href="https://wa.me/55799998870125?text=Olá! Gostaria de conversar sobre as Soluções Ambientais que vocês oferecem."
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex items-center gap-4 min-h-[120px] cursor-pointer scale-95 opacity-80 hover:opacity-100 col-span-1"
    >
      <div>
        <h3 className="text-base font-semibold text-green-900 mb-1">Soluções Ambientais</h3>
        <p className="text-gray-600 text-xs">
          Consultoria estratégica para atender às exigências ambientais com eficiência.
        </p>
      </div>
    </a>
  </div>
</div>


  </div>

  {/* Lado Direito - Formulário com sombra e responsividade */}
  <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl p-6 md:p-10">
    <div className="text-center">
      <p className="text-lg md:text-xl text-gray-600 mb-5 font-light">
        Antes de qualquer passo,
      </p>
      <p className="text-2xl text-green-900 font-semibold mb-5 mt-1">
        Que tal fazer um autodiagnóstico express?
      </p>
      <p className="text-sm md:text-base text-gray-500 mb-10 mt-3">
        Em menos de 5 minutos, você pode entender como se encontra a sua empresa e descobrir pontos que impactam diretamente nos seus indicadores ESG.
      </p>
    </div>

    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Nome da Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="tel"
        placeholder="Digite seu telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleSubmit}
        disabled={isDisabled || loading}
        className={`w-full py-3 mt-6 rounded-md text-white text-lg font-medium transition ${
          isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-800 hover:bg-green-900"
        }`}
      >
        {loading ? "Enviando..." : "Iniciar Diagnóstico Express"}
      </button>
    </div>
  </div>
</div>





      <a
  href="https://wa.me/55799998870125" // coloque seu número aqui
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
>
  <svg
    className="w-8 h-9"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.52 3.48A11.938 11.938 0 0012.003 0C5.374 0 .007 5.367 0 12c0 2.114.555 4.173 1.607 5.993L0 24l6.15-1.607A11.94 11.94 0 0012.003 24C18.627 24 24 18.627 24 12c0-3.192-1.247-6.192-3.48-8.52zM12.003 21.82c-1.797 0-3.565-.49-5.107-1.41l-.364-.217-3.649.955.973-3.554-.237-.373C2.488 15.108 2 13.568 2 12c0-5.522 4.48-10.003 10.003-10.003 2.671 0 5.184 1.038 7.07 2.922 1.886 1.885 2.922 4.398 2.922 7.07 0 5.522-4.48 10.003-10.003 10.003zm5.316-7.444l-1.512-.762c-.203-.102-.44-.156-.673-.102-.2.049-.497.24-.683.444-.155.174-.273.38-.384.586-.138.26-.283.297-.517.198l-.187-.089a8.94 8.94 0 01-2.257-1.71 8.91 8.91 0 01-1.706-2.254c-.092-.178-.064-.38.096-.508.203-.174.406-.352.582-.544.19-.208.38-.41.557-.621.08-.096.146-.205.194-.32.089-.21.049-.426-.102-.624l-.76-1.507c-.133-.263-.282-.363-.522-.372l-.182-.008c-.45 0-.895.233-1.148.608-.275.405-.55.806-.818 1.213-.37.554-.542 1.163-.493 1.798.048.674.287 1.334.61 1.925.417.748.942 1.44 1.526 2.077.94 1.027 2.015 1.92 3.267 2.57.826.423 1.72.715 2.626.812.715.077 1.385-.077 1.956-.538.397-.319.79-.648 1.165-.994.313-.292.367-.715.185-1.13z"
    />
  </svg>
</a>
    </div>
    
    

  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com"; // Importando a biblioteca
import Header from "../components/Header"; // Importando o Header


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

  return (
<div
className="min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-0 p-0 space-y-4 sm:space-y-2 lg:space-y-5"
style={{ backgroundImage: "url('/PapeldeparedeESG.jpg')" }}
>
<Header /> {/* Usando o Header */}

{/* Container Principal */}
<div className="bg-white p-1 rounded-lg shadow-lg w-full max-w-[1200px] sm:max-h-[800px] h-auto flex flex-col lg:flex-row gap-10 items-center overflow-y-auto justify-between relative">
  
  {/* Linha Separadora */}
<div className="lg:hidden md:block absolute left-0 right-0 top-1/2 w-full h-[3px] bg-gray-500"></div>
<div className="lg:block hidden absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-300"></div>


<div className="flex flex-col items-start w-full lg:w-1/2 gap-10 sm:gap-20 object-contain h-full sm:border-l-4 sm:border-gray-500 sm:rounded-l-lg p-4">
  <div className="flex-1 text-xl font-montserrat font-bold text-black mt-0">
    Descubra o Nível ESG da Sua Empresa
  </div>
  <p className="flex-1 text-gray-700 font-montserrat text-sm mt-1 leading-relaxed"> 
    Nosso Autodiagnóstico ESG é rápido e eficaz! Com apenas 12 perguntas, distribuídas nos pilares Ambiental, Social e Governança, você terá um panorama claro sobre a maturidade ESG da sua empresa. Ao final, um relatório personalizado indicará oportunidades de melhoria e próximos passos.
  </p>
  <p className="font-montserrat flex-1 text-gray-700 text-sm mt-2 mb-5 sm:mb-10">
    Preencha as informações para iniciar.
  </p>
</div>


  {/* Direita: Formulário */}
  <div className="flex flex-col w-full lg:w-1/2 gap-1 px-1">
    
  <img 
    src="12teclogo.svg" 
    alt="Descrição da imagem" 
    className="my-2 mx-auto hidden mb-10 lg:block" // Adicionando mx-auto para centralizar e ocultar em telas pequenas
    width={200}
    height={60}
  />

    <input
      type="text"
      placeholder="Digite seu nome"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
          <input
        type="text"
        placeholder="Nome da Empresa"
        value={empresa}
        onChange={(e) => {
          setEmpresa(e.target.value);
          console.log(empresa); // Verifique o valor do input
        }}
        className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    <input
      type="email"
      placeholder="Digite seu e-mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <input
      type="tel"
      placeholder="Digite seu telefone"
      value={telefone}
      onChange={(e) => setTelefone(e.target.value)}
      className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-7"
    />


{/* Botão separado da caixa */}
<button
  onClick={handleSubmit}
  disabled={isDisabled || loading}
  className={`px-20 py-3 mt-4 mb-10 rounded-md text-white ${
    isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-800 hover:bg-green-900"
  }`}
>
  {loading ? "Enviando..." : "Iniciar Diagnóstico"}
</button>
    </div>

  </div>


</div>

  );
}

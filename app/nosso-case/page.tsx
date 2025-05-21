"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com"; // Importando a biblioteca
import Header from "../../components/Header"; // Importando o Header
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
  className="min-h-screen bg-gradient-to-br from-gray-300 via-white to-green-100 flex flex-col items-center justify-start pt-20 sm:pt-0 p-0 space-y-10 sm:space-y-2 lg:space-y-5"
>
  <Header /> {/* Usando o Header */}

  <section className="max-w-4xl px-6 py-20  rounded-2xl  space-y-6 text-justify text-gray-800">
    <h2 className="text-3xl font-bold text-gray-800 text-center">De desafio à referência em gestão documental</h2>



<div className="flex justify-center">
  <img
    src="/dordecabeça.jpeg" // Substitua pelo caminho correto da sua imagem
    alt="Gestão Documental"
    className="w-full"
  />
</div>

<p>
  Há mais de seis anos, a <strong>12TEC Engenharia</strong> atua como prestadora de serviços para grandes empresas em
  segmentos estratégicos do país. Já participamos de projetos relevantes ao lado de gigantes como <strong>Mosaic Fertilizantes,
  ENEVA, GE, Nacional Gás</strong> e <strong>Vibra</strong>. Nossas soluções de engenharia são reconhecidas, mas o que pouca
  gente via — e o que realmente nos desafiava — era algo que acontecia longe dos olhos dos engenheiros: <strong>a gestão
  documental para trabalhar com essas empresas.</strong>
</p>

<p>
  Ser fornecedor de grandes corporações exige muito mais do que competência técnica. Exige estar em dia com um
  mar de documentos, certidões, treinamentos, políticas, normas de segurança, ambientais e trabalhistas.
  Plataformas como <em>SAP Ariba, Nimbi, Mercado Eletrônico</em> e outras se tornaram verdadeiros "gatekeepers" da operação,
  barrando qualquer empresa que não estivesse com a documentação 100% correta e atualizada. 
</p>

<p>
  No início, sentimos o peso dessa exigência. Documentos vencidos, uploads fora do padrão, falhas de entendimento
  das plataformas e uma quantidade crescente de exigências nos causaram atrasos, retrabalhos e até a suspensão
  temporária em contratos. Isso nos custou tempo, energia e oportunidades. Mas foi também o ponto de virada.
</p>

<p>
  Decidimos mudar. Reestruturamos nossa operação administrativa, estudamos os fluxos dessas plataformas, treinamos
  nossa equipe e desenvolvemos um sistema interno de controle e atualização contínua da documentação. O que antes
  era um pesadelo, se transformou em <strong>um dos nossos maiores diferenciais.</strong>
</p>

<p>
  Hoje, entregamos documentação com precisão cirúrgica. Sabemos exatamente o que cada plataforma exige,
  como os documentos devem ser apresentados, em que prazos, com quais padrões e quais são os erros que
  devem ser evitados. Esse know-how virou cultura interna — e agora estamos levando isso para o mercado.
</p>

<p>
  Com base nessa experiência real e transformadora, criamos uma frente especializada em <strong>consultoria de
  gestão documental para empresas terceirizadas</strong>. Nós sabemos que muitas empresas pequenas e médias
  enfrentam os mesmos desafios que tivemos, mas ainda não encontraram uma solução prática e eficiente.
</p>

<p>
  Nossa proposta é simples: <strong>você foca no seu serviço, e a 12TEC cuida da sua documentação.</strong>
  Seja para atender portais, evitar bloqueios, reduzir riscos ou simplesmente ganhar agilidade na aprovação,
  estamos prontos para ajudar.
</p>

<h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Por que a documentação ficou ainda mais importante?</h3>

<p>
  Nos últimos anos, o conceito de <strong>ESG — Environmental, Social and Governance</strong> deixou de ser tendência
  para se tornar padrão nas grandes corporações. As áreas de compras e compliance das empresas passaram
  a exigir que todos os seus fornecedores estivessem alinhados com práticas ambientais corretas, segurança
  do trabalho, responsabilidade social e governança ética.
</p>

<p>
  Isso significa que, além dos documentos básicos como CNPJ, contrato social e certidões negativas,
  agora também são solicitadas <strong>declarações ambientais, políticas de diversidade, comprovações de treinamentos
  de segurança, laudos atualizados e outros itens complexos</strong>. Empresas que não acompanham esse movimento
  simplesmente <em>ficam para trás</em>.
</p>

<p>
  A 12TEC entendeu cedo que o ESG não é um obstáculo, mas uma oportunidade. Dominamos os requisitos,
  sabemos como apresentar os documentos certos e, mais do que isso, ajudamos nossos clientes a se
  posicionarem como fornecedores confiáveis e alinhados com o que o mercado atual exige.
</p>

<p>
  Se a sua empresa quer continuar crescendo e atendendo grandes contratantes, <strong>a gestão documental
  estratégica não é mais uma opção — é um requisito essencial.</strong> E nós podemos guiar esse processo.
</p>

<div className="text-center mt-8">
  <a
    href="https://wa.me/5579998870125?text=Olá,%20gostaria%20de%20solicitar%20uma%20consultoria%20documental%20com%20a%2012TEC."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.52 3.48A11.89 11.89 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.64 6L0 24l6.29-1.65A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12a11.89 11.89 0 00-3.48-8.52zM12 22a9.93 9.93 0 01-5.1-1.38l-.36-.22-3.74.98.99-3.63-.23-.37A10 10 0 1122 12c0 5.52-4.48 10-10 10zm5.44-7.62c-.3-.15-1.77-.87-2.05-.97s-.48-.15-.68.15-.77.96-.94 1.15-.35.22-.65.07a8.11 8.11 0 01-2.38-1.47 8.93 8.93 0 01-1.64-2.03c-.17-.3 0-.46.13-.61.13-.13.3-.35.45-.52s.22-.3.33-.5a.56.56 0 000-.52c-.07-.15-.67-1.6-.92-2.18s-.48-.5-.67-.51h-.58a1.1 1.1 0 00-.8.38 3.32 3.32 0 00-1.04 2.48 5.78 5.78 0 001.22 3.01 13.15 13.15 0 005.12 4.69c.72.31 1.28.49 1.72.63a4.1 4.1 0 001.89.12 3.11 3.11 0 002.02-1.44 2.55 2.55 0 00.18-1.44c-.07-.14-.25-.22-.54-.37z" />
    </svg>
    Solicite uma consultoria no WhatsApp
  </a>
</div>


  </section>
</div>

    
    

  );
}

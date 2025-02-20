"use client"; // Coloque esta linha no início do seu arquivo

import { useState } from "react";
import Header from "../../components/Header"; // Importando o Header
import axios from 'axios';



interface OpenAIResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}


// Perguntas e suas opções de resposta
const questions = [
  {
    group: "Ambiental",  // Definindo o grupo
     question: "A empresa utiliza fontes de energia renovável?",
    options: [
      "Sim, 100%: A empresa utiliza exclusivamente fontes de energia renovável, como solar e eólica, em todas as suas operações.",
      "Sim, parcialmente: A empresa utiliza fontes renováveis, mas ainda depende de fontes não renováveis em parte de suas operações.",
      "Não, mas há planos: A empresa está implementando um plano para migrar gradualmente para fontes de energia renovável.",
      "Não, mas está em estudo: A empresa está avaliando a viabilidade de utilizar fontes renováveis, mas ainda não iniciou esse processo",
      "Não: A empresa atualmente não utiliza fontes de energia renovável"
    ],
    values: [5,4,3,2,1] // Valores associados às opções
    
  },
  {
    group: "Ambiental",  // Definindo o grupo
    question: "A empresa possui licença ambiental obrigatória?",
    options: ["Sim, todas as licenças estão em dia: A empresa possui todas as licenças ambientais necessárias e está conforme com as regulamentações.",
         "Sim, algumas licenças estão pendentes: A empresa possui algumas licenças, mas ainda está regularizando algumas pendências",
          "Não, mas está em processo de regularização: A empresa está trabalhando para obter as licenças ambientais necessárias",
           "Não, não possui licenças: A empresa não possui as licenças ambientais obrigatórias",
            "Não se aplica: A empresa não se enquadra nas exigências de licença ambiental"],
            values: [5,4,3,2,1]
  },
  {
    group: "Ambiental",  // Definindo o grupo
    question: "Existe um programa de redução e/ou reciclagem de resíduos?",
    options: ["Sim, existe um programa bem estruturado: A empresa implementou um programa formal de redução e reciclagem de resíduos, com resultados mensuráveis.",
         "Sim, mas é em fase de implementação: A empresa iniciou um programa de redução e reciclagem, mas ele ainda está em fase de desenvolvimento.",
          "Não, mas há planos para iniciar: A empresa está planejando implementar um programa de redução e reciclagem de resíduos",
           "SNão, não há programa: A empresa ainda não possui um programa de redução ou reciclagem de resíduos.",
            "Não se aplica: A empresa não gera resíduos ou não é relevante para suas operações."],
            values: [5,4,3,2,1]
  },
  {
    group: "Ambiental",  // Definindo o grupo
    question: "A empresa avaliou os riscos financeiros das questões climáticas nas suas operações?",
    options: ["Sim, avaliação contínua e integrada: A empresa realiza uma avaliação regular dos riscos financeiros climáticos, com ações claras para mitigação.",
         "Sim, mas em uma base esporádica: A empresa realiza avaliações ocasionais sobre os riscos financeiros, mas sem uma abordagem contínua.",
          "Não, mas está em andamento: A empresa está começando a avaliar os riscos climáticos financeiros, com planos em desenvolvimento.",
           "Não, ainda não avaliou: A empresa não realizou nenhuma avaliação dos riscos financeiros das questões climáticas até o momento.",
            "Não se aplica: A empresa não acredita que os riscos climáticos afetem suas operações financeiras."],
            values: [5,4,3,2,1]
  },
  
  
  {
    group: "Social",  // Definindo o grupo
    question: "A empresa possui política de prevenção de acidentes de trabalho?",
    options: ["Sim, existe uma política formalizada e eficaz: A empresa tem uma política robusta e comprovada para prevenir acidentes de trabalho, com treinamentos regulares.",
         "Sim, mas está sendo atualizada: A empresa possui uma política de prevenção, mas está em processo de revisão ou melhoria.",
          "Não, mas está em processo de implementação: A empresa está desenvolvendo uma política de prevenção de acidentes.",
           "Não, mas os funcionários são treinados: A empresa não tem uma política formal, mas realiza treinamentos esporádicos de prevenção de acidentes.",
            "Não se aplica: A empresa não possui operações que envolvem riscos de acidentes de trabalho."],
            values: [5,4,3,2,1]
  },
  {
    group: "Social",  // Definindo o grupo
    question: "A empresa mantém documentos legais relativos à saúde e segurança do trabalho?",
    options: ["Sim, todos os documentos estão atualizados: A empresa mantém todos os documentos legais de saúde e segurança em conformidade com as leis e está sempre atualizada.",
         "Sim, mas com algumas pendências: A empresa possui a maioria dos documentos, mas há pendências que estão sendo resolvidas.",
          "Não, mas está em processo de regularização: A empresa está trabalhando para obter e organizar todos os documentos legais necessários.",
           "Não, não mantém documentos: A empresa não mantém documentos legais relacionados à saúde e segurança do trabalho.",
            "Não se aplica: A empresa não se enquadra nas exigências legais de saúde e segurança do trabalho."],
            values: [5,4,3,2,1]
  },
  {
    group: "Social",  // Definindo o grupo
    question: "A empresa possui programas de promoção à saúde e qualidade de vida dos colaboradores?",
    options: ["Sim, programas abrangentes e regulares: A empresa possui uma série de programas e atividades para promover a saúde e qualidade de vida, como ginástica laboral e apoio psicológico.",
         "Sim, mas em menor escala: A empresa oferece programas básicos de promoção à saúde, como acompanhamento médico e campanhas de vacinação.",
          "Não, mas há planos para iniciar: A empresa está desenvolvendo iniciativas para implementar programas de saúde e bem-estar.",
           "Não, não existem programas: A empresa não possui programas específicos para promoção à saúde e qualidade de vida.",
            "Não se aplica: A empresa não considera necessário implementar programas de saúde e bem-estar."],
            values: [5,4,3,2,1]
  },
  {
    group: "Social",  // Definindo o grupo
    question: "A empresa possui um processo formalizado de integração de novos funcionários?",
    options: ["Sim, processo estruturado e documentado: A empresa possui um processo de integração bem estabelecido, com treinamento e acompanhamento para novos funcionários.",
         "Sim, mas informal: A empresa tem um processo de integração, mas não é formalmente estruturado.",
          "Não, mas está em desenvolvimento: A empresa está criando um processo formal de integração para novos funcionários.",
           "Não, não existe um processo formal: A empresa não possui um processo estruturado para integrar novos funcionários.",
            "Não se aplica: A empresa não possui novos funcionários ou não considera necessário um processo formal de integração."],
            values: [5,4,3,2,1]
  },
  {
    group: "Governança",  // Definindo o grupo
    question: "A empresa divulga informações sobre suas práticas ESG?",
    options: ["Sim, publicamente e de forma regular: A empresa compartilha periodicamente informações sobre suas práticas de ESG, incluindo relatórios anuais.",
         "Sim, mas esporadicamente: A empresa divulga informações sobre ESG, mas não de forma regular ou detalhada.",
          "Não, mas pretende começar a divulgar: A empresa está planejando iniciar a divulgação das práticas de ESG em breve.",
           "Não, não divulga informações sobre ESG: A empresa não divulga informações sobre suas práticas de ESG.",
            "Não se aplica: A empresa não tem práticas de ESG formalizadas para divulgar."],
            values: [5,4,3,2,1]
  },
  {
    group: "Governança",  // Definindo o grupo
    question: "A empresa possui um código de ética?",
    options: ["Sim, com normas claras e treinamento regular: A empresa possui um código de ética bem definido, com treinamentos e monitoramento de sua aplicação.",
         "Sim, mas está sendo revisado: A empresa possui um código de ética, mas está em processo de atualização.",
          "Não, mas está em desenvolvimento: A empresa está criando um código de ética que será implementado em breve.",
           "Não, não possui código de ética: A empresa não possui um código de ética formal.",
            "Não se aplica: A empresa não acredita que precise de um código de ética formal."],
            values: [5,4,3,2,1]
  },
  {
    group: "Governança",  // Definindo o grupo
    question: "A empresa possui programas de treinamento em ética para funcionários?",
    options: ["Sim, treinamentos regulares e obrigatórios: A empresa oferece programas contínuos e obrigatórios de treinamento em ética para todos os colaboradores.",
         "Sim, mas de forma esporádica: A empresa realiza treinamentos em ética, mas de forma não regular.",
          "Não, mas pretende começar a implementar: A empresa está planejando introduzir treinamentos em ética para seus funcionários.",
           "Não, não possui programas de treinamento em ética: A empresa não oferece treinamentos em ética.",
            "Não se aplica: A empresa não considera necessário oferecer treinamento em ética."],
            values: [5,4,3,2,1]
  },
  {
    group: "Governança",  // Definindo o grupo
    question: "A empresa possui sistema de gestão de riscos?",
    options: ["Sim, sistema formalizado e eficiente: A empresa possui um sistema robusto e formalizado para identificar e mitigar riscos em suas operações.",
         "Sim, mas de forma simplificada: A empresa tem um sistema básico de gestão de riscos, mas ainda não é completamente desenvolvido.",
          "Não, mas está em desenvolvimento: A empresa está implementando um sistema de gestão de riscos que será formalizado em breve.",
           "Não, não possui sistema de gestão de riscos: A empresa não possui um sistema formal para gestão de riscos.",
            "Não se aplica: A empresa não possui riscos que exigem um sistema de gestão formalizado."],
    values: [5,4,3,2,1]
  },

];



export default function Formulario() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // Armazenando valores numéricos
  const [groupSums, setGroupSums] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [progress, setProgress] = useState(0); // Estado para o progresso da barra de carregamento
  






  enum Group {
    group1 = 'group1',
    group2 = 'group2',
    group3 = 'group3',
  }

  const [showGroupCover, setShowGroupCover] = useState(true); // Estado para controlar a exibição da capa do grupo

  const groupImages: { [key in Group]: string } = {
    [Group.group1]: 'GrupoaMBIENTAL.svg',
    [Group.group2]: 'GrupoSocial.svg',
    [Group.group3]: 'GrupoGovernança.svg',
  };

  const getBackgroundColorForGroup = (group: string) => {
    console.log("Grupo:", group); // Verifique o valor de 'group'
    
    switch(group) {
      case "Ambiental":
        return " bg-[#C8FBA8] text-black";
      case "Social":
        return "bg-[#FFD696] text-black";
      case "Governança":
        return "bg-[#B0CDE8] text-black";
      default:
        return "bg-gray-300 text-black"; // Cor padrão
    }
    
  }

  // Definindo cores de fundo para cada grupo
  const groupBackgroundColors: { [key in Group]: string } = {
    [Group.group1]: "bg-[#193D02]", // Verde com 80% de opacidade
    [Group.group2]: "bg-[#79310A]",  // Verde claro para group2
    [Group.group3]: "bg-[#082239]", // Amarelo claro para group3
  };

  // Supondo que você tenha algum critério para determinar o grupo atual, por enquanto vamos alternar entre os grupos manualmente
  const currentGroup: Group = currentQuestion < 4 ? Group.group1 : 
                             currentQuestion < 8 ? Group.group2 : 
                             Group.group3;

  const welcomeImage = groupImages[currentGroup];  // Acessando a imagem corretamente

  const calculateTotalSum = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };





// Defina a interface para o formato do relatório gerado
interface GeneratedReport {
  [key: string]: string; // As chaves são os títulos das seções e os valores são os textos gerados para cada seção.
}

const generateReport = async (answers: string[], questions: { question: string }[]) => {
  setLoading(true);
  setProgress(0);

  const formattedResponses = questions.map((q, i) => ({
    question: q.question,
    response: answers[i] || "Não respondido",
  }));

  for (let i = 0; i <= 100; i++) {
    setProgress(i);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  const sections = [
    { title: "Introdução", words: 100 },
    { title: "Análise das respostas", words: 75 },
    { title: "Diagnóstico Geral", words: 200 },
    { title: "Recomendações", words: 75 },
    { title: "Conclusão", words: 75 },
  ];

  const prompts = sections.map(section => ({
    prompt: `
      Você é um especialista em ESG. Gere a seção "${section.title}" de um relatório baseado nas respostas fornecidas.
      **Perguntas e Respostas:**
      ${formattedResponses.map(q => `- **Pergunta:** ${q.question}\n  **Resposta:** ${q.response}`).join("\n\n")}
      **Diretrizes:**
      - Escreva aproximadamente ${section.words} palavras.
      - Se a seção for a de Introdução, servirá para falar um pouco do ESG e como ele gera retorno financeiro. Dê exemplos e coloque um percentual de quanto a empresa pode aumentar em faturamento a depender da nota dela.
      - Se a seção for a de Análise das respostas, irá verificar as respostas e (sem juízo de valor) fazer um resumo do que a empresa quis dizer.
      - Se a seção for a de Diagnóstico Geral, irá verificar as respostas e (com juízo de valor) fazer um resumo de como a empresa está nesse momento.
      - Se a seção for a de Recomendações, irá dar exemplos práticos do que fazer.
      - Mantenha um tom analítico e profissional.
      - Foque nos aspectos relevantes para ESG.
      - Tenha uma introdução do texto aleatória.
      - Evite falar "Com base nas respostas" ou "Considerando as respostas". Tente ser fluído.
    `
  }));

  try {
    const response = await axios.post<{ report: GeneratedReport }>("/api/generate-report", {
      prompts,  // Enviando os prompts como parte do corpo da requisição
    });

    const generatedReport = response.data.report;

    sections.forEach((section) => {
      localStorage.setItem(section.title, generatedReport[section.title] || "Resposta não disponível");
    });

    sections.forEach(section => {
      console.log(`${section.title}:`);
      console.log(localStorage.getItem(section.title));
      console.log("\n");
    });
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
  }
};

  









 

  // Função que lida com a navegação das perguntas
  const handleNext = async () => {
    if (showGroupCover) {
      setShowGroupCover(false);
    } else {
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);

        if (nextQuestion === 4 || nextQuestion === 8) {
          setShowGroupCover(true);
        }

       } else {
        // Calculando o total e somando os resultados
        const totalSum = calculateTotalSum();

        localStorage.setItem("somatorioTotal", JSON.stringify(totalSum));
        localStorage.setItem("somatorioGrupos", JSON.stringify(groupSums));
        localStorage.setItem("respostasPerguntas", JSON.stringify(answers));

        const stringAnswers = Object.values(answers).map(String);
        // Chamando a função para gerar o relatório ESG
        await generateReport(stringAnswers, questions);

        // Redireciona para a página de resultados
       window.location.href = "/resultado";
      }
    }
  };


    const handleAnswer = (index: number) => {
    const value = questions[currentQuestion].values[index];
    const group = questions[currentQuestion].group; // Pegando o grupo da pergunta atual

    
    
    // Atualiza as respostas do usuário
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion]: value }));
    
    // Atualiza o somatório por grupo
    setGroupSums((prevSums) => {
      const newSum = prevSums[group] ? prevSums[group] + value : value;
      return { ...prevSums, [group]: newSum } ;
    });
  };

  // Lógica para saber se estamos exibindo a "capa" ou a pergunta
  const isGroupCover = showGroupCover && (currentQuestion === 0 || questions[currentQuestion].group !== questions[currentQuestion - 1].group);

  return (
    <>
      {/* Se estiver carregando */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg">
            <p>Gerando Relatório...</p>
            <div className="w-full h-2 bg-gray-200 mt-3">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>{progress}%</p>
          </div>
        </div>
      )}
  
      <div
        className="min-h-screen flex flex-col items-center overflow-y-auto justify-center p-1 space-y-4 sm:space-y-2 md:space-y-4 lg:space-y-6"
        style={{ backgroundImage: 'url(PapeldeparedeESG.jpg)' }}
      >
        <Header /> {/* Usando o Header */}
  
        {/* Se for a "capa" do grupo, exibe a imagem */}
        {isGroupCover ? (
          <div className="p-1 rounded-lg w-full max-w-[1200px] sm:max-h-[800px] h-auto flex flex-col gap-10 items-center justify-between relative">
            <img
              src={welcomeImage}
              alt="Imagem de boas-vindas do grupo"
              className="max-w-full h-auto object-contain mb-6"
            />
            <button
              onClick={handleNext}
              className="bg-gray text-black font-bold px-12 py-2 rounded-md border border-gray-300 transition-all duration-150 hover:bg-gray-200 active:transform active:scale-95 w-[300px]"
            >
              Iniciar Perguntas
            </button>
          </div>
        ) : (
          // Se não for a "capa", exibe a pergunta
          <div
            className={`p-1 rounded-lg font-montserrat w-full max-w-[1200px] sm:max-h-[800px] h-auto flex flex-col gap-0 items-center overflow-y-auto justify-between relative ${groupBackgroundColors[currentGroup]}`}
            style={{
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              maxHeight: '75vh',
              zIndex: 1,
            }}
          >
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-montserrat text-white mb-4 mt-4 text-center">
            {questions[currentQuestion].question}
          </h1>
  
            {/* Exibindo as opções de resposta sem espaçamento entre elas */}
            <div className="w-full space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="w-full cursor-pointer">
                  <div
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 border-2 rounded-2g text-center transition-all duration-300 ${
                      answers[currentQuestion] === questions[currentQuestion].values[index]
                        ? getBackgroundColorForGroup(questions[currentQuestion].group) // Função que aplica a cor de acordo com o grupo
                        : 'bg-white text-black text-sm sm:text-base md:text-base lg:text-base xl:text-base font-montserrat border-gray-300'
                    }`}
                  >
                    {option}
                  </div>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === questions[currentQuestion].values[index]}
                    onChange={() => handleAnswer(index)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
  
        {/* Botão para avançar para a próxima pergunta ou finalização */}
        {!isGroupCover && (  // Botão de "Próxima" só aparece se não for a capa
          <button
            onClick={handleNext}
            className="bg-gray text-black font-bold px-12 py-2 rounded-md border border-gray-300 transition-all duration-150 hover:bg-gray-200 active:transform active:scale-95 w-[300px]"
          >
            {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar'}
          </button>
        )}
      </div>
    </>
  );
}   

"use client";
import { useEffect, useState, useMemo, useRef  } from "react";
import dynamic from "next/dynamic";
import HeaderResultado from "../../components/HeaderResultado";
import { ApexOptions } from "apexcharts";
import 'aos/dist/aos.css'; // Importando o CSS do AOS
import AOS from 'aos';
import PdfGenerator from "../../components/PdfGenerator";



const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Resultado() {
  const [groupSums, setGroupSums] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [totalSum, setTotalSum] = useState<number>(0);
  const [chatGptResponse1, setChatGptResponse1] = useState<string>("");
  const [chatGptResponse2, setChatGptResponse2] = useState<string>("");
  const [chatGptResponse3, setChatGptResponse3] = useState<string>("");
  const [chatGptResponse4, setChatGptResponse4] = useState<string>("");
  const [chatGptResponse5, setChatGptResponse5] = useState<string>("");


  // State to track if the question chart is in view
  const [isQuestionChartVisible, setIsQuestionChartVisible] = useState(false);
  // Reference for the question chart element
  const questionChartRef = useRef<HTMLDivElement | null>(null);

    // State to track if the question chart is in view
    const [isGroupChartDataVisible, setIsGroupChartDataVisible] = useState(false);
    // Reference for the question chart element
    const groupChartRef = useRef<HTMLDivElement | null>(null);






    
 // Referências para as imagens
 const img1Ref = useRef<HTMLImageElement | null>(null);
 const img2Ref = useRef<HTMLImageElement | null>(null);
 const img3Ref = useRef<HTMLImageElement | null>(null);

 // Inicializando AOS no useEffect
 useEffect(() => {
   AOS.init({
     once: false,
     duration: 2500,
     easing: 'ease-in-out',
   });
 });


 const [nome, setNome] = useState("");
 const [empresa, setEmpresa] = useState("");

 useEffect(() => {
  if (typeof window !== "undefined") {
    setNome(localStorage.getItem("nome") || "");
    setEmpresa(localStorage.getItem("empresa") || "");
  }
}, []);






 useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.length > 0) {
        const [entry] = entries;
        // Verifica se o gráfico entrou em vista
        if (entry.isIntersecting) {
          setIsGroupChartDataVisible(true); // Marca o gráfico como visível
        }
      }
    },
    { threshold: 0.5 } // Altere esse valor conforme necessário (0.5 significa 50% visível)
  );

  if (groupChartRef.current) {
    observer.observe(groupChartRef.current); // Começa a observar o gráfico
  }

  return () => {
    if (groupChartRef.current) {
      observer.unobserve(groupChartRef.current); // Limpeza do observer
    }
  };
}, []); // Este efeito só será executado uma vez ao montar o componente



useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // Verifica se o 'entries' contém algum valor
      if (entries.length > 0) {
        const [entry] = entries;
        // Garantir que entry possui a propriedade isIntersecting
        if (entry.isIntersecting) {
          setIsQuestionChartVisible(true); // Atualiza a visibilidade do gráfico
        }
      }
    },
    { threshold: 0.5 }
  );

  if (questionChartRef.current) {
    observer.observe(questionChartRef.current); // Começa a observar o gráfico
  }

  return () => {
    if (questionChartRef.current) {
      observer.unobserve(questionChartRef.current); // Limpeza do observer
    }
  };
}, []);



  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const somatorioTotal = JSON.parse(localStorage.getItem("somatorioTotal") || "0");
        const respostasSalvas = JSON.parse(localStorage.getItem("somatorioGrupos") || "{}") as Record<string, number>;
        const respostasPerguntas = JSON.parse(localStorage.getItem("respostasPerguntas") || "{}") as Record<number, number>;


// Resgatar as respostas ajustadas no localStorage
const esgIntroduction = localStorage.getItem("Introdução") || "Conexão com Internet BAD Runaway 3256#4";
const esgAnalysisPart1 = localStorage.getItem("Análise das respostas") || "Conexão com Internet BAD Runaway 3256#4";
const esgDiagnosis = localStorage.getItem("Diagnóstico Geral") || "Conexão com Internet BAD Runaway 3256#4";
const esgRecommendations = localStorage.getItem("Recomendações") || "Conexão com Internet BAD Runaway 3256#4";
const esgConclusion = localStorage.getItem("Conclusão") || "Conexão com Internet BAD Runaway 3256#4";

// Define os valores no estado ou onde você precisar utilizar os dados
setChatGptResponse1(esgIntroduction); // Adiciona o texto do ChatGPT do localStorage
setChatGptResponse2(esgAnalysisPart1); // Junta as 3 partes da Análise das Respostas
setChatGptResponse3(esgDiagnosis); // Adiciona o texto do ChatGPT do localStorage
setChatGptResponse4(esgRecommendations); // Adiciona o texto do ChatGPT do localStorage
setChatGptResponse5(esgConclusion); // Adiciona o texto do ChatGPT do localStorage



















        setTotalSum(somatorioTotal); // ✅ Agora carregamos o total corretamente
        if (Object.keys(respostasSalvas).length > 0) setGroupSums(respostasSalvas);
        if (Object.keys(respostasPerguntas).length > 0) setAnswers(respostasPerguntas);
        
      } catch (error) {
        console.error("Erro ao recuperar dados do localStorage:", error);
      }
    }
  }, []);

  // Valor total máximo (100%)
const valorTotalMaximo = 60;

// Transformando a soma em percentual
const percentual = ((totalSum / valorTotalMaximo) * 100).toFixed(1);













  // Gráfico esférico (Radial)
  const radialChartData = useMemo(() => {
    return {
      options: {
        chart: { type: "radialBar" as const, height: 800, width: 800,},
        plotOptions: {
          radialBar: {
            track: {
              background: "#f0f0f0", // Cor do fundo
              strokeWidth: "90%",
              margin: 20, // Remover a margem do track
            },
            dataLabels: {
              name: { fontSize: "0px", color: "#333", offsetY: -120, },
              value: { fontSize: "60px", color: "#333", offsetY: 7, },
            },
            hollow: {
              size: "45%", // Tamanho do buraco no centro
            },
          },
        },
        fill: { type: "gradient", gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#6a11cb", "#2575fc"], // Gradiente de cores
        },}, // Diversas cores para segmentos
        labels: ["Nível de Maturidade ESG"], // Rótulos extras
        stroke: {
          lineCap: "round", // Formato das bordas
        },
        animations: {
          enabled: true, // Ativa animação de preenchimento
          easing: "easeOutElastic",
          speed: 2500, // Tempo da animação
        },

      } as ApexOptions, // Garantindo que o tipo esteja correto
      series: [parseFloat(percentual)],  // Convertendo para número (não string)
    };
  }, [percentual]);


















  



  const hasGroupData = Object.keys(groupSums).length > 0;
  const hasAnswerData = Object.keys(answers).length > 0;

  const groupChartData = useMemo(() => {
    if (!hasGroupData) return null;
    return {
      options: {
        chart: {
          id: "bar-chart",
          animations: {
            enabled: true,
            easing: "easeout",
            speed: 500, // Tempo da animação
          },
        },
        xaxis: {
          categories: Object.keys(groupSums),
        },
        plotOptions: {
          bar: {
            distributed: true, // 🔥 Cada coluna com uma cor diferente
            borderRadius: 0, // Bordas arredondadas nas colunas
          },
        },
        colors: ["#143101", "#071E34", "#AE7A21"], // 🔥 Paleta de cores aleatórias para cada coluna
      },
      series: [
        {
          name: "Soma por Grupo",
          data: Object.values(groupSums),
        },
      ],
    };
  }, [groupSums]);


    

  const questionChartData = useMemo(() => {
    const colorGroups = [
      "#143101", // Cor para o primeiro grupo
      "#AE7A21", // Cor para o segundo grupo
      "#071E34", // Cor para o terceiro grupo
    ];
  
    // Gerar um array de cores para as barras com base no grupo de 4
    const colorArray = Object.values(answers).map((_, index) => colorGroups[Math.floor(index / 4) % colorGroups.length]);
  
    return {
      options: {
        chart: {
          id: "horizontal-bar",
          toolbar: {
            show: true,
          },
          background: '#ffffff',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1000,
            animateGradually: {
              enabled: true,
              delay: 300,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            }
          }
        },
        xaxis: {
          categories: Object.keys(answers).map(q => `Pergunta ${q}`),
          title: {
            text: "",
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
            }
          },
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'normal',
            },
          },
        },
        yaxis: {
          title: {
            text: "",
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
            }
          },
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'normal',
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: true, // Gráfico horizontal
            borderRadius: 0, // Arredondamento das bordas
            dataLabels: {
              position: "top", // Rótulos no topo das barras
            },
            columnWidth: '100%', // Largura das barras
            barHeight: '70%', // Ajuste na altura das barras
            distributed: true, // Distribui as barras com mais espaçamento
          }
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'],
          }
        },
        grid: {
          show: true,
          borderColor: '#e0e0e0',
          strokeDashArray: 8,
          xaxis: {
            lines: { show: false },
          },
          yaxis: {
            lines: { show: false },
          },
        },
        colors: colorArray, // Atribuir as cores para as barras
        tooltip: {
          theme: 'dark',
          x: {
            show: true,
          },
          y: {
            formatter: (val: number) => `${val} `,
            style: {
              fontSize: '14px',
              fontWeight: 'normal',
              color: '#ffffff',
            }
          },
          style: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
            color: '#ffffff',
          }
        },
        legend: {
          show: false,
        }
      },
      series: [{ name: "Respostas", data: Object.values(answers) }],
    };
  }, [answers]);
  
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mensagem formatada
    const message = `Olá, meu nome é ${name} e sou da empresa ${company}.`;

    // Codificar a mensagem para garantir que espaços e caracteres especiais funcionem na URL
    const encodedMessage = encodeURIComponent(message);

    // Construção do link para WhatsApp com a mensagem codificada
    const whatsappLink = `https://wa.me/5579998870125?text=${encodedMessage}`;

    // Redirecionar para o WhatsApp
    window.open(whatsappLink, '_blank');
  };







  const contentRef = useRef<HTMLDivElement | null>(null);






  const [dataHoraAtual, setDataHoraAtual] = useState({
    data: "",
    hora: "",
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      const now = new Date();
      const data = now.toLocaleDateString("pt-BR"); // Formato dd/mm/yyyy
      const hora = now.toLocaleTimeString("pt-BR"); // Formato hh:mm:ss
      setDataHoraAtual({ data, hora });
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar
  }, []);

 

    

    return (
      
      <div className="min-h-screen flex flex-col items-center overflow-y-auto justify-center p-0">
      <HeaderResultado /> {/* Usando o Header */}
      
      <div  className="flex flex-col mt-0 items-center justify-start min-h-screen w-full bg-gray-100 p-0 sm:p-6 mb-10">
      {/* Botão para gerar o PDF */}
      
  
      <PdfGenerator contentRef={contentRef} fileName="relatorio_resultado.pdf">
  <div ref={contentRef} className="flex-col items-center justify-start bg-gradient-to-r from-green-900/20 via-green-900/40 to-green-900/50 shadow-lg rounded-lg p-1 sm:p-6 mt-5 sm:mt-20  w-[100%] border border-gray-300">
  
    <div className="w-full flex mx-auto sm:hidden items-center justify-between">
      <h1 className="text-xs sm:text-sm md:text-base text-gray-700 mb-1 font-montserrat">
        Relatório desenvolvido pela 12TEC Engenharia
      </h1>
      
      <img 
        src="/12teclogo.svg" 
        alt="Imagem ilustrativa" 
        className="w-[20%] h-auto max-h-[400px] mb-1 object-contain"
      />


    </div>

    <div className="flex shadow-lg p-0 mt-0 w-[100%] h-[100%] border border-gray-300">
      <div className="w-full flex p-1 sm:p-5 flex-col mx-auto">
        <h1 className="mt-5 text-2xl sm:text-4xl md:text-5xl text-center sm:text-start italic font-extrabold text-gray-700 mb-1 sm:mb-6 font-montserrat">
          AUTODIAGNÓSTICO ESG
        </h1>
        <p className="text-xs sm:text-sm md:text-2xl text-center sm:text-start text-gray-700 mb-10 sm:mb-20 font-montserrat">
          <strong>Objetivo:</strong> Análise de práticas de sustentabilidade e governança corporativa aplicadas na empresa.
        </p>
        <p className="text-xs sm:text-sm md:text-xl  text-gray-700 mb-0 font-montserrat">
          <strong>Empresa:</strong> {empresa}
        </p>
        <p className="text-xs sm:text-sm md:text-xl text-gray-700 mb-0 font-montserrat">
          <strong>Solicitado por:</strong> {nome}
        </p>

        <p className="text-xs sm:text-sm md:text-xl text-gray-700 mb-0 font-montserrat">
        <strong>Relatório criado em:</strong> {dataHoraAtual.data}
      </p>
      <p className="text-xs sm:text-sm md:text-xl text-gray-700 mb-10 font-montserrat">
        <strong>Hora:</strong> {dataHoraAtual.hora}
      </p>
      </div>

      <div className="w-full hidden sm:flex md:flex flex-col items-end justify-start text-right mt-20 ">
      <h1 className="text-xs sm:text-sm md:text-xl text-gray-700 font-montserrat mr-6">
        Relatório desenvolvido pela 12TEC Engenharia
      </h1>
        <img 
          src="/12teclogo.svg" 
          alt="Imagem ilustrativa" 
          className="w-28 sm:w-30 md:w-40 mr-2 mt-4 object-contain"
        />
      </div>
    </div>

    {/* Gráfico radial e introdução em um card */}
    <div className="flex flex-col p-0 lg:flex-row mb-0 border border-gray-300">
      {radialChartData ? (
        <div className="w-full lg:w-1/4 h-auto flex items-center justify-center p-1 bg-white">
          <Chart
            options={radialChartData.options}
            series={radialChartData.series}
            type="radialBar"
            height={450} // Gráfico menor
            width={450}
          />
        </div>
      ) : null}

      <div className="flex-1 p-4 bg-white w-full lg:w-3/4 h-auto">
        <h3 className="text-3xl text-left font-montserrat text-gray-700 mb-10 mt-1">
          NÍVEL DE MATURIDADE EM ESG
        </h3>
        
        <p className="text-gray-500 text-justify font-montserrat text-xl  leading-loose">{chatGptResponse1}</p>
      </div>
    </div>

    {/* Análise ocupa toda a largura */}
    <div className="w-full p-4 bg-white mt-0">
      <h3 className="text-3xl text-left font-montserrat text-gray-700 mb-10 mt-1">ANÁLISE DAS RESPOSTAS</h3>
      <p className="text-gray-500 text-justify font-montserrat text-xl  leading-loose">{chatGptResponse2}</p>
      <p className="text-gray-500 text-justify font-montserrat text-xl  leading-loose mt-10">Segue abaixo o gráfico com as respostas para cada pergunta e sua pontuação:</p>
    </div>

    <div className="flex w-full p-0 gap-0 bg-white">
      {/* Lado Esquerdo - Gráfico */}
      <div ref={questionChartRef} className="w-4/5 mb-0 p-1 bg-white">
        {isQuestionChartVisible && questionChartData && hasAnswerData ? (
          <Chart
            options={questionChartData!.options}
            series={questionChartData!.series}
            type="bar"
            height={780}
          />
        ) : (
          <p className="text-gray-500 text-center">
            Nenhuma resposta disponível para as perguntas.
          </p>
        )}
      </div>

      {/* Lado Direito - Imagens Empilhadas */}
      <div className="hidden sm:flex w-1/5 h-[688] mt-5 flex-col justify-between items-center gap-4">
        <img 
          ref={img1Ref} 
          src="/GrupoaMBIENTAL.svg" 
          alt="Imagem 1" 
          className="flex-grow object-contain rounded-lg p-1 h-1/3 w-full" 
          data-aos="fade-up" 
          data-aos-delay="300" 
        />
        <img 
          ref={img2Ref} 
          src="/GrupoSocial.svg" 
          alt="Imagem 2" 
          className="flex-grow object-contain rounded-lg p-1 h-1/3 w-full" 
          data-aos="fade-up" 
          data-aos-delay="300" 
        />
        <img 
          ref={img3Ref} 
          src="/GrupoGovernança.svg" 
          alt="Imagem 3" 
          className="flex-grow object-contain rounded-lg p-1 h-1/3  w-full" 
          data-aos="fade-up" 
          data-aos-delay="300" 
        />
      </div>
    </div>

   

    {/* Diagnóstico */}
    <div className="w-[full] p-4 bg-white mt-0 border border-gray-300">
    <h3 className="text-3xl text-left font-montserrat text-gray-700 mb-10 mt-1">DIAGNÓSTICO GERAL</h3>
      <p className="text-gray-500 text-justify font-montserrat text-xl  leading-loose">{chatGptResponse3}</p>
      <p className="text-gray-500 text-justify font-montserrat text-xl mb-10 mt-10  leading-loose">Segue abaixo o gráfico com as respostas para cada pilar (Ambiental, Social e Governança) e sua pontuação:</p>
    </div>

    {/* Gráfico de Somatório por Grupo */}
    <div ref={groupChartRef} className="mb-0 mt-0 bg-white p-1 border border-gray-300">
      {isGroupChartDataVisible && groupChartData && hasGroupData ? (
        <>
          <Chart 
            options={groupChartData!.options} 
            series={groupChartData!.series} 
            type="bar" 
            height={700} 
          />
        </>
      ) : (
        <p className="text-gray-500 text-center">Nenhuma resposta disponível para o somatório por grupo.</p>
      )}
    </div>

    {/* Recomendações */}
    <div className="w-full p-4 bg-white mt-0 ">
    <h3 className="text-3xl text-left font-montserrat text-gray-700 mb-10 mt-1">Recomendações</h3>
      <p className="text-gray-500 text-justify font-montserrat text-xl  leading-loose">{chatGptResponse4}</p>
    </div>

    {/* Conclusão */}
    <div className="w-full h-auto p-4 bg-white mt-0 ">
      <h3 className="text-3xl text-left font-montserrat text-gray-700 mb-10 mt-1">Conclusão</h3>
      <p className="text-gray-500 text-justify font-montserrat text-xl  leading-loose ">{chatGptResponse5}</p>
    </div>

    
  </div>
  </PdfGenerator>



</div>

<div className="w-full flex justify-center items-center text-gray-800 g-10 px-1 sm:px-10 ">
 
<div id="consultor" className="w-[1500px] h-auto sm:flex flex-col sm:flex-row justify-content g-10 sm:p-10 p-2 text-left sm:space-x-10 space-y-4 sm:space-y-0">
    
    
    {/* Div esquerda */}


    <div className="w-full sm:w-2/5 justify-between  p-0 sm:p-10 mx-auto sm:ml-20">
  <h2 className="text-4xl font-bold font-montserrat mb-10 text-center sm:text-left">
    Reduza os riscos e maximize os lucros.
  </h2>
  <p className="mb-10 sm:mb-4 items-center font-montserrat text-2xl text-center sm:text-left">
    Conte com nossa Consultoria ESG para realizar o diagnóstico, planejamento estratégico, implantação, monitoramento e relatório de sustentabilidade.
  </p>
</div>

    {/* Div direita - Formulário */}
    <div className="w-full sm:w-2/5 p-8 sm:p-12 text-center h-full bg-white rounded-lg shadow-xl">
  <h3 className="text-2xl font-semibold mb-8 text-gray-800 font-montserrat">Fale com um Consultor</h3>
  <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-6">
    <div className="w-full max-w-md">
      <input 
        type="text" 
        id="name" 
        name="name" 
        className="w-full p-4 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
        placeholder="Seu nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required 
      />
    </div>
    <div className="w-full max-w-md">
      <input 
        type="text" 
        id="company" 
        name="company" 
        className="w-full p-4 rounded-md border-2 border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
        placeholder="Nome da sua empresa"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required 
      />
    </div>
    <div className="text-center mt-6 w-full max-w-md">
      <button 
        type="submit" 
        className="bg-gray-800 text-white py-3 px-8 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
        Enviar para WhatsApp
      </button>
    </div>
  </form>

      
    </div>
    
  </div>
</div>


<div className=" bg-gray-800 w-full text-white p-4 text-center mt-auto">
 
    <p className="elementor-heading-title elementor-size-default">
      Todos os direitos reservados © 12 Tec Engenharia - 2025
    </p>




</div>

</div>




            )
            
        
  }
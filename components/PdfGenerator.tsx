import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PdfGeneratorProps {
  children: React.ReactNode;
  fileName?: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ children, fileName = "DiagnosticoESG.pdf", contentRef}) => {
  const generatePDF = () => {
   

    if (!contentRef.current) return;
    // Adiciona a classe para forçar a cor preta
    contentRef.current?.classList.add("pdf-mode");

    html2canvas(contentRef.current, {
      useCORS: true,
      logging: false,
      
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      contentRef.current?.classList.remove("pdf-mode");

      const pageHeight = pdf.internal.pageSize.height;
      let yOffset = 0; // Inicializa o offset de posição
      let pageCount = 1; // Contador de páginas
      // Adiciona a primeira página
      
      pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);

      // Verifica se o conteúdo ultrapassou o limite da página e adiciona novas páginas
      let remainingHeight = imgHeight;
      while (remainingHeight > pageHeight) {
        // Se o conteúdo exceder o tamanho da página, cria uma nova página
        pdf.addPage();
        yOffset = -297 * pageCount; // Reinicia o offset na nova página
        pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight); // Adiciona a imagem na nova página
        remainingHeight -= pageHeight; // Subtrai a altura que já foi adicionada
        pageCount ++;
      }
      
      pdf.save("DiagnosticoESG - 12TEC.pdf");
    
      
    });
    
  };

  return (
    <>

      {children}    
      <button onClick={generatePDF} className="mt-5 mb-0 btn-download flex flex-col items-center space-y-2">
  <img 
    src="/PDF.png" 
    alt="Baixar PDF" 
    className="h-10 w-10 transition-transform transform hover:scale-125 hover:rotate-12 duration-300 ease-in-out"
  /> {/* Ícone com animação */}
  <span className="sm:inline font-montserrat text-sm font-bold">Baixar Relatório PDF</span> {/* Texto abaixo do ícone */}
</button>   
    </>
  );
};

export default PdfGenerator;

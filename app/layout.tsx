import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head"; // Importando Head do Next.js
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "12TEC | Diagnóstico ESG - Ambiental, Social e Governamental",
  description: "A 12TEC oferece diagnósticos especializados em ESG (ambiental, social e governamental) para ajudar empresas a se alinharem às melhores práticas sustentáveis.",
  keywords: "Diagnóstico ESG, Ambiental, Social, Governamental, Sustentabilidade, 12TEC, Consultoria ESG, Avaliação ESG",
  authors: [
    {
      name: "12TEC",  // Nome do autor
      url: "https://diagnosticoesg.com.br",  // URL opcional do autor ou da organização
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        {/* Título da Página */}
        <title>{metadata.title}</title>

        {/* Descrição da Página */}
        <meta name="description" content={metadata.description} />

        {/* Palavras-chave para SEO */}
        <meta name="keywords" content={metadata.keywords} />

        {/* Tag para permitir indexação do Google */}
        <meta name="robots" content="index, follow" />

        {/* Definindo a língua do conteúdo */}
        <meta httpEquiv="Content-Language" content="pt-BR" />

        {/* Charset da página */}
        <meta charSet="UTF-8" />

        {/* Open Graph para redes sociais */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/path/to/your/og-image.jpg" /> {/* Altere para a URL da imagem */}
        <meta property="og:url" content="https://diagnosticoesg.com.br" />
        <meta property="og:site_name" content="12TEC" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/path/to/your/twitter-image.jpg" /> {/* Altere para a URL da imagem */}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* SEO para dispositivos móveis */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Corpo do Layout */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

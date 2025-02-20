import axios from "axios";

export async function POST(req) {
  const { prompts } = await req.json(); // Recebe o array de prompts

  try {
    // Enviando todos os prompts para a API OpenAI
    const responses = await Promise.all(
      prompts.map(prompt => 
        axios.post("https://api.openai.com/v1/chat/completions", {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Você é um especialista em ESG." },
            { role: "user", content: prompt.prompt },  // Aqui estamos passando o prompt diretamente
          ],
          max_tokens: 4000, // Limitando os tokens
        }, {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        })
      )
    );

    // Processando as respostas de todos os prompts
    const report = {};
    responses.forEach((response, index) => {
      const sectionTitle = prompts[index].prompt.match(/"([^"]+)"/)[1]; // Agora usamos o título diretamente
      report[sectionTitle] = response.data.choices[0].message.content;
    });

    // Retorna as respostas do relatório
    return new Response(JSON.stringify({ report }), { status: 200 });
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return new Response("Erro ao gerar relatório", { status: 500 });
  }
}
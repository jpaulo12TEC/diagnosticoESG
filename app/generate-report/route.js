import axios from "axios";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um especialista em ESG." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return new Response(JSON.stringify({ report: response.data.choices[0].message.content }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return new Response("Erro ao gerar relatório", { status: 500 });
  }
}
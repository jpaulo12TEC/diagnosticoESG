const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors"); // Importando o pacote cors

dotenv.config(); // Carrega variáveis de ambiente

const app = express();
const port = 3000;

// Usando o CORS para permitir requisições do frontend
app.use(cors()); // Permite requisições de outros domínios

app.use(express.json()); // Para processar o corpo das requisições

app.post("/generate-report", async (req, res) => {
  const { prompt } = req.body;

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

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    res.status(500).send("Erro ao gerar relatório");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
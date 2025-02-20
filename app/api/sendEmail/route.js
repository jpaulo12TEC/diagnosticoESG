import emailjs from 'emailjs-com';

export async function POST(req) {
  try {
    const { nome, email } = await req.json();

    if (!nome || !email) {
      return new Response(JSON.stringify({ message: "Nome e e-mail são obrigatórios!" }), { status: 400 });
    }

    // Definindo os parâmetros do template de e-mail
    const templateParams = {
      nome: nome,     // Passando o nome
      email: email,   // Passando o e-mail
    };

    // Enviar o e-mail através do EmailJS
    const response = await emailjs.send(
      'service_le3higp',  // Substitua pelo seu Service ID
      'template_zfmnuvf', // Substitua pelo seu Template ID
      templateParams,    // Passando os parâmetros para o template
      'cIh-FjNPxiEs0Axze'      // Substitua pelo seu User ID
    );

    return new Response(JSON.stringify({ message: "E-mail enviado com sucesso!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro ao enviar e-mail", error: error.message }), { status: 500 });
  }
}

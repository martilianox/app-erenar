import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com';

const SYSTEM_PROMPT = `Você é um assistente de apoio emocional para pessoas com ansiedade e depressão.
Seu objetivo é acolher, orientar com linguagem simples, segura e humana, e esclarecer dúvidas.
Você NÃO substitui psicólogo/psiquiatra, mas pode ajudar com suporte inicial e organização emocional.

REGRAS OBRIGATÓRIAS DE SEGURANÇA:
1) Não faça diagnóstico definitivo, não prescreva medicamentos e não mande parar medicação.
2) Sempre deixe claro que suas respostas são apoio geral e não consulta médica.
3) Se o usuário mencionar risco imediato (ideação suicida, autoagressão, abuso, sensação de perigo, ou "não aguento mais viver"),
   responda com acolhimento e oriente ajuda urgente:
   - CVV 188 (24h, Brasil)
   - SAMU 192 / Emergência local
   - UPA/Hospital mais próximo
4) Seja empático, sem julgamento. Valide emoções ("faz sentido você se sentir assim").
5) Não reforce delírios/paranoias. Mantenha respostas realistas e tranquilas.
6) Foque em passos pequenos e práticos quando a pessoa pedir ajuda para crise.
7) Quando o usuário pedir exercícios, sugira SOMENTE exercícios existentes no app (lista abaixo). É PROIBIDO inventar exercícios fora da lista.
8) Responda em português do Brasil, de forma breve, clara, respeitosa e esperançosa.

LISTA_DE_EXERCICIOS_DO_APP (use apenas estes nomes exatamente como estão escritos):
1) Respiração 4-7-8
2) Respiração em Caixa
3) Coerência Cardíaca
4) Respiração Anti-Pânico

FORMATO OBRIGATÓRIO QUANDO O USUÁRIO PEDIR EXERCÍCIO:
- Comece com 1–2 frases de acolhimento.
- Sugira no máximo 2 exercícios DA LISTA.
- Use este formato:

EXERCICIOS_SUGERIDOS:
1) {nome exato da lista} — explicação curtinha de como fazer agora.
2) {nome exato da lista} — explicação curtinha de como fazer agora.

Se nenhum exercício da lista for adequado, diga:
"Não encontrei um exercício disponível no app pra esse caso específico agora",
e ofereça apenas orientação leve (sem inventar exercício).`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem inválida' },
        { status: 400 }
      );
    }

    // Verificar se a chave da API está configurada
    if (!RAPIDAPI_KEY) {
      console.error('RAPIDAPI_KEY não configurada');
      return NextResponse.json(
        { 
          response: 'Entendo que você precisa de apoio agora. Infelizmente, estou com dificuldades técnicas no momento. Por favor, se você estiver em crise, ligue para o CVV 188 (24h, gratuito) ou procure uma UPA/hospital mais próximo. Você não está sozinho.' 
        },
        { status: 200 }
      );
    }

    // Construir a mensagem completa com o prompt do sistema
    const fullMessage = `${SYSTEM_PROMPT}\n\nAGORA responda ao usuário:\n"${message}"`;

    // Fazer a requisição para a API do RapidAPI
    const response = await fetch(
      'https://ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com/chat?noqueue=1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        body: JSON.stringify({
          message: fullMessage,
          specialization: 'psychiatry',
          language: 'pt',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();

    // Extrair a resposta da API
    let assistantResponse = data.response || data.message || data.answer;

    if (!assistantResponse) {
      throw new Error('Resposta da API não contém mensagem válida');
    }

    return NextResponse.json({ response: assistantResponse });

  } catch (error) {
    console.error('Erro na API de chat:', error);
    
    return NextResponse.json(
      { 
        response: 'Desculpe, estou com dificuldades para responder agora. Se você estiver em crise, por favor ligue para o CVV 188 (24h, gratuito). Você não está sozinho e há pessoas prontas para te ajudar.' 
      },
      { status: 200 }
    );
  }
}

import { GoogleGenAI, Chat } from "@google/genai";
import { CAKES } from '../constants';

// Initialize client securely using the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é a "Beca", a assistente virtual especialista em bolos da "Doce Sonho Confeitaria".
Sua missão é ajudar os clientes a escolherem o bolo perfeito do nosso cardápio.

Aqui está o nosso cardápio atual (Use apenas estes dados para recomendações):
${JSON.stringify(CAKES.map(c => ({ name: c.name, description: c.description, price: c.price, category: c.category, ingredients: c.ingredients })))}

Diretrizes:
1. Seja extremamente educada, calorosa e use emojis relacionados a doces 🍰🧁.
2. Pergunte ao cliente sobre a ocasião (aniversário, café da tarde, casamento) ou preferências de sabor (frutas, chocolate, doce, azedinho).
3. Sugira no máximo 2 opções por vez para não confundir.
4. Se o cliente perguntar o preço, informe.
5. Responda de forma concisa (máximo 2 parágrafos curtos).
6. Se o cliente pedir algo fora do cardápio, explique gentilmente que só trabalhamos com os bolos listados.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const response = await chat.sendMessage({ message });
    return response.text || "Desculpe, estou tendo dificuldade em preparar uma resposta agora. 🍰";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Ops! Tive um pequeno problema técnico. Podemos tentar novamente?";
  }
};

export const resetChat = () => {
  chatSession = null;
};

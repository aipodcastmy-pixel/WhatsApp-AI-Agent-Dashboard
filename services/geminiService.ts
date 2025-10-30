import { GoogleGenAI, Chat } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

const initializeChat = () => {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful and creative AI assistant simulating a WhatsApp agent. Be friendly and concise.',
        },
    });
};

export type GeminiResponse = {
    success: true;
    text: string;
} | {
    success: false;
    error: string;
};

export const sendMessageToGemini = async (message: string): Promise<GeminiResponse> => {
    try {
        if (!chat) {
            initializeChat();
        }
        
        // The chat instance must not be null here due to the check above
        const result = await chat!.sendMessage({ message });
        return { success: true, text: result.text };

    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        
        // Reset chat on error in case the session is invalid
        chat = null;
        
        let errorMessage = "An unknown error occurred while contacting the AI. Please check your connection or API key and try again.";
        if (error instanceof Error) {
            errorMessage = `Oops! The AI assistant encountered an error. Please try again later.\n\nDetails: ${error.message}`;
        }
        return { success: false, error: errorMessage };
    }
};

export const resetChat = () => {
    chat = null;
};
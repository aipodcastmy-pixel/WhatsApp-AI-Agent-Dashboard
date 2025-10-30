
import { GoogleGenAI, Chat } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder.");
    // This is a placeholder for development. In a real scenario, the key must be provided.
    process.env.API_KEY = "YOUR_API_KEY_HERE";
}

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

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (process.env.API_KEY === "YOUR_API_KEY_HERE") {
        return Promise.resolve("This is a mock response. Please configure your Gemini API key to get a real response.");
    }

    try {
        if (!chat) {
            initializeChat();
        }
        
        // The chat instance must not be null here due to the check above
        const result = await chat!.sendMessage({ message });
        return result.text;

    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        
        // Reset chat on error in case the session is invalid
        chat = null;
        
        if (error instanceof Error) {
            return `An error occurred: ${error.message}`;
        }
        return "An unknown error occurred while contacting the AI.";
    }
};

export const resetChat = () => {
    chat = null;
};

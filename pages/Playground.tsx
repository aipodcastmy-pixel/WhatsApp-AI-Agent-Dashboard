import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { sendMessageToGemini, resetChat } from '../services/geminiService';

const Playground: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'system-intro',
            text: "Hello! I'm your AI assistant. How can I help you today? Type a message below to start a conversation.",
            sender: 'system',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        // Reset chat session when component mounts
        resetChat();
        return () => {
            // Optional: reset chat session when component unmounts
            resetChat();
        };
    }, []);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: input,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponse = await sendMessageToGemini(userMessage.text);
        
        // FIX: Use the `in` operator for robust type guarding. This correctly narrows the discriminated union type, resolving the error when accessing the `error` property.
        if ("error" in aiResponse) {
             const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: aiResponse.error,
                sender: 'error',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } else {
            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                text: aiResponse.text,
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMessage]);
        }
        
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    const handleReset = () => {
        resetChat();
        setMessages([
            {
                id: 'system-reset',
                text: "Chat session reset. I'm ready for a new conversation!",
                sender: 'system',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Playground</h2>
                <button 
                  onClick={handleReset} 
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Reset Chat
                </button>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {(msg.sender === 'ai' || msg.sender === 'error') && (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${msg.sender === 'ai' ? 'bg-brand-green' : 'bg-red-500'}`}>
                                {msg.sender === 'ai' ? 'AI' : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                                )}
                            </div>
                        )}
                        <div className={`max-w-lg px-4 py-2 rounded-lg shadow ${
                            msg.sender === 'user' ? 'bg-brand-green text-white rounded-br-none' : 
                            msg.sender === 'ai' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none' :
                            msg.sender === 'system' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-center w-full' :
                            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-bl-none'
                        }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <p className={`text-xs mt-1 ${
                                msg.sender === 'user' ? 'text-gray-200 text-right' : 
                                msg.sender === 'ai' ? 'text-gray-400 text-right' : 
                                msg.sender === 'error' ? 'text-red-400 dark:text-red-500 text-right' : 'hidden'
                            }`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                        <div className="max-w-lg px-4 py-3 rounded-lg shadow bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        placeholder="Type your message to the AI..."
                        className="w-full py-3 pl-4 pr-24 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-brand-green text-white hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Playground;
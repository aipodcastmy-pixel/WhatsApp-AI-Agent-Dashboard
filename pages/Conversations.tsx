import React, { useState, useMemo, useEffect } from 'react';
import { mockConversations } from '../constants';
import type { Conversation, Message } from '../types';

const ConversationList: React.FC<{ 
    conversations: Conversation[], 
    onSelect: (id: string) => void, 
    selectedId: string | null,
    searchTerm: string,
    onSearchChange: (term: string) => void
}> = ({ conversations, onSelect, selectedId, searchTerm, onSearchChange }) => (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Chats</h2>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => {
                const lastMessage = convo.messages[convo.messages.length - 1];
                const isUnread = lastMessage.sender === 'user' && !lastMessage.isRead;
                return (
                    <div
                        key={convo.id}
                        onClick={() => onSelect(convo.id)}
                        className={`p-4 flex items-center cursor-pointer border-l-4 ${selectedId === convo.id ? 'border-brand-green bg-gray-100 dark:bg-gray-800' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                        <img src={convo.avatarUrl} alt={convo.userName} className="w-12 h-12 rounded-full" />
                        <div className="ml-4 flex-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                                <h3 className={`font-semibold ${isUnread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{convo.userName}</h3>
                                <span className={`text-xs ${isUnread ? 'text-brand-green font-bold' : 'text-gray-400 dark:text-gray-500'}`}>{lastMessage.timestamp}</span>
                            </div>
                            <p className={`text-sm truncate ${isUnread ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                {lastMessage.text}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${message.sender === 'user' ? 'bg-brand-green text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
            <p>{message.text}</p>
            <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-gray-200' : 'text-gray-400'}`}>{message.timestamp}</p>
        </div>
    </div>
);

const ConversationView: React.FC<{ conversation: Conversation | null }> = ({ conversation }) => {
    if (!conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-wa-bg dark:bg-gray-800">
                <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-wa-bg dark:bg-gray-800" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}>
            <header className="p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <img src={conversation.avatarUrl} alt={conversation.userName} className="w-10 h-10 rounded-full" />
                <div className="ml-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{conversation.userName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{conversation.userPhone}</p>
                </div>
            </header>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {conversation.messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            </div>
            <footer className="p-4 bg-gray-100 dark:bg-gray-900">
                <div className="relative">
                    <input type="text" placeholder="Type a message..." className="w-full py-3 pl-4 pr-12 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-green text-white hover:bg-opacity-90">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

const Conversations: React.FC = () => {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(mockConversations[0]?.id || null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredConversations = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const phoneSearchTerm = lowercasedTerm.replace(/[-\s]/g, '');

        return mockConversations.filter(convo =>
            convo.userName.toLowerCase().includes(lowercasedTerm) ||
            convo.userPhone.replace(/[-\s]/g, '').includes(phoneSearchTerm)
        );
    }, [searchTerm]);

    useEffect(() => {
        if (selectedConversationId && !filteredConversations.some(c => c.id === selectedConversationId)) {
            setSelectedConversationId(null);
        }
    }, [filteredConversations, selectedConversationId]);

    const selectedConversation = mockConversations.find(c => c.id === selectedConversationId) || null;

    return (
        <div className="h-full flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
            <ConversationList 
                conversations={filteredConversations} 
                onSelect={setSelectedConversationId} 
                selectedId={selectedConversationId}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <ConversationView conversation={selectedConversation} />
        </div>
    );
};

export default Conversations;
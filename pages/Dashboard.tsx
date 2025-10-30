
import React from 'react';
import { mockConversations, mockPlugins, mockTemplates } from '../constants';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex items-center">
        <div className={`p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const totalConversations = mockConversations.length;
    const activePlugins = mockPlugins.filter(p => p.enabled).length;
    const unreadMessages = mockConversations.filter(c => c.messages.some(m => !m.isRead && m.sender === 'user')).length;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Conversations" 
                    value={totalConversations} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} 
                    color="bg-blue-500"
                />
                <StatCard 
                    title="Unread Messages" 
                    value={unreadMessages} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M6 12h12M6 12l5-5M11 17l5-5"/></svg>} 
                    color="bg-red-500"
                />
                <StatCard 
                    title="Active Plugins" 
                    value={`${activePlugins}/${mockPlugins.length}`}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="m13 2 5 5h-5V2Z"/><path d="M10 12h.01"/><path d="m14 12-4 4"/><path d="M14 16h-4"/><path d="m10 16 4-4"/></svg>}
                    color="bg-yellow-500"
                />
                <StatCard 
                    title="Message Templates" 
                    value={mockTemplates.length} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>}
                    color="bg-green-500"
                />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                <ul className="space-y-4">
                    {mockConversations.slice(0, 3).map(convo => (
                        <li key={convo.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                            <img src={convo.avatarUrl} alt={convo.userName} className="w-10 h-10 rounded-full"/>
                            <div className="ml-4 flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-200">{convo.userName}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.messages[convo.messages.length - 1].text}</p>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{convo.messages[convo.messages.length - 1].timestamp}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;

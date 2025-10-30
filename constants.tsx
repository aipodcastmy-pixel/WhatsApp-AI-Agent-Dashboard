
import React from 'react';
import type { Conversation, Template, Plugin, User } from './types';

// Icons
export const HomeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export const MessageSquareIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export const FileTextIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);

export const PlugZapIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="m13 2 5 5h-5V2Z"/><path d="M10 12h.01"/><path d="m14 12-4 4"/><path d="M14 16h-4"/><path d="m10 16 4-4"/></svg>
);

export const BeakerIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
);

export const SettingsIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);


export const navLinks = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Conversations', path: '/conversations', icon: MessageSquareIcon },
  { name: 'Templates', path: '/templates', icon: FileTextIcon },
  { name: 'Plugins', path: '/plugins', icon: PlugZapIcon },
  { name: 'Playground', path: '/playground', icon: BeakerIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export const mockConversations: Conversation[] = [
    {
        id: '1',
        userName: 'Alice Johnson',
        userPhone: '+1-555-0101',
        avatarUrl: 'https://picsum.photos/seed/alice/100/100',
        messages: [
            { id: 'm1-1', text: 'Hi, I want to check my order status for #2025-01-88.', sender: 'user', timestamp: '10:30 AM', isRead: true },
            { id: 'm1-2', text: 'Sure, let me check that for you.', sender: 'ai', timestamp: '10:31 AM' },
            { id: 'm1-3', text: 'Your order #2025-01-88 has been shipped and is expected to arrive in 2 days. 🚚', sender: 'ai', timestamp: '10:32 AM' },
        ],
    },
    {
        id: '2',
        userName: 'Bob Williams',
        userPhone: '+1-555-0102',
        avatarUrl: 'https://picsum.photos/seed/bob/100/100',
        messages: [
            { id: 'm2-1', text: 'Can you generate today\'s sales report?', sender: 'user', timestamp: 'Yesterday', isRead: true },
            { id: 'm2-2', text: 'Of course. Here is the summary for today\'s sales...', sender: 'ai', timestamp: 'Yesterday' },
            { id: 'm2-3', text: 'Great, can you export it to Excel?', sender: 'user', timestamp: 'Yesterday', isRead: true },
            { id: 'm2-4', text: 'Here is the download link for the Excel file: [link]', sender: 'ai', timestamp: 'Yesterday' },
        ],
    },
    {
        id: '3',
        userName: 'Charlie Brown',
        userPhone: '+1-555-0103',
        avatarUrl: 'https://picsum.photos/seed/charlie/100/100',
        messages: [
            { id: 'm3-1', text: 'I need help with a product I bought.', sender: 'user', timestamp: 'Yesterday', isRead: false },
        ],
    }
];

export const mockTemplates: Template[] = [
    { id: 't1', name: 'Welcome Message', category: 'Greeting', content: 'Hello {{1}}! Welcome to our service. How can I help you today?', createdAt: '2023-10-01' },
    { id: 't2', name: 'Order Confirmation', category: 'Transactional', content: 'Your order #{{1}} has been confirmed. We will notify you once it ships.', createdAt: '2023-10-02' },
    { id: 't3', name: 'Support Follow-up', category: 'Support', content: 'Hi {{1}}, we are following up on your support ticket #{{2}}. Is your issue resolved?', createdAt: '2023-10-05' },
];

export const mockPlugins: Plugin[] = [
    { id: 'p1', name: 'CRM Connector', description: 'Syncs conversations with your CRM.', enabled: true, apiKey: 'crm_key_*********', endpoint: 'https://api.crm.com/v1/sync' },
    { id: 'p2', name: 'ERP Order Lookup', description: 'Fetches order status from the ERP system.', enabled: true, apiKey: 'erp_key_*********', endpoint: 'https://api.erp.com/v1/orders' },
    { id: 'p3', name: 'Reporting Engine', description: 'Generates daily and weekly reports.', enabled: false, apiKey: 'report_key_*********', endpoint: 'https://api.reporting.com/v1/generate' },
];

export const mockUsers: User[] = [
    { id: 'u1', name: 'Admin User', email: 'admin@example.com', role: 'Admin', lastLogin: '2023-11-20 10:00 AM' },
    { id: 'u2', name: 'Support Agent', email: 'agent@example.com', role: 'Agent', lastLogin: '2023-11-20 09:30 AM' },
    { id: 'u3', name: 'Marketing Viewer', email: 'viewer@example.com', role: 'Viewer', lastLogin: '2023-11-19 05:00 PM' },
];

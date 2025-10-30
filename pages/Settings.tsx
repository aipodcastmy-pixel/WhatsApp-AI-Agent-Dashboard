import React, { useState } from 'react';
import { mockUsers } from '../constants';

const Settings: React.FC = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [integrationSettings, setIntegrationSettings] = useState({
        provider: 'meta',
        phoneNumberId: '',
        businessAccountId: '',
        accessToken: '',
        verifyToken: '',
    });


    const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIntegrationSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleIntegrationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving WhatsApp Integration Settings:', integrationSettings);
        alert('Connection details saved successfully! (Check console for data)');
    };
    

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Webhook URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy.');
        });
    };

    const webhookUrl = "https://your-backend-service.com/api/whatsapp/webhook";

    return (
        <div className="space-y-8">
            {/* WhatsApp Integration */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">WhatsApp Integration</h2>
                     <div className="flex items-center space-x-4">
                        <a
                            href="https://developers.facebook.com/apps/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            <span className="ml-2 font-semibold">Start Setup on Meta</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setShowTutorial(!showTutorial)}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline focus:outline-none"
                        >
                            {showTutorial ? 'Hide' : 'Show'} Guide
                        </button>
                        <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Connected
                        </span>
                    </div>
                </div>

                {showTutorial && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Connecting to Meta Cloud API: A Step-by-Step Guide</h3>
                        <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                Go to <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Meta for Developers</a> and create a new App with the "Business" type.
                            </li>
                            <li>
                                From your App's dashboard, find the "WhatsApp" product and click "Set up".
                            </li>
                            <li>
                                Under "API Setup", you will find your <strong className="text-gray-700 dark:text-gray-300">Phone Number ID</strong> and <strong className="text-gray-700 dark:text-gray-300">WhatsApp Business Account ID</strong>. Copy and paste them into the fields below.
                            </li>
                            <li>
                                For the <strong className="text-gray-700 dark:text-gray-300">Permanent Access Token</strong>, you will need to add a System User to your Business Account and grant them `whatsapp_business_messaging` permissions. Generate a token for this user and paste it here.
                            </li>
                            <li>
                                Create a secure, random string for your <strong className="text-gray-700 dark:text-gray-300">Webhook Verify Token</strong> and enter it below. You will need this exact same token in the Meta dashboard.
                            </li>
                            <li>
                                In the "Webhook configuration" section in the Meta dashboard, click "Edit". Paste the <strong className="text-gray-700 dark:text-gray-300">Your Webhook URL</strong> from below and the <strong className="text-gray-700 dark:text-gray-300">Verify Token</strong> you just created.
                            </li>
                            <li>
                                After verifying the webhook, click "Manage" and subscribe to the `messages` field to receive incoming message notifications.
                            </li>
                            <li>
                                Once all fields are filled, click "Save Connection Details" below.
                            </li>
                        </ol>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleIntegrationSubmit}>
                    <div>
                        <label htmlFor="provider" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Provider</label>
                        <select id="provider" name="provider" value={integrationSettings.provider} onChange={handleIntegrationChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm rounded-md">
                            <option value="meta">Meta Cloud API</option>
                            <option value="twilio">Twilio</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phoneNumberId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number ID</label>
                        <input type="text" name="phoneNumberId" id="phoneNumberId" value={integrationSettings.phoneNumberId} onChange={handleIntegrationChange} placeholder="e.g., 109876543210987" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-md focus:ring-brand-green focus:border-brand-green" />
                    </div>
                     <div>
                        <label htmlFor="businessAccountId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Business Account ID</label>
                        <input type="text" name="businessAccountId" id="businessAccountId" value={integrationSettings.businessAccountId} onChange={handleIntegrationChange} placeholder="e.g., 201234567890123" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-md focus:ring-brand-green focus:border-brand-green" />
                    </div>
                    <div>
                        <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Permanent Access Token</label>
                        <input type="password" name="accessToken" id="accessToken" value={integrationSettings.accessToken} onChange={handleIntegrationChange} placeholder="Enter your permanent access token" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-md focus:ring-brand-green focus:border-brand-green" />
                    </div>
                    <div>
                        <label htmlFor="verifyToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Webhook Verify Token</label>
                        <input type="text" name="verifyToken" id="verifyToken" value={integrationSettings.verifyToken} onChange={handleIntegrationChange} placeholder="Create a secure, random token" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-md focus:ring-brand-green focus:border-brand-green" />
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Enter this same token in your Meta App's webhook configuration.</p>
                    </div>
                     <div>
                         <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Webhook URL</label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="text" name="webhook-url" id="webhook-url" value={webhookUrl} readOnly className="block w-full pr-12 sm:text-sm border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button type="button" onClick={() => copyToClipboard(webhookUrl)} className="h-full px-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none" aria-label="Copy Webhook URL">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                </button>
                            </div>
                         </div>
                         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Copy this URL and paste it into the Webhook configuration in your Meta for Developers App Dashboard.</p>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-opacity-90">Save Connection Details</button>
                    </div>
                </form>
            </div>

            {/* User Management */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h2>
                    <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                        Add User
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Last Login</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockUsers.map(user => (
                                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : user.role === 'Agent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{user.lastLogin}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Settings;
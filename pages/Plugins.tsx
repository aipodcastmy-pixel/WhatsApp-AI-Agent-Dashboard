
import React from 'react';
import { mockPlugins } from '../constants';
import type { Plugin } from '../types';

const PluginCard: React.FC<{ plugin: Plugin }> = ({ plugin }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{plugin.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${plugin.enabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                    {plugin.enabled ? 'Enabled' : 'Disabled'}
                </span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{plugin.description}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                Configure
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-lg hover:bg-opacity-90">
                {plugin.enabled ? 'Disable' : 'Enable'}
            </button>
        </div>
    </div>
);


const Plugins: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Plugin Management</h2>
                <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Add New Plugin
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlugins.map(plugin => <PluginCard key={plugin.id} plugin={plugin} />)}
            </div>
        </div>
    );
};

export default Plugins;


import React from 'react';
import { mockTemplates } from '../constants';

const Templates: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Message Templates</h2>
                <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Add New Template
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Content</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTemplates.map(template => (
                            <tr key={template.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{template.name}</td>
                                <td className="px-6 py-4">{template.category}</td>
                                <td className="px-6 py-4 max-w-sm truncate">{template.content}</td>
                                <td className="px-6 py-4">{template.createdAt}</td>
                                <td className="px-6 py-4 space-x-2">
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Templates;

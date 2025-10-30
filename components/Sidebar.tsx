
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../constants';

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <aside className="relative bg-wa-teal text-white w-64 hidden sm:flex flex-col flex-shrink-0 transition-all duration-300">
            <div className="h-20 flex items-center justify-center bg-wa-teal-dark">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <h1 className="text-2xl font-bold ml-2">WA Agent</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-brand-green text-white font-semibold shadow-lg'
                                    : 'text-gray-200 hover:bg-wa-teal-dark hover:text-white'
                            }`}
                        >
                            <link.icon className="w-5 h-5" />
                            <span className="ml-4">{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-wa-teal-dark">
                <p className="text-xs text-gray-400">© 2024 WA Agent Inc.</p>
            </div>
        </aside>
    );
};

export default Sidebar;

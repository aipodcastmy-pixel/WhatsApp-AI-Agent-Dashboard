
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Conversations from './pages/Conversations';
import Templates from './pages/Templates';
import Plugins from './pages/Plugins';
import Settings from './pages/Settings';
import Playground from './pages/Playground';
import { navLinks } from './constants';

const MainContent: React.FC = () => {
    const location = useLocation();
    const currentLink = navLinks.find(link => link.path === location.pathname) || navLinks[0];
    const pageTitle = currentLink.name;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={pageTitle} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/conversations" element={<Conversations />} />
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/plugins" element={<Plugins />} />
                        <Route path="/playground" element={<Playground />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <MainContent />
    </HashRouter>
  );
};

export default App;

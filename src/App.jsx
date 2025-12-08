
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Broadcast from './components/Broadcast';
import Reports from './components/Reports';
import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto p-8">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'broadcast' && <Broadcast />}
        {activePage === 'reports' && <Reports />}
      </div>
    </div>
  );
};

export default App;

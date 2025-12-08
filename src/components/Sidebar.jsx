import React from 'react';
import { LayoutDashboard, Radio, FileText, MessageSquare } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => (
  <div className="w-64 bg-white shadow-lg flex flex-col">
    <div className="p-6 border-b">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
        <MessageSquare className="text-white" size={24} />
      </div>
      <h2 className="text-xl font-bold text-gray-800">WhatsApp CRM</h2>
    </div>
    <nav className="flex-1 p-4">
      <button
        onClick={() => setActivePage('dashboard')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
          activePage === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <LayoutDashboard size={20} />
        <span className="font-medium">Dashboard</span>
      </button>
      <button
        onClick={() => setActivePage('broadcast')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
          activePage === 'broadcast' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Radio size={20} />
        <span className="font-medium">Broadcast</span>
      </button>
      <button
        onClick={() => setActivePage('reports')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          activePage === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <FileText size={20} />
        <span className="font-medium">Reports</span>
      </button>
    </nav>
  </div>
);

export default Sidebar;

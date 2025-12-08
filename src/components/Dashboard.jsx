import React from 'react';
import { Users, MessageSquare, TrendingUp, Phone } from 'lucide-react';

const leadStats = [
  { title: 'Total Leads', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { title: 'Active Conversations', value: '456', change: '+8%', icon: MessageSquare, color: 'bg-green-500' },
  { title: 'Conversion Rate', value: '23.5%', change: '+3.2%', icon: TrendingUp, color: 'bg-purple-500' },
  { title: 'Response Rate', value: '89%', change: '+5%', icon: Phone, color: 'bg-orange-500' }
];

const recentLeads = [
  { id: 1, name: 'John Doe', phone: '+91 98765 43210', status: 'New', lastContact: '2 hours ago', interest: 'High' },
  { id: 2, name: 'Jane Smith', phone: '+91 98765 43211', status: 'In Progress', lastContact: '5 hours ago', interest: 'Medium' },
  { id: 3, name: 'Mike Johnson', phone: '+91 98765 43212', status: 'Follow-up', lastContact: '1 day ago', interest: 'High' },
  { id: 4, name: 'Sarah Williams', phone: '+91 98765 43213', status: 'New', lastContact: '3 hours ago', interest: 'Low' },
  { id: 5, name: 'Tom Brown', phone: '+91 98765 43214', status: 'Converted', lastContact: '2 days ago', interest: 'High' }
];

const getStatusColor = (status) => {
  const colors = {
    'New': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Follow-up': 'bg-purple-100 text-purple-800',
    'Converted': 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getInterestColor = (interest) => {
  const colors = {
    'High': 'text-green-600',
    'Medium': 'text-yellow-600',
    'Low': 'text-gray-600'
  };
  return colors[interest] || 'text-gray-600';
};

const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {leadStats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
              <p className="text-green-600 text-sm mt-2">{stat.change} from last month</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="text-white" size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Recent Leads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{lead.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-semibold ${getInterestColor(lead.interest)}`}>{lead.interest}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{lead.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;

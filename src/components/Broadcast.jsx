import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';

const templates = [
  { id: 1, name: 'Welcome Message', category: 'Marketing', content: 'Welcome to our service! 🎉' },
  { id: 2, name: 'Follow-up Reminder', category: 'Sales', content: 'Hi! Just checking in on your interest...' },
  { id: 3, name: 'Promotional Offer', category: 'Marketing', content: 'Special offer just for you! 🎁' },
  { id: 4, name: 'Payment Reminder', category: 'Finance', content: 'Friendly reminder about your payment...' }
];

const dbUsers = [
  { id: 1, name: 'John Doe', phone: '+91 98765 43210', segment: 'Premium' },
  { id: 2, name: 'Jane Smith', phone: '+91 98765 43211', segment: 'Standard' },
  { id: 3, name: 'Mike Johnson', phone: '+91 98765 43212', segment: 'Premium' },
  { id: 4, name: 'Sarah Williams', phone: '+91 98765 43213', segment: 'Standard' },
  { id: 5, name: 'Tom Brown', phone: '+91 98765 43214', segment: 'Premium' },
  { id: 6, name: 'Lisa Davis', phone: '+91 98765 43215', segment: 'Standard' }
];

const Broadcast = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === dbUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(dbUsers.map(u => u.id));
    }
  };

  const handleBroadcast = () => {
    if (selectedTemplate && selectedUsers.length > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedTemplate('');
        setSelectedUsers([]);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Broadcast Messages</h1>
        <p className="text-gray-600 mt-1">Send WhatsApp templates to your users</p>
      </div>
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Check className="text-green-600" size={20} />
          <p className="text-green-800">Broadcast sent successfully to {selectedUsers.length} users!</p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Template</h2>
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{template.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{template.category}</p>
                    <p className="text-sm text-gray-600 mt-2">{template.content}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check className="text-blue-500 flex-shrink-0" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Select Recipients</h2>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {selectedUsers.length === dbUsers.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{selectedUsers.length}</span> of <span className="font-semibold">{dbUsers.length}</span> users selected
            </p>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {dbUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserToggle(user.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedUsers.includes(user.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {user.segment}
                    </span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedUsers.includes(user.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedUsers.includes(user.id) && (
                      <Check className="text-white" size={16} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleBroadcast}
            disabled={!selectedTemplate || selectedUsers.length === 0}
            className={`w-full mt-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedTemplate && selectedUsers.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
            Send Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;

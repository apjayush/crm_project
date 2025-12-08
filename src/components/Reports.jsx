import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
      <p className="text-gray-600 mt-1">Analytics and insights</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <FileText className="mx-auto text-gray-400 mb-4" size={64} />
      <p className="text-gray-600 text-lg">Reports section coming soon</p>
    </div>
  </div>
);

export default Reports;

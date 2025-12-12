import React from 'react';
import { FileText, Plus, FolderOpen, Users } from 'lucide-react';

const Workspace = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Collaborative Workspace</h1>
          <p className="text-sm text-gray-600">Create and collaborate on documents in real-time with your team members</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Start Collaborating</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Create and collaborate on documents in real-time with your team members.
            </p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
              <button className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Plus className="h-5 w-5 mr-2" />
                Create New Document
              </button>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <FolderOpen className="h-5 w-5 mr-2" />
                Browse Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
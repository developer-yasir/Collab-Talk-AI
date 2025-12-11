import React from 'react';

const Workspace = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white p-4 sm:p-6 border-b">
        <h1 className="text-xl sm:text-2xl font-semibold">Workspace</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Collaborative Workspace</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Create and collaborate on documents in real-time with your team members.
            </p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Create New Document
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
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
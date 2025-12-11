import React from 'react';

const Workspace = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold">Workspace</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">Collaborative workspace for real-time document editing</p>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
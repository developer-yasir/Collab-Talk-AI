import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Recent Chats</h2>
          <p className="text-gray-600">Your latest conversations</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Active Workspaces</h2>
          <p className="text-gray-600">Collaborate with your team</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">AI Assistant</h2>
          <p className="text-gray-600">Get AI-powered help</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
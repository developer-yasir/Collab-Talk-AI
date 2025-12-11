import React from 'react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Collab-Talk</h1>
      <p className="text-lg text-gray-600 mb-6">
        A real-time collaboration and communication platform with AI assistance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Real-time Chat</h2>
          <p>Connect with your team in private or group chats</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
          <p>Get help with coding, writing, debugging and more</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Collaborative Workspace</h2>
          <p>Work together on documents in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
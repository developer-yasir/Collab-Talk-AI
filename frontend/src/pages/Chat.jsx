import React from 'react';

const Chat = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">Select a conversation or start a new chat</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
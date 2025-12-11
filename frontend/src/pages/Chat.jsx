import React from 'react';

const Chat = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white p-4 sm:p-6 border-b">
        <h1 className="text-xl sm:text-2xl font-semibold">Chat</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Welcome to Chat</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Select a conversation or start a new chat to begin collaborating with your team.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Start New Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
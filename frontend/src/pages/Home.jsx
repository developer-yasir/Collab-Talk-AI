import React from 'react';
import { MessageSquare, Users, FileText, Bot, Zap, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-primary-600">Collab-Talk</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          A real-time collaboration and communication platform with AI assistance to enhance your team's productivity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">Real-time Chat</h2>
          </div>
          <p className="text-gray-600">Connect with your team in private or group chats with instant messaging.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Bot className="h-6 w-6 text-secondary-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">AI Assistant</h2>
          </div>
          <p className="text-gray-600">Get AI-powered help with coding, writing, debugging and brainstorming.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-accent-100 rounded-lg">
              <FileText className="h-6 w-6 text-accent-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">Collaborative Workspace</h2>
          </div>
          <p className="text-gray-600">Work together on documents in real-time with version control.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Zap className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">Fast Performance</h2>
          </div>
          <p className="text-gray-600">Built with modern technologies for optimal speed and responsiveness.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Shield className="h-6 w-6 text-secondary-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">Secure & Reliable</h2>
          </div>
          <p className="text-gray-600">Enterprise-grade security with end-to-end encryption for your data.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3">Team Collaboration</h2>
          </div>
          <p className="text-gray-600">Perfect for teams of all sizes with role-based permissions.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 sm:p-8 text-center text-white mx-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Join thousands of teams already using Collab-Talk to enhance their collaboration and productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { MessageSquare, FileText, Bot, Users, BarChart3, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Active Chats', value: '12', change: '+2', icon: MessageSquare, color: 'bg-blue-500' },
    { name: 'Active Workspaces', value: '5', change: '+1', icon: FileText, color: 'bg-green-500' },
    { name: 'AI Interactions', value: '47', change: '+12', icon: Bot, color: 'bg-purple-500' },
    { name: 'Team Members', value: '8', change: '+1', icon: Users, color: 'bg-teal-500' },
  ];

  const recentChats = [
    { id: 1, name: 'Marketing Team', lastMessage: 'Great work on the campaign!', time: '2m ago' },
    { id: 2, name: 'Development', lastMessage: 'We need to fix the issue...', time: '15m ago' },
    { id: 3, name: 'Product Updates', lastMessage: 'New features are live', time: '1h ago' },
  ];

  const activeWorkspaces = [
    { id: 1, name: 'Project Alpha', lastEdited: '2h ago', members: 4 },
    { id: 2, name: 'Q4 Planning', lastEdited: '5h ago', members: 6 },
    { id: 3, name: 'Documentation', lastEdited: '1d ago', members: 3 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your team.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-2 sm:p-3 rounded-lg ${stat.color} text-white`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="ml-2 text-xs sm:text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Chats */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Chats</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentChats.map((chat) => (
                <div key={chat.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
                      </div>
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{chat.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] sm:max-w-xs">{chat.lastMessage}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-500">{chat.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Workspaces & Quick Actions */}
        <div className="space-y-4 sm:space-y-6">
          {/* Active Workspaces */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Active Workspaces</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {activeWorkspaces.map((workspace) => (
                <div key={workspace.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{workspace.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{workspace.lastEdited}</div>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {workspace.members}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mr-2 sm:mr-3" />
                <span className="text-sm sm:text-base">Start New Chat</span>
              </button>
              <button className="w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3" />
                <span className="text-sm sm:text-base">Create Workspace</span>
              </button>
              <button className="w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2 sm:mr-3" />
                <span className="text-sm sm:text-base">Ask AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
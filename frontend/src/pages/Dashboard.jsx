import React from 'react';
import { MessageSquare, FileText, Bot, Users, BarChart3, Clock, TrendingUp, Activity, Calendar, Plus, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Active Chats', value: '12', change: '+2', icon: MessageSquare, color: 'bg-primary-500', trend: 'up' },
    { name: 'Active Workspaces', value: '5', change: '+1', icon: FileText, color: 'bg-secondary-500', trend: 'up' },
    { name: 'AI Interactions', value: '47', change: '+12', icon: Bot, color: 'bg-accent-500', trend: 'up' },
    { name: 'Team Members', value: '8', change: '+1', icon: Users, color: 'bg-indigo-500', trend: 'up' },
  ];

  const recentChats = [
    { id: 1, name: 'Marketing Team', lastMessage: 'Great work on the campaign!', time: '2m ago', unread: 3 },
    { id: 2, name: 'Development', lastMessage: 'We need to fix the issue...', time: '15m ago', unread: 0 },
    { id: 3, name: 'Product Updates', lastMessage: 'New features are live', time: '1h ago', unread: 1 },
    { id: 4, name: 'Design Team', lastMessage: 'Check the new mockups', time: '3h ago', unread: 0 },
  ];

  const activeWorkspaces = [
    { id: 1, name: 'Project Alpha', lastEdited: '2h ago', members: 4, lastEditor: 'David' },
    { id: 2, name: 'Q4 Planning', lastEdited: '5h ago', members: 6, lastEditor: 'Sarah' },
    { id: 3, name: 'Documentation', lastEdited: '1d ago', members: 3, lastEditor: 'Alex' },
    { id: 4, name: 'UI/UX Design', lastEdited: '1 day ago', members: 5, lastEditor: 'Emma' },
  ];

  const quickStats = [
    { label: 'Completed Tasks', value: '24', change: '+5', icon: TrendingUp },
    { label: 'Pending Tasks', value: '8', change: '-2', icon: Activity },
    { label: 'Upcoming Meetings', value: '3', change: 'Today', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back! Here's what's happening with your team.</p>
        </div>

        <div className="space-y-8">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div></div> {/* Spacer to align with buttons on the right */}
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Plus className="h-5 w-5 mr-2" />
                New Chat
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <UserPlus className="h-5 w-5 mr-2" />
                Invite Team
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-2">{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <div className="flex items-baseline mt-1">
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        <span className={`ml-2 text-sm font-medium flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <span className="h-4 w-4 mr-1">↓</span>
                          )}
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Chats */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Chats</h2>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium underline">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentChats.map((chat) => (
                    <div key={chat.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <MessageSquare className="h-5 w-5 text-primary-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-gray-900">{chat.name}</div>
                              <div className="text-xs text-gray-500">{chat.time}</div>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                              {chat.unread > 0 && (
                                <span className="flex-shrink-0 ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                  {chat.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Workspaces & Quick Actions */}
            <div className="space-y-6">
              {/* Active Workspaces */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Active Workspaces</h2>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium underline">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-gray-200">
                  {activeWorkspaces.map((workspace) => (
                    <div key={workspace.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-secondary-600" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 truncate">{workspace.name}</h3>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {workspace.members} members
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{workspace.lastEdited}</p>
                          <p className="text-xs text-gray-400 mt-1">{workspace.lastEditor}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3 group-hover:bg-primary-200 transition-colors">
                      <MessageSquare className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="text-base font-medium">Start New Chat</span>
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-secondary-100 flex items-center justify-center mr-3 group-hover:bg-secondary-200 transition-colors">
                      <FileText className="h-5 w-5 text-secondary-600" />
                    </div>
                    <span className="text-base font-medium">Create Workspace</span>
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-accent-100 flex items-center justify-center mr-3 group-hover:bg-accent-200 transition-colors">
                      <Bot className="h-5 w-5 text-accent-600" />
                    </div>
                    <span className="text-base font-medium">Ask AI Assistant</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
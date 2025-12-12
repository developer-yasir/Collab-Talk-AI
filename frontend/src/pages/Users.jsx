import React, { useState } from 'react';
import { User, Search, Plus, Phone, Mail, MoreVertical, Check, X } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for team members
  const teamMembers = [
    { id: 1, name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'Admin', status: 'online', lastActive: 'Just now', avatarColor: 'bg-primary-500' },
    { id: 2, name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'Member', status: 'online', lastActive: '2 min ago', avatarColor: 'bg-green-500' },
    { id: 3, name: 'Michael Chen', email: 'michael.c@example.com', role: 'Member', status: 'away', lastActive: '15 min ago', avatarColor: 'bg-yellow-500' },
    { id: 4, name: 'Emma Rodriguez', email: 'emma.r@example.com', role: 'Member', status: 'offline', lastActive: '1 hour ago', avatarColor: 'bg-purple-500' },
    { id: 5, name: 'David Kim', email: 'david.k@example.com', role: 'Member', status: 'online', lastActive: '5 min ago', avatarColor: 'bg-blue-500' },
    { id: 6, name: 'Lisa Zhang', email: 'lisa.z@example.com', role: 'Member', status: 'offline', lastActive: '3 hours ago', avatarColor: 'bg-red-500' },
  ];

  // Filter team members based on search term
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Team Members</h1>
          <p className="text-sm text-gray-600">Manage your team and their permissions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header with search and add button */}
          <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Plus className="h-5 w-5 mr-2" />
                Add Member
              </button>
            </div>
          </div>

          {/* Team members table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full ${member.avatarColor} flex items-center justify-center`}>
                            <span className="text-white font-medium">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.role === 'Admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.status === 'online' 
                          ? 'bg-green-100 text-green-800' 
                          : member.status === 'away'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-500 p-1 rounded hover:bg-gray-100">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500 p-1 rounded hover:bg-gray-100">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500 p-1 rounded hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of{' '}
              <span className="font-medium">{teamMembers.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-semibold text-gray-900">{teamMembers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Now</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {teamMembers.filter(m => m.status === 'online').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <X className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Invites</p>
                <p className="text-2xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
import React from 'react';
import { User, Mail, Phone, Clock, Save, X } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-sm text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-10 w-10 text-primary-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Member
                </span>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-900"
                    defaultValue="John Doe"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-900"
                    defaultValue="john.doe@example.com"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-900"
                    defaultValue="+1 (555) 123-4567"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="timezone"
                    name="timezone"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-900 appearance-none"
                  >
                    <option>(GMT-12:00) International Date Line West</option>
                    <option>(GMT-11:00) Midway Island, Samoa</option>
                    <option>(GMT-10:00) Hawaii</option>
                    <option>(GMT-09:00) Alaska</option>
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-07:00) Mountain Time</option>
                    <option>(GMT-06:00) Central Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT-04:00) Atlantic Time</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
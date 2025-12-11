import React from 'react';

const Profile = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white p-4 sm:p-6 border-b">
        <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
      </div>
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application settings</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">john.doe@example.com</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Member
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border border-gray-300 p-2"
                      defaultValue="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border border-gray-300 p-2"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border border-gray-300 p-2"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <div className="mt-1">
                    <select
                      id="timezone"
                      name="timezone"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border border-gray-300 p-2"
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

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
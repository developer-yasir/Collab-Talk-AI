import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Collab-Talk</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</Link>
          </li>
          <li>
            <Link to="/chat" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Chat</Link>
          </li>
          <li>
            <Link to="/workspace" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Workspace</Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calendar, DollarSign, Brain, MessageSquare } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-indigo-600">ProjectHub</h1>
        </div>
        <nav className="mt-8">
          <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/gantt" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <Calendar className="w-5 h-5 mr-3" />
            Gantt Chart
          </Link>
          <Link to="/budget" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <DollarSign className="w-5 h-5 mr-3" />
            Budget
          </Link>
          <Link to="/skills" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <Brain className="w-5 h-5 mr-3" />
            Skills
          </Link>
          <Link to="/chat" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <MessageSquare className="w-5 h-5 mr-3" />
            Chat
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
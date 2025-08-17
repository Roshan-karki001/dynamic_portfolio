import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { 
      title: 'Dashboard', 
      href: '/admin', 
      icon: LayoutDashboard 
    },
    { 
      title: 'Projects', 
      href: '/admin/projects', 
      icon: FolderOpen 
    },
    { 
      title: 'Messages', 
      href: '/admin/messages', 
      icon: MessageSquare 
    },
    { 
      title: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3 
    },
    { 
      title: 'Users', 
      href: '/admin/users', 
      icon: Users 
    },
    { 
      title: 'Settings', 
      href: '/admin/settings', 
      icon: Settings 
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400">Portfolio Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
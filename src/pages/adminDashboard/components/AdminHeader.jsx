import React from 'react';
import { Waves, Shield, Bell, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../homePage/signUp/supabaseClient';

const AdminHeader = () => {

  const handleLogout = async () => {
      await supabase.auth.signOut();
      window.location.href = "/"; // redirect to login
    };

  return (
    <header className="bg-white border-b border-ocean-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-ocean-600" />
              <span className="text-2xl font-bold text-ocean-800">OceanGuard</span>
            </Link>
            <div className="hidden md:flex items-center space-x-2">
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-ocean-600 hover:text-ocean-800 transition-colors">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">5</span>
              </div>
            </button>
            <button className="p-2 text-ocean-600 hover:text-ocean-800 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-ocean-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-ocean-800 font-medium">Admin User</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-ocean-600 hover:text-ocean-800 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
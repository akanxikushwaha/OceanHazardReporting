import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Map, 
  MessageSquare, 
  Phone 
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'map', label: 'Map Monitoring', icon: Map },
    { id: 'social', label: 'Social Media Analytics', icon: MessageSquare },
    { id: 'alerts', label: 'Alert Authorities', icon: Phone },
  ];

  return (
    <div className="w-64 h-screen shadow-lg" style={{ backgroundColor: '#313D5A' }}>
      {/* Header */}
      {/* <div className="p-6 border-b border-gray-600">
        <h1 className="text-xl font-bold text-white">Ocean Hazard Admin</h1>
        <p className="text-sm mt-1" style={{ color: '#CBC5EA' }}>Prediction Platform</p>
      </div> */}

      {/* Navigation Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center px-6 py-4 text-left transition-all duration-200 hover:bg-opacity-80 ${
                isActive 
                  ? 'text-white border-r-4 border-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={{ 
                backgroundColor: isActive ? '#73628A' : 'transparent' 
              }}
            >
              <Icon className="mr-3" size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-600">
        <div className="text-xs text-gray-400">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2025 Ocean Hazard Platform</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
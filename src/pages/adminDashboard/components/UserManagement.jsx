import React from 'react';
import { User, Shield, AlertTriangle, CheckCircle, MoreVertical } from 'lucide-react';

const UserManagement = () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      role: 'contributor',
      reports: 23,
      accuracy: 94,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Marine Biologist',
      email: 'marine@research.org',
      role: 'expert',
      reports: 156,
      accuracy: 98,
      status: 'active',
      joinDate: '2023-08-22'
    },
    {
      id: 3,
      name: 'Beach Safety',
      email: 'safety@beach.gov',
      role: 'moderator',
      reports: 89,
      accuracy: 96,
      status: 'active',
      joinDate: '2023-12-03'
    },
    {
      id: 4,
      name: 'Coastal Observer',
      email: 'observer@coast.com',
      role: 'contributor',
      reports: 12,
      accuracy: 76,
      status: 'inactive',
      joinDate: '2024-11-10'
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'contributor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'expert':
        return <Shield className="h-4 w-4" />;
      case 'moderator':
        return <CheckCircle className="h-4 w-4" />;
      case 'contributor':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-ocean-800">User Management</h2>
        <button className="text-ocean-600 hover:text-ocean-800 text-sm font-medium">
          View All Users
        </button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border border-ocean-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-ocean-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-ocean-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-ocean-800">{user.name}</h3>
                  <p className="text-sm text-ocean-600">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                  <span>{user.role}</span>
                </div>
                <button className="p-1 text-ocean-400 hover:text-ocean-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-ocean-800">{user.reports}</div>
                <div className="text-ocean-600">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-ocean-800">{user.accuracy}%</div>
                <div className="text-ocean-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.status === 'active' ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                  {user.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
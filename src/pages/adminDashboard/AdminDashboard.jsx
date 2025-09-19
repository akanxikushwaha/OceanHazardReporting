import React from 'react';
import AdminHeader from './components/AdminHeader';
import DashboardOverview from './components/DashboardOverview';
import ReportManagement from './components/ReportManagement';
import AlertSystem from './components/AlertSystem';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-ocean-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <DashboardOverview />
          <div className="grid lg:grid-cols-2 gap-8">
            <ReportManagement />
            <AlertSystem />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <UserManagement />
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
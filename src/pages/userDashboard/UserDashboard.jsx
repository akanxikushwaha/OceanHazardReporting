import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import ReportForm from './components/ReportForm';
import UserReports from './components/UserReports';
import NearbyAlerts from './components/NearbyAlerts';
import UserStats from './components/UserStats';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-ocean-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ReportForm />
            <UserReports />
          </div>
          <div className="space-y-8">
            <UserStats />
            <NearbyAlerts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
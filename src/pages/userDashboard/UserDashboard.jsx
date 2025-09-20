import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import ReportForm from './components/ReportForm';
import ReportsHistory from './components/ReportsHistory';
import QuickStats from './components/QuickStats';
import HazardMap from './components/HazardMap';


const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-ocean-50">
      <DashboardHeader />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#313D5A' }}>
            Welcome back, displayName
          </h1>
          <p className="text-lg" style={{ color: '#73628A' }}>
            Report ocean hazards and help keep our coastlines safe
          </p>
        </div>

        <QuickStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ReportForm />
          <HazardMap viewOnly={true} />
        </div>
        
        <ReportsHistory />
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;
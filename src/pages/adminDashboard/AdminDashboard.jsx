import React, {useState} from 'react';
import AdminHeader from './components/AdminHeader';
import AlertAuthorities from './components/AlertAuthorities';
import Dashboard from './components/Dashboard';
import MapMonitoring from './components/MapMonitoring';
import Reports from './components/Reports';
import Sidebar from './components/Sidebar';
import SocialMediaAnalytics from './components/SocialMediaAnalytics';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <Reports />;
      case 'map':
        return <MapMonitoring />;
      case 'social':
        return <SocialMediaAnalytics />;
      case 'alerts':
        return <AlertAuthorities />;
      default:
        return <Dashboard />;
    }
  };

return (
    <div className="min-h-screen bg-ocean-50">
      <AdminHeader />
      <div className="flex h-screen" style={{ backgroundColor: '#EAEAEA' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {renderActivePage()}
      </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
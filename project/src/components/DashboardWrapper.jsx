import React from 'react';
import Dashboard from './Dashboard';
import WorkerDashboard from './WorkerDashboard';

const DashboardWrapper = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // If user has role 'worker' or has a profession, they are a Worker
    if (user.role === 'worker' || user.profession) {
        return <WorkerDashboard />;
    }
    
    return <Dashboard />;
};

export default DashboardWrapper;

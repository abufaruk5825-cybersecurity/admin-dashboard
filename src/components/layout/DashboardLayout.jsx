import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import './DashboardLayout.scss';

/**
 * Shared shell for every authenticated page.
 * Uses React Router <Outlet /> so child routes render inside without
 * duplicating the sidebar / navbar.
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="layout-main">
        <Navbar onMenuOpen={() => setSidebarOpen(true)} />
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

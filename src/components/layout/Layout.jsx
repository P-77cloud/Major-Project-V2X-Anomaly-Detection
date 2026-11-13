import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationToast from './NotificationToast';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#070B14] text-slate-100 cyber-grid flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-800/80 text-center text-xs font-mono text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>
              V2X SENTINEL © 2026 • AI-Powered Connected Vehicle Misbehavior Detection System
            </span>
            <span className="text-cyan-400/90 font-medium">
              Phase 1 Academic Review Edition • IEEE 802.11p & C-V2X PC5
            </span>
          </div>
        </footer>
      </div>

      {/* Notifications Toast */}
      <NotificationToast />
    </div>
  );
};

export default Layout;


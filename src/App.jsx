import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SentinelProvider } from './context/SentinelContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DatasetManagement from './pages/DatasetManagement';
import ModelTraining from './pages/ModelTraining';
import RealTimeMonitor from './pages/RealTimeMonitor';
import ThreatAnalytics from './pages/ThreatAnalytics';
import AttackSimulation from './pages/AttackSimulation';
import SystemArchitecture from './pages/SystemArchitecture';

function App() {
  return (
    <SentinelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dataset" element={<DatasetManagement />} />
            <Route path="training" element={<ModelTraining />} />
            <Route path="monitor" element={<RealTimeMonitor />} />
            <Route path="threats" element={<ThreatAnalytics />} />
            <Route path="simulation" element={<AttackSimulation />} />
            <Route path="architecture" element={<SystemArchitecture />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SentinelProvider>
  );
}

export default App;


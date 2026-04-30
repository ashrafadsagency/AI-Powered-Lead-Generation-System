import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MyBusinessesPage from './pages/MyBusinessesPage';
import NicheLibraryPage from './pages/NicheLibraryPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import LeadsPage from './pages/LeadsPage';
import SavedOutputsPage from './pages/SavedOutputsPage';
import TasksPaymentsPage from './pages/TasksPaymentsPage';
import SettingsPage from './pages/SettingsPage';
import { initialBusinesses, leads, niches } from './data/mockData';

export default function App() {
  const [businesses, setBusinesses] = useState(initialBusinesses);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage businessCount={businesses.length} leadCount={leads.length} />} />
        <Route path="/businesses" element={<MyBusinessesPage businesses={businesses} setBusinesses={setBusinesses} />} />
        <Route path="/niches" element={<NicheLibraryPage niches={niches} />} />
        <Route path="/generator" element={<AIGeneratorPage businesses={businesses} niches={niches} />} />
        <Route path="/leads" element={<LeadsPage leads={leads} />} />
        <Route path="/saved-outputs" element={<SavedOutputsPage />} />
        <Route path="/tasks-payments" element={<TasksPaymentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

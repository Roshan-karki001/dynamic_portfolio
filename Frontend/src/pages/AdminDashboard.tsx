import React from 'react';
import AdminLayout from '../admin/layout/AdminLayout';
import Dashboard from '../admin/pages/Dashboard';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};

export default AdminDashboard;
'use client';

import AppLayout from '../components/layout/AppLayout';
import ModularCardGrid from './ModularCardGrid';

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard">
      <div className="container mx-auto">
        <ModularCardGrid />
      </div>
    </AppLayout>
  );
}

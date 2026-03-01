import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminAnalytics from '@/components/AdminAnalytics';
import BedManagement from '@/components/BedManagement';
import MasterDirectory from '@/components/MasterDirectory';

type AdminSection = 'analytics' | 'beds' | 'directory';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('analytics');

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 min-w-0 p-6 md:p-8 pt-16 md:pt-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeSection === 'analytics' && <AdminAnalytics />}
          {activeSection === 'beds' && <BedManagement />}
          {activeSection === 'directory' && <MasterDirectory />}
        </div>
      </main>
    </div>
  );
}

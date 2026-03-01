import { useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import MedicalHistory from '@/components/MedicalHistory';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import EmergencyLocator from '@/components/EmergencyLocator';

type PatientSection = 'history' | 'scheduler' | 'emergency';

export default function PatientDashboard() {
  const [activeSection, setActiveSection] = useState<PatientSection>('history');

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 min-w-0 p-6 md:p-8 pt-16 md:pt-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeSection === 'history' && <MedicalHistory />}
          {activeSection === 'scheduler' && <AppointmentScheduler />}
          {activeSection === 'emergency' && <EmergencyLocator />}
        </div>
      </main>
    </div>
  );
}

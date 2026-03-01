import { useState } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import DoctorSchedule from '@/components/DoctorSchedule';
import PatientQuickView from '@/components/PatientQuickView';
import type { AppointmentSlot } from '@/components/DoctorSchedule';

type DoctorSection = 'schedule' | 'quickview';

export default function DoctorDashboard() {
  const [activeSection, setActiveSection] = useState<DoctorSection>('schedule');
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleSlotClick = (slot: AppointmentSlot) => {
    setSelectedSlot(slot);
    setPanelOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 min-w-0 p-6 md:p-8 pt-16 md:pt-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeSection === 'schedule' && (
            <DoctorSchedule onSlotClick={handleSlotClick} />
          )}
          {activeSection === 'quickview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Patient Quick-View</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Click any appointment slot in the Schedule to view patient details here.
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="font-display font-bold text-foreground mb-2">No Patient Selected</p>
                <p className="text-sm text-muted-foreground">
                  Go to the <strong>Schedule</strong> tab and click on an appointment slot to view the patient's full medical history here.
                </p>
                <button
                  onClick={() => setActiveSection('schedule')}
                  className="mt-4 px-5 py-2 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-colors"
                >
                  View Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Patient Quick-View Panel */}
      <PatientQuickView
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        slot={selectedSlot}
      />
    </div>
  );
}

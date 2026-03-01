import { X, User, Pill, FileText, Calendar, AlertCircle, Activity } from 'lucide-react';
import type { AppointmentSlot } from './DoctorSchedule';

interface PatientData {
  name: string;
  age: number;
  patientId: string;
  bloodType: string;
  allergies: string[];
  diagnoses: { date: string; condition: string; status: 'active' | 'resolved' }[];
  medications: { name: string; dose: string; frequency: string }[];
  recentNotes: { date: string; note: string; doctor: string }[];
}

const mockPatientData: Record<string, PatientData> = {
  P001: {
    name: 'Alice Johnson', age: 45, patientId: 'P001', bloodType: 'A+',
    allergies: ['Penicillin', 'Aspirin'],
    diagnoses: [
      { date: '2025-11-14', condition: 'Hypertension Stage 1', status: 'active' },
      { date: '2024-03-10', condition: 'Seasonal Allergies', status: 'resolved' },
    ],
    medications: [
      { name: 'Lisinopril', dose: '10mg', frequency: 'Once daily' },
      { name: 'Cetirizine', dose: '10mg', frequency: 'As needed' },
    ],
    recentNotes: [
      { date: '2025-11-14', note: 'BP 145/92. Lifestyle changes recommended. Follow-up in 3 months.', doctor: 'Dr. Sarah Chen' },
    ],
  },
  P002: {
    name: 'Robert Kim', age: 62, patientId: 'P002', bloodType: 'O-',
    allergies: ['Sulfa drugs'],
    diagnoses: [
      { date: '2025-12-01', condition: 'Acute Chest Pain — under evaluation', status: 'active' },
      { date: '2023-06-15', condition: 'Type 2 Diabetes', status: 'active' },
    ],
    medications: [
      { name: 'Metformin', dose: '500mg', frequency: 'Twice daily' },
      { name: 'Nitroglycerin', dose: '0.4mg', frequency: 'As needed (sublingual)' },
    ],
    recentNotes: [
      { date: '2025-12-01', note: 'Patient presented with acute chest pain. ECG ordered. Troponin levels pending.', doctor: 'Dr. Sarah Chen' },
    ],
  },
  P003: {
    name: 'Maria Santos', age: 38, patientId: 'P003', bloodType: 'B+',
    allergies: [],
    diagnoses: [
      { date: '2025-07-22', condition: 'Mitral Valve Prolapse (mild)', status: 'active' },
    ],
    medications: [
      { name: 'Propranolol', dose: '20mg', frequency: 'Twice daily' },
    ],
    recentNotes: [
      { date: '2025-07-22', note: 'Echo shows mild MVP. No intervention needed. Annual monitoring recommended.', doctor: 'Dr. Sarah Chen' },
    ],
  },
  P004: {
    name: 'David Chen', age: 55, patientId: 'P004', bloodType: 'AB+',
    allergies: ['Latex', 'Codeine'],
    diagnoses: [
      { date: '2025-11-28', condition: 'Post CABG Surgery', status: 'active' },
      { date: '2020-01-10', condition: 'Coronary Artery Disease', status: 'active' },
    ],
    medications: [
      { name: 'Aspirin', dose: '81mg', frequency: 'Once daily' },
      { name: 'Atorvastatin', dose: '40mg', frequency: 'Once daily at night' },
      { name: 'Clopidogrel', dose: '75mg', frequency: 'Once daily' },
    ],
    recentNotes: [
      { date: '2025-11-28', note: 'Day 3 post-CABG. Vitals stable. Wound healing well. Continue monitoring.', doctor: 'Dr. Sarah Chen' },
    ],
  },
  P005: {
    name: 'Sarah Williams', age: 29, patientId: 'P005', bloodType: 'O+',
    allergies: [],
    diagnoses: [
      { date: '2025-09-15', condition: 'Supraventricular Tachycardia', status: 'active' },
    ],
    medications: [
      { name: 'Adenosine', dose: '6mg', frequency: 'IV as needed' },
    ],
    recentNotes: [
      { date: '2025-09-15', note: 'SVT episode resolved with vagal maneuver. ECG review scheduled.', doctor: 'Dr. Sarah Chen' },
    ],
  },
  P006: {
    name: 'James Okafor', age: 71, patientId: 'P006', bloodType: 'A-',
    allergies: ['NSAIDs'],
    diagnoses: [
      { date: '2022-04-20', condition: 'Atrial Fibrillation', status: 'active' },
      { date: '2019-08-05', condition: 'Heart Failure (HFrEF)', status: 'active' },
    ],
    medications: [
      { name: 'Warfarin', dose: '5mg', frequency: 'Once daily' },
      { name: 'Furosemide', dose: '40mg', frequency: 'Once daily' },
      { name: 'Carvedilol', dose: '12.5mg', frequency: 'Twice daily' },
    ],
    recentNotes: [
      { date: '2025-11-30', note: 'INR 2.4 — therapeutic range. Edema slightly improved. Adjust Furosemide dose.', doctor: 'Dr. Sarah Chen' },
    ],
  },
};

interface PatientQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  slot: AppointmentSlot | null;
}

export default function PatientQuickView({ isOpen, onClose, slot }: PatientQuickViewProps) {
  const patient = slot ? mockPatientData[slot.patientId] : null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-md bg-card border-l border-border shadow-hero flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-sm">{patient?.name ?? 'Patient Details'}</h3>
              {patient && (
                <p className="text-xs text-muted-foreground">Age {patient.age} · {patient.bloodType} · ID: {patient.patientId}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Appointment Info */}
        {slot && (
          <div className={`mx-4 mt-4 px-4 py-3 rounded-xl border flex-shrink-0 ${
            slot.type === 'emergency'
              ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
              : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {slot.type === 'emergency' ? (
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              ) : (
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
              <span className={`text-xs font-bold uppercase tracking-wide ${slot.type === 'emergency' ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'}`}>
                {slot.type === 'emergency' ? 'Emergency Appointment' : 'Routine Checkup'}
              </span>
            </div>
            <p className="text-sm text-foreground mt-1 font-medium">{slot.reason}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{slot.time} · {slot.duration} min · {slot.department}</p>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {patient ? (
            <>
              {/* Allergies */}
              {patient.allergies.length > 0 && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                  <p className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wide mb-1.5">⚠ Allergies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.allergies.map((a) => (
                      <span key={a} className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full font-medium">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnoses */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Diagnosis History
                </p>
                <div className="space-y-2">
                  {patient.diagnoses.map((d, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 bg-secondary/50 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm text-foreground font-medium">{d.condition}</p>
                        <p className="text-xs text-muted-foreground">{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                        d.status === 'active'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5" /> Current Medications
                </p>
                <div className="space-y-2">
                  {patient.medications.map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm text-foreground font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.frequency}</p>
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{m.dose}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Notes */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Recent Visit Notes
                </p>
                <div className="space-y-2">
                  {patient.recentNotes.map((n, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-foreground">{n.doctor}</p>
                        <p className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{n.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <User className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No patient data available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

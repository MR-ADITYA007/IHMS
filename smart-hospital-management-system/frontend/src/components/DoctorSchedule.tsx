import { Clock, User, AlertCircle, Stethoscope } from 'lucide-react';

export interface AppointmentSlot {
  id: string;
  patientName: string;
  patientAge: number;
  time: string;
  duration: number; // minutes
  type: 'routine' | 'emergency';
  department: string;
  reason: string;
  patientId: string;
}

export const mockAppointments: AppointmentSlot[] = [
  { id: 'a1', patientName: 'Alice Johnson', patientAge: 45, time: '09:00', duration: 30, type: 'routine', department: 'Cardiology', reason: 'Blood pressure follow-up', patientId: 'P001' },
  { id: 'a2', patientName: 'Robert Kim', patientAge: 62, time: '09:45', duration: 45, type: 'emergency', department: 'Cardiology', reason: 'Chest pain — urgent evaluation', patientId: 'P002' },
  { id: 'a3', patientName: 'Maria Santos', patientAge: 38, time: '11:00', duration: 30, type: 'routine', department: 'Cardiology', reason: 'Annual cardiac checkup', patientId: 'P003' },
  { id: 'a4', patientName: 'David Chen', patientAge: 55, time: '13:30', duration: 60, type: 'emergency', department: 'Cardiology', reason: 'Post-surgery monitoring', patientId: 'P004' },
  { id: 'a5', patientName: 'Sarah Williams', patientAge: 29, time: '14:45', duration: 30, type: 'routine', department: 'Cardiology', reason: 'ECG review', patientId: 'P005' },
  { id: 'a6', patientName: 'James Okafor', patientAge: 71, time: '15:30', duration: 45, type: 'routine', department: 'Cardiology', reason: 'Medication adjustment', patientId: 'P006' },
];

interface DoctorScheduleProps {
  onSlotClick: (slot: AppointmentSlot) => void;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

const START_HOUR = 8;
const END_HOUR = 18;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const PIXELS_PER_MINUTE = 1.4;

export default function DoctorSchedule({ onSlotClick }: DoctorScheduleProps) {
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Today's Schedule</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
            <span className="text-muted-foreground">Routine Checkup</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="text-muted-foreground">Emergency / High Priority</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
        <div className="flex">
          {/* Time axis */}
          <div className="w-16 flex-shrink-0 border-r border-border bg-secondary/30">
            <div style={{ height: `${TOTAL_MINUTES * PIXELS_PER_MINUTE}px`, position: 'relative' }}>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 flex items-center justify-center"
                  style={{ top: `${(hour - START_HOUR) * 60 * PIXELS_PER_MINUTE}px` }}
                >
                  <span className="text-xs text-muted-foreground font-medium">
                    {hour > 12 ? `${hour - 12}PM` : hour === 12 ? '12PM' : `${hour}AM`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Slots area */}
          <div className="flex-1 relative" style={{ height: `${TOTAL_MINUTES * PIXELS_PER_MINUTE}px` }}>
            {/* Hour grid lines */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="absolute left-0 right-0 border-t border-border/50"
                style={{ top: `${(hour - START_HOUR) * 60 * PIXELS_PER_MINUTE}px` }}
              />
            ))}

            {/* Current time indicator */}
            {(() => {
              const now = new Date();
              const currentMinutes = now.getHours() * 60 + now.getMinutes() - START_HOUR * 60;
              if (currentMinutes >= 0 && currentMinutes <= TOTAL_MINUTES) {
                return (
                  <div
                    className="absolute left-0 right-0 z-10 flex items-center gap-1"
                    style={{ top: `${currentMinutes * PIXELS_PER_MINUTE}px` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <div className="flex-1 h-px bg-red-500" />
                  </div>
                );
              }
              return null;
            })()}

            {/* Appointment slots */}
            {mockAppointments.map((slot) => {
              const startMin = timeToMinutes(slot.time) - START_HOUR * 60;
              const top = startMin * PIXELS_PER_MINUTE;
              const height = Math.max(slot.duration * PIXELS_PER_MINUTE, 36);
              const isEmergency = slot.type === 'emergency';

              return (
                <button
                  key={slot.id}
                  onClick={() => onSlotClick(slot)}
                  className={`absolute left-2 right-2 rounded-lg px-3 py-1.5 text-left transition-all hover:scale-[1.01] hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-ring ${
                    isEmergency
                      ? 'bg-red-100 dark:bg-red-950/50 border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50'
                      : 'bg-blue-100 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                  }`}
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {isEmergency ? (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    ) : (
                      <Stethoscope className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    )}
                    <span className={`text-xs font-bold truncate ${isEmergency ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'}`}>
                      {slot.patientName}
                    </span>
                  </div>
                  {height > 40 && (
                    <div className="flex items-center gap-1 mt-0.5 overflow-hidden">
                      <Clock className={`w-3 h-3 flex-shrink-0 ${isEmergency ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'}`} />
                      <span className={`text-[10px] truncate ${isEmergency ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {slot.time} · {slot.duration}min
                      </span>
                    </div>
                  )}
                  {height > 56 && (
                    <p className={`text-[10px] truncate mt-0.5 ${isEmergency ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'}`}>
                      {slot.reason}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Appointments', value: mockAppointments.length, icon: User, color: 'text-primary' },
          { label: 'Routine', value: mockAppointments.filter(a => a.type === 'routine').length, icon: Stethoscope, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Emergency', value: mockAppointments.filter(a => a.type === 'emergency').length, icon: AlertCircle, color: 'text-red-600 dark:text-red-400' },
          { label: 'Hours Scheduled', value: `${Math.round(mockAppointments.reduce((s, a) => s + a.duration, 0) / 60 * 10) / 10}h`, icon: Clock, color: 'text-muted-foreground' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-3 shadow-xs">
            <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

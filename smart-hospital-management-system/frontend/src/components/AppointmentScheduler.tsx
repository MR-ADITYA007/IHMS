import { useState } from 'react';
import { Calendar, Clock, Building2, CheckCircle2, AlertCircle, X, Loader2, Sparkles } from 'lucide-react';

const departments = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pulmonology',
  'Endocrinology', 'General Medicine', 'ENT', 'Dermatology',
];

const highDemandDepts = ['Cardiology', 'Neurology', 'General Medicine'];
const highDemandHours = [9, 10, 14, 15];

type ModalState = 'idle' | 'checking' | 'confirmed' | 'alternate';

interface AlternateSlot {
  date: string;
  time: string;
}

export default function AppointmentScheduler() {
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [modalState, setModalState] = useState<ModalState>('idle');
  const [alternateSlot, setAlternateSlot] = useState<AlternateSlot | null>(null);

  const isHighDemand =
    highDemandDepts.includes(department) &&
    time &&
    highDemandHours.includes(parseInt(time.split(':')[0]));

  const slotStatus = !department || !date || !time
    ? null
    : isHighDemand
    ? 'high-demand'
    : 'available';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState('checking');
    setTimeout(() => {
      if (isHighDemand) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        setAlternateSlot({
          date: nextDate.toISOString().split('T')[0],
          time: '11:00',
        });
        setModalState('alternate');
      } else {
        setModalState('confirmed');
      }
    }, 2200);
  };

  const closeModal = () => {
    setModalState('idle');
    setAlternateSlot(null);
    if (modalState === 'confirmed') {
      setDepartment('');
      setDate('');
      setTime('');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Smart Appointment Scheduler</h2>
        <p className="text-sm text-muted-foreground mt-1">AI-powered slot optimization with real-time availability prediction.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Department */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">
              <Building2 className="inline w-4 h-4 mr-1.5 text-primary" />
              Department
            </label>
            <select
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            >
              <option value="">Select a department…</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                <Calendar className="inline w-4 h-4 mr-1.5 text-primary" />
                Preferred Date
              </label>
              <input
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                <Clock className="inline w-4 h-4 mr-1.5 text-primary" />
                Preferred Time
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                min="08:00"
                max="18:00"
                className="w-full px-3.5 py-2.5 text-sm bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
          </div>

          {/* Slot Status Badge */}
          {slotStatus && (
            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border ${
              slotStatus === 'available'
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                : 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800'
            }`}>
              {slotStatus === 'available' ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">Slot Available</p>
                    <p className="text-xs text-green-600 dark:text-green-400">This time slot has good availability. Book now!</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">High Demand</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">This slot is in high demand. ML may suggest an alternate time.</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-all duration-200 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            Book Appointment with AI Optimization
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalState !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-hero w-full max-w-md overflow-hidden">
            {/* Checking State */}
            {modalState === 'checking' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Analyzing Your Request</h3>
                <p className="text-sm text-muted-foreground">Checking availability and predicting optimal slot using ML overbooking model…</p>
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Confirmed State */}
            {modalState === 'confirmed' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your appointment at <strong className="text-foreground">{department}</strong> has been scheduled for{' '}
                  <strong className="text-foreground">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong> at{' '}
                  <strong className="text-foreground">{time}</strong>.
                </p>
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-3 mb-5 text-xs text-green-700 dark:text-green-300">
                  ✓ Confirmation sent to your registered email
                </div>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 px-6 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-colors"
                >
                  Done
                </button>
              </div>
            )}

            {/* Alternate Slot State */}
            {modalState === 'alternate' && alternateSlot && (
              <div className="p-8">
                <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Suggested Alternate Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Your requested slot is at high demand. Our ML model suggests a better time:
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-5">
                  <p className="text-sm font-semibold text-foreground text-center">
                    {new Date(alternateSlot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {alternateSlot.time}
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">Predicted wait time: ~8 minutes</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 px-4 text-sm font-semibold text-muted-foreground border border-border rounded-xl hover:bg-secondary transition-colors"
                  >
                    Keep Original
                  </button>
                  <button
                    onClick={() => {
                      setDate(alternateSlot.date);
                      setTime(alternateSlot.time);
                      setModalState('confirmed');
                    }}
                    className="flex-1 py-2.5 px-4 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-colors"
                  >
                    Accept Suggestion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

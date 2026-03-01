import { useState } from 'react';
import { Bed, X, CheckCircle2, Loader2, Building2 } from 'lucide-react';

interface BedData {
  id: string;
  number: string;
  ward: string;
  status: 'free' | 'occupied';
  patient?: string;
}

const generateBeds = (): BedData[] => {
  const wards = ['Cardiology', 'Neurology', 'Orthopedics', 'General'];
  const occupiedIds = [1, 2, 4, 5, 7, 9, 11, 13, 14, 16, 18, 20, 22, 24];
  return Array.from({ length: 28 }, (_, i) => {
    const id = i + 1;
    const ward = wards[Math.floor(i / 7)];
    const isOccupied = occupiedIds.includes(id);
    return {
      id: `B${String(id).padStart(3, '0')}`,
      number: `${ward.slice(0, 3).toUpperCase()}-${String(id).padStart(2, '0')}`,
      ward,
      status: isOccupied ? 'occupied' : 'free',
      patient: isOccupied ? `Patient #${1000 + id}` : undefined,
    };
  });
};

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Pulmonology', 'ENT'];

type ModalState = 'idle' | 'form' | 'loading' | 'success';

export default function BedManagement() {
  const [beds, setBeds] = useState<BedData[]>(generateBeds);
  const [selectedBed, setSelectedBed] = useState<BedData | null>(null);
  const [modalState, setModalState] = useState<ModalState>('idle');
  const [patientName, setPatientName] = useState('');
  const [patientDept, setPatientDept] = useState('');
  const [filterWard, setFilterWard] = useState('All');

  const wards = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'General'];
  const filteredBeds = filterWard === 'All' ? beds : beds.filter((b) => b.ward === filterWard);
  const freeBeds = beds.filter((b) => b.status === 'free').length;
  const occupiedBeds = beds.filter((b) => b.status === 'occupied').length;

  const openAllocate = (bed: BedData) => {
    setSelectedBed(bed);
    setPatientName('');
    setPatientDept('');
    setModalState('form');
  };

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState('loading');
    setTimeout(() => {
      if (selectedBed) {
        setBeds((prev) =>
          prev.map((b) =>
            b.id === selectedBed.id
              ? { ...b, status: 'occupied', patient: patientName }
              : b
          )
        );
      }
      setModalState('success');
    }, 1600);
  };

  const closeModal = () => {
    setModalState('idle');
    setSelectedBed(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Bed Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time bed allocation with transactional database locking.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            <span className="text-muted-foreground">{freeBeds} Free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="text-muted-foreground">{occupiedBeds} Occupied</span>
          </div>
        </div>
      </div>

      {/* Ward Filter */}
      <div className="flex gap-2 flex-wrap">
        {wards.map((ward) => (
          <button
            key={ward}
            onClick={() => setFilterWard(ward)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterWard === ward
                ? 'bg-primary text-primary-foreground shadow-btn'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            {ward}
          </button>
        ))}
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
        {filteredBeds.map((bed) => (
          <div
            key={bed.id}
            className={`relative rounded-xl border-2 p-2.5 flex flex-col items-center gap-1 transition-all ${
              bed.status === 'free'
                ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700 hover:shadow-card'
                : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700'
            }`}
          >
            <Bed className={`w-5 h-5 ${bed.status === 'free' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
            <span className="text-[10px] font-bold text-foreground leading-none">{bed.number}</span>
            <span className={`text-[9px] font-medium ${bed.status === 'free' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {bed.status === 'free' ? 'Free' : 'Occupied'}
            </span>
            {bed.status === 'free' && (
              <button
                onClick={() => openAllocate(bed)}
                className="mt-0.5 w-full text-[9px] font-bold text-white bg-green-600 hover:bg-green-700 rounded-md py-0.5 transition-colors"
              >
                Allocate
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalState !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-hero w-full max-w-sm overflow-hidden">
            {/* Form State */}
            {modalState === 'form' && (
              <div>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div>
                    <h3 className="font-display font-bold text-foreground">Allocate Bed</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Bed {selectedBed?.number} · {selectedBed?.ward}</p>
                  </div>
                  <button onClick={closeModal} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleAllocate} className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-foreground">Patient Name</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-foreground">
                      <Building2 className="inline w-3.5 h-3.5 mr-1 text-primary" />
                      Department
                    </label>
                    <select
                      required
                      value={patientDept}
                      onChange={(e) => setPatientDept(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    >
                      <option value="">Select department…</option>
                      {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-btn"
                  >
                    Confirm Allocation
                  </button>
                </form>
              </div>
            )}

            {/* Loading State */}
            {modalState === 'loading' && (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-7 h-7 text-primary animate-spin" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">Processing Allocation</h3>
                <p className="text-sm text-muted-foreground">Acquiring transactional database lock and updating bed registry…</p>
              </div>
            )}

            {/* Success State */}
            {modalState === 'success' && (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">Bed Allocated!</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Bed <strong className="text-foreground">{selectedBed?.number}</strong> has been assigned to{' '}
                  <strong className="text-foreground">{patientName}</strong>.
                </p>
                <p className="text-xs text-muted-foreground mb-5">Transaction committed successfully.</p>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Search, FileText, Pill, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface HistoryRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
  department: string;
  notes: string;
}

const mockHistory: HistoryRecord[] = [
  { id: '1', date: '2025-11-14', diagnosis: 'Hypertension Stage 1', prescription: 'Lisinopril 10mg daily', doctor: 'Dr. Sarah Chen', department: 'Cardiology', notes: 'Blood pressure 145/92. Lifestyle changes recommended.' },
  { id: '2', date: '2025-09-03', diagnosis: 'Type 2 Diabetes (follow-up)', prescription: 'Metformin 500mg twice daily', doctor: 'Dr. Raj Patel', department: 'Endocrinology', notes: 'HbA1c improved to 7.1%. Continue current regimen.' },
  { id: '3', date: '2025-07-22', diagnosis: 'Acute Bronchitis', prescription: 'Azithromycin 500mg, Salbutamol inhaler', doctor: 'Dr. Emily Torres', department: 'Pulmonology', notes: 'Chest X-ray clear. 5-day antibiotic course prescribed.' },
  { id: '4', date: '2025-05-10', diagnosis: 'Lumbar Disc Herniation', prescription: 'Ibuprofen 400mg, Physiotherapy', doctor: 'Dr. Marcus Webb', department: 'Orthopedics', notes: 'MRI confirmed L4-L5 herniation. Conservative management.' },
  { id: '5', date: '2025-02-28', diagnosis: 'Migraine with Aura', prescription: 'Sumatriptan 50mg as needed', doctor: 'Dr. Priya Nair', department: 'Neurology', notes: 'Frequency: 3-4 episodes/month. Trigger diary recommended.' },
  { id: '6', date: '2024-12-05', diagnosis: 'Seasonal Allergic Rhinitis', prescription: 'Cetirizine 10mg, Fluticasone nasal spray', doctor: 'Dr. James Liu', department: 'ENT', notes: 'Allergy panel positive for dust mites and pollen.' },
  { id: '7', date: '2024-10-18', diagnosis: 'Annual Health Checkup', prescription: 'Vitamin D3 1000IU supplement', doctor: 'Dr. Sarah Chen', department: 'General Medicine', notes: 'All vitals normal. Vitamin D deficiency noted.' },
];

export default function MedicalHistory() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return mockHistory;
    return mockHistory.filter(
      (r) =>
        r.diagnosis.toLowerCase().includes(q) ||
        r.prescription.toLowerCase().includes(q) ||
        r.doctor.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.date.includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Medical History</h2>
        <p className="text-sm text-muted-foreground mt-1">Your complete health record — retrieved instantly via hash-indexed lookup.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Instant Search — diagnosis, doctor, department…"
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        {search && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Records */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No records found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((record) => {
            const isExpanded = expandedId === record.id;
            return (
              <div
                key={record.id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-card transition-shadow"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-start gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{record.diagnosis}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{record.doctor} · {record.department}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-border bg-secondary/30">
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Pill className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prescription</p>
                          <p className="text-sm text-foreground mt-0.5">{record.prescription}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Doctor's Notes</p>
                          <p className="text-sm text-foreground mt-0.5">{record.notes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

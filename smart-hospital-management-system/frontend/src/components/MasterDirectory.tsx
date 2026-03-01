import { useState } from 'react';
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronUp, Users, Stethoscope } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  department: string;
  admissionDate: string;
  status: 'Inpatient' | 'Outpatient' | 'Discharged';
  contact: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  status: 'Available' | 'On Leave' | 'In Surgery';
  contact: string;
}

const mockPatients: Patient[] = [
  { id: 'P001', name: 'Alice Johnson', age: 45, department: 'Cardiology', admissionDate: '2025-11-14', status: 'Inpatient', contact: '+1 555-0101' },
  { id: 'P002', name: 'Robert Kim', age: 62, department: 'Cardiology', admissionDate: '2025-12-01', status: 'Inpatient', contact: '+1 555-0102' },
  { id: 'P003', name: 'Maria Santos', age: 38, department: 'Cardiology', admissionDate: '2025-07-22', status: 'Outpatient', contact: '+1 555-0103' },
  { id: 'P004', name: 'David Chen', age: 55, department: 'Neurology', admissionDate: '2025-11-28', status: 'Inpatient', contact: '+1 555-0104' },
  { id: 'P005', name: 'Sarah Williams', age: 29, department: 'Neurology', admissionDate: '2025-09-15', status: 'Outpatient', contact: '+1 555-0105' },
  { id: 'P006', name: 'James Okafor', age: 71, department: 'Neurology', admissionDate: '2025-10-03', status: 'Inpatient', contact: '+1 555-0106' },
  { id: 'P007', name: 'Linda Park', age: 52, department: 'Orthopedics', admissionDate: '2025-11-20', status: 'Inpatient', contact: '+1 555-0107' },
  { id: 'P008', name: 'Carlos Rivera', age: 34, department: 'Orthopedics', admissionDate: '2025-12-05', status: 'Outpatient', contact: '+1 555-0108' },
  { id: 'P009', name: 'Emma Thompson', age: 67, department: 'Orthopedics', admissionDate: '2025-10-18', status: 'Discharged', contact: '+1 555-0109' },
];

const mockDoctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Sarah Chen', specialty: 'Cardiologist', department: 'Cardiology', experience: '12 years', status: 'Available', contact: '+1 555-1001' },
  { id: 'D002', name: 'Dr. Michael Hart', specialty: 'Cardiac Surgeon', department: 'Cardiology', experience: '18 years', status: 'In Surgery', contact: '+1 555-1002' },
  { id: 'D003', name: 'Dr. Priya Nair', specialty: 'Neurologist', department: 'Neurology', experience: '9 years', status: 'Available', contact: '+1 555-1003' },
  { id: 'D004', name: 'Dr. James Liu', specialty: 'Neurosurgeon', department: 'Neurology', experience: '15 years', status: 'On Leave', contact: '+1 555-1004' },
  { id: 'D005', name: 'Dr. Marcus Webb', specialty: 'Orthopedic Surgeon', department: 'Orthopedics', experience: '11 years', status: 'Available', contact: '+1 555-1005' },
  { id: 'D006', name: 'Dr. Aisha Patel', specialty: 'Sports Medicine', department: 'Orthopedics', experience: '7 years', status: 'Available', contact: '+1 555-1006' },
];

type ActiveTab = 'patients' | 'doctors';

function groupBy<T extends { department: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.department]) acc[item.department] = [];
    acc[item.department].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export default function MasterDirectory() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('patients');
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set(['Cardiology', 'Neurology', 'Orthopedics']));
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Patient | Doctor | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const toggleDept = (dept: string) => {
    setExpandedDepts((prev) => {
      const next = new Set(prev);
      if (next.has(dept)) next.delete(dept);
      else next.add(dept);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    if (activeTab === 'patients') setPatients((p) => p.filter((x) => x.id !== id));
    else setDoctors((d) => d.filter((x) => x.id !== id));
    setDeleteConfirm(null);
  };

  const patientGroups = groupBy(patients);
  const doctorGroups = groupBy(doctors);

  const statusColor = (status: string) => {
    if (status === 'Available' || status === 'Outpatient') return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    if (status === 'Inpatient' || status === 'In Surgery') return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
    if (status === 'On Leave' || status === 'Discharged') return 'bg-secondary text-muted-foreground';
    return 'bg-secondary text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Master Directory</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage all patients and doctors grouped by department.</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New {activeTab === 'patients' ? 'Patient' : 'Doctor'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl w-fit">
        {(['patients', 'doctors'] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'patients' ? <Users className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
            {tab === 'patients' ? `Patients (${patients.length})` : `Doctors (${doctors.length})`}
          </button>
        ))}
      </div>

      {/* Department Groups */}
      <div className="space-y-4">
        {Object.entries(activeTab === 'patients' ? patientGroups : doctorGroups).map(([dept, items]) => (
          <div key={dept} className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
            {/* Department Header */}
            <button
              onClick={() => toggleDept(dept)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-secondary/40 hover:bg-secondary/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {activeTab === 'patients' ? <Users className="w-4 h-4 text-primary" /> : <Stethoscope className="w-4 h-4 text-primary" />}
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-foreground text-sm">{dept}</p>
                  <p className="text-xs text-muted-foreground">{items.length} {activeTab === 'patients' ? 'patient' : 'doctor'}{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              {expandedDepts.has(dept) ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>

            {/* Table */}
            {expandedDepts.has(dept) && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/20">
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">ID</th>
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</th>
                      {activeTab === 'patients' ? (
                        <>
                          <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Age</th>
                          <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Admission</th>
                        </>
                      ) : (
                        <>
                          <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Specialty</th>
                          <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Experience</th>
                        </>
                      )}
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</th>
                      <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                        <td className="px-5 py-3 text-xs font-mono text-muted-foreground">{item.id}</td>
                        <td className="px-5 py-3 font-semibold text-foreground">{item.name}</td>
                        {activeTab === 'patients' ? (
                          <>
                            <td className="px-5 py-3 text-muted-foreground">{(item as Patient).age}</td>
                            <td className="px-5 py-3 text-muted-foreground text-xs">{new Date((item as Patient).admissionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-5 py-3 text-muted-foreground">{(item as Doctor).specialty}</td>
                            <td className="px-5 py-3 text-muted-foreground">{(item as Doctor).experience}</td>
                          </>
                        )}
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor((item as Patient).status || (item as Doctor).status)}`}>
                            {(item as Patient).status || (item as Doctor).status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-muted-foreground">{item.contact}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setEditItem(item); setShowModal(true); }}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            {deleteConfirm === item.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="px-2 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-md transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(item.id)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-hero w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-bold text-foreground">
                {editItem ? 'Edit' : 'Add New'} {activeTab === 'patients' ? 'Patient' : 'Doctor'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground text-center py-6">
                {editItem ? 'Edit form' : 'Create form'} for {activeTab === 'patients' ? 'patient' : 'doctor'} would appear here with full field validation.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-btn transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { AlertTriangle, MapPin, Bed, Navigation, Phone, Clock } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  distanceNum: number;
  bedsAvailable: number;
  totalBeds: number;
  waitTime: string;
  phone: string;
  address: string;
  level: 'Level I Trauma' | 'Level II Trauma' | 'Community Hospital';
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'St. Mary\'s Medical Center',
    distance: '1.2 km',
    distanceNum: 1.2,
    bedsAvailable: 14,
    totalBeds: 80,
    waitTime: '~12 min',
    phone: '+1 (800) 555-0101',
    address: '45 Healthcare Ave, San Francisco',
    level: 'Level I Trauma',
  },
  {
    id: '2',
    name: 'City General Hospital',
    distance: '3.7 km',
    distanceNum: 3.7,
    bedsAvailable: 6,
    totalBeds: 120,
    waitTime: '~25 min',
    phone: '+1 (800) 555-0202',
    address: '200 Medical Blvd, San Francisco',
    level: 'Level II Trauma',
  },
  {
    id: '3',
    name: 'Sunrise Community Hospital',
    distance: '5.1 km',
    distanceNum: 5.1,
    bedsAvailable: 22,
    totalBeds: 60,
    waitTime: '~8 min',
    phone: '+1 (800) 555-0303',
    address: '88 Wellness Dr, Oakland',
    level: 'Community Hospital',
  },
];

export default function EmergencyLocator() {
  const [showHospitals, setShowHospitals] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleFind = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setShowHospitals(true);
    }, 1500);
  };

  const sorted = [...mockHospitals].sort((a, b) => a.distanceNum - b.distanceNum);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Emergency Locator</h2>
        <p className="text-sm text-muted-foreground mt-1">Find the nearest hospital with real-time bed availability.</p>
      </div>

      {/* Emergency Alert Banner */}
      <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-700 rounded-2xl p-5 animate-pulse-ring">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-700 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-red-700 dark:text-red-300 text-lg">Emergency Services</h3>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              For life-threatening emergencies, call <strong>911</strong> immediately. Use this tool to locate the nearest hospital with available beds.
            </p>
          </div>
        </div>
      </div>

      {/* Find Button */}
      <button
        onClick={handleFind}
        disabled={isLocating}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 text-base font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-2xl shadow-btn-emergency transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        {isLocating ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Locating Nearest Hospitals…
          </>
        ) : (
          <>
            <Navigation className="w-5 h-5" />
            Find Nearest Hospital
          </>
        )}
      </button>

      {/* Map Placeholder */}
      <div className="bg-secondary border-2 border-dashed border-border rounded-2xl h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <MapPin className="w-8 h-8 opacity-40" />
        <p className="font-medium text-sm">Map View</p>
        <p className="text-xs opacity-60">Interactive map would load here</p>
      </div>

      {/* Hospital List */}
      {showHospitals && (
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            Nearest Hospitals — Sorted by Distance
          </h3>
          {sorted.map((hospital, idx) => (
            <div
              key={hospital.id}
              className="bg-card border border-border rounded-xl p-4 shadow-xs hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    idx === 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-foreground text-sm">{hospital.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        hospital.level === 'Level I Trauma'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : hospital.level === 'Level II Trauma'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      }`}>
                        {hospital.level}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{hospital.address}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-foreground">{hospital.distance}</p>
                  <p className="text-xs text-muted-foreground">away</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <Bed className={`w-3.5 h-3.5 ${hospital.bedsAvailable > 10 ? 'text-green-500' : hospital.bedsAvailable > 5 ? 'text-orange-500' : 'text-red-500'}`} />
                  <span className={`font-semibold ${hospital.bedsAvailable > 10 ? 'text-green-600 dark:text-green-400' : hospital.bedsAvailable > 5 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>
                    {hospital.bedsAvailable} beds
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {hospital.waitTime}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <a href={`tel:${hospital.phone}`} className="hover:text-foreground transition-colors truncate">{hospital.phone}</a>
                </div>
              </div>

              {/* Bed availability bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Bed Availability</span>
                  <span>{hospital.bedsAvailable}/{hospital.totalBeds}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      hospital.bedsAvailable / hospital.totalBeds > 0.3
                        ? 'bg-green-500'
                        : hospital.bedsAvailable / hospital.totalBeds > 0.1
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(hospital.bedsAvailable / hospital.totalBeds) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

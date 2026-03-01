import { Users, UserCheck, Brain, TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';

const stats = [
  {
    id: 'patients',
    label: 'Total Patients',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/10',
    description: 'Registered patients this month',
  },
  {
    id: 'doctors',
    label: 'Available Doctors',
    value: '34',
    change: '-2 on leave',
    trend: 'neutral',
    icon: UserCheck,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
    description: 'Out of 36 total staff physicians',
  },
  {
    id: 'noshows',
    label: 'Predicted No-Shows Today',
    value: '12%',
    change: '~8 appointments',
    trend: 'down',
    icon: Brain,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'ML Logistic Regression model',
    isML: true,
  },
];

const additionalStats = [
  { label: 'Appointments Today', value: '68', icon: Calendar },
  { label: 'Beds Occupied', value: '74%', icon: Activity },
  { label: 'Avg Wait Time', value: '18 min', icon: TrendingUp },
  { label: 'Patient Satisfaction', value: '94%', icon: TrendingUp },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Analytics Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time hospital performance metrics and ML-powered predictions.</p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              {stat.isML && (
                <span className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-700">
                  <Brain className="w-3 h-3" />
                  ML Model
                </span>
              )}
            </div>
            <p className="text-3xl font-display font-extrabold text-foreground">{stat.value}</p>
            <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              ) : stat.trend === 'down' ? (
                <TrendingDown className="w-3.5 h-3.5 text-orange-500" />
              ) : null}
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {additionalStats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 shadow-xs">
            <s.icon className="w-4 h-4 text-muted-foreground mb-2" />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ML Model Info */}
      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h4 className="font-display font-bold text-orange-800 dark:text-orange-200 text-sm">ML No-Show Prediction Engine</h4>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1 leading-relaxed">
              Powered by Logistic Regression trained on 18 months of appointment data. Features include patient history, appointment lead time, weather patterns, and day-of-week trends. Model accuracy: <strong>87.3%</strong>. Last retrained: 3 days ago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

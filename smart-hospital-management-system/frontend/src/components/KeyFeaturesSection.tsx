import { Database, Brain, MapPin, LayoutGrid } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  bullets: string[];
}

const features: Feature[] = [
  {
    icon: Database,
    iconBg: 'bg-medical-blue-100',
    iconColor: 'text-medical-blue-700',
    badge: 'RDBMS / ACID',
    badgeColor: 'bg-medical-blue-100 text-medical-blue-700',
    title: 'Lightning-Fast Records',
    description: 'Instant patient history retrieval powered by optimized relational database architecture with full ACID compliance.',
    bullets: [
      'Sub-millisecond patient lookup via hash indexing',
      'Complete medical history in a single query',
      'Zero data loss with ACID transaction guarantees',
    ],
  },
  {
    icon: Brain,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-700',
    badge: 'Logistic Regression ML',
    badgeColor: 'bg-purple-50 text-purple-700',
    title: 'AI-Powered Scheduling',
    description: 'Smart overbooking prevention and near-zero wait times driven by predictive machine learning models.',
    bullets: [
      'Predictive no-show modeling reduces idle slots',
      'Dynamic slot allocation based on visit complexity',
      'Continuous model retraining on live data',
    ],
  },
  {
    icon: MapPin,
    iconBg: 'bg-medical-emergency-light',
    iconColor: 'text-medical-emergency',
    badge: 'Priority Queue',
    badgeColor: 'bg-medical-emergency-light text-medical-emergency',
    title: 'Real-Time Emergency Routing',
    description: 'Location-based immediate hospital matching using priority queues to route critical patients in seconds.',
    bullets: [
      'Geospatial nearest-hospital matching',
      'Live bed availability broadcast',
      'Triage severity prioritization engine',
    ],
  },
  {
    icon: LayoutGrid,
    iconBg: 'bg-medical-blue-50',
    iconColor: 'text-medical-blue-600',
    badge: 'Data Structures',
    badgeColor: 'bg-medical-blue-50 text-medical-blue-600',
    title: 'Flawless Resource Management',
    description: 'Conflict-free bed allocation and doctor scheduling through advanced data structure optimization.',
    bullets: [
      'Zero double-booking via constraint resolution',
      'Automated doctor shift balancing',
      'Real-time resource utilization dashboard',
    ],
  },
];

export default function KeyFeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-4">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Core Technology</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Built on Four Technical Pillars
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every feature is engineered with purpose — combining database science, data structures,
            and machine learning to eliminate healthcare inefficiencies.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={1.75} />
                </div>

                {/* Badge */}
                <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${feature.badgeColor} mb-3 w-fit`}>
                  {feature.badge}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {feature.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '<50ms', label: 'Record Retrieval' },
            { value: '94%', label: 'Scheduling Accuracy' },
            { value: '3min', label: 'Emergency Response' },
            { value: '99.9%', label: 'System Uptime' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-card rounded-xl border border-border shadow-xs">
              <div className="font-display text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

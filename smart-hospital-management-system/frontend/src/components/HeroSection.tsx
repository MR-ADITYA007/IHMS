import { useNavigate } from '@tanstack/react-router';
import { AlertTriangle, CalendarCheck, ArrowRight, Shield, Zap, Brain } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-blue-900/85 via-medical-blue-800/75 to-medical-blue-700/60" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(oklch(0.98 0.005 240 / 0.15) 1px, transparent 1px),
                            linear-gradient(90deg, oklch(0.98 0.005 240 / 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-medical-success animate-pulse" />
          <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">
            AI-Powered Healthcare Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 text-balance">
          Next-Generation
          <br />
          <span className="text-medical-blue-300">Healthcare</span> Management
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/75 leading-relaxed mb-10 text-balance">
          Blazing-fast patient records, AI-driven appointment scheduling that eliminates wait times,
          and real-time emergency routing — all in one intelligent platform built for modern hospitals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate({ to: '/login' })}
            className="group flex items-center gap-2.5 px-8 py-4 text-base font-bold text-primary-foreground bg-medical-blue-400 hover:bg-medical-blue-300 rounded-xl shadow-btn transition-all duration-200 hover:shadow-hero hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <CalendarCheck className="w-5 h-5" />
            Book an Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate({ to: '/login' })}
            className="group flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-medical-emergency hover:bg-medical-emergency-dark rounded-xl shadow-btn-emergency transition-all duration-200 hover:-translate-y-0.5 animate-pulse-ring w-full sm:w-auto justify-center"
          >
            <AlertTriangle className="w-5 h-5" />
            EMERGENCY: Find Nearest Hospital
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {[
            { icon: Shield, label: 'HIPAA Compliant' },
            { icon: Zap, label: 'Real-Time Processing' },
            { icon: Brain, label: 'ML-Powered Insights' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/60">
              <Icon className="w-4 h-4 text-medical-blue-300" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Activity, Eye, EyeOff, User, Stethoscope, ShieldCheck, ArrowLeft, Lock, Mail } from 'lucide-react';

type Role = 'patient' | 'doctor' | 'admin';

interface RoleConfig {
  id: Role;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
}

const roles: RoleConfig[] = [
  {
    id: 'patient',
    label: 'Patient',
    icon: User,
    description: 'Access your health records and appointments',
    color: 'text-medical-blue-600',
    activeBg: 'bg-medical-blue-700',
    activeText: 'text-white',
    activeBorder: 'border-medical-blue-700',
  },
  {
    id: 'doctor',
    label: 'Doctor',
    icon: Stethoscope,
    description: 'Manage patients and clinical schedules',
    color: 'text-medical-blue-600',
    activeBg: 'bg-medical-blue-700',
    activeText: 'text-white',
    activeBorder: 'border-medical-blue-700',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    description: 'Full system access and resource control',
    color: 'text-medical-blue-600',
    activeBg: 'bg-medical-blue-700',
    activeText: 'text-white',
    activeBorder: 'border-medical-blue-700',
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeRole = roles.find((r) => r.id === selectedRole)!;
  const ActiveIcon = activeRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login — no real auth at this stage
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-50 via-background to-medical-blue-100 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-sm text-foreground">MediCore</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card rounded-2xl border border-border shadow-hero overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-br from-medical-blue-800 to-medical-blue-700 px-8 py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-4">
                <ActiveIcon className="w-7 h-7 text-white" strokeWidth={1.75} />
              </div>
              <h1 className="font-display text-2xl font-extrabold text-white mb-1">
                Welcome Back
              </h1>
              <p className="text-sm text-medical-blue-200">
                Sign in as <span className="font-semibold text-white">{activeRole.label}</span>
              </p>
            </div>

            {/* Role Selector */}
            <div className="px-6 pt-6 pb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
                Select Your Role
              </p>
              <div className="grid grid-cols-3 gap-2 p-1 bg-secondary rounded-xl">
                {roles.map((role) => {
                  const RoleIcon = role.icon;
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? `${role.activeBg} ${role.activeText} shadow-btn`
                          : 'text-muted-foreground hover:text-foreground hover:bg-card'
                      }`}
                      aria-pressed={isActive}
                    >
                      <RoleIcon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                      {role.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2.5 min-h-[1.25rem]">
                {activeRole.description}
              </p>
            </div>

            {/* Divider */}
            <div className="mx-6 my-4 border-t border-border" />

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 text-sm bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-btn transition-all duration-200 hover:-translate-y-0.5 mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    <ActiveIcon className="w-4 h-4" />
                    Sign In as {activeRole.label}
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Secured with end-to-end encryption</span>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Need help?{' '}
            <a href="mailto:support@medicore.health" className="text-primary hover:underline font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

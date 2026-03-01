import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X, Heart, Activity } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-btn">
              <Activity className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-700 text-sm text-foreground tracking-tight">MediCore</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">Hospital System</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/login' })}
              className="px-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-md hover:bg-primary/5 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate({ to: '/login', search: { role: 'patient' } })}
              className="px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-btn"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 pb-1 flex flex-col gap-2">
              <button
                onClick={() => { navigate({ to: '/login' }); setMobileOpen(false); }}
                className="w-full px-4 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-md hover:bg-primary/5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => { navigate({ to: '/login' }); setMobileOpen(false); }}
                className="w-full px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

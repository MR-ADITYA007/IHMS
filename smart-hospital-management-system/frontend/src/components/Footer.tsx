import { Link } from '@tanstack/react-router';
import { Activity, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'smart-hospital-management');

  return (
    <footer id="contact" className="bg-medical-blue-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-medical-blue-400 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base leading-none">MediCore</div>
                <div className="text-[10px] text-medical-blue-300 font-medium tracking-widest uppercase mt-0.5">Hospital System</div>
              </div>
            </div>
            <p className="text-sm text-medical-blue-300 leading-relaxed mb-5">
              Next-generation hospital management combining AI, advanced data structures, and real-time analytics.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-medical-success animate-pulse" />
              <span className="text-xs text-medical-blue-300 font-medium">All systems operational</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Features', href: '/#features' },
                { label: 'Contact', href: '/#contact' },
                { label: 'Login Portal', href: '/login', highlight: true },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors ${
                        link.highlight
                          ? 'text-medical-blue-300 hover:text-white font-semibold'
                          : 'text-medical-blue-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-medical-blue-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                'Patient Records',
                'Appointment Booking',
                'Emergency Routing',
                'Resource Management',
                'AI Scheduling',
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-medical-blue-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wide uppercase mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-medical-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-medical-blue-400">support@medicore.health</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-medical-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-medical-blue-400">+1 (800) 555-MEDI</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-medical-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-medical-blue-400">123 Healthcare Blvd,<br />San Francisco, CA 94105</span>
              </li>
            </ul>

            {/* Emergency CTA */}
            <div className="mt-6 p-3 rounded-lg bg-medical-emergency/15 border border-medical-emergency/30">
              <p className="text-xs font-bold text-medical-emergency uppercase tracking-wide mb-1">24/7 Emergency</p>
              <p className="text-sm font-semibold text-white">+1 (800) 911-MEDI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-medical-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-medical-blue-500">
            © {year} MediCore Hospital Management System. All rights reserved.
          </p>
          <p className="text-xs text-medical-blue-500 flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 text-medical-emergency fill-medical-emergency" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-medical-blue-300 hover:text-white transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

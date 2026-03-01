import { BarChart3, Bed, BookOpen, LogOut, Activity, Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import DarkModeToggle from './DarkModeToggle';

type AdminSection = 'analytics' | 'beds' | 'directory';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const navItems = [
  { id: 'analytics' as AdminSection, label: 'Analytics', icon: BarChart3, description: 'Hospital metrics & ML insights' },
  { id: 'beds' as AdminSection, label: 'Bed Management', icon: Bed, description: 'Allocate & track beds' },
  { id: 'directory' as AdminSection, label: 'Master Directory', icon: BookOpen, description: 'Patients & doctors' },
];

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate({ to: '/login' });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Activity className="w-4 h-4 text-sidebar-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display font-bold text-sidebar-foreground text-sm">MediCore</p>
            <p className="text-[10px] text-sidebar-foreground/60 font-medium uppercase tracking-wide">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Admin Badge */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-sidebar-accent-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">System Admin</p>
            <p className="text-[10px] text-sidebar-foreground/60">Full access</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onSectionChange(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-xs'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-sidebar-primary' : ''}`} />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{item.label}</p>
                <p className="text-[10px] opacity-60 truncate">{item.description}</p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs text-sidebar-foreground/60 font-medium">Dark Mode</span>
          <DarkModeToggle />
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-sidebar text-sidebar-foreground shadow-card"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-64 z-40 bg-sidebar transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}

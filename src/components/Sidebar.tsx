import Link from 'next/link';
import { Home, CheckSquare, Calendar, Activity, Settings, User } from 'lucide-react';
import SyncManager from './SyncManager';

export default function Sidebar() {
  return (
    <div className="w-16 md:w-64 h-full bg-surface border-r border-border flex flex-col justify-between transition-all duration-300">
      <div className="flex flex-col py-6 space-y-4">
        {/* Logo/Brand */}
        <div className="px-4 mb-8 flex items-center justify-center md:justify-start">
          <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            M
          </div>
          <span className="ml-3 hidden md:block font-bold text-lg tracking-wide text-white">Mission Control</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 px-2">
          <NavItem href="/" icon={<Home size={20} />} label="Home" />
          <NavItem href="/tasks" icon={<CheckSquare size={20} />} label="Tasks" />
          <NavItem href="/calendar" icon={<Calendar size={20} />} label="Calendar" />
          <NavItem href="/habits" icon={<Activity size={20} />} label="Habits" />
          <NavItem href="/activity" icon={<Activity size={20} />} label="Activity" />
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col space-y-3 px-2 pb-6">
        <div className="hidden md:block px-3 mb-2">
          <SyncManager />
        </div>
        <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
        <NavItem href="/profile" icon={<User size={20} />} label="Profile" />
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-surface-hover transition-colors group"
      title={label}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="ml-3 hidden md:block font-medium">{label}</span>
    </Link>
  );
}

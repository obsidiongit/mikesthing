import { Calendar } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 animate-stagger-1">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
          <Calendar size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Schedule & Events</h1>
          <p className="text-gray-400 mt-1 font-medium">Your upcoming timeline.</p>
        </div>
      </header>

      <div className="glass-panel rounded-2xl p-8 min-h-[60vh] shadow-2xl flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Calendar Integration Coming Soon</p>
          <p className="text-sm mt-2">Connect Google Calendar or Apple Calendar in Settings.</p>
        </div>
      </div>
    </div>
  );
}

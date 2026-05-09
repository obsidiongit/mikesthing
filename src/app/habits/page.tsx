import HabitsTracker from "@/components/widgets/HabitsTracker";
import { Activity } from "lucide-react";

export default function HabitsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 animate-stagger-1">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
          <Activity size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Habit Tracker</h1>
          <p className="text-gray-400 mt-1 font-medium">Build consistency and monitor daily routines.</p>
        </div>
      </header>

      <div className="max-w-3xl glass-panel rounded-2xl p-8 shadow-2xl">
        <HabitsTracker />
      </div>
    </div>
  );
}

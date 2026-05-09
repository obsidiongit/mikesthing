import { LineChart } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 animate-stagger-1">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/10">
          <LineChart size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Activity Log</h1>
          <p className="text-gray-400 mt-1 font-medium">Review your historical productivity.</p>
        </div>
      </header>

      <div className="glass-panel rounded-2xl p-8 min-h-[60vh] shadow-2xl flex flex-col">
        <div className="space-y-4">
          {[
            { date: "Today", events: ["Completed 3 tasks", "Maintained 5 habits", "Synced to cloud"] },
            { date: "Yesterday", events: ["Created new project", "Missed Reading habit"] },
            { date: "2 days ago", events: ["System setup", "Imported legacy data"] }
          ].map((day, i) => (
            <div key={i} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
              <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">{day.date}</h3>
              <ul className="space-y-2">
                {day.events.map((event, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

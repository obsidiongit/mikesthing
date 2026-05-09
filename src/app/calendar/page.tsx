"use client";

import { useStore } from "@/store/useStore";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { format, isAfter, isToday, isTomorrow, parseISO, startOfDay } from "date-fns";

export default function CalendarPage() {
  const { calendarEvents } = useStore();

  const now = new Date();
  
  // Sort events by date and filter upcoming
  const upcomingEvents = calendarEvents
    .filter(e => e.start && isAfter(parseISO(e.start), startOfDay(now)))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 animate-stagger-1">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
          <CalendarIcon size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Schedule & Events</h1>
          <p className="text-gray-400 mt-1 font-medium">Your upcoming timeline from synced calendar.</p>
        </div>
      </header>

      {calendarEvents.length === 0 ? (
        <div className="glass-panel rounded-2xl p-8 min-h-[60vh] shadow-2xl flex items-center justify-center">
          <div className="text-center text-gray-500">
            <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No Calendar Synced</p>
            <p className="text-sm mt-2">Connect an iCal Feed URL in Settings to see events.</p>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-6 lg:p-10 min-h-[60vh] shadow-2xl">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-400">No upcoming events found.</p>
            ) : (
              upcomingEvents.map((ev, idx) => {
                const startDate = parseISO(ev.start);
                const endDate = ev.end ? parseISO(ev.end) : null;
                
                let dayLabel = format(startDate, "EEEE, MMMM do");
                if (isToday(startDate)) dayLabel = "Today";
                else if (isTomorrow(startDate)) dayLabel = "Tomorrow";

                // group by day visually
                const prevEv = idx > 0 ? upcomingEvents[idx - 1] : null;
                const showDateHeader = !prevEv || startOfDay(parseISO(prevEv.start)).getTime() !== startOfDay(startDate).getTime();

                return (
                  <div key={ev.id || idx}>
                    {showDateHeader && (
                      <h3 className="text-sm font-semibold text-primary mt-8 mb-4 uppercase tracking-wider">
                        {dayLabel}
                      </h3>
                    )}
                    <div className="group flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-gray-600 transition-colors mb-3">
                      <div className="flex flex-col min-w-[120px]">
                        <span className="text-lg font-bold text-white">{format(startDate, "h:mm a")}</span>
                        {endDate && (
                          <span className="text-sm text-gray-400">to {format(endDate, "h:mm a")}</span>
                        )}
                      </div>
                      <div className="w-px h-12 bg-border hidden md:block"></div>
                      <div className="flex-1">
                        <h4 className="text-xl font-medium text-white mb-1 group-hover:text-primary transition-colors">
                          {ev.title || "Untitled Event"}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {ev.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} /> {ev.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {format(startDate, "MMM do, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useStore } from "@/store/useStore";
import { format, isAfter, isToday, isTomorrow, parseISO, startOfDay } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function UpcomingEventsWidget() {
  const { calendarEvents } = useStore();
  const now = new Date();
  
  const upcomingEvents = calendarEvents
    .filter(e => e.start && isAfter(parseISO(e.start), startOfDay(now)))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col h-full w-full">
      {upcomingEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
          <Calendar size={32} className="opacity-50 mb-3" />
          <p className="text-sm">No upcoming events.</p>
          <Link href="/settings" className="text-xs text-primary hover:underline mt-1">Sync Calendar</Link>
        </div>
      ) : (
        <div className="space-y-3 mt-2 flex-1 overflow-y-auto pr-1">
          {upcomingEvents.map((ev, idx) => {
            const startDate = parseISO(ev.start);
            let dayLabel = format(startDate, "MMM do");
            if (isToday(startDate)) dayLabel = "Today";
            else if (isTomorrow(startDate)) dayLabel = "Tomorrow";

            return (
              <div key={ev.id || idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors group">
                <div className="flex flex-col items-center justify-center min-w-[50px] bg-primary/10 rounded-md py-1.5 text-primary">
                  <span className="text-xs font-bold uppercase">{dayLabel === "Today" || dayLabel === "Tomorrow" ? dayLabel.slice(0,3) : format(startDate, "MMM")}</span>
                  <span className="text-sm font-black">{dayLabel === "Today" || dayLabel === "Tomorrow" ? "" : format(startDate, "d")}</span>
                  {(dayLabel === "Today" || dayLabel === "Tomorrow") && (
                    <span className="text-[10px] uppercase font-bold mt-0.5">{dayLabel}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
                    {ev.title || "Untitled"}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {format(startDate, "h:mm a")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

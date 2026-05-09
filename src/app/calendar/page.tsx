"use client";

import { useStore } from "@/store/useStore";
import { Calendar as CalendarIcon } from "lucide-react";
import BigCalendar from "@/components/calendar/BigCalendar";

export default function CalendarPage() {
  const { calendarEvents } = useStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 animate-stagger-1 flex flex-col">
      <header className="mb-6 flex items-center gap-4 flex-shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
          <CalendarIcon size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Calendar</h1>
          <p className="text-gray-400 mt-1 font-medium">Time block and view your schedule.</p>
        </div>
      </header>

      {calendarEvents.length === 0 ? (
        <div className="glass-panel rounded-2xl p-8 min-h-[60vh] shadow-2xl flex items-center justify-center flex-1">
          <div className="text-center text-gray-500">
            <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No Calendar Synced</p>
            <p className="text-sm mt-2">Connect an iCal Feed URL in Settings to see events.</p>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-4 lg:p-6 shadow-2xl flex-1 flex flex-col min-h-[700px]">
          <BigCalendar />
        </div>
      )}
    </div>
  );
}

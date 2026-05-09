"use client";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useStore } from '@/store/useStore';
import { useMemo } from 'react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function BigCalendar() {
  const { calendarEvents } = useStore();

  const events = useMemo(() => {
    return calendarEvents
      .filter((ev) => ev.start)
      .map((ev) => ({
        id: ev.id,
        title: ev.title || "Untitled",
        start: new Date(ev.start),
        end: ev.end ? new Date(ev.end) : new Date(ev.start), // fallback to start if no end
        resource: ev,
      }));
  }, [calendarEvents]);

  return (
    <div className="h-full w-full bg-background/50 rounded-xl overflow-hidden calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', minHeight: 600 }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
      />
    </div>
  );
}

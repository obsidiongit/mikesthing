"use client";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useStore } from '@/store/useStore';
import { useMemo, useCallback, useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, Trash2 } from 'lucide-react';

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

interface NewEventState {
  title: string;
  start: Date;
  end: Date;
}

export default function BigCalendar() {
  const { calendarEvents, localCalendarEvents, addLocalEvent, removeLocalEvent } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventState | null>(null);

  const events = useMemo(() => {
    const synced = calendarEvents
      .filter((ev) => ev.start)
      .map((ev) => ({
        id: ev.id,
        title: ev.title || "Untitled",
        start: new Date(ev.start),
        end: ev.end ? new Date(ev.end) : new Date(ev.start),
        resource: { ...ev, isLocal: false },
      }));

    const local = localCalendarEvents.map((ev) => ({
      id: ev.id,
      title: ev.title || "Untitled",
      start: new Date(ev.start),
      end: new Date(ev.end),
      resource: { ...ev, isLocal: true },
    }));

    return [...synced, ...local];
  }, [calendarEvents, localCalendarEvents]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setNewEvent({ title: '', start, end });
      setShowCreateModal(true);
    },
    []
  );

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent && newEvent.title.trim()) {
      addLocalEvent({
        title: newEvent.title,
        start: newEvent.start.toISOString(),
        end: newEvent.end.toISOString(),
      });
      setShowCreateModal(false);
      setNewEvent(null);
    }
  };

  const handleSelectEvent = useCallback(
    (event: any) => {
      if (event.resource?.isLocal) {
        if (window.confirm(`Delete local event "${event.title}"?`)) {
          removeLocalEvent(event.id);
        }
      }
    },
    [removeLocalEvent]
  );

  const eventPropGetter = useCallback((event: any) => {
    if (event.resource?.isLocal) {
      return { className: 'local-event' };
    }
    return {};
  }, []);

  return (
    <div className="h-full w-full calendar-container relative">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', minHeight: 700 }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
        popup
      />

      {/* Creation Modal */}
      {showCreateModal && newEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/10">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarIcon className="text-primary" size={20} />
                Create New Event
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Event Title</label>
                <input 
                  autoFocus
                  type="text"
                  required
                  placeholder="e.g. Design Review Sync"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Clock size={12} /> Starts
                  </label>
                  <div className="bg-black/20 border border-white/5 rounded-lg px-3 py-2 text-sm text-gray-300">
                    {format(newEvent.start, 'MMM d, h:mm a')}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Clock size={12} /> Ends
                  </label>
                  <div className="bg-black/20 border border-white/5 rounded-lg px-3 py-2 text-sm text-gray-300">
                    {format(newEvent.end, 'MMM d, h:mm a')}
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 font-semibold hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-indigo-600 transition-all active:scale-[0.98]"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

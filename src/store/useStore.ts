import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed';
export type TaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'Active' | 'Later' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface SyncConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  enabled: boolean;
  lastSyncedAt?: string;
  calendarUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
}

export interface AppState {
  // Authentication & Security
  pin: string | null;
  isAuthenticated: boolean;
  lastAuthenticatedAt: number | null;
  setPin: (pin: string) => void;
  authenticate: (pin: string) => boolean;
  logout: () => void;
  checkAuthTimeout: () => void;

  // Sync Configuration
  syncConfig: SyncConfig;
  setSyncConfig: (config: Partial<SyncConfig>) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  setCalendarEvents: (events: CalendarEvent[]) => void;
  localCalendarEvents: CalendarEvent[];
  addLocalEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  removeLocalEvent: (id: string) => void;

  // Task Data
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newCategory: TaskCategory) => void;
  // Quick Links
  quickLinks: { id: string; name: string; url: string }[];
  addQuickLink: (link: { name: string; url: string }) => void;
  updateQuickLink: (id: string, updates: Partial<{ name: string; url: string }>) => void;
  removeQuickLink: (id: string) => void;

  // Habits
  habits: { id: string; name: string; completed: boolean }[];
  toggleHabit: (id: string) => void;
  addHabit: (name: string) => void;
  removeHabit: (id: string) => void;

  // Scratchpad
  scratchpadContent: string;
  setScratchpadContent: (content: string) => void;

  // System
  hydrateState: (state: Partial<AppState>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Security
      pin: null,
      isAuthenticated: false,
      lastAuthenticatedAt: null,
      setPin: (pin) => set({ pin }),
      authenticate: (inputPin) => {
        const { pin } = get();
        if (pin === inputPin) {
          set({ isAuthenticated: true, lastAuthenticatedAt: Date.now() });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, lastAuthenticatedAt: null }),
      checkAuthTimeout: () => {
        const { lastAuthenticatedAt, isAuthenticated } = get();
        if (isAuthenticated && lastAuthenticatedAt) {
          const thirtyMins = 30 * 60 * 1000; // 30 minutes in milliseconds
          if (Date.now() - lastAuthenticatedAt > thirtyMins) {
            set({ isAuthenticated: false, lastAuthenticatedAt: null });
          }
        }
      },

      // Sync Config
      syncConfig: {
        supabaseUrl: '',
        supabaseAnonKey: '',
        enabled: false,
        calendarUrl: '',
      },
      setSyncConfig: (config) => set((state) => ({ 
        syncConfig: { ...state.syncConfig, ...config } 
      })),

      // Calendar
      calendarEvents: [],
      setCalendarEvents: (events) => set({ calendarEvents: events }),
      localCalendarEvents: [],
      addLocalEvent: (eventData) => set((state) => ({
        localCalendarEvents: [...state.localCalendarEvents, { ...eventData, id: crypto.randomUUID() }]
      })),
      removeLocalEvent: (id) => set((state) => ({
        localCalendarEvents: state.localCalendarEvents.filter(e => e.id !== id)
      })),

      // Tasks
      tasks: [],
      addTask: (taskData) => set((state) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return { tasks: [...state.tasks, newTask] };
      }),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() } 
            : task
        )
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),
      moveTask: (id, newCategory) => set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id 
            ? { ...task, category: newCategory, updatedAt: new Date().toISOString() } 
            : task
        )
      })),

      // Quick Links
      quickLinks: [
        { id: "1", name: "GitHub Repo", url: "https://github.com" },
        { id: "2", name: "Vercel Dashboard", url: "https://vercel.com" },
        { id: "3", name: "Figma Designs", url: "https://figma.com" },
      ],
      addQuickLink: (link) => set((state) => ({
        quickLinks: [...state.quickLinks, { ...link, id: crypto.randomUUID() }]
      })),
      updateQuickLink: (id, updates) => set((state) => ({
        quickLinks: state.quickLinks.map(l => l.id === id ? { ...l, ...updates } : l)
      })),
      removeQuickLink: (id) => set((state) => ({
        quickLinks: state.quickLinks.filter(l => l.id !== id)
      })),

      // Habits
      habits: [
        { id: "1", name: "Drink Water (2L)", completed: false },
        { id: "2", name: "Read 10 Pages", completed: true },
        { id: "3", name: "Exercise (30m)", completed: false },
        { id: "4", name: "Code Review", completed: false },
      ],
      toggleHabit: (id) => set((state) => ({
        habits: state.habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h)
      })),
      addHabit: (name) => set((state) => ({
        habits: [...state.habits, { id: crypto.randomUUID(), name, completed: false }]
      })),
      removeHabit: (id) => set((state) => ({
        habits: state.habits.filter(h => h.id !== id)
      })),

      // Scratchpad
      scratchpadContent: '',
      setScratchpadContent: (content) => set({ scratchpadContent: content }),

      // System
      hydrateState: (newState) => set((state) => ({ ...state, ...newState })),
    }),
    {
      name: 'devmike-storage',
      partialize: (state) => ({ 
        pin: state.pin, 
        isAuthenticated: state.isAuthenticated,
        lastAuthenticatedAt: state.lastAuthenticatedAt,
        syncConfig: state.syncConfig, 
        tasks: state.tasks,
        scratchpadContent: state.scratchpadContent,
        calendarEvents: state.calendarEvents,
        localCalendarEvents: state.localCalendarEvents,
        quickLinks: state.quickLinks,
        habits: state.habits,
      }),
    }
  )
);

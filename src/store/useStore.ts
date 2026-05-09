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
}

export interface AppState {
  // Authentication & Security
  pin: string | null;
  isAuthenticated: boolean;
  setPin: (pin: string) => void;
  authenticate: (pin: string) => boolean;
  logout: () => void;

  // Sync Configuration
  syncConfig: SyncConfig;
  setSyncConfig: (config: Partial<SyncConfig>) => void;

  // Task Data
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newCategory: TaskCategory) => void;
  
  // Scratchpad
  scratchpadContent: string;
  setScratchpadContent: (content: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Security
      pin: null,
      isAuthenticated: false,
      setPin: (pin) => set({ pin }),
      authenticate: (inputPin) => {
        const { pin } = get();
        if (pin === inputPin) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),

      // Sync Config
      syncConfig: {
        supabaseUrl: '',
        supabaseAnonKey: '',
        enabled: false,
      },
      setSyncConfig: (config) => set((state) => ({ 
        syncConfig: { ...state.syncConfig, ...config } 
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

      // Scratchpad
      scratchpadContent: '',
      setScratchpadContent: (content) => set({ scratchpadContent: content }),
    }),
    {
      name: 'devmike-storage',
      partialize: (state) => ({ 
        pin: state.pin, 
        syncConfig: state.syncConfig, 
        tasks: state.tasks,
        scratchpadContent: state.scratchpadContent
      }), // Don't persist isAuthenticated
    }
  )
);

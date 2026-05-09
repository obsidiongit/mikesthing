import TaskList from "@/components/tasks/TaskList";
import { CheckSquare, ListTodo, Archive } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden p-6 lg:p-10 animate-stagger-1">
      <header className="mb-8 flex flex-shrink-0 items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/10">
          <CheckSquare size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Tasks Board</h1>
          <p className="text-gray-400 mt-1 font-medium">Manage your workflow and execute priorities.</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Active Column */}
        <div className="bg-surface/50 border border-border rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
          <div className="p-4 border-b border-border/50 bg-background/30 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              Active
            </h2>
            <span className="text-xs font-semibold px-2 py-1 bg-surface rounded-full text-gray-400">Doing</span>
          </div>
          <div className="flex-1 overflow-hidden p-3">
            <TaskList category="Active" />
          </div>
        </div>

        {/* Later Column */}
        <div className="bg-surface/50 border border-border rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
          <div className="p-4 border-b border-border/50 bg-background/30 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ListTodo size={18} className="text-yellow-500" />
              Later
            </h2>
            <span className="text-xs font-semibold px-2 py-1 bg-surface rounded-full text-gray-400">Backlog</span>
          </div>
          <div className="flex-1 overflow-hidden p-3">
            <TaskList category="Later" />
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-surface/30 border border-border/50 rounded-2xl flex flex-col h-full overflow-hidden opacity-90 transition-opacity hover:opacity-100">
          <div className="p-4 border-b border-border/30 bg-background/20 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-300 flex items-center gap-2">
              <Archive size={18} className="text-gray-500" />
              Completed
            </h2>
            <span className="text-xs font-semibold px-2 py-1 bg-surface/50 rounded-full text-gray-500">Done</span>
          </div>
          <div className="flex-1 overflow-hidden p-3">
            <TaskList category="Completed" />
          </div>
        </div>
      </div>
    </div>
  );
}

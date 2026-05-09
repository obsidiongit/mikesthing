import TaskList from "@/components/tasks/TaskList";
import { CheckSquare } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 animate-stagger-1">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/10">
          <CheckSquare size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Tasks Manager</h1>
          <p className="text-gray-400 mt-1 font-medium">Organize and execute your priorities.</p>
        </div>
      </header>

      <div className="max-w-4xl glass-panel rounded-2xl p-8 min-h-[70vh] shadow-2xl flex flex-col">
        <TaskList />
      </div>
    </div>
  );
}

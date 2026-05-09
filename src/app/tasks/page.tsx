import TaskList from "@/components/tasks/TaskList";
import { CheckSquare, ListTodo, Archive } from "lucide-react";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel rounded-2xl p-6 shadow-2xl flex flex-col h-[70vh]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Active
          </h2>
          <TaskList category="Active" />
        </div>
        <div className="glass-panel rounded-2xl p-6 shadow-2xl flex flex-col h-[70vh]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ListTodo size={20} className="text-yellow-500" />
            Later
          </h2>
          <TaskList category="Later" />
        </div>
        <div className="glass-panel rounded-2xl p-6 shadow-2xl flex flex-col h-[70vh] opacity-80">
          <h2 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2">
            <Archive size={20} className="text-gray-500" />
            Completed
          </h2>
          <TaskList category="Completed" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useStore, Task, TaskCategory } from "@/store/useStore";
import { GripVertical, Plus, CheckCircle2, Circle } from "lucide-react";

export default function TaskList() {
  const { tasks, addTask, updateTask, moveTask } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const activeTasks = tasks.filter(t => t.category === "Active");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      status: "not_started",
      priority: "medium",
      category: "Active",
      tags: [],
    });
    setNewTaskTitle("");
  };

  const toggleTaskStatus = (task: Task) => {
    updateTask(task.id, { 
      status: task.status === "completed" ? "not_started" : "completed" 
    });
  };

  // Basic Drag and Drop State
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedTaskId || draggedTaskId === targetId) return;
    
    // In a real app we'd reorder the array. Here we'll just console log it
    // since reordering requires an 'order' property or array manipulation in store.
    console.log("Moved task", draggedTaskId, "to index of", targetId);
    setDraggedTaskId(null);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
        />
        <button 
          type="submit"
          disabled={!newTaskTitle.trim()}
          className="bg-primary text-white p-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2">
        {activeTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No active tasks. Add one above!</div>
        ) : (
          activeTasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, task.id)}
              className={`flex items-center p-3 bg-surface border border-border rounded-lg hover:border-gray-600 transition-colors group ${
                task.status === "completed" ? "opacity-50" : ""
              }`}
            >
              <div className="cursor-grab active:cursor-grabbing text-gray-600 group-hover:text-gray-400 mr-2">
                <GripVertical size={16} />
              </div>
              <button 
                onClick={() => toggleTaskStatus(task)}
                className="text-gray-400 hover:text-white mr-3 flex-shrink-0"
              >
                {task.status === "completed" ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-200"}`}>
                  {task.title}
                </p>
              </div>
              <div className="ml-3 flex-shrink-0">
                <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-semibold ${
                  task.priority === "urgent" ? "bg-red-500/10 text-red-500" :
                  task.priority === "high" ? "bg-orange-500/10 text-orange-500" :
                  task.priority === "medium" ? "bg-yellow-500/10 text-yellow-500" :
                  "bg-gray-500/10 text-gray-400"
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useStore, Task, TaskCategory } from "@/store/useStore";
import { GripVertical, Plus, CheckCircle2, Circle, ChevronDown, ChevronRight, Trash2, Tag, AlertCircle } from "lucide-react";
import RichTextEditor from "../RichTextEditor";

export default function TaskList({ category = "Active" }: { category?: TaskCategory }) {
  const { tasks, addTask, updateTask, moveTask, deleteTask } = useStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>("medium");
  const [newTaskTags, setNewTaskTags] = useState("");
  
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const startTaskEdit = (id: string, title: string) => {
    setEditingTaskId(id);
    setEditTaskTitle(title);
  };

  const saveTaskEdit = (id: string) => {
    if (editTaskTitle.trim()) {
      updateTask(id, { title: editTaskTitle });
    }
    setEditingTaskId(null);
  };

  const filteredTasks = tasks.filter(t => t.category === category);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const parsedTags = newTaskTags.split(",").map(t => t.trim()).filter(Boolean);
    
    addTask({
      title: newTaskTitle,
      status: "not_started",
      priority: newTaskPriority,
      category,
      tags: parsedTags,
    });
    
    setNewTaskTitle("");
    setNewTaskPriority("medium");
    setNewTaskTags("");
    setIsAddingTask(false);
  };

  const toggleTaskStatus = (task: Task) => {
    const isNowCompleted = task.status !== "completed";
    updateTask(task.id, { 
      status: isNowCompleted ? "completed" : "not_started",
      category: isNowCompleted ? "Completed" : "Active"
    });
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("taskId");
    if (!draggedId) return;
    
    moveTask(draggedId, category);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-4">
        {!isAddingTask ? (
          <button 
            onClick={() => setIsAddingTask(true)}
            className="w-full flex items-center justify-center text-left bg-background border border-border border-dashed rounded-lg px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 hover:bg-surface-hover transition-colors"
          >
            <Plus size={16} className="mr-2" /> Add Task
          </button>
        ) : (
          <form onSubmit={handleAddTask} className="bg-surface border border-border rounded-lg p-3 flex flex-col gap-3 shadow-lg">
            <input
              autoFocus
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <AlertCircle size={14} className="text-gray-500 flex-shrink-0" />
                <select
                  className="bg-background border border-border rounded text-xs text-white p-1.5 focus:outline-none focus:border-primary w-full"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                >
                  <option value="none">No Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Tag size={14} className="text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  className="bg-background border border-border rounded text-xs text-white p-1.5 focus:outline-none focus:border-primary w-full"
                  placeholder="tag1, tag2..."
                  value={newTaskTags}
                  onChange={(e) => setNewTaskTags(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-1">
              <button 
                type="button" 
                onClick={() => setIsAddingTask(false)} 
                className="text-xs text-gray-400 hover:text-white hover:bg-surface-hover px-3 py-1.5 rounded transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={!newTaskTitle.trim()} 
                className="bg-primary text-white px-4 py-1.5 rounded text-xs hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      <div 
        className="flex-1 overflow-y-auto space-y-2 pr-2"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No {category.toLowerCase()} tasks.</div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
              className={`flex flex-col bg-surface border border-border rounded-lg hover:border-gray-600 transition-colors group ${
                task.status === "completed" ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center p-3">
                <div className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 mr-2">
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
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  {editingTaskId === task.id ? (
                    <input 
                      autoFocus
                      className="flex-1 bg-background text-white text-sm p-1 rounded border border-border focus:border-primary focus:outline-none"
                      value={editTaskTitle}
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                      onBlur={() => saveTaskEdit(task.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveTaskEdit(task.id);
                        if (e.key === 'Escape') setEditingTaskId(null);
                      }}
                    />
                  ) : (
                    <p 
                      onDoubleClick={() => startTaskEdit(task.id, task.title)}
                      className={`text-sm truncate cursor-text flex-1 ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-200"}`}
                    >
                      {task.title}
                    </p>
                  )}
                  <button 
                    onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                    className="text-gray-500 hover:text-white p-1 rounded transition-colors"
                  >
                    {expandedTaskId === task.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
                <div className="ml-3 flex-shrink-0 flex items-center gap-2">
                  {editingTaskId !== task.id && (
                    <button 
                      onClick={() => startTaskEdit(task.id, task.title)}
                      className="text-gray-500 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                  )}
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
              {expandedTaskId === task.id && (
                <div className="p-3 border-t border-border/50 bg-background/50 flex flex-col gap-4">
                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-2">Description / Notes</div>
                    <RichTextEditor 
                      content={task.description || ""}
                      onChange={(content) => updateTask(task.id, { description: content })}
                      placeholder="Add detailed task notes here..."
                      minHeight="100px"
                    />
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/30">
                    <div className="flex items-center gap-4">
                      {/* Priority */}
                      <div className="flex items-center gap-2">
                        <AlertCircle size={14} className="text-gray-500" />
                        <select
                          className="bg-surface border border-border rounded text-xs text-white p-1 focus:outline-none focus:border-primary"
                          value={task.priority}
                          onChange={(e) => updateTask(task.id, { priority: e.target.value as any })}
                        >
                          <option value="none">No Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-gray-500" />
                        <input
                          type="text"
                          className="bg-surface border border-border rounded text-xs text-white p-1 focus:outline-none focus:border-primary w-32"
                          placeholder="tag1, tag2..."
                          value={task.tags ? task.tags.join(", ") : ""}
                          onChange={(e) => {
                            const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                            updateTask(task.id, { tags });
                          }}
                        />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 px-2 py-1 rounded transition-colors"
                    >
                      <Trash2 size={14} /> Delete Task
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

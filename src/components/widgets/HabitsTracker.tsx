"use client";

import { useStore } from "@/store/useStore";
import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function HabitsTracker() {
  const { habits, toggleHabit, addHabit, removeHabit } = useStore();
  const [newHabitName, setNewHabitName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addHabit(newHabitName);
      setNewHabitName("");
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {habits.map(habit => (
        <div 
          key={habit.id}
          className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${
            habit.completed ? 'bg-surface-hover/50 text-gray-500 border-border/50' : 'bg-surface hover:border-border text-gray-200'
          }`}
        >
          <div className="flex items-center flex-1" onClick={() => toggleHabit(habit.id)}>
            <div className={`w-5 h-5 rounded flex-shrink-0 border mr-3 flex items-center justify-center transition-colors ${
              habit.completed ? 'bg-primary border-primary' : 'border-gray-500 group-hover:border-primary'
            }`}>
              {habit.completed && <Check size={12} className="text-white" />}
            </div>
            <span className={`text-sm select-none ${habit.completed ? 'line-through opacity-70' : ''}`}>
              {habit.name}
            </span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); removeHabit(habit.id); }}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 hover:bg-surface-hover rounded transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      
      <form onSubmit={handleAdd} className="mt-2 flex items-center gap-2">
        <input 
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="New habit..."
          className="flex-1 bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
        />
        <button 
          type="submit"
          disabled={!newHabitName.trim()}
          className="bg-primary/20 text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-primary/20 disabled:hover:text-primary p-1.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
        </button>
      </form>
    </div>
  );
}

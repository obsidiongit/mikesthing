"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

export default function HabitsTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Drink Water (2L)", completed: false },
    { id: "2", name: "Read 10 Pages", completed: true },
    { id: "3", name: "Exercise (30m)", completed: false },
    { id: "4", name: "Code Review", completed: false },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {habits.map(habit => (
        <div 
          key={habit.id}
          onClick={() => toggleHabit(habit.id)}
          className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
            habit.completed ? 'bg-surface-hover/50 text-gray-500' : 'hover:bg-surface-hover text-gray-300'
          }`}
        >
          <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${
            habit.completed ? 'bg-primary border-primary' : 'border-gray-600'
          }`}>
            {habit.completed && <Check size={12} className="text-white" />}
          </div>
          <span className={`text-sm ${habit.completed ? 'line-through' : ''}`}>
            {habit.name}
          </span>
        </div>
      ))}
    </div>
  );
}

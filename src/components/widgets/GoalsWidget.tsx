"use client";

export default function GoalsWidget() {
  const goals = [
    { id: 1, name: "Launch V2 Dashboard", progress: 75 },
    { id: 2, name: "Write 10 Blog Posts", progress: 40 },
    { id: 3, name: "Read 12 Books", progress: 90 },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      {goals.map((goal) => (
        <div key={goal.id} className="w-full">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-300 font-medium">{goal.name}</span>
            <span className="text-gray-500">{goal.progress}%</span>
          </div>
          <div className="w-full bg-surface-hover rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full" 
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

import TaskList from "@/components/tasks/TaskList";
import Scratchpad from "@/components/Scratchpad";
import Pomodoro from "@/components/widgets/Pomodoro";
import HabitsTracker from "@/components/widgets/HabitsTracker";
import GoalsWidget from "@/components/widgets/GoalsWidget";
import QuickLinks from "@/components/widgets/QuickLinks";

export default function Home() {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Content Column */}
      <div className="flex-1 h-full overflow-y-auto p-8 flex flex-col space-y-6">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">Mission Control</h1>
          <p className="text-gray-400 mt-2">Welcome back, Mike.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 min-h-[500px]">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Active Tasks
            </h2>
            <TaskList />
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Scratchpad</h2>
            <Scratchpad />
          </div>
        </div>
      </div>

      {/* Secondary Widget Column */}
      <div className="w-80 2xl:w-96 hidden lg:flex flex-col h-full bg-surface border-l border-border overflow-y-auto p-6 space-y-6">
        <div className="bg-background rounded-xl p-5 border border-border shadow-sm flex flex-col items-center">
          <h3 className="font-semibold mb-3 flex items-center gap-2 w-full">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Focus Timer
          </h3>
          <Pomodoro />
        </div>

        <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
          <h3 className="font-semibold mb-3 text-foreground">Daily Habits</h3>
          <HabitsTracker />
        </div>

        <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
          <h3 className="font-semibold mb-3 text-foreground">OKR / Goals</h3>
          <GoalsWidget />
        </div>
        
        <div className="bg-background rounded-xl p-5 border border-border shadow-sm flex-1 min-h-[250px]">
          <h3 className="font-semibold mb-3 text-foreground">Quick Links</h3>
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}

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
        <header className="mb-4 animate-stagger-1">
          <h1 className="text-4xl font-extrabold text-gradient tracking-tight">Mission Control</h1>
          <p className="text-gray-400 mt-2 font-medium">Welcome back, Mike.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 min-h-[500px]">
          <div className="glass-panel rounded-xl p-6 flex flex-col animate-stagger-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Active Tasks
            </h2>
            <TaskList />
          </div>
          <div className="glass-panel rounded-xl p-6 flex flex-col animate-stagger-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              Scratchpad
            </h2>
            <Scratchpad />
          </div>
        </div>
      </div>

      {/* Secondary Widget Column */}
      <div className="w-80 2xl:w-96 hidden lg:flex flex-col h-full bg-surface/30 backdrop-blur-md border-l border-border overflow-y-auto p-6 space-y-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col items-center animate-stagger-1 transition-all duration-300 hover:-translate-y-1">
          <h3 className="font-semibold mb-3 flex items-center gap-2 w-full text-foreground">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Focus Timer
          </h3>
          <Pomodoro />
        </div>

        <div className="glass-panel rounded-xl p-5 animate-stagger-2 transition-all duration-300 hover:-translate-y-1">
          <h3 className="font-semibold mb-3 text-foreground">Daily Habits</h3>
          <HabitsTracker />
        </div>

        <div className="glass-panel rounded-xl p-5 animate-stagger-3 transition-all duration-300 hover:-translate-y-1">
          <h3 className="font-semibold mb-3 text-foreground">OKR / Goals</h3>
          <GoalsWidget />
        </div>
        
        <div className="glass-panel rounded-xl p-5 flex-1 min-h-[250px] animate-stagger-4 transition-all duration-300 hover:-translate-y-1">
          <h3 className="font-semibold mb-3 text-foreground">Quick Links</h3>
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}

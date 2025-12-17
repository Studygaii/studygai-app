import { MyTasksCard } from "@/components/dashboard/MyTasksCard";
import { ProjectsCard } from "@/components/dashboard/ProjectsCard";
import { CalendarCard } from "@/components/dashboard/CalendarCard";
import { MyGoalsCard } from "@/components/dashboard/MyGoalsCard";
import { RemindersCard } from "@/components/dashboard/RemindersCard";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Column - My Tasks and Goals */}
      <div className="lg:col-span-2 space-y-4">
        <MyTasksCard />
        <MyGoalsCard />
      </div>

      {/* Right Column - Projects, Calendar, Reminders */}
      <div className="space-y-6">
        <ProjectsCard />
        <CalendarCard />
        <RemindersCard />
      </div>
    </div>
  );
};

export default Dashboard;

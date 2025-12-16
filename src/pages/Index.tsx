import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MyTasksCard } from "@/components/dashboard/MyTasksCard";
import { ProjectsCard } from "@/components/dashboard/ProjectsCard";
import { CalendarCard } from "@/components/dashboard/CalendarCard";
import { MyGoalsCard } from "@/components/dashboard/MyGoalsCard";
import { RemindersCard } from "@/components/dashboard/RemindersCard";

const Index = () => {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - My Tasks and Goals */}
          <div className="lg:col-span-2 space-y-6">
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
      </main>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MyTasksCard } from "@/components/dashboard/MyTasksCard";
import { ProjectsCard } from "@/components/dashboard/ProjectsCard";
import { CalendarCard } from "@/components/dashboard/CalendarCard";
import { MyGoalsCard } from "@/components/dashboard/MyGoalsCard";
import { RemindersCard } from "@/components/dashboard/RemindersCard";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-card">
      <AppSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content with border and grid background */}
      <main className="flex-1 flex flex-col min-h-0 relative border-l border-border rounded-tl-3xl overflow-hidden bg-background">
        {/* Grid Background that fades */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 80%)',
          }}
        />
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
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
        </div>
        
        <FloatingActionButton />
      </main>
    </div>
  );
};

export default Index;

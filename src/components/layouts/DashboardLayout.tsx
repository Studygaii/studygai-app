import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-transparent">
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content with border and grid background */}
      <main className="flex-1 flex flex-col min-h-0 relative border-l border-border rounded-tl-3xl overflow-hidden bg-transparent">
        {/* Grid Background that fades */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.7) 2px, transparent 2px),
              linear-gradient(to bottom, hsl(var(--border) / 0.7) 2px, transparent 2px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 80%)',
          }}
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
          <DashboardHeader />
          {children}
        </div>

        <FloatingActionButton />
      </main>
    </div>
  );
};

export default DashboardLayout;

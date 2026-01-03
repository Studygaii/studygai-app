import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MyCoursesCard } from "@/components/dashboard/MyCoursesCard";
import { MyTasksCard } from "@/components/dashboard/MyTasksCard";
import { MyGoalsCard } from "@/components/dashboard/MyGoalsCard";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";
import { DashboardStreaks } from "@/components/dashboard/DashboardStreaks";
import { DashboardChatHistory } from "@/components/dashboard/DashboardChatHistory";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Column - My Tasks and Goals */}
      <div className="lg:col-span-2 space-y-4">
        <MyCoursesCard />
        {/* <MyGoalsCard /> */}
      </div>

      {/* Right Column - Quick Actions, Streaks, Chat */}
      <div className="space-y-6 flex flex-col h-full">
        <DashboardQuickActions />
        <DashboardStreaks />
        <DashboardChatHistory />
      </div>
    </div>
  );
};

export default Dashboard;

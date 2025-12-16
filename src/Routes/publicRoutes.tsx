
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout>
      <Dashboard />
    </DashboardLayout>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

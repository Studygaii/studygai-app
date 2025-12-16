
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

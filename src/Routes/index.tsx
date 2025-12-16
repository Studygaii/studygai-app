
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import App from "@/App";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...publicRoutes, ...protectedRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

import { Navigate, RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import OtpSent from "@/pages/auth/OtpSent";
import ConfirmOtp from "@/pages/auth/ConfirmOtp";
import GoogleCallback from "@/pages/auth/GoogleCallback";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout><Dashboard /></DashboardLayout>,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/otp-sent",
    element: <OtpSent />,
  },
  {
    path: "/auth/verify-otp",
    element: <ConfirmOtp />,
  },
  {
    path: "/auth/callback",
    element: <GoogleCallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

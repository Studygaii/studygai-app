import { Navigate, RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CourseDetail from "@/pages/CourseDetail";
import Quizzes from "@/pages/Quizzes";
import Flashcards from "@/pages/Flashcards";
import Exams from "@/pages/Exams";
import GroupChats from "@/pages/GroupChats";
import GroupChatRoom from "@/pages/GroupChatRoom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import OtpSent from "@/pages/auth/OtpSent";
import ConfirmOtp from "@/pages/auth/ConfirmOtp";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/courses/:courseId",
    element: (
      <DashboardLayout>
        <CourseDetail />
      </DashboardLayout>
    ),
  },
  {
    path: "/quizzes",
    element: (
      <DashboardLayout>
        <Quizzes />
      </DashboardLayout>
    ),
  },
  {
    path: "/flashcards",
    element: (
      <DashboardLayout>
        <Flashcards />
      </DashboardLayout>
    ),
  },
  {
    path: "/exams",
    element: (
      <DashboardLayout>
        <Exams />
      </DashboardLayout>
    ),
  },
  {
    path: "/groupchats",
    element: (
      <DashboardLayout>
        <GroupChats />
      </DashboardLayout>
    ),
  },
  {
    path: "/groupchats/:groupChatId",
    element: (
      <DashboardLayout>
        <GroupChatRoom />
      </DashboardLayout>
    ),
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
    path: "*",
    element: <NotFound />,
  },
];

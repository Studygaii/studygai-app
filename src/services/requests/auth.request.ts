import api from "../api";
import {
  LoginValues,
  SignupValues,
  ForgotPasswordValues,
  ResetPasswordValues,
  OtpValues
} from "@/lib/validations/auth";

class AuthRequest {
  private prefix = "/auth";

  login(data: LoginValues) {
    return api.post(`${this.prefix}/login`, data);
  }

  signup(data: SignupValues) {
    return api.post(`${this.prefix}/register`, {
      username: data.fullName,
      email: data.email,
      password: data.password,
    });
  }

  forgotPassword(data: ForgotPasswordValues) {
    return api.post(`${this.prefix}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordValues) {
    return api.post(`${this.prefix}/reset-password`, data);
  }

  verifyOtp(data: OtpValues) {
    return api.post(`${this.prefix}/verify-otp`, data);
  }

  resendOtp(email: string) {
    return api.post(`${this.prefix}/resend-otp`, { email });
  }

  initiateGoogleAuth() {
    // Redirect to backend Google OAuth endpoint
    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
    window.location.href = `${backendUrl}/auth/google`;
  }

  handleGoogleCallback(token: string) {
    localStorage.setItem("token", token);
    return { token };
  }
}

export const authRequests = new AuthRequest();

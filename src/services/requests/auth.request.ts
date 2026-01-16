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
    return api.post(`${this.prefix}/signup`, data);
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
}

export const authRequests = new AuthRequest();

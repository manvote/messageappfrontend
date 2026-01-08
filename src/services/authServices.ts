import { clearToken } from '../utils/tokenStorage';
import { api } from './api';

/* -------- Types -------- */

export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  data: string;
  success: boolean;
  token: string;
}

/* -------- API Calls -------- */

export const login = async (phoneOrEmail: string): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>('/login', {
      phoneOrEmail,
    });
    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Login failed: ${message}`);
  }
};

export const verifyOTP = async (otp: string): Promise<VerifyOtpResponse> => {
  try {
    const { data } = await api.post<VerifyOtpResponse>('/verify-otp', {
      otp,
    });
    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`OTP verification failed: ${message}`);
  }
};
export const logout = async (): Promise<void> => {
  clearToken();
};

// src/redux/services/authService.ts
import axios from "axios";

export const sendOtpApi = async (phone: string) => {
  const response = await axios.post("http://localhost:5000/api/auth/send-otp", { phone });
  return response.data;
};

export const verifyOtpApi = async (phone : string, otp : string) => {
  const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { phone, otp });

  return response.data;

}


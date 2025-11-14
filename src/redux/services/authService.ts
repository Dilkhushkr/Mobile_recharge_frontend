// src/redux/services/authService.ts
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ ensures cookies are included globally

export const sendOtpApi = async (phone: string) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/send-otp",
    { phone },
 // ✅ for this specific call (optional if using global default)
  );
  return response.data;
};

export const verifyOtpApi = async (phone: string, otp: string) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/verify-otp",
    { phone, otp },
 // ✅ very important
  );
  return response;
};

// src/redux/services/authService.ts
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ ensures cookies are included globally

export const sendOtpApi = async (phone: string) => {
  const response = await axios.post(
    "https://mobile-recharge-backend-11.onrender.com/api/auth/send-otp",
    { phone },
 // ✅ for this specific call (optional if using global default)
  );
  return response.data;
};

export const verifyOtpApi = async (phone: string, otp: string) => {
  const response = await axios.post(
    "https://mobile-recharge-backend-11.onrender.com/api/auth/verify-otp",
    { phone, otp },
 // ✅ very important
  );
  return response;
};

export const createBookingApi = async (data: any) => {

  const response = await axios.post(
    "https://mobile-recharge-backend-11.onrender.com/api/auth/create-booking",
    data
  )
  return response.data;

}


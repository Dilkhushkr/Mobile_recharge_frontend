// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const navigate = useNavigate();

  const sendOtop = async () => {
    try{
      const response  = await axios.post("http://localhost:5000/api/auth/send-otp", { phone })
      console.log("OTP send response:", response);
      if(response.status === 200){
        alert("OTP sent successfully");
        setIsOtpVisible(true);
      }
    

    }catch(error){
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

   const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { phone, otp });
      console.log("OTP verify response:", response);
      if (response.status === 200 ) {
        alert("OTP Verified Successfully!");
        navigate("/dashboard");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Mobile Verification</h2>

        {!isOtpVisible ? (
          <>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendOtop}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              Send Otp
            </button>
          </>
        ) : (
          <>
            <label className="block text-gray-700 mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

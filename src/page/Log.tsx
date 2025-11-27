// src/components/OtpAuthForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtpRequest } from "../redux/slices/sendOtpSlice";
import { verifyOtpRequest } from "../redux/slices/verfiyOtpSlice";
import type { RootState } from "../redux/store/rootReducer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OtpAuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const navigate = useNavigate();

  const { loading: sendLoading, success: sendSuccess, error: sendError } = useSelector(
    (state: RootState) => state.sendOtp
  );
  const { loading: verifyLoading, success: verifySuccess, error: verifyError } = useSelector(
    (state: RootState) => state.verifyOtp
  );

  useEffect(() => {
    if (sendSuccess) {
      setShowOtpBox(true);
    }
  }, [sendSuccess]);

  useEffect(() => {
    if (verifySuccess) {
      navigate("/dashboard");
    }
  }, [verifySuccess, navigate]);

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    dispatch(sendOtpRequest({ phone }));
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    dispatch(verifyOtpRequest({ phone, otp }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        className="bg-gray-900 border border-yellow-500 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          🔐 Mobile Authentication
        </h2>

        {!showOtpBox ? (
          <>
            {/* Phone Input */}
            <label className="block text-gray-300 font-medium mb-2">
              Enter your Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-yellow-500 outline-none mb-4 transition-all"
            />

            <button
              onClick={handleSendOtp}
              disabled={sendLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2.5 rounded-full font-semibold transition-all"
            >
              {sendLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            {sendError && (
              <p className="text-red-400 text-sm mt-3 text-center">{sendError}</p>
            )}
          </>
        ) : (
          <>
            {/* OTP Input */}
            <label className="block text-gray-300 font-medium mb-2">
              Enter the OTP sent to {phone}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-yellow-500 outline-none mb-4 text-center tracking-widest transition-all"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={verifyLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2.5 rounded-full font-semibold transition-all"
            >
              {verifyLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {verifyError && (
              <p className="text-red-400 text-sm mt-3 text-center">{verifyError}</p>
            )}
            {verifySuccess && (
              <p className="text-green-400 text-sm mt-3 text-center font-semibold">
                ✅ OTP Verified Successfully!
              </p>
            )}

            <button
              onClick={() => setShowOtpBox(false)}
              className="mt-5 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-medium transition-all"
            >
              Resend OTP
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OtpAuthForm;

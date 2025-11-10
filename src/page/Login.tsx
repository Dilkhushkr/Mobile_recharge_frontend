// src/components/OtpAuthForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtpRequest } from "../redux/slices/sendOtpSlice";
import { verifyOtpRequest } from "../redux/slices/verfiyOtpSlice";
import type { RootState } from "../redux/store/rootReducer";
import { useNavigate } from "react-router-dom";

const OtpAuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const navigate = useNavigate();

  // Redux state selectors
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

  // Handle send OTP
  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    dispatch(sendOtpRequest({ phone }));
  };

  // Handle verify OTP
  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    dispatch(verifyOtpRequest({ phone, otp }));
  };
  useEffect(() => {
    if (verifySuccess) {
      navigate("/dashboard");
    }
  }, [verifySuccess, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md transition-all">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Mobile Authentication
        </h2>

        {!showOtpBox ? (
          <>
            {/* Phone Input */}
            <label className="block text-gray-700 font-medium mb-2">
              Enter your Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
            />

            <button
              onClick={handleSendOtp}
              disabled={sendLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-all"
            >
              {sendLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            {sendError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {sendError}
              </p>
            )}
          </>
        ) : (
          <>
            {/* OTP Input */}
            <label className="block text-gray-700 font-medium mb-2">
              Enter the OTP sent to {phone}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4 tracking-widest text-center"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={verifyLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all"
            >
              {verifyLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {verifyError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {verifyError}
              </p>
            )}
            {verifySuccess && (
              <p className="text-green-500 text-sm mt-3 text-center font-semibold">
                ✅ OTP Verified Successfully!
              </p>
            )}

            <button
              onClick={() => setShowOtpBox(false)}
              className="mt-4 text-indigo-600 text-sm hover:underline"
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpAuthForm;

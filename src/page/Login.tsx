import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { loginRequest } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store/rootReducer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {  email,password };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); 
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
         

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


           <div className="mb-4">
            <label className="block text-gray-300 mb-1">password</label>
            <input 
            type="password"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

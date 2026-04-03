import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store/rootReducer';


function Signup() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();


    const {loading,error,signupData} = useSelector((state: RootState) => state.auth);


    const handleSubmit = (e:any)=>{
        e.preventDefault();
        const payload = { name, email, password };
        console.log('Signup payload:', payload);
        dispatch(signupRequest(payload));
        setName("");
        setEmail("");
        setPassword("");
    }

    useEffect(() => {
        if(signupData){
            navigate("/");
        }
    },[signupData])


  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <motion.div 
            className="bg-gray-900 border border-yellow-500 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            🔐 Signup page 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
        />
        <input
            type="email"
            placeholder="Email Address"
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-xl transition-all duration-300 disabled:opacity-60"
        >
        {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && (
            <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
        )}
        </form>
        </motion.div>
    </div>
  )
}

export default Signup
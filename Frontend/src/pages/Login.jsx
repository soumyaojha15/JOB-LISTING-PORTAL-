import { useContext, useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContent } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiKey } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";

const ModernLogin = () => {
  const { backendUrl, checkAuth, getJobSeekerProfile } = useContext(AppContent);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("Submitting:", { email, password });

      const { data } = await axios.post(
        backendUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Response:", data);

      if (data.success) {
        await checkAuth();
        await getJobSeekerProfile();
        navigate("/");
        toast.success(data.message || "Login Successfully");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("axios error", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-blue-200 to-purple-400 px-4">
      {/* Card */}
      <div className="max-w-md w-full bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-black text-center mb-6 tracking-wide">
          JOB PORTAL
        </h1>

        <h3 className="font-bold text-black text-center mb-6 tracking-wide">
          Login To your Account
        </h3>
        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div className="mb-4 relative">
            <MdEmail className="absolute top-3 left-3 text-red-700" size={20} />
            <input
              type="email"
              placeholder="Enter Your email"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <MdLock className="absolute top-3 left-3 text-red-700" size={20} />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform mb-4">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-black mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-500 font-bold hover:underline inline-flex items-center gap-2"
          >
            <FaUserPlus className="text-red-500" />
            Sign Up
          </Link>
        </p>

        {/* Forgot Password */}
        <p className="text-center text-black mt-2">
          <Link
            to="/forgot-password"
            className="text-red-500 font-bold hover:underline inline-flex items-center gap-2"
          >
            <FiKey className="text-red-500" />
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ModernLogin;

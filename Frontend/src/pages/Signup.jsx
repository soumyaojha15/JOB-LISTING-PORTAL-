import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import { AppContent } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ModernSignUp = () => {
  // Default role set to "applicant"
  const [role, setRole] = useState("applicant");

  const { backendUrl, setIsLoggedin } = useContext(AppContent);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      console.log("Submitting:", { name, email, password, role });

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/register",
        { name, email, password, role },
        { withCredentials: true }
      );

      console.log("Response:", data);

      if (data.success) {
        setIsLoggedin(true);
        navigate("/");
        toast.success(data.message || "Account Created Successfully");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("axios error", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-200 to-purple-400 px-4">
      {/* Card */}
      <div className="max-w-md w-full bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-black text-center mb-6 tracking-wide">
          JOB PORTAL
        </h1>
        <h3 className="font-bold text-black text-center mb-6 tracking-wide">
          Create your Account
        </h3>

        <form onSubmit={onSubmitHandler}>
          {/* Name */}
          <div className="mb-4 relative">
            <MdPerson
              className="absolute top-3 left-3 text-red-700"
              size={20}
            />
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>

          {/* Email */}
          <div className="mb-4 relative">
            <MdEmail className="absolute top-3 left-3 text-red-700" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Enter Your gmail"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <MdLock className="absolute top-3 left-3 text-red-700" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>

          {/* Select Role */}
          <div className="mb-6">
            <label className="block text-black font-semibold mb-2">
              Select Role
            </label>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 bg-white/30 rounded-xl px-4 py-2 cursor-pointer hover:bg-white/50 transition">
                <input
                  type="radio"
                  name="role"
                  value="applicant"
                  checked={role === "applicant"}
                  onChange={() => setRole("applicant")}
                  className="accent-blue-400"
                />
                Applicant
              </label>

              <label className="flex items-center gap-2 bg-white/30 rounded-xl px-4 py-2 cursor-pointer hover:bg-white/50 transition">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === "recruiter"}
                  onChange={() => setRole("recruiter")}
                  className="accent-purple-400"
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-black mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ModernSignUp;

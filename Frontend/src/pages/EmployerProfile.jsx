import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContext";
import axios from "axios";
import {
  MdAddCircle,
  MdLogout,
  MdWorkOutline,
  MdPeopleOutline,
} from "react-icons/md";

const EmployerProfile = () => {
  const { backendUrl, setIsLoggedin, setUserData, userData } =
    useContext(AppContent);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedin(false);
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-indigo-100 pt-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {userData?.name || "Your Company Name"}
          </h1>
          <p className="text-indigo-600 font-semibold mt-1">
            {userData?.email || "No email available"}
          </p>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Welcome back! Manage your jobs, review applicants, and update listings here.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Post Job */}
          <ActionCard
            icon={<MdAddCircle size={40} />}
            title="Post a Job"
            desc="Create new job listings and attract top talent quickly."
            bgGradient="from-blue-500 to-indigo-600"
            onClick={() => navigate("/employer/create-job")}
          />

          {/* Review Applicants */}
          <ActionCard
            icon={<MdPeopleOutline size={40} />}
            title="Review Applicants"
            desc="Check applications, shortlist candidates, and schedule interviews."
            bgGradient="from-green-500 to-teal-500"
            onClick={() => navigate("/employer/dashboard")}
          />

          {/* Manage Jobs */}
          <ActionCard
            icon={<MdWorkOutline size={40} />}
            title="Manage Jobs"
            desc="Edit, pause, or remove your job postings easily."
            bgGradient="from-yellow-400 to-orange-500"
            onClick={() => navigate("/joblist")}
          />

          {/* Logout */}
          <ActionCard
            icon={<MdLogout size={40} />}
            title="Logout"
            desc="Sign out from your account securely."
            bgGradient="from-red-500 to-red-600"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;

/* --- COMPONENT --- */
const ActionCard = ({ icon, title, desc, bgGradient, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center gap-3 p-6 rounded-3xl shadow-lg
      cursor-pointer transform transition hover:scale-105 hover:shadow-2xl
      text-white bg-linear-to-r ${bgGradient}
    `}
  >
    {icon}
    <h2 className="text-xl font-bold text-center">{title}</h2>
    <p className="text-center text-sm">{desc}</p>
  </div>
);

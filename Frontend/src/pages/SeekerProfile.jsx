import { useContext, useEffect } from "react";
import { AppContent } from "../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdPictureAsPdf,
  MdLogout,
  MdEdit,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const SeekerProfile = () => {
  const {
    backendUrl,
    setIsLoggedin,
    setUserData,
    userData,
    jobSeekerProfile,
    getJobSeekerProfile,
  } = useContext(AppContent);

  const navigate = useNavigate();

  useEffect(() => {
    getJobSeekerProfile();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      `${backendUrl}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
    setIsLoggedin(false);
    setUserData(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-amber-50 flex justify-center py-16 px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 space-y-12">
        {/* PROFILE HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-8">
          {jobSeekerProfile?.profilePic ? (
            <img
              src={`${backendUrl}/${jobSeekerProfile.profilePic}`}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow"
            />
          ) : (
            <FaUserCircle className="w-28 h-28 text-gray-400" />
          )}

          <div className="flex-1 text-center md:text-left space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {jobSeekerProfile?.fullName || userData?.name}
            </h1>
            <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start">
              <MdEmail /> {userData?.email}
            </p>
            <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start">
              <MdPhone /> {jobSeekerProfile?.contactNumber || "Not provided"}
            </p>
            <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start">
              <MdLocationOn /> {jobSeekerProfile?.address || "Not provided"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/seeker/edit-profile")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              <MdEdit className="inline mr-1" />
              Edit
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-red-600 font-medium text-white hover:bg-red-400 transition"
            >
              <MdLogout className="inline mr-1" />
              Logout
            </button>
          </div>
        </div>

        {/* SKILLS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {jobSeekerProfile?.skills?.length ? (
              jobSeekerProfile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 font-medium text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 italic">No skills added</p>
            )}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Experience</h2>

          {jobSeekerProfile?.experience?.length ? (
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              {jobSeekerProfile.experience.map((exp, i) => (
                <li key={i} className="text-base">
                  {exp}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No experience added</p>
          )}
        </div>

        {/* RESUME */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
          {jobSeekerProfile?.resume ? (
            <a
              href={`${backendUrl}/${jobSeekerProfile.resume}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              <MdPictureAsPdf />
              Download Resume
            </a>
          ) : (
            <p className="text-gray-500 italic">No resume uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;

import { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContext";
import { FaUserCircle } from "react-icons/fa";

import {
  MdHome,
  MdWork,
  MdInfo,
  MdLogin,
  MdPersonAdd,
  MdDashboard,
} from "react-icons/md";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { isLoggedin, userData, jobSeekerProfile, backendUrl } =
    useContext(AppContent);

  const linkClass =
    "flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition";
  const activeClass =
    "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1";

  /*  Profile Icon  */
  const ProfileIcon = () => (
    <div
      onClick={() => {
        if (userData?.userType === "recruiter") {
          navigate("/employer-profile");
        } else if (userData?.userType === "applicant") {
          navigate("/seeker-profile");
        }
      }}
      className="cursor-pointer hover:scale-105 transition"
    >
      {userData?.userType === "applicant" && jobSeekerProfile?.profilePic ? (
        <img
          src={`${backendUrl}/${jobSeekerProfile.profilePic}`}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
        />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-700 dark:text-gray-300" />
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-50 dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-16">
        {/* Brand Name */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-wide text-blue-600 hover:text-blue-700 transition"
        >
          Job<span className="text-gray-800 dark:text-white">Portal</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClass} ${isActive && activeClass}`
              }
            >
              <MdHome /> Home
            </NavLink>
          </li>

          {isLoggedin && (
            <li>
              <NavLink
                to="/joblist"
                className={({ isActive }) =>
                  `${linkClass} ${isActive && activeClass}`
                }
              >
                <MdWork /> Jobs
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkClass} ${isActive && activeClass}`
              }
            >
              <MdInfo /> About
            </NavLink>
          </li>

          {isLoggedin && (
            <li>
              <NavLink
                to={
                  userData?.userType === "recruiter"
                    ? "/employer/dashboard"
                    : "/seeker/dashboard"
                }
                className={({ isActive }) =>
                  `${linkClass} ${isActive && activeClass}`
                }
              >
                <MdDashboard /> Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedin ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <MdLogin /> Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <MdPersonAdd /> Signup
              </Link>
            </>
          ) : (
            <ProfileIcon />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-gray-700 dark:text-gray-300"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg px-6 py-4 space-y-4 text-gray-700 dark:text-gray-300">
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
            <MdHome /> Home
          </NavLink>

          {isLoggedin && (
            <NavLink
              to="/joblist"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              <MdWork /> Jobs
            </NavLink>
          )}

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            <MdInfo /> About
          </NavLink>
          {isLoggedin && (
            <NavLink
              to={
                userData?.userType === "recruiter"
                  ? "/employer/dashboard"
                  : "/seeker/dashboard"
              }
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              <MdDashboard /> Dashboard
            </NavLink>
          )}

          {!isLoggedin ? (
            <>
              <Link to="/login" className="flex gap-2 text-blue-600">
                <MdLogin /> Login
              </Link>
              <Link to="/signup" className="flex gap-2 text-blue-600">
                <MdPersonAdd /> Signup
              </Link>
            </>
          ) : (
            <ProfileIcon />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

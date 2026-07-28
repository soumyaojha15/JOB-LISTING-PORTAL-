import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
                                                                                                    
  const [isLoggedin, setIsLoggedin] = useState(null);
  const [userData, setUserData] = useState(null);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);

  // 🔹 JOB STATES
  const [jobs, setJobs] = useState([]);
  const [singleJob, setSingleJob] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsLoggedin(true);
        setUserData(res.data.userData);
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch {
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  const getJobSeekerProfile = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/jobseeker/getprofile",
        { withCredentials: true }
      );

      if (data.success) {
        setJobSeekerProfile(data.profile);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 GET ALL JOBS
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/jobs/alljobs"
      );

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("Jobs fetch error:", error);
    }
  };

  // 🔹 GET SINGLE JOB
  const getSingleJob = async (id) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/jobs/getonejob/${id}`
      );

      if (data.success) {
        setSingleJob(data.job);
      }
    } catch (error) {
      console.error("Single job fetch error:", error);
    }
  };

  // SEARCH JOBS
const searchJobs = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();

    const { data } = await axios.get(
      `${backendUrl}/api/jobs/search?${params}`
    );

    if (data.success) {
      setJobs(data.jobs);
    }
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        jobSeekerProfile,
        getJobSeekerProfile,
        searchJobs,

        checkAuth,

        // 🔹 JOB CONTEXT
        jobs,
        getAllJobs,
        singleJob,
        getSingleJob,
      }}
    >
      {props.children}
    </AppContent.Provider>
  );
};

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../Context/AppContext";
import { toast } from "react-toastify";
import { MdLocationOn, MdWork, MdCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SeekerDashboard = () => {
  const { backendUrl } = useContext(AppContent);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/applications/appliedjobs`,
          { withCredentials: true }
        );

        if (data.success) {
          setAppliedJobs(data.appliedJobs);
        } else {
          toast.error(data.message || "Failed to fetch applied jobs");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      setLoading(false);
    };

    fetchAppliedJobs();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!appliedJobs.length) {
    return (
      <div className="text-center mt-10 text-gray-700">
        You haven’t applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Applied Jobs</h1>

        <div className="space-y-4">
          {appliedJobs.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{app.job.jobTitle}</h2>
                <p className="text-indigo-600 font-medium">
                  {app.job.companyName}
                </p>

                <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MdLocationOn /> {app.job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdWork /> {app.job.jobType}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdCalendarToday /> Applied on{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <span
                  className={`px-3 py-1 rounded-full text-white font-medium ${
                    app.status === "Pending"
                      ? "bg-yellow-500"
                      : app.status === "Accepted"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {app.status}
                </span>
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => navigate(`/jobs/${app.job._id}`)}
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;

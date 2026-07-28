import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { MdPeople, MdWorkOutline, MdArrowForward } from "react-icons/md";
import { toast } from "react-toastify";

const EmployerDashboard = () => {
  const { backendUrl } = useContext(AppContent);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/applications/myjobs/applicants`,
        { withCredentials: true },
      );

      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to fetch jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-14 h-14 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalApplicants = jobs.reduce(
    (sum, job) => sum + job.applicantCount,
    0,
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* DASHBOARD HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Employer Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your jobs and review applicants
            </p>
          </div>

          {/* STATS */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-blue-100 px-6 py-4 rounded-2xl text-center shadow hover:shadow-lg transition">
              <p className="text-2xl font-bold text-blue-600">{jobs.length}</p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>

            <div className="bg-indigo-100 px-6 py-4 rounded-2xl text-center shadow hover:shadow-lg transition">
              <p className="text-2xl font-bold text-indigo-600">
                {totalApplicants}
              </p>
              <p className="text-sm text-gray-600">Total Applicants</p>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
            <MdWorkOutline className="mx-auto text-7xl text-blue-500 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700">
              No applications yet
            </h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Once candidates apply to your jobs, they will appear here for
              review.
            </p>
          </div>
        ) : (
          <>
            {/* JOB LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="
                group bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between
                hover:shadow-2xl transition-all duration-300
              "
                >
                  {/* Job Info */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {job.jobTitle}
                    </h2>
                    <p className="text-indigo-600 font-medium mt-1">
                      {job.companyName}
                    </p>

                    {/* Applicants */}
                    <div className="flex items-center gap-2 mt-4 text-gray-600">
                      <MdPeople className="text-xl text-blue-600" />
                      <span className="text-sm font-medium">
                        {job.applicantCount} applicants
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() =>
                      navigate(`/employer/job/${job._id}/applicants`)
                    }
                    className="
                  mt-6 flex items-center justify-center gap-2
                  bg-linear-to-r from-blue-600 to-indigo-600
                  text-white py-3 rounded-xl font-semibold
                  hover:opacity-90 transition
                "
                  >
                    View Applicants
                    <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;

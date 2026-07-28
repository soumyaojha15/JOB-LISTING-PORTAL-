import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContext";
import {
  MdLocationOn,
  MdWork,
  MdCalendarToday,
  MdEdit,
  MdDelete,
  MdAttachMoney,
  MdCheckCircle,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, singleJob, getSingleJob, userData } =
    useContext(AppContent);

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const isRecruiter = userData?.userType === "recruiter";

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      await getSingleJob(id);
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  if (loading || !singleJob) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-14 h-14 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const applyJob = async () => {
    if (applied) return;
    setApplying(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/applications/applyjob/${id}`,
        { job: id },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Applied successfully!");
        setApplied(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setApplying(false);
  };

  const deleteJob = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/jobs/deletejob/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Job deleted successfully!");
        navigate("/joblist");
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/*MAIN PAGE WRAPPER */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* HEADER INSIDE WRAPPER */}
        <div className="px-8 py-10 border-b bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between gap-6">
            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                {singleJob.jobTitle}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {singleJob.companyName}
              </p>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            {isRecruiter && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/employer/edit-job/${id}`)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  <MdEdit /> Edit
                </button>

                <button
                  onClick={deleteJob}
                  className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 📌 CONTENT */}
        <div className="p-8">
          {/* META INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <MdLocationOn className="text-blue-600" size={22} />
              {singleJob.location}
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <MdWork className="text-blue-600" size={22} />
              {singleJob.jobType}
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <MdCalendarToday className="text-blue-600" size={22} />
              Apply by{" "}
              {singleJob.lastDateToApply
                ? new Date(singleJob.lastDateToApply).toLocaleDateString()
                : "N/A"}
            </div>
          </div>

          {/* JOB DESCRIPTION */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {singleJob.jobDescription}
            </p>
          </div>

          {/* JOB DETAILS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <MdWork className="text-indigo-600" />
              <span>
                <strong>Role:</strong> {singleJob.jobRole}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MdCheckCircle className="text-indigo-600" />
              <span>
                <strong>Experience:</strong> {singleJob.experienceRequired}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MdAttachMoney className="text-indigo-600" />
              <span>
                <strong>Salary:</strong>{" "}
                {singleJob.salaryRange || "Not specified"}
              </span>
            </div>

            <div>
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {singleJob.skillsRequired?.length ? (
                  singleJob.skillsRequired.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Not specified</span>
                )}
              </div>
            </div>
          </div>

          {/* APPLY BUTTON */}
          {userData?.userType === "applicant" && (
            <div className="mt-12">
              <button
                onClick={applyJob}
                disabled={applying || applied}
                className={`px-10 py-3 rounded-xl text-lg font-semibold text-white transition ${
                  applied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                }`}
              >
                {applied
                  ? "Already Applied"
                  : applying
                  ? "Applying..."
                  : "Apply Now"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

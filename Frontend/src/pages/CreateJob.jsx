import { useContext, useEffect, useState } from "react";
import { AppContent } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const CreateJob = () => {
  const { backendUrl, singleJob, getSingleJob } = useContext(AppContent);
  const navigate = useNavigate();
  const { id } = useParams(); // job id for edit

  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [jobType, setJobType] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  // Fetch job if editing
  useEffect(() => {
    if (id) getSingleJob(id);
  }, [id]);

  // Fill form when job data arrives
  useEffect(() => {
    if (singleJob && id) {
      setCompanyName(singleJob.companyName || "");
      setLocation(singleJob.location || "");
      setJobTitle(singleJob.jobTitle || "");
      setShortDescription(singleJob.shortDescription || "");
      setJobDescription(singleJob.jobDescription || "");
      setJobRole(singleJob.jobRole || "");
      setSalaryRange(singleJob.salaryRange || "");
      setExperienceRequired(singleJob.experienceRequired || "");
      setSkillsRequired(singleJob.skillsRequired?.join(", ") || "");
      setJobType(singleJob.jobType || "");
      setLastDateToApply(singleJob.lastDateToApply?.split("T")[0] || "");
      setIsEditing(true);
    }
  }, [singleJob]);

  // Submit job (create/update)
  const submitJob = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        companyName,
        location,
        jobTitle,
        shortDescription,
        jobDescription,
        jobRole,
        salaryRange,
        experienceRequired,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()),
        jobType,
        lastDateToApply,
      };

      const url =
        backendUrl +
        (isEditing ? `/api/jobs/updatejob/${id}` : "/api/jobs/createjob");
      const method = isEditing ? "PUT" : "POST";

      const { data } = await axios({ method, url, data: payload, withCredentials: true });

      if (data.success) {
        toast.success(isEditing ? "Job updated successfully!" : "Job created successfully!");
        navigate("/joblist");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      {/* Page Background */}
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-indigo-50 pt-24 pb-12 px-6 md:px-12 lg:px-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
          {isEditing ? "Edit Job" : "Create Job"}
        </h1>

        {/* Form Section */}
        <form
          onSubmit={submitJob}
          className="space-y-8 bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Company Details</h2>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Job Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Job Information</h2>
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Short Description"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
            <textarea
              placeholder="Job Description"
              rows={4}
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Job Role"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
            />
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
            <input
              type="text"
              placeholder="Salary Range"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
            <input
              type="text"
              placeholder="Experience Required"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
            />
            <select
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Select Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
            <input
              type="date"
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={lastDateToApply}
              onChange={(e) => setLastDateToApply(e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold text-lg transition transform hover:-translate-y-0.5">
            {isEditing ? "Update Job" : "Create Job"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJob;

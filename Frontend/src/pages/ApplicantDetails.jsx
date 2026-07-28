import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../Context/AppContext";
import { toast } from "react-toastify";
import { MdEmail, MdCheckCircle, MdCancel } from "react-icons/md";

const ApplicantDetails = () => {
  const { applicationId } = useParams();
  const { backendUrl } = useContext(AppContent);
  const [application, setApplication] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/applications/oneapplication/${applicationId}`,
          { withCredentials: true }
        );

        if (data.success) {
          setApplication(data.applicant);
        } else {
          toast.error(data.message);
        }
      } catch {
        toast.error("Failed to fetch applicant");
      }
    };

    fetchApplication();
  }, [backendUrl, applicationId]);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/applications/updateapplicationstatus/${applicationId}`,
        { status },
        { withCredentials: true }
      );

      if (data.success) {
        setApplication(data.application);
        toast.success(`Application ${status.toLowerCase()} successfully`);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to update status");
    }
    setUpdating(false);
  };

  if (!application) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const { jobSeeker, status } = application;
  const isFinal = status === "Accepted" || status === "Rejected";

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Shortlisted: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {jobSeeker.fullName}
            </h1>
            <p className="flex items-center gap-2 text-gray-600 mt-1">
              <MdEmail />
              {jobSeeker.user.email}
            </p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyle[status]}`}
          >
            {status}
          </span>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Skills</h3>
            <p className="text-gray-600">
              {jobSeeker.skills?.join(", ") || "Not provided"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Experience</h3>
            <p className="text-gray-600">
              {jobSeeker.experience?.join(", ") || "Not provided"}
            </p>
          </div>

          {jobSeeker.resume && (
            <a
              href={`${backendUrl}/${jobSeeker.resume}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              View Resume
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            disabled={isFinal || updating}
            onClick={() => updateStatus("Accepted")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition ${
              isFinal
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <MdCheckCircle size={20} />
            Accept
          </button>

          <button
            disabled={isFinal || updating}
            onClick={() => updateStatus("Rejected")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition ${
              isFinal
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <MdCancel size={20} />
            Reject
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;

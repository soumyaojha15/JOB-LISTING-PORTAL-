import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../Context/AppContext";
import { toast } from "react-toastify";
import { MdPersonOutline } from "react-icons/md";

const JobApplicants = () => {
  const { jobId } = useParams();
  const { backendUrl } = useContext(AppContent);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/applications/jobs/${jobId}/applicants`,
          { withCredentials: true }
        );

        if (data.success) {
          setApplicants(data.applicants);
        } else {
          toast.error(data.message);
        }
      } catch {
        toast.error("Failed to fetch applicants");
      }
      setLoading(false);
    };

    fetchApplicants();
  }, [backendUrl, jobId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Status badge color
  const statusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Centered Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Job Applicants
        </h1>

        {applicants.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <MdPersonOutline className="mx-auto text-5xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No applicants yet
            </h2>
            <p className="text-gray-500 mt-2">
              Once candidates apply, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                {/* Applicant Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {app.jobSeeker.fullName}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {app.jobSeeker.user.email}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Action */}
                <button
                  onClick={() => navigate(`/employer/application/${app._id}`)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;

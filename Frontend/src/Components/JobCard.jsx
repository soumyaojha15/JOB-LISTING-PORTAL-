import { useNavigate } from "react-router-dom";
import {
  MdLocationOn,
  MdWork,
  MdArrowForward
} from "react-icons/md";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
      
      {/* Left Gradient Accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-linear-to-b from-blue-600 to-indigo-600" />

      {/* Card Content */}
      <div className="p-6 flex flex-col h-full">
        
        {/* Company + Badge */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-400">
              {job.companyName}
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-1">
              {job.jobTitle}
            </h2>
          </div>

          {job.jobType && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
              {job.jobType}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 mt-3 text-sm">
          <MdLocationOn className="text-blue-600" />
          {job.location}
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-4 line-clamp-3 leading-relaxed">
          {job.shortDescription}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          
          {/* Salary */}
          <div className="flex items-center gap-2 text-emerald-600 font-semibold">
            <MdWork />
            {job.salaryRange}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="
              flex items-center gap-2
              text-blue-600 font-semibold
              group-hover:text-white
              group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-indigo-600
              px-4 py-2 rounded-lg
              transition-all duration-300
            "
          >
            View Job
            <MdArrowForward className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

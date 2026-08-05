import { useContext, useEffect, useState, useMemo } from "react";
import { AppContent } from "../Context/AppContext";
import JobCard from "../Components/JobCard";
import {
  MdSearch,
  MdLocationOn,
  MdWork,
  MdRefresh,
  MdClose,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const JobList = () => {
  const { jobs, getAllJobs, searchJobs } = useContext(AppContent);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 9;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await getAllJobs();
      setLoading(false);
    };
    load();
  }, []);

  // Reset to page 1 whenever the job list changes (new search/filter results)
  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);

  const handleSearch = async () => {
    setLoading(true);
    await searchJobs({ keyword, location, jobType });
    setLoading(false);
  };

  const resetFilters = async () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    setLoading(true);
    await getAllJobs();
    setLoading(false);
  };

  const clearOneFilter = (filter) => {
    if (filter === "keyword") setKeyword("");
    if (filter === "location") setLocation("");
    if (filter === "jobType") setJobType("");
  };

  const activeFilters = [
    keyword && { key: "keyword", label: `"${keyword}"` },
    location && { key: "location", label: location },
    jobType && { key: "jobType", label: jobType },
  ].filter(Boolean);

  // Pagination math
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    return jobs.slice(start, start + jobsPerPage);
  }, [jobs, currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  // Build a compact page list like: 1 2 3 ... 8
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-sky-100 to-amber-50">
      {/* HERO SECTION */}
      <div className="pt-24 pb-32">
        <div className="text-center px-4 mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Find Your Next Career Move
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Discover jobs that match your skills & passion
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-3xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MdSearch
                className="absolute left-3 top-3.5 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Job title or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 w-full rounded-xl bg-white/70 border border-white/60 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="relative">
              <MdLocationOn
                className="absolute left-3 top-3.5 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 w-full rounded-xl bg-white/70 border border-white/60 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="relative">
              <MdWork
                className="absolute left-3 top-3.5 text-gray-500"
                size={20}
              />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="pl-10 w-full rounded-xl bg-white/70 border border-white/60 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition"
              >
                Search
              </button>
              <button
                onClick={resetFilters}
                title="Reset filters"
                className="bg-white/70 text-gray-700 px-4 py-3 rounded-xl hover:bg-white/90 transition"
              >
                <MdRefresh size={20} />
              </button>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 px-2">
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="flex items-center gap-1 bg-white/80 border border-white/60 text-sm text-gray-700 px-3 py-1.5 rounded-full shadow-sm"
                >
                  {f.label}
                  <MdClose
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    size={16}
                    onClick={() => clearOneFilter(f.key)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          // SKELETON LOADER
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-white/60 animate-pulse border border-white/50"
              />
            ))}
          </div>
        ) : jobs.length ? (
          <>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {jobs.length} Job{jobs.length !== 1 && "s"} Found
              </h2>
              {totalPages > 1 && (
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white/80 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <MdChevronLeft size={20} />
                </button>

                {getPageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition ${
                        currentPage === page
                          ? "bg-indigo-600 text-white shadow-md"
                          : "bg-white/80 text-gray-700 border border-gray-300 hover:bg-white"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white/80 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-500">😕 No jobs found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search filters
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;

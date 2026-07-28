import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ModernSignUp from "./pages/Signup";
import AboutContact from "./pages/About";
import SeekerProfile from "./pages/SeekerProfile";
import EditJobSeekerProfile from "./pages/EditJobSeekerProfile";
import EmployeerProfile from "./pages/EmployerProfile";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";
import NotAuthorized from "./pages/NotAuthorized";
import SeekerDashboard from "./pages/SeekerDashBoard";
import EmployerDashboard from "./pages/EmployerDashBoard";

// Components
import ProtectedRoute from "./Components/ProtectedRoute";
import JobApplicants from "./pages/JobApplicants";
import ApplicantDetails from "./pages/ApplicantDetails";

import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<ModernSignUp />} />
        <Route path="/about" element={<AboutContact />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Job Seeker Routes (Protected, role: applicant) */}
        <Route
          path="/seeker-profile"
          element={
            <ProtectedRoute role="applicant">
              <SeekerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seeker/edit-profile"
          element={
            <ProtectedRoute role="applicant">
              <EditJobSeekerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seeker/dashboard"
          element={
            <ProtectedRoute role="applicant">
              <SeekerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Employer Routes (Protected, role: recruiter) */}
        <Route
          path="/employer-profile"
          element={
            <ProtectedRoute role="recruiter">
              <EmployeerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/create-job"
          element={
            <ProtectedRoute role="recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/edit-job/:id"
          element={
            <ProtectedRoute role="recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/job/:jobId/applicants"
          element={
            <ProtectedRoute role="recruiter">
              <JobApplicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/application/:applicationId"
          element={
            <ProtectedRoute role="recruiter">
              <ApplicantDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

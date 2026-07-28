import express from "express";
import {
  applyForJob,
  getApplicantsForJob,
  getSingleApplicantProfile,
  getAppliedJobs,
  getMyJobsWithApplicants,
  updateApplicationStatus,
} from "../controller/ApplicationController.js";

import seekerAuth from "../Middleware/seekerMiddleware.js";
import recruiterAuth from "../Middleware/recruiterMiddleware.js";

const applicationRouter = express.Router();

/* JOB SEEKER ROUTES */

// Apply for a job
applicationRouter.post(
  "/applyjob/:jobId",
  seekerAuth,
  applyForJob
);

// Fetch All Applied Jobs for Seeker
applicationRouter.get(
  "/appliedjobs",
  seekerAuth,
  getAppliedJobs
);

/* RECRUITER ROUTES */

// get all jobs posted by recruiter with applicants count
applicationRouter.get(
  "/myjobs/applicants",
  recruiterAuth,
  getMyJobsWithApplicants
);
// Get all applicants for a specific job
applicationRouter.get(
  "/jobs/:jobId/applicants",
  recruiterAuth,
  getApplicantsForJob
);

// Get single applicant full profile (resume, pic, skills, etc.)
applicationRouter.get(
  "/oneapplication/:applicationId",
  recruiterAuth,
  getSingleApplicantProfile
);

// update application status (accept/reject)
applicationRouter.put(
  "/updateapplicationstatus/:applicationId",
  recruiterAuth,
  updateApplicationStatus
);
export default applicationRouter;

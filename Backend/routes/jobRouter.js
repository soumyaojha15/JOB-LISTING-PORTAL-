import express from "express";
import recruiterAuth from "../Middleware/recruiterMiddleware.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
} from "../controller/jobController.js";

const jobRouter = express.Router();

// Recruiter routes
jobRouter.post("/createjob", recruiterAuth, createJob);
jobRouter.put("/updatejob/:id", recruiterAuth, updateJob);
jobRouter.delete("/deletejob/:id", recruiterAuth, deleteJob);

// Public routes
jobRouter.get("/alljobs", getAllJobs);
jobRouter.get("/getonejob/:id", getJobById);
jobRouter.get("/search", searchJobs);


export default jobRouter;

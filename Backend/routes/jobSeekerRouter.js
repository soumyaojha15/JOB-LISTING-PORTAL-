import express from 'express';
import { createProfile, updateProfile, getProfile } from '../controller/jobSeekerController.js';
import seekerAuth from '../Middleware/seekerMiddleware.js';
import uploadFiles from '../Middleware/upload.js';

const jobSeekerrouter = express.Router();

// CREATE PROFILE

jobSeekerrouter.post("/createprofile", seekerAuth, uploadFiles, createProfile);


// UPDATE PROFILE

jobSeekerrouter.put(
  "/updateprofile",
  seekerAuth,
  uploadFiles,
  updateProfile
);

// GET PROFILE
jobSeekerrouter.get('/getprofile', seekerAuth, getProfile);

export default jobSeekerrouter;

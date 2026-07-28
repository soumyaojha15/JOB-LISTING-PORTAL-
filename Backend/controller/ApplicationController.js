import JobApplicationModel from "../Model/ApplicationModel.js";
import JobModel from "../Model/jobModel.js";
import jobSeekerModel from "../Model/seekerModel.js";

/* JOB SEEKER APPLY FOR A JOB */
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find job
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    // console.log("Logged in user ID:", req.user._id);
    // Find seeker profile
    const seekerProfile = await jobSeekerModel.findOne({
      user: req.user._id,
    });
    //   console.log("Seeker profile found:", seekerProfile);

    if (!seekerProfile) {
      return res.status(400).json({
        success: false,
        message: "Create seeker profile before applying",
      });
    }

    // Create application
    const application = await JobApplicationModel.create({
      job: job._id,
      jobSeeker: seekerProfile._id,
      recruiter: job.recruiter,
    });

    res.status(201).json({
      success: true,
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    // Duplicate application error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error applying for job",
      error: error.message,
    });
  }
};

/* GET ALL APPLIED JOBS FOR A SEEKER */
export const getAppliedJobs = async (req, res) => {
  try {
    // Find seeker profile
    const seekerProfile = await jobSeekerModel.findOne({ user: req.user._id });
    if (!seekerProfile) {
      return res.status(400).json({
        success: false,
        message: "Seeker profile not found",
      });
    }

    // Fetch all applications of this seeker
    const applications = await JobApplicationModel.find({
      jobSeeker: seekerProfile._id,
    })
      .populate("job") 
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      appliedJobs: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applied jobs",
      error: error.message,
    });
  }
};

/* EMPLOYER VIEW APPLIED SEEKERS FOR A JOB */
export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Ensure job belongs to recruiter
    const job = await JobModel.findOne({
      _id: jobId,
      recruiter: req.user._id,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or job not found",
      });
    }

    // Fetch applications with seeker details
    const applications = await JobApplicationModel.find({ job: jobId })
      .populate({
        path: "jobSeeker",
        populate: {
          path: "user",
          select: "email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applicants: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applicants",
      error: error.message,
    });
  }
};

/* GET RECRUITER JOBS WITH APPLICANT COUNT */
export const getMyJobsWithApplicants = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const jobs = await JobApplicationModel.aggregate([
      // 1️⃣ Only applications for this recruiter
      {
        $match: {
          recruiter: recruiterId,
          status: { $in: ["Pending", "Shortlisted"] },
        },
      },
      // 2️⃣ Group by job & count applications
      {
        $group: {
          _id: "$job",
          applicantCount: { $sum: 1 },
        },
      },

      // 3️⃣ Join job details
      {
        $lookup: {
          from: "jobs", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "job",
        },
      },

      // 4️⃣ Convert array to object
      { $unwind: "$job" },

      // 5️⃣ Sort by latest job
      { $sort: { "job.createdAt": -1 } },

      // 6️⃣ Final response shape
      {
        $project: {
          _id: "$job._id",
          jobTitle: "$job.jobTitle",
          companyName: "$job.companyName",
          location: "$job.location",
          jobType: "$job.jobType",
          applicantCount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recruiter jobs with applicants",
      error: error.message,
    });
  }
};

/* EMPLOYER VIEW SINGLE SEEKER PROFILE (Resume, Pic) */

export const getSingleApplicantProfile = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplicationModel.findById(applicationId)
      .populate("job")
      .populate({
        path: "jobSeeker",
        populate: {
          path: "user",
          select: "email",
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Authorization check
    if (application.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    res.status(200).json({
      success: true,
      applicant: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applicant profile",
      error: error.message,
    });
  }
};

/* UPDATE APPLICATION STATUS (Recruiter) */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Validate status
    const allowedStatus = ["Pending", "Shortlisted", "Accepted", "Rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Find application
    const application = await JobApplicationModel.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Authorization check
    if (application.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update status
    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error: error.message,
    });
  }
};

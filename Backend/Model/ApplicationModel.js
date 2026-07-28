import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobSeeker",
      required: true
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Rejected", "Accepted"],
      default: "Pending"
    },

    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Prevent duplicate applications (one seeker applies once per job)
jobApplicationSchema.index({ job: 1, jobSeeker: 1 }, { unique: true });

const JobApplicationModel =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplicationModel;

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
        
    companyName: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    jobTitle: {
      type: String,
      required: true
    },

    shortDescription: {
      type: String,
      required: true
    },

    jobDescription: {
      type: String,
      required: true
    },

    jobRole: {
      type: String,
      required: true
    },

    salaryRange: {
      type: String
    },

    experienceRequired: {
      type: String
    },

    skillsRequired: {
      type: [String]
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"]
    },

    lastDateToApply: {
      type: Date
    }
  },
  { timestamps: true }
);

const JobModel =
  mongoose.models.Job || mongoose.model("Job", jobSchema);

export default JobModel;

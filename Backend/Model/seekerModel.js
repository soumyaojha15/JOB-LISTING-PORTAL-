import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String },
    resume: { type: String }, 
     profilePic: { type: String }, 
    skills: [{ type: String }],
    experience: [{ type: String }],
  },
  { timestamps: true }
);

const jobSeekerModel = mongoose.models.jobSeeker || mongoose.model("jobSeeker", jobSeekerSchema);

export default jobSeekerModel;

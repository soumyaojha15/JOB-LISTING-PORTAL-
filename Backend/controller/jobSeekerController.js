import jobSeekerModel from '../Model/seekerModel.js';
import fs from "fs";

// CREATE PROFILE
export const createProfile = async (req, res) => {
  try {
    //  console.log("FILES IN CONTROLLER:", req.files);
    // console.log("BODY IN CONTROLLER:", req.body);
    const existing = await jobSeekerModel.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ success: false, message: "Profile already exists" });

    const { fullName, contactNumber, address, skills, experience } = req.body;
    const skillArray = skills ? skills.split(",").map(s => s.trim()) : [];
    const experienceArray = experience ? JSON.parse(experience) : [];

    const profile = new jobSeekerModel({
      user: req.user._id,
      fullName,
      contactNumber,
      address,
      skills: skillArray,
      experience: experienceArray,
      resume: req.files?.resume?.[0]?.path || null,
      profilePic: req.files?.profilePic?.[0]?.path || null,
    });

    await profile.save();
    res.json({ success: true, profile, message: "Profile created successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    //  console.log("FILES IN CONTROLLER:", req.files);
    // console.log("BODY IN CONTROLLER:", req.body);
    const profile = await jobSeekerModel.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    const { fullName, contactNumber, address, skills, experience } = req.body;
    const skillArray = skills ? skills.split(",").map(s => s.trim()) : profile.skills;
    const experienceArray = experience ? JSON.parse(experience) : [];



    // console.log("EXPERIENCE RECEIVED:", req.body.experience);


    // Update resume if uploaded
    if (req.files?.resume?.[0]) {
      if (profile.resume && fs.existsSync(profile.resume)) fs.unlinkSync(profile.resume);
      profile.resume = req.files.resume[0].path;
    }

    // Update profilePic if uploaded
    if (req.files?.profilePic?.[0]) {
      if (profile.profilePic && fs.existsSync(profile.profilePic)) fs.unlinkSync(profile.profilePic);
      profile.profilePic = req.files.profilePic[0].path;
    }

    // Update other fields
    profile.fullName = fullName || profile.fullName;
    profile.contactNumber = contactNumber || profile.contactNumber;
    profile.address = address || profile.address;
    profile.skills = skillArray;
    profile.experience = experienceArray;

    await profile.save();
    res.json({ success: true, profile, message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const profile = await jobSeekerModel.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

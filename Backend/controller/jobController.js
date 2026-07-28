import JobModel from "../Model/jobModel.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const job = await JobModel.create({
      ...req.body,
      recruiter: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message
    });
  }
};

// GET ALL JOBS (for frontend cards)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs"
    });
  }
};

// GET SINGLE JOB (Details Page)
export const getJobById = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job"
    });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const job = await JobModel.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job"
    });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.user._id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job"
    });
  }
};


// SEARCH JOBS (Basic Filters)
export const searchJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;
    
    let filter = {};

    // Keyword search (job title, company name, description)
    if (keyword) {
      filter.$or = [
        { jobTitle: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } },
        { shortDescription: { $regex: keyword, $options: "i" } }
      ];
    }

    // Location filter
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Job type filter
    if (jobType) {
      filter.jobType = jobType;
    }

    const jobs = await JobModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching jobs"
    });
  }
};

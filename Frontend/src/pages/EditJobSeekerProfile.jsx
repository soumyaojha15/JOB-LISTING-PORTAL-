import { useContext, useEffect, useState } from "react";
import { AppContent } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdBuild,
  MdWork,
  MdUploadFile,
} from "react-icons/md";

const EditJobSeekerProfile = () => {
  const { backendUrl, jobSeekerProfile, getJobSeekerProfile } =
    useContext(AppContent);

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState([]);
  const [resume, setResume] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load profile once
  useEffect(() => {
    getJobSeekerProfile();
  }, []);

  // Fill form when profile data arrives
  useEffect(() => {
    if (jobSeekerProfile) {
      setFullName(jobSeekerProfile.fullName || "");
      setContactNumber(jobSeekerProfile.contactNumber || "");
      setAddress(jobSeekerProfile.address || "");
      setSkills(jobSeekerProfile.skills?.join(",") || "");
      setExperience(jobSeekerProfile.experience || []);
      setIsEditing(true);
    }
  }, [jobSeekerProfile]);

  // Submit Create or Update
  const submitProfile = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("contactNumber", contactNumber);
      formData.append("address", address);
      formData.append("skills", skills);
      formData.append("experience", JSON.stringify(experience));
      if (resume) formData.append("resume", resume);
      if (profilePic) formData.append("profilePic", profilePic);

      const url =
        backendUrl +
        (isEditing
          ? "/api/jobseeker/updateprofile"
          : "/api/jobseeker/createprofile");

      const { data } = await axios({
        method: isEditing ? "PUT" : "POST",
        url,
        data: formData,
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(isEditing ? "Profile updated!" : "Profile created!");
        navigate("/seeker-profile", { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {isEditing ? "Edit Profile" : "Create Profile"}
          </h1>

          <form onSubmit={submitProfile} className="space-y-5">
            <InputField
              icon={<MdPerson />}
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <InputField
              icon={<MdPhone />}
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <InputField
              icon={<MdLocationOn />}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <InputField
              icon={<MdBuild />}
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <MdWork />
                <label className="font-semibold">
                  Experience (one per line)
                </label>
              </div>
              <textarea
                placeholder="Enter each experience on a new line"
                className="w-full border border-gray-200 p-3 rounded-lg bg-white resize-none text-gray-800"
                value={experience.join("\n")}
                onChange={(e) => setExperience(e.target.value.split("\n"))}
                rows={4}
              />
            </div>

            <FileUpload
              icon={<MdUploadFile />}
              label="Upload Resume"
              onChange={(e) => setResume(e.target.files[0])}
            />
            <FileUpload
              icon={<MdUploadFile />}
              label="Upload Profile Picture"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />

            <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              {isEditing ? "Update Profile" : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditJobSeekerProfile;

/* --- COMPONENTS --- */

const InputField = ({ icon, placeholder, value, onChange }) => (
  <div className="flex items-center border rounded-lg p-3 bg-white dark:bg-gray-800">
    <span className="text-gray-500 dark:text-gray-300 mr-3">{icon}</span>
    <input
      type="text"
      className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const FileUpload = ({ icon, label, onChange }) => (
  <div className="border p-3 rounded-lg flex flex-col bg-white dark:bg-gray-800">
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
    <input type="file" onChange={onChange} className="w-full" />
  </div>
);

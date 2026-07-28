import multer from "multer";
import path from "path";
import fs from "fs";

// Upload folders
const UPLOADS_BASE = "uploads";
const RESUME_DIR = path.join(UPLOADS_BASE, "resume");
const PROFILEPIC_DIR = path.join(UPLOADS_BASE, "profilepic");

// Ensure folders exist
[UPLOADS_BASE, RESUME_DIR, PROFILEPIC_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("🔥 FIELD FROM POSTMAN:", file.fieldname);
    // console.log("🔥 ORIGINAL NAME:", file.originalname);

    if (file.fieldname === "resume") cb(null, RESUME_DIR);
    else if (file.fieldname === "profilePic") cb(null, PROFILEPIC_DIR);
    else cb(new Error("Unexpected upload field"));
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  const mime = file.mimetype;

  // Resume allowed types
  const resumeExts = ["pdf", "doc", "docx"];
  const resumeMime = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // Profile pic allowed types
  const imageExts = ["jpg", "jpeg", "png", "webp"];
  const imageMime = ["image/jpeg", "image/png", "image/webp"];

  if (file.fieldname === "resume") {
    if (resumeExts.includes(ext) && resumeMime.includes(mime)) {
      return cb(null, true);
    }
    return cb(new Error("Resume must be PDF, DOC or DOCX"));
  }

  if (file.fieldname === "profilePic") {
    if (imageExts.includes(ext) && imageMime.includes(mime)) {
      return cb(null, true);
    }
    return cb(new Error("Profile picture must be JPG, PNG or WEBP"));
  }

  return cb(new Error("Unexpected field name"));
};

// Multer middleware
const uploadFiles = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

export default uploadFiles;

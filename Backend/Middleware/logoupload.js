import multer from "multer";
import path from "path";

// Storage for employer logo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/logos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /png|jpg|jpeg|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only PNG, JPG, JPEG, WEBP images are allowed"));
};

export const logoUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

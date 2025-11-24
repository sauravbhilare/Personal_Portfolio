import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const ensureUploadsDir = () => {
  const uploadDir = "./uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDir();
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;

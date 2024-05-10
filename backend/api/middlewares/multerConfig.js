import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 12 * 1024 * 1024, 
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true); 
    } else {
      callback(new Error("Only images are allowed")); 
    }
  },
});

export default upload;

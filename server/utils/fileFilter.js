import { UnsupportedMediaTypeError } from "../error/errors.js";

export const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else {
    cb(new UnsupportedMediaTypeError("only PDF files are allowed"), false);
  }
};

export const limits = {
    fileSize : 5 * 1024 * 1024, // 5MB file size limit
    files: 5 // Maximum 5 files allowed
}

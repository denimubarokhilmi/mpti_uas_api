import multer from "multer";
import path from "path";

const is_unique = () => {
  return new Promise((resolve, reject) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    resolve(unique);
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: async (req, file, cb) => {
    const unique = await is_unique();
    cb(null, unique + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// server/src/routes/media.routes.ts
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  listMediaBySpecialist,
  createMediaForSpecialist,
  updateMedia,
  softDeleteMedia,
} from "../controllers/media.controller";

const router = Router();

/**
 * UPLOADS FOLDER SETUP
 * Files will be saved in: server/uploads
 */
const uploadsDir = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Multer storage: generate a unique filename and save to uploadsDir
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  },
});

const upload = multer({ storage });

/**
 * ROUTES
 */

// nested under /api/specialists
router.get("/:specialistId/media", listMediaBySpecialist);

// IMPORTANT: use multer middleware here.
// The FormData key from the client must be "files".
router.post(
  "/:specialistId/media",
  upload.array("files", 3), // up to 3 images
  createMediaForSpecialist
);

// direct
router.put("/media/:id", updateMedia);
router.delete("/media/:id", softDeleteMedia);

export default router;

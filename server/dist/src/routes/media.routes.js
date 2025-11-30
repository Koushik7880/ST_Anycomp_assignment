"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/media.routes.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const media_controller_1 = require("../controllers/media.controller");
const router = (0, express_1.Router)();
/**
 * UPLOADS FOLDER SETUP
 * Files will be saved in: server/uploads
 */
const uploadsDir = path_1.default.resolve(__dirname, "../../uploads");
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
/**
 * Multer storage: generate a unique filename and save to uploadsDir
 */
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const base = path_1.default.basename(file.originalname, ext);
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${base}-${unique}${ext}`);
    },
});
const upload = (0, multer_1.default)({ storage });
/**
 * ROUTES
 */
// nested under /api/specialists
router.get("/:specialistId/media", media_controller_1.listMediaBySpecialist);
// IMPORTANT: use multer middleware here.
// The FormData key from the client must be "files".
router.post("/:specialistId/media", upload.array("files", 3), // up to 3 images
media_controller_1.createMediaForSpecialist);
// direct
router.put("/media/:id", media_controller_1.updateMedia);
router.delete("/media/:id", media_controller_1.softDeleteMedia);
exports.default = router;

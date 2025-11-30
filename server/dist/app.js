"use strict";
// import express from "express";
// import cors from "cors";
// import routes from "./routes";
// import { notFoundHandler } from "./middleware/notFound";
// import { errorHandler } from "./middleware/errorHandler";
// import path from "path";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(cors());
// app.use(express.json());
// // Serve static uploaded files
// app.use(
//   "/uploads",
//   express.static(path.resolve(__dirname, "../uploads"))
// );
// app.use("/api", routes);
// app.use(notFoundHandler);
// app.use(errorHandler);
// export default app;
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = require("./middleware/notFound");
const errorHandler_1 = require("./middleware/errorHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// ----- CORS -----
const allowedOrigins = [
    "http://localhost:3000", // local Next dev
    process.env.CLIENT_URL, // Vercel URL (set on Render)
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: allowedOrigins.length ? allowedOrigins : true, // fallback: allow all
    credentials: true,
}));
// ----- Body parsing -----
app.use(express_1.default.json());
// ----- Static uploads -----
// When compiled, __dirname = dist/, so ../uploads points to /server/uploads
const uploadsDir = path_1.default.resolve(__dirname, "..", process.env.UPLOAD_DIR || "uploads");
app.use("/uploads", express_1.default.static(uploadsDir));
// ----- API routes -----
app.use("/api", routes_1.default);
// Simple health check (handy for Render logs)
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// ----- Error handlers -----
app.use(notFound_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;

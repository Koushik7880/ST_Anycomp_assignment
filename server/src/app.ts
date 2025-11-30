// server/src/app.ts
import express from "express";
import cors from "cors";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

// 🔥 Global CORS: allow any origin (good enough for this demo project)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// All API routes are mounted under /api
app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

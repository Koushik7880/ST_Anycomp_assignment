// server/src/app.ts
import express, { Request, Response, NextFunction } from "express";
import path from "path";

import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

/**
 * 🔥 Simple global CORS middleware
 * - No `app.options("*", ...)` so no path-to-regexp issues on Express 5
 * - Allows all origins (good for this assignment)
 *   If you want to restrict later, we can change this.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.sendStatus(204);
  }

  next();
});

// Body parsing
app.use(express.json());

// Serve static uploaded files
// At runtime, __dirname = /server/dist
// "../uploads" => /server/uploads
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// All API routes under /api
app.use("/api", routes);

// Simple health check (useful for Render)
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// 404 + error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

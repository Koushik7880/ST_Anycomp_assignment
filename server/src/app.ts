// import express from "express";
// import cors from "cors";
// import routes from "./routes";
// import { notFoundHandler } from "./middleware/notFound";
// import { errorHandler } from "./middleware/errorHandler";
// import path from "path";

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
import express from "express";
import cors from "cors";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

// ----- CORS -----
const allowedOrigins = [
  "http://localhost:3000",                       // local Next dev
  process.env.NEXT_PUBLIC_API_BASE_URL,                        // Vercel URL (set on Render)
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true, // fallback: allow all
    credentials: true,
  })
);

// ----- Body parsing -----
app.use(express.json());

// ----- Static uploads -----
// When compiled, __dirname = dist/, so ../uploads points to /server/uploads
const uploadsDir = path.resolve(__dirname, "..", process.env.UPLOAD_DIR || "uploads");
app.use("/uploads", express.static(uploadsDir));

// ----- API routes -----
app.use("/api", routes);

// Simple health check (handy for Render logs)
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ----- Error handlers -----
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

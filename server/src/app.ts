// server/src/app.ts
import express from "express";
import cors from "cors";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

// 🔥 Global CORS: allow any origin (OK for this demo project)
app.use((req, res, next) => {
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
    return res.sendStatus(204);
  }

  next();
});

// (optional, but harmless)
app.use(cors());

app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// Mount all API routes under /api
app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

// server/src/app.ts
import express from "express";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

// 🔥 Simple global CORS middleware (no express-cors, no "*" route needed)
app.use((req: { method: string; }, res: { header: (arg0: string, arg1: string) => void; sendStatus: (arg0: number) => any; }, next: () => void) => {
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

app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// All API routes under /api
app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

import express from "express";
import cors from "cors";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

// ✅ Simple CORS: allow any origin (fine since you use tokenless / no cookies)
app.use(
  cors({
    origin: true,           // reflect the Origin header
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight
app.options("*", cors());

app.use(express.json());

// Serve static uploaded files
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"))
);

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;





// src/app.ts
// import express from "express";
// import cors from "cors";
// import routes from "./routes";
// import { notFoundHandler } from "./middleware/notFound";
// import { errorHandler } from "./middleware/errorHandler";
// import path from "path";

// const app = express();

// // ✅ allow local dev + Vercel domain
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://st-anycomp-assignment-client.vercel.app",
// ];

// app.use(
//   cors({
//     origin(origin, callback) {
//       // SSR / Postman / curl (no origin) -> allow
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       // Anything else -> block
//       return callback(new Error("Not allowed by CORS"));
//     },
//   })
// );

// // Handle preflight
// app.options("*", cors());

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


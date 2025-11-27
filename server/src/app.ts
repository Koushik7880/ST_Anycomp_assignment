import express from "express";
import cors from "cors";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

app.use(cors());
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

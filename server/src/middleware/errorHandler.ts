import { NextFunction, Request, Response } from "express";

export interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("💥 Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    details: err.details ?? undefined,
  });
};

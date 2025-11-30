"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    console.error("💥 Error:", err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
        details: err.details ?? undefined,
    });
};
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/config/prisma.ts
require("dotenv/config");
const client_1 = require("../../generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
// Create a pg pool using DATABASE_URL from .env
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
// Create Prisma adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
// Single Prisma client instance
exports.prisma = new client_1.PrismaClient({ adapter });
// Optional: graceful shutdown
process.on("beforeExit", async () => {
    await exports.prisma.$disconnect();
    await pool.end();
});

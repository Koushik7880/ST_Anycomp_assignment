"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/prisma.config.ts
require("dotenv/config");
const config_1 = require("prisma/config");
exports.default = (0, config_1.defineConfig)({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    // Prisma 7: classic engine + datasource here
    datasource: {
        url: (0, config_1.env)('DATABASE_URL'), // comes from server/.env (your Neon URL)
    },
});

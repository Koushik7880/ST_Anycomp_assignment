"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialists_routes_1 = __importDefault(require("./specialists.routes"));
const serviceOfferings_routes_1 = __importDefault(require("./serviceOfferings.routes"));
const media_routes_1 = __importDefault(require("./media.routes"));
const platformFee_routes_1 = __importDefault(require("./platformFee.routes"));
// import mediaRoutes from "./media.routes";
const router = (0, express_1.Router)();
router.use("/specialists", specialists_routes_1.default);
router.use("/specialists", serviceOfferings_routes_1.default);
// router.use("/", mediaRoutes);
router.use("/platform-fees", platformFee_routes_1.default);
router.use("/specialists", media_routes_1.default);
exports.default = router;

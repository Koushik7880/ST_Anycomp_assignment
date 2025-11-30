"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlatformFee = exports.updatePlatformFee = exports.createPlatformFee = exports.listPlatformFees = void 0;
const prisma_1 = require("../config/prisma");
// GET /api/platform-fees
const listPlatformFees = async (_req, res) => {
    try {
        const items = await prisma_1.prisma.platform_fee.findMany({
            orderBy: { created_at: "desc" },
        });
        res.json({ success: true, data: items });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving platform fees" });
    }
};
exports.listPlatformFees = listPlatformFees;
// POST /api/platform-fees
const createPlatformFee = async (req, res) => {
    try {
        const { tier_name, min_value, max_value, platform_fee_percentage } = req.body;
        const now = new Date();
        const fee = await prisma_1.prisma.platform_fee.create({
            data: {
                tier_name,
                min_value,
                max_value,
                platform_fee_percentage: platform_fee_percentage.toString(),
                created_at: now,
                updated_at: now,
            },
        });
        res.status(201).json({ success: true, data: fee });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating platform fee" });
    }
};
exports.createPlatformFee = createPlatformFee;
// PUT /api/platform-fees/:id
const updatePlatformFee = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            ...req.body,
            updated_at: new Date(),
        };
        if (data.platform_fee_percentage !== undefined) {
            data.platform_fee_percentage = data.platform_fee_percentage.toString();
        }
        const fee = await prisma_1.prisma.platform_fee.update({
            where: { id },
            data,
        });
        res.json({ success: true, data: fee });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating platform fee" });
    }
};
exports.updatePlatformFee = updatePlatformFee;
// DELETE /api/platform-fees/:id
const deletePlatformFee = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.platform_fee.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting platform fee" });
    }
};
exports.deletePlatformFee = deletePlatformFee;

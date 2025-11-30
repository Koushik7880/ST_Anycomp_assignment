"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteMedia = exports.updateMedia = exports.createMediaForSpecialist = exports.listMediaBySpecialist = void 0;
const prisma_1 = require("../config/prisma");
// GET /api/specialists/:specialistId/media
const listMediaBySpecialist = async (req, res) => {
    try {
        const { specialistId } = req.params;
        const items = await prisma_1.prisma.media.findMany({
            where: { specialist_id: specialistId, deleted_at: null },
            orderBy: { display_order: "asc" },
        });
        res.json({ success: true, data: items });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving media" });
    }
};
exports.listMediaBySpecialist = listMediaBySpecialist;
// POST /api/specialists/:specialistId/media
const createMediaForSpecialist = async (req, res) => {
    try {
        const { specialistId } = req.params;
        const files = req.files;
        if (!files || files.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No files uploaded" });
        }
        // client sends: formData.append("display_orders", String(order));
        const displayOrdersRaw = req.body["display_orders"];
        let displayOrders = [];
        if (Array.isArray(displayOrdersRaw)) {
            displayOrders = displayOrdersRaw.map((v) => Number(v));
        }
        else if (displayOrdersRaw) {
            displayOrders = [Number(displayOrdersRaw)];
        }
        const now = new Date();
        const created = await Promise.all(files.map((file, index) => {
            const display_order = displayOrders[index] ?? // if provided
                index + 1; // fallback
            return prisma_1.prisma.media.create({
                data: {
                    specialist_id: specialistId,
                    file_name: file.filename, // filename in /uploads
                    file_size: file.size,
                    display_order,
                    mime_type: file.mimetype,
                    media_type: "listing_image", // or whatever enum you use
                    uploaded_at: now,
                    deleted_at: null,
                    created_at: now,
                    updated_at: now,
                },
            });
        }));
        res.status(201).json({ success: true, data: created });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating media" });
    }
};
exports.createMediaForSpecialist = createMediaForSpecialist;
// PUT /api/media/:id
const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await prisma_1.prisma.media.update({
            where: { id },
            data: {
                ...req.body,
                updated_at: new Date(),
            },
        });
        res.json({ success: true, data: media });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating media" });
    }
};
exports.updateMedia = updateMedia;
// DELETE /api/media/:id  (soft delete)
const softDeleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.media.update({
            where: { id },
            data: {
                deleted_at: new Date(),
                updated_at: new Date(),
            },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting media" });
    }
};
exports.softDeleteMedia = softDeleteMedia;

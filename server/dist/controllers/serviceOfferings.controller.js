"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceOffering = exports.createServiceOfferingForSpecialist = exports.listServiceOfferingsBySpecialist = void 0;
const prisma_1 = require("../config/prisma");
// GET /api/specialists/:specialistId/service-offerings
const listServiceOfferingsBySpecialist = async (req, res) => {
    try {
        const { specialistId } = req.params;
        const items = await prisma_1.prisma.service_offerings.findMany({
            where: { specialist_id: specialistId },
            orderBy: { created_at: "desc" },
        });
        res.json({ success: true, data: items });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving service offerings" });
    }
};
exports.listServiceOfferingsBySpecialist = listServiceOfferingsBySpecialist;
// POST /api/specialists/:specialistId/service-offerings
const createServiceOfferingForSpecialist = async (req, res) => {
    try {
        const { specialistId } = req.params;
        const now = new Date();
        const item = await prisma_1.prisma.service_offerings.create({
            data: {
                specialist_id: specialistId,
                created_at: now,
                updated_at: now,
            },
        });
        res.status(201).json({ success: true, data: item });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating service offering" });
    }
};
exports.createServiceOfferingForSpecialist = createServiceOfferingForSpecialist;
// DELETE /api/service-offerings/:id
const deleteServiceOffering = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.service_offerings.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting service offering" });
    }
};
exports.deleteServiceOffering = deleteServiceOffering;

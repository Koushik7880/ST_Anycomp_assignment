import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// GET /api/specialists/:specialistId/service-offerings
export const listServiceOfferingsBySpecialist = async (req: Request, res: Response) => {
  try {
    const { specialistId } = req.params;

    const items = await prisma.service_offerings.findMany({
      where: { specialist_id: specialistId },
      orderBy: { created_at: "desc" },
    });

    res.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving service offerings" });
  }
};

// POST /api/specialists/:specialistId/service-offerings
export const createServiceOfferingForSpecialist = async (
  req: Request,
  res: Response
) => {
  try {
    const { specialistId } = req.params;
    const now = new Date();

    const item = await prisma.service_offerings.create({
      data: {
        specialist_id: specialistId,
        created_at: now,
        updated_at: now,
      },
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating service offering" });
  }
};

// DELETE /api/service-offerings/:id
export const deleteServiceOffering = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.service_offerings.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting service offering" });
  }
};

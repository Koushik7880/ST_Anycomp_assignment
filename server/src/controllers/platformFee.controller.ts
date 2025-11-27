import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// GET /api/platform-fees
export const listPlatformFees = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.platform_fee.findMany({
      orderBy: { created_at: "desc" },
    });

    res.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving platform fees" });
  }
};

// POST /api/platform-fees
export const createPlatformFee = async (req: Request, res: Response) => {
  try {
    const { tier_name, min_value, max_value, platform_fee_percentage } = req.body;
    const now = new Date();

    const fee = await prisma.platform_fee.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating platform fee" });
  }
};

// PUT /api/platform-fees/:id
export const updatePlatformFee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: any = {
      ...req.body,
      updated_at: new Date(),
    };

    if (data.platform_fee_percentage !== undefined) {
      data.platform_fee_percentage = data.platform_fee_percentage.toString();
    }

    const fee = await prisma.platform_fee.update({
      where: { id },
      data,
    });

    res.json({ success: true, data: fee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating platform fee" });
  }
};

// DELETE /api/platform-fees/:id
export const deletePlatformFee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.platform_fee.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting platform fee" });
  }
};

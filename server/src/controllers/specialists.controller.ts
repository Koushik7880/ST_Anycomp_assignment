import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// GET /api/specialists?status=all|draft|published&search=&page=&limit=
export const listSpecialists = async (req: Request, res: Response) => {
  try {
    const status = (req.query.status as string) || "published";
    const search = (req.query.search as string) || "";
    const pageNum = parseInt((req.query.page as string) || "1", 10);
    const limitNum = parseInt((req.query.limit as string) || "10", 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      deleted_at: null,
    };

    // status filter
    if (status === "draft") where.is_draft = true;
    if (status === "published") where.is_draft = false;

    // search
    if (search) {
      where.AND = [
        ...(where.AND ?? []),
        {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { additional_offerings: { contains: search, mode: "insensitive" } },
            { company_secretary: { contains: search, mode: "insensitive" } },
          ],
        },
      ];
    }

    const [specialists, totalSpecialists] = await Promise.all([
      prisma.specialists.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { created_at: "desc" },
        include: {
          service_offerings: true,
          media: {
            where: { deleted_at: null },
            orderBy: { display_order: "asc" },
          },
        },
      }),
      prisma.specialists.count({ where }),
    ]);

    res.json({
      success: true,
      data: specialists,
      meta: {
        totalCount: totalSpecialists,
        totalPages: Math.ceil(totalSpecialists / limitNum),
        page: pageNum,
        limit: limitNum,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving specialists" });
  }
};

// POST /api/specialists
export const createSpecialist = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      description,
      base_price,
      platform_fee,
      final_price,
      duration_days,
      average_rating = 0,
      is_draft = true,
      total_number_of_ratings = 0,
      verification_status = "pending",
      is_verified = false,
      additional_offerings,
      company_secretary,
    } = req.body;

    const now = new Date();

    const data: any = {
      title,
      slug,
      description,
      base_price: base_price.toString(),
      platform_fee: platform_fee.toString(),
      final_price: final_price.toString(),
      duration_days,
      average_rating: average_rating.toString(),
      is_draft,
      total_number_of_ratings,
      verification_status,
      is_verified,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };

    if (typeof additional_offerings === "string") {
      data.additional_offerings = additional_offerings;
    }
    if (typeof company_secretary === "string") {
      data.company_secretary = company_secretary;
    }

    const newSpecialist = await prisma.specialists.create({ data });

    res.status(201).json({ success: true, data: newSpecialist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating specialist" });
  }
};

// GET /api/specialists/:id
export const getSpecialist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const specialist = await prisma.specialists.findFirst({
      where: { id, deleted_at: null },
      include: {
        service_offerings: true,
        media: {
          where: { deleted_at: null },
          orderBy: { display_order: "asc" },
        },
      },
    });

    if (!specialist) {
      return res.status(404).json({ success: false, message: "Specialist not found" });
    }

    res.json({ success: true, data: specialist });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving specialist" });
  }
};

// PUT /api/specialists/:id
export const updateSpecialist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      description,
      base_price,
      platform_fee,
      final_price,
      duration_days,
      average_rating,
      is_draft,
      total_number_of_ratings,
      verification_status,
      is_verified,
      additional_offerings,
      company_secretary,
    } = req.body;

    const data: any = {
      updated_at: new Date(),
    };

    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug;
    if (description !== undefined) data.description = description;
    if (duration_days !== undefined) data.duration_days = duration_days;
    if (is_draft !== undefined) data.is_draft = is_draft;
    if (total_number_of_ratings !== undefined)
      data.total_number_of_ratings = total_number_of_ratings;
    if (verification_status !== undefined)
      data.verification_status = verification_status;
    if (is_verified !== undefined) data.is_verified = is_verified;

    if (base_price !== undefined) data.base_price = base_price.toString();
    if (platform_fee !== undefined) data.platform_fee = platform_fee.toString();
    if (final_price !== undefined) data.final_price = final_price.toString();
    if (average_rating !== undefined)
      data.average_rating = average_rating.toString();

    if (additional_offerings !== undefined)
      data.additional_offerings = additional_offerings;
    if (company_secretary !== undefined)
      data.company_secretary = company_secretary;

    const updatedSpecialist = await prisma.specialists.update({
      where: { id },
      data,
    });

    res.json({ success: true, data: updatedSpecialist });
  } catch (error) {
    console.error("Error updating specialist:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating specialist" });
  }
};


// PATCH /api/specialists/:id/publish
export const publishSpecialist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const publishedSpecialist = await prisma.specialists.update({
      where: { id },
      data: {
        is_draft: false,
        updated_at: new Date(),
      },
    });

    res.json({ success: true, data: publishedSpecialist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error publishing specialist" });
  }
};

// DELETE /api/specialists/:id
export const softDeleteSpecialist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.specialists.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        updated_at: new Date(),
      },
    });

    res.status(204).send();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting specialist" });
  }
};


export const exportSpecialists = async (req: Request, res: Response) => {
  try {
    const status = (req.query.status as string) || "all";
    const search = (req.query.search as string) || "";

    const where: any = {
      deleted_at: null,
    };

    // status filter (same logic as listSpecialists)
    if (status === "draft") where.is_draft = true;
    if (status === "published") where.is_draft = false;

    // search over text fields
    if (search) {
      where.AND = [
        ...(where.AND ?? []),
        {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { additional_offerings: { contains: search, mode: "insensitive" } },
            { company_secretary: { contains: search, mode: "insensitive" } },
          ],
        },
      ];
    }

    const specialists = await prisma.specialists.findMany({
      where,
      orderBy: { created_at: "desc" },
    });

    // --- Build CSV ---
    const headers = [
      "ID",
      "Title",
      "Slug",
      "Description",
      "Base Price",
      "Platform Fee",
      "Final Price",
      "Duration Days",
      "Is Draft",
      "Verification Status",
      "Is Verified",
      "Total Number Of Ratings",
      "Average Rating",
      "Additional Offerings",
      "Company Secretary",
      "Created At",
      "Updated At",
    ];

    const escape = (value: unknown): string => {
      if (value === null || value === undefined) return "";
      const str = String(value);
      // wrap in quotes, escape existing quotes
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = specialists.map((s) => [
      escape(s.id),
      escape(s.title),
      escape(s.slug),
      escape(s.description),
      escape(s.base_price),
      escape(s.platform_fee),
      escape(s.final_price),
      escape(s.duration_days),
      escape(s.is_draft ? "Draft" : "Published"),
      escape(s.verification_status),
      escape(s.is_verified),
      escape(s.total_number_of_ratings),
      escape(s.average_rating),
      escape(s.additional_offerings ?? ""),
      escape(s.company_secretary ?? ""),
      escape(s.created_at),
      escape(s.updated_at),
    ]);

    const csv =
      headers.map(escape).join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=specialists-export.csv"
    );

    return res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting specialists:", error);
    res
      .status(500)
      .json({ success: false, message: "Error exporting specialists" });
  }
};

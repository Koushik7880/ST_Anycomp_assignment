import { Router } from "express";
import {
  listServiceOfferingsBySpecialist,
  createServiceOfferingForSpecialist,
  deleteServiceOffering,
} from "../controllers/serviceOfferings.controller";

const router = Router();

// nested under specialists
router.get("/:specialistId/service-offerings", listServiceOfferingsBySpecialist);
router.post("/:specialistId/service-offerings", createServiceOfferingForSpecialist);

// direct
router.delete("/service-offerings/:id", deleteServiceOffering);

export default router;

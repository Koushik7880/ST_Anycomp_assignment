import { Router } from "express";
import {
  listSpecialists,
  createSpecialist,
  getSpecialist,
  updateSpecialist,
  publishSpecialist,
  softDeleteSpecialist,
  exportSpecialists, 
} from "../controllers/specialists.controller";

const router = Router();

router.get("/", listSpecialists);
router.post("/", createSpecialist);
router.get("/:id", getSpecialist);
router.put("/:id", updateSpecialist);
router.patch("/:id/publish", publishSpecialist);
router.delete("/:id", softDeleteSpecialist);
router.get("/export", exportSpecialists);

export default router;

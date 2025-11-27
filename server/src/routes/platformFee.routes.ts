import { Router } from "express";
import {
  listPlatformFees,
  createPlatformFee,
  updatePlatformFee,
  deletePlatformFee,
} from "../controllers/platformFee.controller";

const router = Router();

router.get("/", listPlatformFees);
router.post("/", createPlatformFee);
router.put("/:id", updatePlatformFee);
router.delete("/:id", deletePlatformFee);

export default router;

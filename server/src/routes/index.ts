import { Router } from "express";
import specialistsRoutes from "./specialists.routes";
import serviceOfferingsRoutes from "./serviceOfferings.routes";
import mediaRoutes from "./media.routes";
import platformFeeRoutes from "./platformFee.routes";
// import mediaRoutes from "./media.routes";

const router = Router();

router.use("/specialists", specialistsRoutes);
router.use("/specialists", serviceOfferingsRoutes);
// router.use("/", mediaRoutes);
router.use("/platform-fees", platformFeeRoutes);
router.use("/specialists", mediaRoutes); // so final path = /api/specialists/:id/media

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceOfferings_controller_1 = require("../controllers/serviceOfferings.controller");
const router = (0, express_1.Router)();
// nested under specialists
router.get("/:specialistId/service-offerings", serviceOfferings_controller_1.listServiceOfferingsBySpecialist);
router.post("/:specialistId/service-offerings", serviceOfferings_controller_1.createServiceOfferingForSpecialist);
// direct
router.delete("/service-offerings/:id", serviceOfferings_controller_1.deleteServiceOffering);
exports.default = router;

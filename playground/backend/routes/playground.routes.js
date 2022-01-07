import { Router } from "express";

import * as action from "../controllers/action.controller.js";
import * as device from "../controllers/device.controller.js";
import * as report from "../controllers/report.controller.js";

const router = Router();

// ACTIONS
router.post("/action/", action.create);
router.get("/action/", action.findAll);
router.get("/action/:id", action.findOne);
router.put("/action/:id", action.update);
router.delete("/action/:id", action.delete);
router.delete("/action/", action.deleteAll);

// DEVICES
router.post("/device/", device.create);
router.get("/device/", device.findAll);
router.get("/device/:id", device.findOne);
router.put("/device/:id", device.update);
router.delete("/device/:id", device.delete);
router.delete("/device/", device.deleteAll);

// REPORTS
router.post("/report/", report.create);
router.get("/report/", report.findAll);
router.get("/report/:id", report.findOne);
router.put("/report/:id", report.update);
router.delete("/report/:id", report.delete);
router.delete("/report/", report.deleteAll);

export default router;

import { Router } from "express";

import {
  getAllWindData,
  getAverageWindSpeed,
  saveWindData,
} from "../controllers/winddata";

const router = Router();
router.post("/save", saveWindData);

router.get("/getAllWindData", getAllWindData);

router.get("/getAverageWindSpeed", getAverageWindSpeed);

export default router;

import { Router } from "express";

import {
  addDistrictData,
  getAllDistrictData,
  getAllDistrictList,
} from "../controllers/districtdata";

const router = Router();

router.get("/getAllDistrictData", getAllDistrictData);
router.get("/getAllDistrictList", getAllDistrictList);
router.post("/save", addDistrictData);

export default router;

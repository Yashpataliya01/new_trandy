import express from "express";
import {
  getBrands,
  createBrand,
  editBrand,
  deleteBrand,
  getVarients,
  addVariant,
  updateVariant,
  deleteVariant,
} from "../controller/mobile.controller.js";

const router = express.Router();

router.get("/", getBrands);
router.post("/create", createBrand);
router.put("/update/:id", editBrand);
router.delete("/delete/:id", deleteBrand);
router.get("/getMobiles", getVarients);
router.post("/addVariant", addVariant);
router.put("/updateVariant/:id", updateVariant);
router.delete("/deleteVariant/:id", deleteVariant);

export default router;

import express from "express";
import {
  addDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} from "../controller/discount.controller.js";

const router = express.Router();

router.post("/", addDiscount);
router.get("/", getDiscounts);
router.put("/:id", updateDiscount);
router.delete("/:id", deleteDiscount);

export default router;

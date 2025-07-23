import {
  showShopCategories,
  createShopCategory,
  editShopCategory,
  deleteShopCategory,
} from "../controller/shopCategory.controller.js";
import express from "express";
const router = express.Router();

router.get("/categories", showShopCategories); // Fetch all categories
router.get("/categories/:id", showShopCategories);
router.post("/categories", createShopCategory);
router.put("/categories/:id", editShopCategory);
router.delete("/categories/:id", deleteShopCategory);

export default router;

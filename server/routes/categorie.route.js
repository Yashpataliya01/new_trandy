import express from "express";
import {
  createCategorie,
  getAllCategories,
  UpdateCategories,
  DeleteCategories,
} from "../controller/categorie.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/create", createCategorie);
router.put("/update/:id", UpdateCategories);
router.delete("/delete/:id", DeleteCategories);

export default router;

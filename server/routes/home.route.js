import express from "express";
import {
  getHome,
  createHome,
  updateHome,
  deleteHome,
} from "../controller/home.controller.js";

const router = express.Router();

router.get("/", getHome);
router.post("/create", createHome);
router.put("/update/:id", updateHome);
router.delete("/delete/:id", deleteHome);

export default router;

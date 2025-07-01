import express from "express";
import {
  createProduct,
  getAllProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/getproducts", getProducts);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;

import express from "express";
import {
  addToCart,
  getCartByUser,
  removeFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.get("/getCartByUser/:user", getCartByUser);
router.delete("/removeFromCart", removeFromCart);
router.put("/updateQuantity", updateQuantity);

export default router;

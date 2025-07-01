import express from "express";
import Wishlist from "../models/wishlist.model.js";

const app = express();
app.use(express.json());

export const getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!wishlist) {
      return res.status(200).json({ user: userId, products: [] }); // return empty if none
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: err.message });
  }
};

// 2. ADD to Wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    const alreadyExists = wishlist.products.some(
      (item) => item.product.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.products.push({ product: productId });
    await wishlist.save();

    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to wishlist", error: err.message });
  }
};

// 3. REMOVE from Wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    res
      .status(200)
      .json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing from wishlist", error: err.message });
  }
};

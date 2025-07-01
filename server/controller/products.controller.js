import express from "express";
import cookieParser from "cookie-parser";
import Product from "../models/products.model.js";
import Category from "../models/categorie.model.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) query.category = category;

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// /controllers/productController.js
export const getProducts = async (req, res) => {
  try {
    const { category, tags, page = 1, limit = 20, sort } = req.query;

    const filter = {};

    // Category filtering
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(400).json({ message: "Category not found" });
      }
      filter.category = categoryDoc._id;
    }

    // Tag filtering
    if (tags) {
      filter.tag = tags;
    }

    const skip = (page - 1) * limit;

    // Fetch all filtered products for in-memory sorting
    let products = await Product.find(filter).populate("category").lean(); // lean makes docs plain JS objects

    // Apply sorting based on price/discountedPrice
    if (sort === "price_asc") {
      products.sort((a, b) => {
        const aPrice = a.discountedPrice ?? a.price;
        const bPrice = b.discountedPrice ?? b.price;
        return aPrice - bPrice;
      });
    } else if (sort === "price_desc") {
      products.sort((a, b) => {
        const aPrice = a.discountedPrice ?? a.price;
        const bPrice = b.discountedPrice ?? b.price;
        return bPrice - aPrice;
      });
    }

    const total = products.length;

    // Paginate manually after sorting
    const paginatedProducts = products.slice(skip, skip + Number(limit));

    res.status(200).json({
      products: paginatedProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      totalProducts: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image, discountedPrice, category, tags } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      discountedPrice,
      category,
      tag: tags || "New",
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, image, discountedPrice, category, tags } =
    req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;

    // Handle image update only if image is not undefined or empty array
    if (image !== undefined && !(Array.isArray(image) && image.length === 0)) {
      product.image = image;
    }

    product.discountedPrice = discountedPrice ?? product.discountedPrice;
    product.category = category ?? product.category;
    product.tag = tags ?? product.tag;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

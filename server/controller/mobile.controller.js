import express from "express";
import Brand from "../models/brand.model.js";
import Mobile from "../models/mobile.model.js";

const app = express();
app.use(express.json());

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = new Brand({ name });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVarients = async (req, res) => {
  try {
    const { brand } = req.query;
    let query = {};
    if (brand) query.brand = brand;

    const mobile = await Mobile.find(query).populate("variants");
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add variant to existing mobile
export const addVariant = async (req, res) => {
  try {
    const { brand, modelName, image, variants } = req.body;

    // Validation
    if (
      !brand ||
      !modelName ||
      !variants ||
      !Array.isArray(variants) ||
      variants.length === 0
    ) {
      return res.status(400).json({
        error: "Required fields missing or variants array is invalid.",
      });
    }

    // Optionally: filter out duplicates inside `variants` array
    const uniqueVariants = [];
    const seen = new Set();

    for (let variant of variants) {
      const key = `${variant.ram}-${variant.rom}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueVariants.push(variant);
      }
    }

    const newMobile = new Mobile({
      brand,
      modelName,
      image,
      variants: uniqueVariants,
    });

    await newMobile.save();

    await newMobile.populate("brand", "name");

    res.status(201).json(newMobile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update specific variant
export const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, modelName, image, variants } = req.body;

    const mobile = await Mobile.findById(id);
    if (!mobile) {
      return res.status(404).json({ error: "Mobile not found" });
    }

    // Update fields if provided
    if (brand) mobile.brand = brand;
    if (modelName) mobile.modelName = modelName;
    if (image) mobile.image = image;

    // Replace variants if provided
    if (Array.isArray(variants)) {
      const seen = new Set();
      const uniqueVariants = [];

      for (let variant of variants) {
        const key = `${variant.ram}-${variant.rom}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueVariants.push(variant);
        }
      }

      mobile.variants = uniqueVariants; // replace with new array
    }

    await mobile.save();
    await mobile.populate("brand", "name");

    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete specific variant
export const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMobile = await Mobile.findByIdAndDelete(id);

    if (!deletedMobile) {
      return res.status(404).json({ error: "Mobile not found" });
    }

    res
      .status(200)
      .json({ message: "Mobile deleted successfully", mobile: deletedMobile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

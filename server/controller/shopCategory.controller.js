import ShopCategory from "../models/shopCategory.js"; // Adjust the path to your ShopCategory model

// Show all shop categories or a single category by ID
export const showShopCategories = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      // Fetch a single category by ID with its parent category populated
      const category = await ShopCategory.findById(id).populate("category");
      if (!category) {
        return res.status(404).json({ message: "Shop category not found" });
      }
      return res.status(200).json(category);
    }
    // Fetch all categories with their parent categories populated
    const categories = await ShopCategory.find().populate("category");
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch shop categories", error });
  }
};

// Create a new shop category
export const createShopCategory = async (req, res) => {
  try {
    const { name, description, image, category } = req.body;
    if (!name || !description || !image || !category) {
      return res.status(400).json({
        message: "All fields (name, description, image, category) are required",
      });
    }
    const existingCategory = await ShopCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category name already exists" });
    }
    const newCategory = new ShopCategory({
      name,
      description,
      image,
      category,
    });
    await newCategory.save();
    res
      .status(201)
      .json({ message: "Shop category created successfully", newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create shop category", error });
  }
};

// Edit an existing shop category
export const editShopCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, category } = req.body;
    if (!name || !description || !image || !category) {
      return res.status(400).json({
        message: "All fields (name, description, image, category) are required",
      });
    }
    const categoryToUpdate = await ShopCategory.findById(id);
    if (!categoryToUpdate) {
      return res.status(404).json({ message: "Shop category not found" });
    }
    // Check for duplicate name, excluding the current category
    const existingCategory = await ShopCategory.findOne({
      name,
      _id: { $ne: id },
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Category name already exists" });
    }
    categoryToUpdate.name = name;
    categoryToUpdate.description = description;
    categoryToUpdate.image = image;
    categoryToUpdate.category = category;
    await categoryToUpdate.save();
    res.status(200).json({
      message: "Shop category updated successfully",
      categoryToUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update shop category", error });
  }
};

// Delete a shop category
export const deleteShopCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ShopCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Shop category not found" });
    }
    await category.deleteOne();
    res.status(200).json({ message: "Shop category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete shop category", error });
  }
};

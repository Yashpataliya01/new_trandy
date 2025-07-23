import mongoose from "mongoose";

const shopCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: Array,
    required: true,
  },
});

const ShopCategory = mongoose.model("ShopCategory", shopCategorySchema);
export default ShopCategory;

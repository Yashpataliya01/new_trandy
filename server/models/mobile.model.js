// models/Mobile.js
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  ram: { type: String, required: true },
  rom: { type: String, required: true },
  basePrice: { type: Number, required: true },
});

const mobileSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    modelName: { type: String, required: true },
    image: {
      type: String,
    },
    variants: [variantSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Mobile", mobileSchema);

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String, // im using firebase in my frontend thats why i dont need any users model
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

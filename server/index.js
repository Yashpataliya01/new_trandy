// index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// import routes
import CategorieRoute from "./routes/categorie.route.js";
import ProductRoute from "./routes/product.route.js";
import MobileRoute from "./routes/mobile.route.js";
import CartRoute from "./routes/cart.route.js";
import WishlistRoute from "./routes/wishlist.routes.js";
import UserRoute from "./routes/user.route.js";
import discountRoute from "./routes/discount.route.js";
import HomeRoute from "./routes/home.route.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.use("/api/categories", CategorieRoute);
app.use("/api/products", ProductRoute);
app.use("/api/mobiles", MobileRoute);
app.use("/api/carts", CartRoute);
app.use("/api/wishlists", WishlistRoute);
app.use("/api/users", UserRoute);
app.use("/api/discounts", discountRoute);
app.use("/api/home", HomeRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

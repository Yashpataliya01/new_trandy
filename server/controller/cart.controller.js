import Cart from "../models/cart.model.js";

// Create or update cart
export const addToCart = async (req, res) => {
  try {
    const { user, productId, quantity } = req.body;

    // Find if cart exists for user
    let cart = await Cart.findOne({ user });

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        user,
        products: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const existingProductIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        // Update quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add new product
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Add to cart failed:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get cart by user
export const getCartByUser = async (req, res) => {
  try {
    const { user } = req.params;
    const cart = await Cart.findOne({ user }).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { user, productId } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to remove it
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    console.error("Remove from cart failed:", error);
    return res.status(500).json({ message: "Error removing product", error });
  }
};

// update quantity
export const updateQuantity = async (req, res) => {
  try {
    const { user, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    } else {
      cart.products[productIndex].quantity = quantity;
    }

    await cart.save();

    return res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    console.error("Update quantity failed:", error);
    return res.status(500).json({ message: "Error updating quantity", error });
  }
};

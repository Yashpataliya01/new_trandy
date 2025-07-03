import React, { useEffect, useState, useContext } from "react";
import { Heart, X, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import { AppContext } from "../../context/AuthContext.jsx";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [discounts, setDiscounts] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState(null);
  const { setFavcart } = useContext(AppContext);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Fetch cart data
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.uid) {
      fetch(`http://localhost:5000/api/carts/getCartByUser/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setCartData(data);
          const initialQuantities = {};
          data.products?.forEach((item, index) => {
            initialQuantities[index] = item.quantity;
          });
          setQuantities(initialQuantities);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }

    // Fetch discounts
    fetch("http://localhost:5000/api/discounts")
      .then((res) => res.json())
      .then((data) => {
        setDiscounts(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching discounts:", error);
      });
  }, []);

  const handleApplyDiscount = () => {
    setDiscountError(null);
    const discount = discounts.find(
      (d) => d.name.toLowerCase() === discountCode.trim().toLowerCase()
    );
    if (discount) {
      setAppliedDiscount(discount);
    } else {
      setDiscountError("Invalid discount code");
      setAppliedDiscount(null);
    }
  };

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity < 1) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const product = cartData.products[index];

    if (!user?.uid || !product) return;

    setQuantities((prev) => ({
      ...prev,
      [index]: newQuantity,
    }));

    try {
      const response = await fetch(
        "http://localhost:5000/api/carts/updateQuantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.uid,
            productId: product.product._id,
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setQuantities((prev) => ({
        ...prev,
        [index]: cartData.products[index].quantity,
      }));
      alert("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveItem = async (item, index) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.uid || !item?.product?._id) return;

    const updatedProducts = cartData.products.filter((_, i) => i !== index);
    setCartData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));

    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[index];
      const reindexed = {};
      Object.keys(newQuantities).forEach((key) => {
        const oldIndex = parseInt(key);
        const newIndex = oldIndex > index ? oldIndex - 1 : oldIndex;
        reindexed[newIndex] = newQuantities[key];
      });
      return reindexed;
    });
    setFavcart(updatedProducts.length);

    try {
      const response = await fetch(
        "http://localhost:5000/api/carts/removeFromCart",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.uid,
            productId: item.product._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setCartData((prev) => ({
        ...prev,
        products: [...cartData.products],
      }));
      const originalQuantities = {};
      cartData.products.forEach((item, i) => {
        originalQuantities[i] = item.quantity;
      });
      setQuantities(originalQuantities);
      alert("Failed to remove item. Please try again.");
    }
  };

  const subtotal =
    cartData?.products?.reduce(
      (sum, { product }, index) =>
        sum + product.discountedPrice * (quantities[index] || 1),
      0
    ) || 0;

  const discountAmount = appliedDiscount
    ? (subtotal * appliedDiscount.discountPercent) / 100
    : 0;

  const total = subtotal - discountAmount;

  const totalSavings =
    (cartData?.products?.reduce((sum, { product }, index) => {
      if (product.originalPrice) {
        const savings =
          (product.originalPrice - product.discountedPrice) *
          (quantities[index] || 1);
        return sum + savings;
      }
      return sum;
    }, 0) || 0) + discountAmount;

  if (!cartData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-700" />
            <h1
              className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shopping Cart
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">
              {cartData?.products.length || 0} items
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-sm">Ready for checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Product Details */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto">
              {cartData?.products.map((item, i) => (
                <div
                  key={i}
                  className="group hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex gap-6 p-8 border-b border-gray-100 last:border-b-0">
                    {/* Product Image */}
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-4">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                            {item.product.brand}
                          </div>
                          <h2 className="text-xl font-medium text-gray-900 mb-3 leading-tight">
                            {item.product.name}
                          </h2>
                          <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-semibold text-gray-900">
                              ₹{item.product.discountedPrice.toLocaleString()}
                            </span>
                            {item.product.originalPrice &&
                              item.product.originalPrice >
                                item.product.discountedPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                  ₹{item.product.originalPrice.toLocaleString()}
                                </span>
                              )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            className="p-2 rounded-full hover:bg-red-50 transition-colors group/btn"
                            onClick={() => handleRemoveItem(item, i)}
                          >
                            <X className="w-5 h-5 text-gray-400 group-hover/btn:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Status & Quantity */}
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm font-medium text-emerald-600">
                            In Stock
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">Qty:</span>
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(i, (quantities[i] || 1) - 1)
                              }
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                              {quantities[i] || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(i, (quantities[i] || 1) + 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <h2
                    className="text-2xl font-medium text-gray-900 mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Order Summary
                  </h2>

                  {/* Discount Code */}
                  <div className="mb-8">
                    <div className="relative">
                      <input
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="Enter discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                        onClick={handleApplyDiscount}
                      >
                        Apply
                      </button>
                    </div>
                    {discountError && (
                      <p className="mt-2 text-sm text-red-500">
                        {discountError}
                      </p>
                    )}
                    {appliedDiscount && (
                      <p className="mt-2 text-sm text-emerald-600">
                        {appliedDiscount.name} (
                        {appliedDiscount.discountPercent}
                        %) applied!
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          Discount
                        </span>
                        <span className="font-medium text-emerald-600">
                          -₹{discountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {totalSavings > discountAmount && (
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          Product Savings
                        </span>
                        <span className="font-medium text-emerald-600">
                          -₹{(totalSavings - discountAmount).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">
                          ₹99
                        </span>
                        <span className="font-medium text-emerald-600">
                          FREE
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-semibold text-gray-900">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 text-right">
                        Inclusive of all taxes
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium tracking-wide hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                      Proceed to Checkout
                    </button>
                    <button className="w-full border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-medium tracking-wide hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                      Continue Shopping
                    </button>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      <span>Secure checkout with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

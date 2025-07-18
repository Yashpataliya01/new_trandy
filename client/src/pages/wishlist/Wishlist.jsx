import React, { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const API_ORIGIN = import.meta.env.VITE_ENCODED_URL;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/api/wishlists/${user.uid}`);
        const data = await res.json();
        setWishlist(data.products || []);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user?.uid, navigate]);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch(`${API_ORIGIN}/api/wishlists/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, productId }),
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result.message);

      setWishlist((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Remove wishlist error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-16 px-6 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            ❤️ My Wishlist
          </h1>
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Continue Shopping →
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center mt-24">
            <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500 mb-2">
              Your wishlist is currently empty.
            </p>
            <Link
              to="/products"
              className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlist.map(({ product }) => (
              <div
                key={product._id}
                className="group rounded-2xl border border-gray-100 shadow-md bg-white overflow-hidden hover:shadow-xl transition duration-300"
              >
                <Link to={`/products/${product._id}`} state={product}>
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-md font-bold text-gray-900">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
                <div className="p-4 border-t flex justify-end">
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

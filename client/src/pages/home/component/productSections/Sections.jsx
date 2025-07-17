import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, HeartIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../../../services/productsApi";

// import images
import img from "../../../../assets/home/homeBar.jpeg";

const ProductShowcase = ({ title, id }) => {
  console.log(id, "id");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [wishlist, setWishlist] = useState([]);

  const queryParams =
    title === "Trending"
      ? { tags: title, limit: 6, page: 1 }
      : id
      ? { id, limit: 6, page: 1 }
      : { category: title, limit: 6, page: 1 };

  const { data, error, isLoading } = useGetProductsQuery(queryParams);
  const products = data?.products || [];

  // Get wishlist on load
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.uid) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/wishlists/${user?.uid}`
        );
        const data = await res.json();
        const productIds = data.products?.map((item) => item.product._id) || [];
        setWishlist(productIds);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user?.uid]);

  // Toggle wishlist handler
  const toggleWishlist = async (productId) => {
    if (!user?.uid) return alert("Please login to add to wishlist");

    const isInWishlist = wishlist.includes(productId);
    const endpoint = isInWishlist ? "remove" : "add";

    try {
      const res = await fetch(
        `http://localhost:5000/api/wishlists/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid, productId }),
        }
      );

      const result = await res.json();
      if (!res.ok) return alert(result.message);

      const updated = isInWishlist
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];
      setWishlist(updated);
    } catch (err) {
      console.error("Wishlist error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      {/* <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap");
      `}</style> */}

      <div className="py-16">
        <div className="mx-auto flex justify-center flex-col items-center">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 p-7 w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url(${img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-5xl text-gray-900 mb-4 tracking-tight">
              {title ? title : data?.products[0]?.category?.name}
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 min-[420px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl px-8">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="group cursor-pointer bg-white rounded-2xl transition-shadow duration-300"
                onClick={() =>
                  navigate(`/products/${product._id}`, {
                    state: {
                      product: product,
                      id: product?.category?._id,
                    },
                  })
                }
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-t-2xl">
                  <div className="aspect-square w-full overflow-hidden relative group">
                    <motion.img
                      src={product.image[0]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                    />
                    <motion.img
                      src={product.image[1]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent navigation
                        toggleWishlist(product._id);
                      }}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md hover:scale-105 transition-transform duration-200"
                    >
                      {wishlist.includes(product._id) ? (
                        <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-3 pb-5 text-center space-y-1">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{product.discountedPrice || product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ y: -2 }} className="inline-block">
              <Link
                to="/products"
                state={
                  title === "Trending" ? { tags: title } : { category: title }
                }
                className="text-gray-900 text-sm tracking-wider border-b border-gray-400 pb-1 hover:border-gray-900 transition-colors duration-300"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              >
                View All {title}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductShowcase;

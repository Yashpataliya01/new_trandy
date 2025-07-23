import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryShowcase = () => {
  const API_ORIGIN = import.meta.env.VITE_ENCODED_URL;
  const API = `${API_ORIGIN}/api`;
  const [shopCategories, setShopCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch shop categories
  const fetchShopCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/shopCategories/categories`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to fetch categories");
      setShopCategories(data);
      // Set the first category as the default selected category
      if (data.length > 0) setSelectedCategory(data[0]);
    } catch (err) {
      setError("Failed to load categories. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopCategories();
  }, []);

  // If loading, show a placeholder
  if (loading) {
    return (
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-[600px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 text-xl"
          >
            Loading categories...
          </motion.div>
        </div>
      </section>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-[600px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-red-500 text-xl"
          >
            {error}
          </motion.div>
        </div>
      </section>
    );
  }

  // If no categories, show a message
  if (!shopCategories.length) {
    return (
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-[600px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 text-xl"
          >
            No categories available.
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;600&display=swap");
      `}</style>

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl text-gray-900 mb-12"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
          >
            Shop by Category
          </motion.h2>

          {/* Filter Buttons */}
          <div className="flex gap-4 flex-wrap mb-16">
            {shopCategories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full border text-sm tracking-wide transition-all duration-300 ${
                  selectedCategory?._id === cat._id
                    ? "bg-black text-white"
                    : "bg-transparent border-gray-300 text-gray-800 hover:border-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Hero Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Large Image - spans 2 columns */}
            <motion.img
              key={selectedCategory?.image?.[0] || ""}
              src={selectedCategory?.image?.[0] || ""}
              alt="Large visual"
              className="w-full h-[500px] object-cover rounded-xl shadow-md md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x500?text=Image+Not+Available";
              }}
            />

            {/* Right Column: Small Image + Text */}
            <div className="flex flex-col gap-6">
              {/* Small Image */}
              <motion.img
                key={selectedCategory?.image?.[1] || ""}
                src={selectedCategory?.image?.[1] || ""}
                alt="Small visual"
                className="w-full h-[200px] object-cover rounded-lg shadow"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=Image+Not+Available";
                }}
              />

              {/* Text Block */}
              <motion.div
                key={selectedCategory?._id || ""}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3
                  className="text-2xl text-gray-900"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  {selectedCategory?.name || "No Category Selected"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedCategory?.description || "No description available."}
                </p>
                <Link
                  to={`/products`}
                  state={{ category: selectedCategory?.category?.name || "" }}
                  className="bg-black text-white px-6 py-3 text-sm tracking-wide rounded hover:bg-gray-800 transition"
                >
                  SHOP NOW
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryShowcase;

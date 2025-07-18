import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "TMP Special",
    images: [
      "https://cdn.shopify.com/s/files/1/0070/7032/articles/trending-products_2bd146ef-3fbd-4ab0-a8a4-8a7e4d1bf4c9.png?v=1751380747",
      "https://www.shahisajawat.com/cdn/shop/products/product-image-1624263047.jpg?v=1608294995",
    ],
    title: "Grace Meets Grandeur",
    description:
      "Elevate your interiors with vintage-inspired masterpieces that blend timeless design with classic luxury.",
    cta: "SHOP Special",
    path: "TMP Special",
  },
  {
    name: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&h=700&fit=crop",
      "https://t3.ftcdn.net/jpg/01/59/74/48/360_F_159744874_MshH8rY3U6RRnUXmHpAGmF31my7hJAtV.jpg",
    ],
    title: "Curated picks for your mobile lifestyle.",
    description:
      "From wireless audio to power essentials – discover the ultimate accessory edits handpicked for trendsetters.",
    cta: "ACCESSORIES",
    path: "Mobile Accessories",
  },
  {
    name: "DIY",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&h=700&fit=crop",
    ],
    title: "Craft your world, your way.",
    description:
      "Creative DIY essentials for the makers and dreamers. Explore top tools, kits, and supplies.",
    cta: "DIY PICKS",
    path: "DIY",
  },
  {
    name: "Gifts",
    images: [
      "https://swagmagicblog.b-cdn.net/wp-content/uploads/2023/06/self-care-package-seasonal-gift-box-with-zero-waste-organic-cosmetics-products-for-men-1024x682.jpg",
      "https://hips.hearstapps.com/hmg-prod/images/esq250102-digital-ecomm-giftsformen-8780-67c8baf2bf588.jpg?crop=0.668xw:1.00xh;0,0&resize=640:*",
    ],
    title: "Thoughtful, timeless, and treasured.",
    description:
      "Curated gifts for every occasion. Wrapped in care, delivered with love, and made to make memories.",
    cta: "Gifts",
    path: "Gifts",
  },
];

const CategoryShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full border text-sm tracking-wide transition-all duration-300 ${
                  selectedCategory.name === cat.name
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
              key={selectedCategory.images[0]}
              src={selectedCategory.images[0]}
              alt="Large visual"
              className="w-full h-[500px] object-cover rounded-xl shadow-md md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Right Column: Small Image + Text */}
            <div className="flex flex-col gap-6">
              {/* Small Image */}
              <motion.img
                key={selectedCategory.images[1]} // 👈 This forces re-render + animation
                src={selectedCategory.images[1]}
                alt="Small visual"
                className="w-full h-[200px] object-cover rounded-lg shadow"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              />

              {/* Text Block */}
              <motion.div
                key={selectedCategory.name}
                initial={{ opacity: 0, y: -30 }} // 👈 Changed from y: 20 to y: -30
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3
                  className="text-2xl text-gray-900"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  {selectedCategory.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedCategory.description}
                </p>
                <Link
                  to={`/products`}
                  state={{ category: selectedCategory.path }}
                  className="bg-black text-white px-6 py-3 text-sm tracking-wide rounded hover:bg-gray-800 transition"
                >
                  {selectedCategory.cta}
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

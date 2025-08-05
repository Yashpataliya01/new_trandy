import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const TrendingSpotlight = () => {
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);
  const [product, setProduct] = useState(null);
  const API = "http://localhost:5000/api";

  const fetchProducts = async () => {
    try {
      const url = `${API}/products/getproducts?tags=Most Trending`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch products");

      const firstProduct = data?.products?.[0];
      const imageUrl = firstProduct?.image?.[0] || null;
      setProductImage(imageUrl);
      setProduct(firstProduct);
    } catch (error) {
      console.error(error);
      alert("Failed to load product image");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="relative w-full h-[90vh] bg-[#eae6db] overflow-hidden">
      {/* Background Product Image from API */}
      <motion.img
        src={
          productImage ||
          "https://static.cadcrowd.com/blog/wp-content/uploads/2017/06/f820f467-63b0-4f94-9c01-48e3671380fa.jpg"
        }
        alt="Trending Spotlight Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Soft background wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#eae6db]/10 to-transparent z-10" />

      {/* Text Section (unchanged) */}
      <div className="relative z-20 h-full flex items-end justify-start px-8 md:px-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-md"
        >
          <h2
            className="text-black text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
          >
            Meet Elemental
          </h2>
          <p className="text-black/50 text-lg mb-6">
            Pure form meets elevated hydration.
          </p>
          <p
            onClick={() =>
              navigate(`/products/${product._id}`, {
                state: {
                  product: product,
                  id: product?.category?._id,
                },
              })
            }
            className="inline-block bg-[#f4d370] text-black px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-[#f6ca36] transition"
          >
            Shop Now →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSpotlight;

import React from "react";
import { motion } from "framer-motion";

const TrendingSpotlight = () => {
  return (
    <section className="relative w-full h-[90vh] bg-[#eae6db] overflow-hidden">
      {/* Image with natural lighting feel */}
      <motion.img
        src="https://static.cadcrowd.com/blog/wp-content/uploads/2017/06/f820f467-63b0-4f94-9c01-48e3671380fa.jpg"
        alt="Featured Bottle"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Soft background wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#eae6db]/10 to-transparent z-10" />

      {/* Text Section */}
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
          <a
            href="#"
            className="inline-block bg-[#f4d370] text-black px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-[#f6ca36] transition"
          >
            Shop Now →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSpotlight;

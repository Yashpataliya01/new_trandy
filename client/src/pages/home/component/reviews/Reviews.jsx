import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Emma Carter",
    quote:
      "Absolutely love the accessories – sleek, functional, and top-notch quality!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    name: "James Holden",
    quote: "Fast delivery, amazing DIY kits—so intuitive and fun to build!",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4,
  },
  {
    name: "Ava Singh",
    quote:
      "Baby products were safe and beautifully designed—couldn’t be happier.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
  },
];

const CustomerReviews = () => (
  <section className="relative px-6 py-24 bg-transparent">
    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-200 -z-10" />

    <div className="max-w-5xl mx-auto text-center mb-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-playfair text-gray-900"
      >
        What Our Customers Say
      </motion.h2>
    </div>

    <div className="relative max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-8 md:space-y-0">
        {reviews.map((r, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
            className="relative bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl flex-1 transform hover:scale-105 transition-transform duration-300"
            style={{
              marginTop: idx === 1 ? "2rem" : "0",
              marginBottom: idx === 1 ? "2rem" : "0",
            }}
          >
            <div className="absolute -top-8 left-8">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="mt-12 space-y-4">
              <div className="flex items-center justify-start space-x-2">
                {Array(r.rating)
                  .fill()
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 stroke-yellow-400"
                    />
                  ))}
              </div>
              <p className="text-lg text-gray-800 italic leading-relaxed relative pl-8">
                <span className="absolute -left-6 -top-4 text-5xl text-gray-300">
                  “
                </span>
                {r.quote}
              </p>
              <h4 className="text-md font-semibold text-gray-900">
                — {r.name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CustomerReviews;

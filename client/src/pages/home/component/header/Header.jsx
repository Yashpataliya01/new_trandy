import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image:
      "https://www.treehugger.com/thmb/v4CGhx0mVkRXgqwz2EZSz8e1FL8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/diy-projects-reuse-your-old-glass-bottles-4864269-09-2f2da6da36a0430695b4c48c57693480.JPG",
    heading: "Creative Living Starts Here",
  },
  {
    image:
      "https://t3.ftcdn.net/jpg/01/59/74/48/360_F_159744874_MshH8rY3U6RRnUXmHpAGmF31my7hJAtV.jpg",
    heading: "Accessories That Power Your Day",
  },
  {
    image:
      "https://www.pymnts.com/wp-content/uploads/2024/06/baby-products.jpg",
    heading: "Because Your Baby Deserves the Best",
  },
];

const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap");

        .hero-text-modern {
          font-family: "Raleway", sans-serif;
          font-weight: 100;
          color: #fff;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8),
            0 0 10px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.8),
            0 0 20px #ff6b6b, 0 0 35px #ff6b6b, 0 0 40px #ff6b6b;
          position: relative;
        }

        .hero-text-modern::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(
            circle,
            rgba(255, 107, 107, 0.1) 0%,
            transparent 70%
          );
          z-index: -1;
          border-radius: 50%;
        }

        .word {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.25em;
        }

        .char {
          display: inline-block;
          transition: all 0.3s ease;
        }

        .char:hover {
          transform: translateY(-10px) rotate(5deg) scale(1.1);
          text-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="relative w-full h-[90vh] overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[index].image}
              alt="slide"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <motion.div
                key={slides[index].heading}
                initial={{ y: 60, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -60, opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                className="max-w-4xl"
              >
                <h1 className="hero-text-modern text-4xl md:text-6xl font-thin tracking-[0.2em] leading-tight">
                  {slides[index].heading.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} className="word">
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex}-${charIndex}`}
                          className="char"
                          initial={{ opacity: 0, rotateY: 90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          transition={{
                            delay: wordIndex * 0.2 + charIndex * 0.03,
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      &nbsp;
                    </span>
                  ))}
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;

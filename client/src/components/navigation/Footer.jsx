import React from "react";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/home/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-800 border-t border-gray-200 pt-10 pb-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo / About */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <img
            src={Logo}
            className="w-28 hover:scale-105 transform transition duration-300"
            alt="Trnd Logo"
          />
          <p className="text-sm text-gray-600 max-w-sm">
            Curated lifestyle essentials crafted for modern creators and
            innovators.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/the_mobile_point_bhl/"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center lg:justify-start">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 tracking-wide">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/buysell"
                  className="text-gray-600 hover:text-blue-600 transition duration-200"
                >
                  Sell
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-blue-600 transition duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-600 transition duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-xs">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 tracking-wide">
              Stay Updated
            </h4>
            <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                <Mail size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Join our newsletter for exclusive updates and offers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-200">
        © {new Date().getFullYear()} TMP All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

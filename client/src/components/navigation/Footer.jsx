import React from "react";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#fdfdfb] text-gray-700 border-t border-gray-200 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo / About */}
        <div className="space-y-4">
          <h2
            className="text-2xl font-semibold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Trnd.
          </h2>
          <p className="text-sm text-gray-600">
            Curated lifestyle essentials built for modern creators.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-gray-900">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                DIY Kits
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Baby Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Vintage
              </a>
            </li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-gray-900">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-gray-900">
            Stay Updated
          </h4>
          <form className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 text-sm outline-none"
            />
            <button className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-900 transition">
              <Mail size={16} />
            </button>
          </form>
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-black">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-12">
        © {new Date().getFullYear()} Trnd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

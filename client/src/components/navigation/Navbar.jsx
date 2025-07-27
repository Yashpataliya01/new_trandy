import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  LogOut,
  Search,
} from "lucide-react";
import { AppContext } from "../../context/AuthContext.jsx";

// import logo
import Logo from "../../assets/home/logo.png";

const Navbar = () => {
  const BASE_URL = import.meta.env.VITE_ENCODED_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { favcart } = useContext(AppContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const dropdownRef = useRef();
  const searchDropdownRef = useRef();

  // Handle outside clicks for user dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target)
      ) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          const response = await fetch(
            `${BASE_URL}/api/products/getproducts?search=${encodeURIComponent(
              searchQuery
            )}`
          );
          const data = await response.json();
          setSearchResults(data.products || []);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Sell", path: "/buysell" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/About" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleUserClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchResults([]);
      setIsMenuOpen(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchResults([]);
    setSearchQuery("");
    setIsMenuOpen(false);

    navigate(`/products/${product._id}`, {
      state: {
        product,
        id: product?.category?._id,
      },
    });
  };

  return (
    <nav className="border-b border-gray-100">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center h-22">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="" className="h-16 overflow-hidden" />
            </Link>
            <p className="text-sm text-gray-500">Viral Products</p>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => item.path && navigate(item.path)}
                  className="relative py-2"
                >
                  <span
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive(item.path)
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {item.name.toUpperCase()}
                  </span>
                  {item.path && (
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all duration-300 ${
                        isActive(item.path)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 relative">
            <Link to="/wishlist" className="group relative">
              <div className="w-8 h-8 flex items-center justify-center rounded-full shadow-md transform group-hover:translate-y-[1px] group-hover:shadow-lg transition">
                <Heart className="w-5 h-5 text-gray-600 fill-red-500" />
              </div>
            </Link>

            <Link to="/cart" className="relative group">
              <div className="w-8 h-8 flex items-center justify-center rounded-full shadow-md transform group-hover:translate-y-[1px] group-hover:shadow-lg transition">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </div>
              {favcart > 0 && (
                <div className="absolute bottom-3 left-4 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-md">
                  {favcart}
                </div>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={handleUserClick} className="group relative">
                <div className="w-8 h-8 flex items-center justify-center rounded-full shadow-md transform group-hover:translate-y-[1px] group-hover:shadow-lg transition">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </button>

              {user && showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 pb-4 border-t border-gray-100">
            <div className="relative" ref={searchDropdownRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center px-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <button type="submit" className="ml-2">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
              </form>
              {/* Mobile Search Suggestions Dropdown */}
              {searchResults.length > 0 && (
                <div className="mt-2 w-full bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.path) navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-sm font-medium tracking-wide px-2 py-2 ${
                  isActive(item.path)
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.name.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

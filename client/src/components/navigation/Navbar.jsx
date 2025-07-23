import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Heart, LogOut } from "lucide-react";
import { AppContext } from "../../context/AuthContext.jsx";

// import logo
import Logo from "../../assets/home/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { favcart } = useContext(AppContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Sell", path: "/buysell" },
    { name: "Contact", path: "/contact" },
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

  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
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
              <div className="w-8 h-8 flex items-center justify-center  rounded-full shadow-md transform group-hover:translate-y-[1px] group-hover:shadow-lg transition">
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
                <div className="w-8 h-8 flex items-center justify-center  rounded-full shadow-md transform group-hover:translate-y-[1px] group-hover:shadow-lg transition">
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

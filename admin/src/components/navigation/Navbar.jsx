import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  ChevronDown,
  Settings,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
      <div className="w-full mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              TMP
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Products
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/mobile"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Mobiles
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/users"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Users
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/discount"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Discount
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/header"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Header
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/most-tranding"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Most Tranding
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/category"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200 relative group"
            >
              Shop By Category
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 p-4">
                  <h3 className="text-white font-medium mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-slate-300 text-sm">
                        New user registration
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        2 minutes ago
                      </p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-slate-300 text-sm">
                        System update completed
                      </p>
                      <p className="text-slate-500 text-xs mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Admin</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showProfileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 py-2">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <p className="text-white font-medium">John Doe</p>
                    <p className="text-slate-400 text-sm">admin@company.com</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  <hr className="my-2 border-slate-700/50" />
                  <button className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50">
          <div className="px-6 py-4 space-y-2">
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Products
            </Link>
            <Link
              to="/users"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Users
            </Link>
            <Link
              to="/mobile"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Mobiles
            </Link>
            <Link
              to="/discount"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Discount
            </Link>
            <Link
              to="/header"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Header
            </Link>
            <Link
              to="/most-tranding"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Most Tranding
            </Link>
            <Link
              to="/category"
              className="flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
            >
              Shop By Category
            </Link>
            <hr className="my-3 border-slate-700/50" />
            <div className="flex items-center px-4 py-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">John Doe</p>
                <p className="text-slate-400 text-sm">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;

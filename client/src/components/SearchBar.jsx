import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
  const BASE_URL = import.meta.env.VITE_ENCODED_URL;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchDropdownRef = useRef();

  // Handle outside clicks for search dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchResults([]);
    setSearchQuery("");
    navigate(`/products/${product._id}`, {
      state: {
        product,
        id: product?.category?._id,
      },
    });
  };

  return (
    <div className="w-full bg-light-blue-100 py-4">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="relative" ref={searchDropdownRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-baseline justify-center w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products (e.g., knee massager, mobile accessories)..."
              className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition flex items-baseline"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
          {searchResults.length > 0 && (
            <div className="absolute mt-2 w-full md:w-1/2 lg:w-1/3 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50 max-h-60 overflow-y-auto">
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
      </div>
    </div>
  );
};

export default SearchBar;

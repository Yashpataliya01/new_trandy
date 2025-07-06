import React, { useState } from "react";
import { Search, Smartphone } from "lucide-react";
import { useGetBrandsQuery } from "../../../services/productsApi.js"; // Adjust path based on your project structure

const BrandSelector = ({ onBrandSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // RTK Query hook for fetching brands
  const { data: brands = [], isLoading: loading } = useGetBrandsQuery();

  const popularBrands = [
    "Apple",
    "Samsung",
    "OnePlus",
    "Xiaomi",
    "Oppo",
    "Vivo",
  ];
  const getPopularBrands = () =>
    brands.filter((b) => popularBrands.includes(b.name));
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const showDropdown = searchTerm.trim() !== "" && filteredBrands.length > 0;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Loading brands...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Select Your Phone Brand
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          This helps us provide an accurate value for your device
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search brand name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
        />

        {/* Dropdown Results */}
        {showDropdown && (
          <div className="absolute z-20 w-full bg-white border border-gray-200 mt-2 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => {
                  onBrandSelect(brand);
                  setSearchTerm("");
                }}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 transition"
              >
                <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">{brand.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Brands */}
      {getPopularBrands().length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Popular Brands
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {getPopularBrands().map((brand) => (
              <button
                key={brand._id}
                onClick={() => onBrandSelect(brand)}
                className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-500 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchTerm && filteredBrands.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No matching brands found.
        </div>
      )}
    </div>
  );
};

export default BrandSelector;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "../../services/productsApi";

const tagFilters = ["All", "Best Seller", "Trending", "New", "Sale"];
const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category = "All", tags = "All" } = location.state || {};

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedTag, setSelectedTag] = useState(tags);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [showFilter, setShowFilter] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 9;

  // Check if user has visited before using localStorage
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedProductPage");
    if (!hasVisited) {
      setShowFilter(true);
      localStorage.setItem("hasVisitedProductPage", "true");
    }
  }, []);

  const { data, isLoading, isError } = useGetProductsQuery({
    search,
    sort,
    tags: selectedTag !== "All" ? selectedTag : "",
    category: selectedCategory !== "All" ? selectedCategory : "",
    page,
    limit,
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = ["All", ...(categoriesData?.map((cat) => cat.name) || [])];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
          <motion.input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-1/3 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 10.117V15l4-2.5v-2.383l4.447-4.724A1 1 0 0013.553 5H2.447a1 1 0 00-.894 1.51L6 10.117z" />
            </svg>
            Filter
          </motion.button>
        </div>

        {/* Product Grid */}
        <AnimatePresence>
          {isLoading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 text-sm"
            >
              Loading products...
            </motion.p>
          ) : isError ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 text-sm"
            >
              Failed to load products.
            </motion.p>
          ) : products.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 text-sm"
            >
              No products found.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {products?.map((product) => (
                <motion.div
                  key={product?._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer"
                  whileHover={{ y: -4 }}
                  onClick={() =>
                    navigate(`/products/${product._id}`, { state: product })
                  }
                >
                  {/* Product Image with hover effect */}
                  <div className="relative aspect-[3/2] overflow-hidden group">
                    <motion.img
                      src={product.image[0]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                    />
                    <motion.img
                      src={product.image[1]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                    {/* Tag badge */}
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                      {product?.tag}
                    </span>
                  </div>

                  {/* Product Content */}
                  <div className="p-3 space-y-1.5">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {product?.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {product.discountedPrice ? (
                        <>
                          <span className="text-sm font-bold text-red-600">
                            ${product.discountedPrice}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">
                          ${product.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs text-gray-500 italic">
                        {product.category?.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 gap-3">
          <motion.button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Prev
          </motion.button>
          <span className="px-4 py-2 text-sm text-gray-700 font-medium">
            {`Page ${page} of ${totalPages}`}
          </span>
          <motion.button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>

        {/* Filter Sidebar */}
        <motion.div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
            showFilter ? "translate-x-0" : "translate-x-full"
          }`}
          initial={{ x: "100%" }}
          animate={{ x: showFilter ? 0 : "100%" }}
          transition={{ duration: 0.1 }}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900">
              Filters & Sorting
            </h3>
            <motion.button
              onClick={() => setShowFilter(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-gray-600" />
            </motion.button>
          </div>

          <div className="p-5 space-y-6">
            {/* Sort */}
            <div>
              <h4 className="font-medium text-gray-800 text-base mb-2">
                Sort by
              </h4>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={sort === option.value}
                      onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <h4 className="font-medium text-gray-800 text-base mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tagFilters.map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                      selectedTag === tag
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-700"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <h4 className="font-medium text-gray-800 text-base mb-2">
                Category
              </h4>
              <motion.button
                onClick={() => setShowCategoryDropdown((prev) => !prev)}
                className="w-full flex justify-between items-center border border-gray-200 px-4 py-2 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                {selectedCategory}{" "}
                <ChevronDown size={16} className="text-gray-500" />
              </motion.button>

              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 border border-gray-200 rounded-lg bg-white shadow-lg max-h-56 overflow-y-auto"
                  >
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCategoryDropdown(false);
                          setPage(1);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 font-medium transition-colors"
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reset & Apply */}
            <div className="flex justify-between gap-2 pt-4">
              <motion.button
                className="flex-1 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all"
                onClick={() => {
                  setSort("");
                  setSelectedTag("All");
                  setSelectedCategory("All");
                  setSearch("");
                  setPage(1);
                  setShowFilter(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
              <motion.button
                className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                onClick={() => setShowFilter(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Backdrop */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-b from-gray Hawkins-gray-300/20 to-gray-300/20 backdrop-blur-lg z-40"
              onClick={() => setShowFilter(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductPage;

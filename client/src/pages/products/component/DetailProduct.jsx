import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../../context/AuthContext.jsx";
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import ProductShowcase from "../../home/component/productSections/Sections";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useAddToCartMutation,
} from "../../../services/productsApi.js"; // Adjust the import path based on your project structure

const DetailProduct = () => {
  const location = useLocation();
  const { product, id } = location.state || {};
  const { setFavcart } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(product?.image?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // RTK Query hooks
  const { data: wishlistData, isLoading: wishlistLoading } =
    useGetWishlistQuery(user?.uid, { skip: !user?.uid });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    if (product?.image?.[0]) setSelectedImage(product.image[0]);
  }, [product]);

  // Set wishlist state based on query data
  useEffect(() => {
    if (wishlistData) {
      const ids = wishlistData.products?.map((item) => item.product._id) || [];
      setIsWishlisted(ids.includes(product._id));
    }
  }, [wishlistData, product._id]);

  // Toggle Wishlist
  const toggleWishlist = async () => {
    if (!user?.uid) {
      toast.error("Please login to use wishlist");
      navigate("/login");
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist({
          userId: user.uid,
          productId: product._id,
        }).unwrap();
        toast.success("Removed from Wishlist");
      } else {
        await addToWishlist({
          userId: user.uid,
          productId: product._id,
        }).unwrap();
        toast.success("Added to Wishlist ❤️");
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleAddToCart = async () => {
    if (!user || !user.uid) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        user: user.uid,
        productId: product._id,
        quantity,
      }).unwrap();
      toast.success("Successfully added to cart!");
      setFavcart((prev) => prev + 1);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No product selected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-600 hover:text-black transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>{product.category?.name}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                      isWishlisted
                        ? "bg-red-500 text-white scale-110"
                        : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-2 bg-white/90 text-gray-600 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-500 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product?.image?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`min-w-[80px] h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-black scale-105 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                {product.tag}
              </span>
              <span className="text-sm text-gray-500">
                Category: {product.category?.name}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {product?.name}
            </h1>

            <div className="flex items-center gap-4 mb-2">
              {product?.discountedPrice ? (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                  <span className="text-3xl">₹{product.discountedPrice}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Save ₹{product.price - product.discountedPrice}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product?.price}
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 rounded-l-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 rounded-r-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  className="w-full py-4 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`w-full py-4 border-2 font-semibold rounded-xl transition-all duration-300 ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 inline mr-2 ${
                      isWishlisted ? "fill-current" : ""
                    }`}
                  />
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Showcase */}
        <ProductShowcase title={product.category?.name} id={id ? id : ""} />
      </div>
      <Toaster />
    </div>
  );
};

export default DetailProduct;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Search,
  Loader2,
  Upload,
  ImagePlus,
  Smartphone,
  Cpu,
  HardDrive,
} from "lucide-react";

const MobileVariants = () => {
  const location = useLocation();
  const cat = location.state || {};
  const [mobiles, setMobiles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMobile, setEditMobile] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    modelName: "",
    image: null, // Changed from array to single value
    variants: [{ ram: "", rom: "", basePrice: "" }],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API = "http://localhost:5000/api";

  // Fetch all mobiles
  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const url = `${API}/mobiles/getMobiles/${
        cat?._id ? `?brand=${cat._id}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch mobiles");
      setMobiles(data);
    } catch (error) {
      alert("Failed to load mobiles");
    } finally {
      setLoading(false);
    }
  };

  // Upload single image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pnmzh8qk");
    formData.append("cloud_name", "dysvhtqxi");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dysvhtqxi/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url || null;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  // Save mobile with variants
  const handleSaveMobile = async () => {
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.modelName || formData.variants.length === 0) {
        alert("Please fill in all required fields");
        return;
      }

      // Validate variants
      const validVariants = formData.variants.filter(
        (variant) => variant.ram && variant.rom && variant.basePrice
      );

      if (validVariants.length === 0) {
        alert("Please add at least one complete variant");
        return;
      }

      const imageUrl = await uploadImageToCloudinary(formData.image);
      const payload = {
        ...formData,
        image: imageUrl, // Single image URL instead of array
        variants: validVariants,
        brand: cat._id,
      };

      const method = editMobile ? "PUT" : "POST";
      const endpoint = editMobile
        ? `${API}/mobiles/updateVariant/${editMobile._id}`
        : `${API}/mobiles/addVariant`;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Save failed");

      alert(`Mobile ${editMobile ? "updated" : "created"} successfully`);
      setIsModalOpen(false);
      await fetchMobiles();
    } catch (err) {
      alert("Failed to save mobile: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete mobile
  const handleDeleteMobile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mobile?")) return;
    try {
      const res = await fetch(`${API}/mobiles/deleteVariant/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Mobile deleted successfully");
      await fetchMobiles();
    } catch (err) {
      alert("Failed to delete mobile.");
    }
  };

  // Open modal for add/edit
  const openModal = (mobile = null) => {
    setEditMobile(mobile);
    setFormData({
      brand: mobile?.brand?._id || mobile?.brand || "",
      modelName: mobile?.modelName || "",
      image: null, // Reset to null for new uploads
      variants: mobile?.variants?.length
        ? mobile.variants
        : [{ ram: "", rom: "", basePrice: "" }],
    });
    setIsModalOpen(true);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get only the first file
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
    e.target.value = "";
  };

  // Remove image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  // Add new variant
  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { ram: "", rom: "", basePrice: "" }],
    }));
  };

  // Remove variant
  const removeVariant = (index) => {
    if (formData.variants.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      }));
    }
  };

  // Update variant
  const updateVariant = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const filteredMobiles = mobiles.filter(({ modelName, brand }) =>
    `${modelName} ${brand?.name || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMobiles();
  }, []);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mobile Variants Panel
              </h1>
              <p className="text-gray-600">Manage mobile variants with ease</p>
            </div>
            <button
              onClick={() => openModal()}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" /> Add Mobile
            </button>
          </div>

          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search mobiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="text-gray-500">Loading mobiles...</p>
            </div>
          </div>
        ) : filteredMobiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMobiles.map((mobile) => (
              <div
                key={mobile._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={mobile.image || "/api/placeholder/300/300"}
                    alt={mobile.modelName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500 font-medium">
                      {cat?.name || "Unknown Brand"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {mobile.modelName}
                  </h3>

                  {/* Variants Display */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {mobile.variants?.length || 0} Variants
                    </p>
                    <div className="space-y-2">
                      {mobile.variants?.slice(0, 2).map((variant, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2"
                        >
                          <div className="flex items-center gap-2">
                            <Cpu className="w-3 h-3 text-gray-400" />
                            <span>{variant.ram}GB</span>
                            <HardDrive className="w-3 h-3 text-gray-400" />
                            <span>{variant.rom}GB</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-green-600">
                              ₹{variant.basePrice}
                            </span>
                          </div>
                        </div>
                      ))}
                      {mobile.variants?.length > 2 && (
                        <p className="text-xs text-gray-500 text-center">
                          +{mobile.variants.length - 2} more variants
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openModal(mobile)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMobile(mobile._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No mobiles found
            </h3>
            <p className="text-gray-500 mb-6">
              {mobiles.length === 0
                ? "Start by adding your first mobile"
                : "Try adjusting your search terms"}
            </p>
          </div>
        )}
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editMobile ? "Edit Mobile" : "Add New Mobile"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the mobile details and variants
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Model Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Model Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter model name"
                      value={formData.modelName}
                      onChange={(e) =>
                        setFormData({ ...formData, modelName: e.target.value })
                      }
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mobile Image
                  </label>

                  {/* Upload Button */}
                  {!formData.image ? (
                    <div className="mb-4">
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
                        <div className="text-center">
                          <ImagePlus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 group-hover:text-blue-500">
                            Click to add image
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    /* Image Preview */
                    <div className="relative w-32 h-32 mb-4">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  )}

                  {/* Show existing image for edit mode */}
                  {editMobile && editMobile.image && !formData.image && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Current Image:
                      </p>
                      <img
                        src={editMobile.image}
                        alt="current"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload a new image to replace current one
                      </p>
                    </div>
                  )}
                </div>

                {/* Variants Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Variants *
                    </label>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Variant
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium text-gray-900">
                            Variant {index + 1}
                          </h4>
                          {formData.variants.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVariant(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              RAM (GB) *
                            </label>
                            <input
                              type="number"
                              placeholder="4"
                              value={variant.ram}
                              onChange={(e) =>
                                updateVariant(index, "ram", e.target.value)
                              }
                              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              ROM (GB) *
                            </label>
                            <input
                              type="number"
                              placeholder="64"
                              value={variant.rom}
                              onChange={(e) =>
                                updateVariant(index, "rom", e.target.value)
                              }
                              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              BasePrice *
                            </label>
                            <input
                              type="number"
                              placeholder="15000"
                              value={variant.basePrice}
                              onChange={(e) =>
                                updateVariant(
                                  index,
                                  "basePrice",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMobile}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editMobile ? "Update Mobile" : "Save Mobile"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileVariants;

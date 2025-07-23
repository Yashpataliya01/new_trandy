import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Search,
  Loader2,
  ImagePlus,
} from "lucide-react";

const CategoryPanel = () => {
  const API_ORIGIN = import.meta.env.VITE_ENCODED_URL;
  const API = `${API_ORIGIN}/api`;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/shopCategories`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to fetch categories");
      setCategories(data);
    } catch (error) {
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async (files) => {
    const urls = [];
    for (const file of files) {
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
        if (data.secure_url) urls.push(data.secure_url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }
    return urls;
  };

  // Handle save (create or update) category
  const handleSaveCategory = async () => {
    setIsSubmitting(true);
    try {
      const imageUrls = await uploadImagesToCloudinary(formData.image);
      const payload = {
        ...formData,
        image: imageUrls,
      };

      const method = editCategory ? "PUT" : "POST";
      const endpoint = editCategory
        ? `${API}/shopCategories/${editCategory._id}`
        : `${API}/shopCategories`;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Save failed");

      alert(`Category ${editCategory ? "updated" : "created"} successfully`);
      setIsModalOpen(false);
      await fetchCategories();
    } catch (err) {
      alert("Failed to save category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const res = await fetch(`${API}/shopCategories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Category deleted successfully");
      await fetchCategories();
    } catch (err) {
      alert("Failed to delete category.");
    }
  };

  // Open modal for create/edit
  const openModal = (category = null) => {
    setEditCategory(category);
    setFormData({
      name: category?.name || "",
      description: category?.description || "",
      image: [],
    });
    setIsModalOpen(true);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...newFiles],
    }));
    e.target.value = "";
  };

  // Remove individual image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(({ name, description }) =>
    `${name} ${description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Category Panel
              </h1>
              <p className="text-gray-600">
                Manage your shop categories with ease
              </p>
            </div>
            <button
              onClick={() => openModal()}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" /> Add Category
            </button>
          </div>

          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
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
              <p className="text-gray-500">Loading categories...</p>
            </div>
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={category.image?.[0]}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {category.image?.length >= 2 && (
                    <img
                      src={category.image?.[1]}
                      alt={`${category.name} alt`}
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div />
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(category)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No categories found
            </h3>
            <p className="text-gray-500 mb-6">
              {categories.length === 0
                ? "Start by adding your first category"
                : "Try adjusting your search terms"}
            </p>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the details below
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

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    placeholder="Describe the category..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category Images *
                  </label>
                  <div className="mb-4">
                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
                      <div className="text-center">
                        <ImagePlus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 group-hover:text-blue-500">
                          Click to add images
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Image Preview Grid */}
                  {formData.image.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {formData.image.map((img, index) => (
                        <div key={index} className="relative w-24 h-24">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                  onClick={handleSaveCategory}
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
                      {editCategory ? "Update Category" : "Save Category"}
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

export default CategoryPanel;

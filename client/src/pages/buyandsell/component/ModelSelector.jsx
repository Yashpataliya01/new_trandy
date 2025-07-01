import React, { useState, useEffect } from "react";
import {
  Search,
  Smartphone,
  Cpu,
  HardDrive,
  ChevronRight,
  Tag,
} from "lucide-react";

const ModelSelector = ({ selectedBrand, onModelSelect }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API = "http://localhost:5000/api";

  useEffect(() => {
    if (selectedBrand) {
      fetchModels();
    }
  }, [selectedBrand]);

  const fetchModels = async () => {
    try {
      const response = await fetch(
        `${API}/mobiles/getMobiles?brand=${selectedBrand._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setModels(data);
      } else {
        console.error("Failed to fetch models");
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredModels = models.filter((model) =>
    model.modelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVariantSelect = (model, variant) => {
    onModelSelect(model, variant);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-500">Loading models...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedBrand?.name
            ? `Select your ${selectedBrand.name} model`
            : "Select your model"}
        </h2>
        <p className="text-gray-500 text-base">
          Choose the exact model and variant of your phone
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Models Grid */}
      {filteredModels.length > 0 ? (
        <div className="space-y-10">
          {filteredModels.map((model) => (
            <div
              key={model._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Model Info */}
              <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {model.image ? (
                    <img
                      src={model.image}
                      alt={model.modelName}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Smartphone className="w-7 h-7 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {model.modelName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {model.variants?.length || 0} variant
                    {model.variants?.length > 1 ? "s" : ""} available
                  </p>
                </div>
              </div>

              {/* Variant Grid */}
              <div className="p-5 sm:p-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">
                  Available Variants
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {model.variants?.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariantSelect(model, variant)}
                      className="group p-4 border border-gray-200 rounded-xl bg-white text-left hover:border-blue-500 hover:shadow transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-800">
                            {variant.ram}GB RAM
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <HardDrive className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">
                          {variant.rom}GB Storage
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">
                          ₹{parseInt(variant.basePrice).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Click to check value
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No models found
          </h3>
          <p className="text-sm text-gray-500">
            {models.length === 0
              ? `No ${selectedBrand.name} models available`
              : "Try adjusting your search terms"}
          </p>
        </div>
      )}

      {/* Help Box */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">
              Need help finding your model?
            </h4>
            <p className="text-blue-700 text-sm">
              Look under Settings → About Phone or check your phone’s box or
              receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;

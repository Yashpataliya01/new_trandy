import React, { useState } from "react";
import {
  Search,
  Smartphone,
  Cpu,
  HardDrive,
  ChevronRight,
  Tag,
} from "lucide-react";
import { useGetMobilesQuery } from "../../../services/productsApi.js";

const ModelSelector = ({ selectedBrand, onModelSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: models = [], isLoading: loading } = useGetMobilesQuery(
    selectedBrand?._id,
    { skip: !selectedBrand?._id }
  );

  const filteredModels = models.filter((model) =>
    model.modelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVariantSelect = (model, variant) => {
    onModelSelect(model, variant);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Loading models...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-1">
          {selectedBrand?.name
            ? `${selectedBrand.name} Models`
            : "Select Model"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Choose your phone's model
        </p>
      </div>

      <div className="relative mb-4 sm:mb-6 max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        />
      </div>

      {filteredModels.length > 0 ? (
        <div className="space-y-4">
          {filteredModels.map((model) => (
            <div
              key={model._id}
              className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                  {model.image ? (
                    <img
                      src={model.image}
                      alt={model.modelName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Smartphone className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {model.modelName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {model.variants?.length} variant
                    {model.variants?.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  Variants
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {model.variants?.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariantSelect(model, variant)}
                      className="group p-2 border border-gray-100 rounded-lg bg-white text-left hover:border-blue-500 hover:shadow"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3 h-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-800">
                            {variant.ram}GB RAM
                          </span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <HardDrive className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-medium text-gray-800">
                          {variant.rom}GB Storage
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-medium text-green-600">
                          ₹{parseInt(variant.basePrice).toLocaleString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            No models found
          </h3>
          <p className="text-sm text-gray-500">
            {models.length === 0 ? "No models available" : "Try another search"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;

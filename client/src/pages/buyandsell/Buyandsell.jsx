import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Check,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import BrandSelector from "./component/BrandSelector";
import ModelSelector from "./component/ModelSelector";
import ConditionChecker from "./component/ConditionChecker";

const BuyandSell = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [conditionAnswers, setConditionAnswers] = useState({});
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: "Select Brand", icon: Smartphone },
    { id: 2, title: "Choose Model", icon: CheckCircle },
    { id: 3, title: "Phone Condition", icon: AlertCircle },
  ];

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedVariant(null);
    setConditionAnswers({});
    setEstimatedPrice(null);
    setCurrentStep(2);
  };

  const handleModelSelect = (model, variant) => {
    setSelectedModel(model);
    setSelectedVariant(variant);
    setConditionAnswers({});
    setEstimatedPrice(null);
    setCurrentStep(3);
  };

  const handleConditionComplete = (answers) => {
    setConditionAnswers(answers);
    calculatePrice(answers);
    setCurrentStep(4);
  };

  const calculatePrice = (answers) => {
    setLoading(true);
    setTimeout(() => {
      if (selectedVariant) {
        const basePrice = parseInt(selectedVariant.basePrice);
        let conditionScore = 0;
        const total = Object.keys(answers).length || 4;

        Object.values(answers).forEach((val) => {
          conditionScore +=
            val === "excellent"
              ? 4
              : val === "good"
              ? 3
              : val === "fair"
              ? 2
              : 1;
        });

        const avg = conditionScore / (total * 4) || 0.75;
        const multiplier = 0.25 + avg * 0.5;
        const final = Math.round(basePrice * multiplier);

        setEstimatedPrice({
          original: basePrice,
          estimated: final,
          condition:
            avg > 0.8
              ? "excellent"
              : avg > 0.6
              ? "good"
              : avg > 0.4
              ? "fair"
              : "poor",
        });
      }
      setLoading(false);
    }, 1200);
  };

  const goBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const resetFlow = () => {
    setCurrentStep(1);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedVariant(null);
    setConditionAnswers({});
    setEstimatedPrice(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Get Instant Price for Your Phone
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Sell your phone at the best price. Quick, easy, and fully
            transparent.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center md:justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-white transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs md:text-sm font-medium text-gray-900">
                        Step {step.id}
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 ${
                        step.id < currentStep ? "bg-green-400" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Back Button */}
          {currentStep > 1 && (
            <div className="p-4 md:p-6 border-b border-gray-200">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-4 md:p-8">
            {currentStep === 1 && (
              <BrandSelector onBrandSelect={handleBrandSelect} />
            )}
            {currentStep === 2 && selectedBrand && (
              <ModelSelector
                selectedBrand={selectedBrand}
                onModelSelect={handleModelSelect}
              />
            )}
            {currentStep === 3 && selectedModel && selectedVariant && (
              <ConditionChecker
                selectedModel={selectedModel}
                selectedVariant={selectedVariant}
                onComplete={handleConditionComplete}
              />
            )}
            {currentStep === 4 && estimatedPrice && (
              <div className="text-center">
                <div className="mb-6">
                  <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    Your Phone's Estimated Value
                  </h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 md:p-8 mb-6">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    ₹{estimatedPrice.estimated.toLocaleString()}
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    Based on {estimatedPrice.condition} condition
                  </p>
                  <div className="text-xs md:text-sm text-gray-500">
                    Original Price: ₹{estimatedPrice.original.toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 md:py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base">
                    Sell Now
                  </button>
                  <button
                    onClick={resetFlow}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 md:py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    Check Another Phone
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyandSell;

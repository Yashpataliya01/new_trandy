import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Smartphone,
  CheckCircle,
  AlertCircle,
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
        const total = Object.keys(answers).length;

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

        const avg = conditionScore / (total * 4);
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
    <div className="min-h-screen bg-white">
      <div className="w-[90%] mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Get Instant Price for Your Phone
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sell your phone at the best price. Quick, easy, and fully
            transparent.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6 overflow-x-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex items-center min-w-[140px]">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                      ? "bg-blue-500"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    Step {step.id}
                  </p>
                  <p className="text-xs text-gray-500">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-10 h-0.5 bg-gray-200 mx-4" />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Card */}
        <div className="rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden">
          {/* Back Button */}
          {currentStep > 1 && (
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-6 sm:p-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyandSell;

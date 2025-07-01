import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Star,
  Shield,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const ConditionChecker = ({ selectedModel, selectedVariant }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finalPrice, setFinalPrice] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions = [
    {
      id: "screen",
      title: "Screen Condition",
      description: "How is your phone's screen condition?",
      options: [
        {
          value: "excellent",
          label: "Perfect",
          description: "No scratches, cracks, or damage",
          color: "emerald",
          score: 1.0,
        },
        {
          value: "good",
          label: "Good",
          description: "Minor scratches, fully functional",
          color: "blue",
          score: 0.9,
        },
        {
          value: "fair",
          label: "Fair",
          description: "Visible scratches or small cracks",
          color: "yellow",
          score: 0.5,
        },
        {
          value: "poor",
          label: "Poor",
          description: "Major cracks or display issues",
          color: "red",
          score: 0.5,
        },
      ],
    },
    {
      id: "body",
      title: "Body & Frame",
      description: "What's the physical condition of your phone?",
      options: [
        {
          value: "excellent",
          label: "Like New",
          description: "No dents, scratches, or wear",
          color: "emerald",
          score: 1.0,
        },
        {
          value: "good",
          label: "Good",
          description: "Minor wear, no major damage",
          color: "blue",
          score: 0.8,
        },
        {
          value: "fair",
          label: "Fair",
          description: "Visible scratches or small dents",
          color: "yellow",
          score: 0.6,
        },
        {
          value: "poor",
          label: "Poor",
          description: "Major dents, scratches, or damage",
          color: "red",
          score: 0.4,
        },
      ],
    },
    {
      id: "battery",
      title: "Battery Performance",
      description: "How is your phone's battery life?",
      options: [
        {
          value: "excellent",
          label: "Excellent",
          description: "80–100% health",
          color: "emerald",
          score: 1.0,
        },
        {
          value: "good",
          label: "Good",
          description: "50–79% health",
          color: "blue",
          score: 0.8,
        },
        {
          value: "fair",
          label: "Fair",
          description: "Needs charging 2-3 times a day",
          color: "yellow",
          score: 0.8,
        },
        {
          value: "poor",
          label: "Poor",
          description: "<50% health",
          color: "red",
          score: 0.5,
        },
      ],
    },
    {
      id: "age",
      title: "Phone Age",
      description: "How old is your phone?",
      options: [
        {
          value: "excellent",
          label: "Less than 1 year",
          description: "Almost new",
          color: "emerald",
          score: 1.0,
        },
        {
          value: "good",
          label: "1–2 years",
          description: "Gently used",
          color: "blue",
          score: 0.8,
        },
        {
          value: "fair",
          label: "2–3 years",
          description: "Moderately aged",
          color: "yellow",
          score: 0.6,
        },
        {
          value: "poor",
          label: "Over 3 years",
          description: "Significantly aged",
          color: "red",
          score: 0.4,
        },
      ],
    },
    {
      id: "accessories",
      title: "Original Accessories",
      description: "What original accessories do you have?",
      options: [
        {
          value: "excellent",
          label: "Complete",
          description: "Box, charger, cables, earphones",
          color: "emerald",
          score: 1.0,
        },
        {
          value: "good",
          label: "Charger Only",
          description: "Charger included",
          color: "blue",
          score: 0.7,
        },
        {
          value: "fair",
          label: "Some Items",
          description: "Some accessories",
          color: "yellow",
          score: 0.7,
        },
        {
          value: "poor",
          label: "None",
          description: "Phone only",
          color: "red",
          score: 0.4,
        },
      ],
    },
  ];

  const calculatePrice = () => {
    if (
      !selectedVariant?.basePrice ||
      Object.keys(answers).length < questions.length
    )
      return;

    const brandScore = ["Apple", "Samsung", "OnePlus"].includes(
      selectedModel?.brand
    )
      ? 1.0
      : ["Xiaomi", "Realme", "Vivo"].includes(selectedModel?.brand)
      ? 0.8
      : 0.6;

    const marketDemandScore =
      selectedModel?.popularity === "high"
        ? 1.0
        : selectedModel?.popularity === "medium"
        ? 0.8
        : 0.5;

    const scores = questions.map((q) => answers[q.id]?.score || 0);
    scores.push(brandScore, marketDemandScore);

    const averageScore = scores.reduce((sum, score) => sum + score, 0) / 7;
    const calculatedPrice = Math.round(
      selectedVariant.basePrice * averageScore
    );
    setFinalPrice(calculatedPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [answers]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const question = questions[currentQuestion];
  const IconComponent = question.icon;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Mock data for demonstration
  const mockSelectedModel = selectedModel || {
    modelName: "iPhone 14 Pro",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    popularity: "high",
  };

  const mockSelectedVariant = selectedVariant || {
    ram: "128",
    rom: "256",
    basePrice: 89900,
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4" />
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">
                Step {currentQuestion + 1} of {questions.length}
              </p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Questions */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="">
              {/* Question Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {question.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{question.description}</p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {question.options.map((opt, index) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt)}
                    className={`group relative overflow-hidden border-2 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      answers[question.id]?.value === opt.value
                        ? opt.color === "emerald"
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-md"
                          : opt.color === "blue"
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md"
                          : opt.color === "yellow"
                          ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md"
                          : "border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.5s ease-out forwards",
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-2 rounded-xl ${
                          opt.color === "emerald"
                            ? "bg-emerald-100"
                            : opt.color === "blue"
                            ? "bg-blue-100"
                            : opt.color === "yellow"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        {opt.color === "emerald" ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : opt.color === "blue" ? (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        ) : opt.color === "yellow" ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {opt.label}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    </div>

                    {answers[question.id]?.value === opt.value && (
                      <div className="absolute top-3 right-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            opt.color === "emerald"
                              ? "bg-emerald-500"
                              : opt.color === "blue"
                              ? "bg-blue-500"
                              : opt.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handleNext}
                  disabled={!answers[question.id]}
                  className={`inline-flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                    !answers[question.id]
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-emerald-500 hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary & Device Info */}
          <div className="w-full lg:w-96">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Device Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                  <div className="flex items-center space-x-4">
                    <img
                      src={mockSelectedModel.image}
                      alt={mockSelectedModel.modelName}
                      className="w-16 h-16 object-cover rounded-xl border-2 border-white/20"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {mockSelectedModel.modelName}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {mockSelectedVariant?.ram}GB RAM •{" "}
                        {mockSelectedVariant?.rom}GB Storage
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">
                          Premium Device
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Progress Indicators */}
                  {Object.keys(answers).length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Assessment Progress
                      </h4>
                      <div className="space-y-3">
                        {questions.map((q, index) => (
                          <div
                            key={q.id}
                            className="flex items-center space-x-3"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                answers[q.id]
                                  ? "bg-green-100 text-green-800"
                                  : index === currentQuestion
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {answers[q.id] ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`text-sm ${
                                  answers[q.id]
                                    ? "text-gray-900 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                {q.title}
                              </p>
                              {answers[q.id] && (
                                <p className="text-xs text-gray-600">
                                  {answers[q.id].label}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Calculation */}
                  {finalPrice !== null && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <Sparkles className="w-5 h-5 text-emerald-600" />
                          <h4 className="font-bold text-gray-900">
                            Valuation Complete
                          </h4>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                            <span className="text-sm text-gray-600">
                              Original Price
                            </span>
                            <span className="font-semibold text-gray-900">
                              ₹
                              {parseInt(
                                mockSelectedVariant.basePrice
                              ).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                            <span className="text-sm text-gray-600">
                              Depreciation
                            </span>
                            <span className="font-semibold text-red-600">
                              -₹
                              {(
                                mockSelectedVariant.basePrice - finalPrice
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-emerald-200">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Your Phone's Value
                          </p>
                          <p className="text-3xl font-bold text-emerald-700">
                            ₹{finalPrice.toLocaleString()}
                          </p>
                        </div>

                        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                          Get This Offer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionChecker;

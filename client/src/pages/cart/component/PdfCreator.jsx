import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AuthContext.jsx";
import { generateAndDownloadPDF } from "../../../utils/pdfUtils.js";

const CartPDFGenerator = ({
  cartData,
  quantities,
  appliedDiscount,
  subtotal,
  discountAmount,
  total,
  totalSavings,
}) => {
  const { setFavcart } = useContext(AppContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateAndSend = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const userInfo =
        JSON.parse(localStorage.getItem("user-info")) ||
        JSON.parse(localStorage.getItem("user"));
      const result = await generateAndDownloadPDF(
        cartData,
        quantities,
        appliedDiscount,
        subtotal,
        discountAmount,
        total,
        totalSavings,
        userInfo
      );

      // Optionally, you can send a text message via WhatsApp with a note
      const phoneNumber = "7000334381";
      const message = `Your cart summary PDF has been downloaded. Please upload it for further processing.`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleGenerateAndSend}
        disabled={isGenerating}
        className={`w-full py-3 px-6 rounded-xl font-medium tracking-wide transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
          isGenerating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 text-white hover:bg-emerald-500"
        }`}
      >
        {isGenerating ? "Generating PDF..." : "Download Cart Summary as PDF"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CartPDFGenerator;

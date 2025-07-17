import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { AppContext } from "../../../context/AuthContext.jsx";

const generatePDFContent = (
  cartData,
  quantities,
  appliedDiscount,
  subtotal,
  discountAmount,
  total,
  totalSavings,
  user
) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const margin = 10;
  const pageWidth = 210;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("THE MOBILE POINT", margin, y);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  y += 5;
  doc.text("Bhilwara, Rajasthan, 311001, India", margin, y);
  y += 5;
  doc.text("Email: tmpbhilwara2151@gmail.com | Phone: +8112261905", margin, y);
  y += 10;

  // Invoice Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text("Purchase Invoice", pageWidth - margin - 40, y, { align: "right" });
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const invoiceDate = new Date().toLocaleDateString("en-GB");
  doc.text(`Invoice No: ${invoiceNumber}`, pageWidth - margin - 40, y, {
    align: "right",
  });
  y += 5;
  doc.text(`Date: ${invoiceDate}`, pageWidth - margin - 40, y, {
    align: "right",
  });
  y += 10;

  // Billing Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Bill To:", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${user?.name || "N/A"}`, margin, y);
  y += 5;
  doc.text(`Email: ${user?.email || "Not Available"}`, margin, y);
  y += 5;
  doc.text(`Phone: ${user?.number || "Not Available"}`, margin, y);
  y += 10;

  // Cart Summary Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Cart Summary", margin, y);
  y += 5;
  const colWidths = [10, 80, 30, 30, 30];
  const tableX = margin;
  const headerY = y;
  doc.setFillColor(240, 240, 240);
  doc.rect(tableX, headerY, contentWidth, 8, "F");
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text("S.No", tableX + 2, headerY + 6);
  doc.text("Item", tableX + colWidths[0] + 2, headerY + 6);
  doc.text("Qty", tableX + colWidths[0] + colWidths[1] + 2, headerY + 6);
  doc.text(
    "Price",
    tableX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
    headerY + 6
  );
  doc.text(
    "Total",
    tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 2,
    headerY + 6
  );
  y += 8;

  // Table Rows
  doc.setFont("helvetica", "normal");
  cartData?.products?.forEach((item, index) => {
    const quantity = quantities[index] || 1;
    const price = item.product.discountedPrice;
    const itemTotal = price * quantity;
    y += 5;
    if (y > 260) {
      doc.addPage();
      y = margin;
    }
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(tableX, y, contentWidth, 10, "F");
    }
    doc.text(`${index + 1}`, tableX + 2, y + 6);
    doc.text(`${item.product.name}`, tableX + colWidths[0] + 2, y + 6, {
      maxWidth: colWidths[1] - 4,
    });
    doc.text(`${quantity}`, tableX + colWidths[0] + colWidths[1] + 2, y + 6);
    doc.text(
      `₹${price.toLocaleString()}`,
      tableX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
      y + 6
    );
    doc.text(
      `₹${itemTotal.toLocaleString()}`,
      tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 2,
      y + 6
    );
    y += 10;
  });

  // Table Borders
  doc.setDrawColor(200);
  doc.setLineWidth(0.2);
  doc.rect(tableX, headerY, contentWidth, y - headerY);
  let x = tableX;
  colWidths.forEach((width) => {
    x += width;
    doc.line(x, headerY, x, y);
  });
  doc.line(tableX, headerY + 8, tableX + contentWidth, headerY + 8);

  // Order Summary
  y += 10;
  if (y > 260) {
    doc.addPage();
    y = margin;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Order Summary", margin, y);
  y += 5;
  const summaryColWidths = [120, 60];
  const summaryX = margin;
  doc.setFillColor(240, 240, 240);
  doc.rect(summaryX, y, contentWidth, 8, "F");
  doc.text("Description", summaryX + 2, y + 6);
  doc.text("Amount", summaryX + summaryColWidths[0] + 2, y + 6);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal", summaryX + 2, y + 6);
  doc.text(
    `₹${(subtotal + discountAmount).toLocaleString()}`,
    summaryX + summaryColWidths[0] + 2,
    y + 6
  );
  y += 10;
  if (discountAmount > 0) {
    doc.setTextColor(0, 128, 0);
    doc.text(
      `Discount (${appliedDiscount?.name || "Discount"})`,
      summaryX + 2,
      y + 6
    );
    doc.text(
      `-₹${discountAmount.toLocaleString()}`,
      summaryX + summaryColWidths[0] + 2,
      y + 6
    );
    y += 10;
  }
  if (totalSavings > discountAmount) {
    doc.setTextColor(0, 128, 0);
    doc.text(`Product Savings`, summaryX + 2, y + 6);
    doc.text(
      `-₹${(totalSavings - discountAmount).toLocaleString()}`,
      summaryX + summaryColWidths[0] + 2,
      y + 6
    );
    y += 10;
  }
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text("Total", summaryX + 2, y + 6);
  doc.text(
    `₹${total.toLocaleString()}`,
    summaryX + summaryColWidths[0] + 2,
    y + 6
  );
  y += 10;
  doc.rect(summaryX, headerY + y - headerY - 38, contentWidth, 38);
  doc.line(
    summaryX + summaryColWidths[0],
    headerY + y - headerY - 38,
    summaryX + summaryColWidths[0],
    y
  );

  // Footer
  y += 10;
  if (y > 260) {
    doc.addPage();
    y = margin;
  }
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Thank you for your purchase!", margin, y);
  y += 5;
  doc.text("Contact us at support@company.com for any queries.", margin, y);

  return doc;
};

const uploadToCloudinary = async (pdfBlob) => {
  const formData = new FormData();
  formData.append("file", pdfBlob, "cart_summary.pdf");
  formData.append("upload_preset", "ml_default");
  formData.append("cloud_name", "dlyq8wjky");
  formData.append("resource_type", "raw");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlyq8wjky/raw/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.secure_url) return data.secure_url;
    throw new Error("Failed to upload PDF to Cloudinary");
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

const CartPDFGenerator = ({
  cartData,
  quantities,
  appliedDiscount,
  subtotal,
  discountAmount,
  total,
  totalSavings,
  onError,
}) => {
  const userInfo = localStorage.getItem("user-info");
  const user = userInfo ? JSON.parse(userInfo) : null;
  const { updateModal } = useContext(AppContext);
  if (!user) {
    updateModal(true);
  }
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAndSend = async () => {
    setIsGenerating(true);
    try {
      if (!cartData?.products?.length) throw new Error("Cart is empty");
      const doc = generatePDFContent(
        cartData,
        quantities,
        appliedDiscount,
        subtotal,
        discountAmount,
        total,
        totalSavings,
        user
      );
      const pdfBlob = doc.output("blob");
      const pdfUrl = await uploadToCloudinary(pdfBlob);
      const message = `New order invoice: ${pdfUrl}`;
      const phoneNumber = "8112261905";

      // Try WhatsApp app custom scheme first
      const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
      window.location.href = whatsappAppUrl;

      // Fallback to web.whatsapp.com after a short delay if app fails to open
      setTimeout(() => {
        const whatsappWebUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappWebUrl, "_blank");
      }, 1000); // Delay to allow app to open, adjust as needed
    } catch (error) {
      onError(error.message || "Failed to generate or send invoice");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      className={`w-full py-3 rounded-md text-white transition-all ${
        isGenerating || !cartData?.products?.length
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600"
      }`}
      onClick={handleGenerateAndSend}
      disabled={isGenerating || !cartData?.products?.length}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Proceed to Checkout"
    >
      {isGenerating ? "Generating Invoice..." : "Proceed to Checkout"}
    </motion.button>
  );
};

export default CartPDFGenerator;

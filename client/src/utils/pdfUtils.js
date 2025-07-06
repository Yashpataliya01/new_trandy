import jsPDF from "jspdf";

const generatePDFContent = (
  cartData,
  quantities,
  appliedDiscount,
  subtotal,
  discountAmount,
  total,
  totalSavings,
  userInfo
) => {
  const doc = new jsPDF();
  doc.setFont("helvetica");
  doc.setFontSize(12);
  let y = 10;

  // User Information
  doc.setFontSize(14);
  doc.text("User Information", 10, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Name: ${userInfo?.name || userInfo?.displayName}`, 15, y);
  y += 5;
  doc.text(`Email: ${userInfo?.email || "Not Available"}`, 15, y);
  y += 5;
  doc.text(`Phone: ${userInfo?.number || "Not Available"}`, 15, y);
  y += 10;

  // Title
  doc.setFontSize(16);
  doc.text("Shopping Cart Summary", 10, y);
  y += 10;

  // Cart Summary Section
  doc.setFontSize(14);
  doc.text("Cart Summary", 10, y);
  y += 10;

  cartData?.products?.forEach((item, index) => {
    const quantity = quantities[index] || 1;
    const itemTotal = item.product.discountedPrice * quantity;
    const savings = item.product.originalPrice
      ? (item.product.originalPrice - item.product.discountedPrice) * quantity
      : 0;

    y += 5;
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
    doc.text(
      `${index + 1}. ${item.product.name} (Brand: ${item.product.brand})`,
      10,
      y
    );
    y += 5;
    doc.text(`- Quantity: ${quantity}`, 15, y);
    y += 5;
    doc.text(
      `- Price: ₹${item.product.discountedPrice.toLocaleString()}`,
      15,
      y
    );
    if (savings > 0) {
      y += 5;
      doc.text(
        `- Original Price: ₹${item.product.originalPrice.toLocaleString()}`,
        15,
        y
      );
    }
    y += 5;
    doc.text(`- Total: ₹${itemTotal.toLocaleString()}`, 15, y);
    y += 10;
  });

  // Order Summary Section
  y += 10;
  if (y > 280) {
    doc.addPage();
    y = 10;
  }
  doc.setFontSize(14);
  doc.text("Order Summary", 10, y);
  y += 10;

  doc.text(`- Subtotal: ₹${subtotal.toLocaleString()}`, 15, y);
  y += 5;
  if (discountAmount > 0) {
    doc.text(
      `- Discount (${
        appliedDiscount?.name || "Discount"
      }): -₹${discountAmount.toLocaleString()}`,
      15,
      y
    );
    y += 5;
  }
  if (totalSavings > discountAmount) {
    doc.text(
      `- Product Savings: -₹${(
        totalSavings - discountAmount
      ).toLocaleString()}`,
      15,
      y
    );
    y += 5;
  }
  doc.text(`- Shipping: ₹99 (FREE)`, 15, y);
  y += 5;
  doc.setFontSize(14);
  doc.text(`- Total: ₹${total.toLocaleString()}`, 15, y);
  y += 10;
  doc.setFontSize(10);
  doc.text("Inclusive of all taxes", 10, y);

  return doc;
};

export const generateAndDownloadPDF = (
  cartData,
  quantities,
  appliedDiscount,
  subtotal,
  discountAmount,
  total,
  totalSavings,
  userInfo
) => {
  if (!cartData?.products?.length) {
    throw new Error("Cart is empty");
  }

  try {
    const doc = generatePDFContent(
      cartData,
      quantities,
      appliedDiscount,
      subtotal,
      discountAmount,
      total,
      totalSavings,
      userInfo
    );
    doc.save("cart_summary.pdf");
    return "PDF downloaded successfully";
  } catch (error) {
    throw new Error(`Error generating PDF: ${error.message}`);
  }
};

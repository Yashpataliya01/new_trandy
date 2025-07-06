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
  console.log("Generating PDF content with userInfo:", userInfo);
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Set margins and constants
  const margin = 10;
  const pageWidth = 210; // A4 width in mm
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Header: Company Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0); // Black
  doc.text("Your Company Name", margin, y);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100); // Gray
  y += 5;
  doc.text("123 Business Street, City, Country", margin, y);
  y += 5;
  doc.text("Email: contact@company.com | Phone: +1234567890", margin, y);
  y += 10;

  // Invoice Title and Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Purchase Invoice", pageWidth - margin - 40, y, { align: "right" });
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const invoiceDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  doc.text(`Invoice No: ${invoiceNumber}`, pageWidth - margin - 40, y, {
    align: "right",
  });
  y += 5;
  doc.text(`Date: ${invoiceDate}`, pageWidth - margin - 40, y, {
    align: "right",
  });
  y += 10;

  // Billing Information
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Bill To:", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Name: ${userInfo?.name || userInfo?.displayName || "N/A"}`,
    margin,
    y
  );
  y += 5;
  doc.text(`Email: ${userInfo?.email || "Not Available"}`, margin, y);
  y += 5;
  doc.text(`Phone: ${userInfo?.number || "Not Available"}`, margin, y);
  y += 10;

  // Cart Summary Section - Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Cart Summary", margin, y);
  y += 5;

  // Table Header
  const tableX = margin;
  const colWidths = [10, 60, 30, 30, 30, 30]; // S.No, Item, Qty, Price, Orig Price, Total
  const headerY = y;
  doc.setFillColor(240, 240, 240); // Light gray
  doc.rect(tableX, headerY, contentWidth, 8, "F");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text("S.No", tableX + 2, headerY + 6);
  doc.text("Item Description", tableX + colWidths[0] + 2, headerY + 6);
  doc.text("Qty", tableX + colWidths[0] + colWidths[1] + 2, headerY + 6);
  doc.text(
    "Price",
    tableX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
    headerY + 6
  );
  doc.text(
    "Orig. Price",
    tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 2,
    headerY + 6
  );
  doc.text(
    "Total",
    tableX +
      colWidths[0] +
      colWidths[1] +
      colWidths[2] +
      colWidths[3] +
      colWidths[4] +
      2,
    headerY + 6
  );
  y += 8;

  // Table Rows
  doc.setFont("helvetica", "normal");
  cartData?.products?.forEach((item, index) => {
    const quantity = quantities[index] || 1;
    const itemTotal = item.product.discountedPrice * quantity;
    const savings = item.product.originalPrice
      ? (item.product.originalPrice - item.product.discountedPrice) * quantity
      : 0;

    y += 5;
    if (y > 260) {
      doc.addPage();
      y = margin;
    }

    // Row background (alternate colors)
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245); // Very light gray
      doc.rect(tableX, y, contentWidth, 10, "F");
    }

    doc.text(`${index + 1}`, tableX + 2, y + 6);
    doc.text(
      `${item.product.name} (Brand: ${item.product.brand})`,
      tableX + colWidths[0] + 2,
      y + 6,
      { maxWidth: colWidths[1] - 4 }
    );
    doc.text(`${quantity}`, tableX + colWidths[0] + colWidths[1] + 2, y + 6);
    doc.text(
      `₹${item.product.discountedPrice.toLocaleString()}`,
      tableX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
      y + 6
    );
    doc.text(
      savings > 0 ? `₹${item.product.originalPrice.toLocaleString()}` : "-",
      tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 2,
      y + 6
    );
    doc.text(
      `₹${itemTotal.toLocaleString()}`,
      tableX +
        colWidths[0] +
        colWidths[1] +
        colWidths[2] +
        colWidths[3] +
        colWidths[4] +
        2,
      y + 6
    );
    y += 10;
  });

  // Draw table borders
  doc.setDrawColor(200, 200, 200); // Light gray
  doc.setLineWidth(0.2);
  doc.rect(tableX, headerY, contentWidth, y - headerY); // Outer border
  let x = tableX;
  colWidths.forEach((width) => {
    x += width;
    doc.line(x, headerY, x, y); // Vertical lines
  });
  doc.line(tableX, headerY + 8, tableX + contentWidth, headerY + 8); // Header bottom line

  // Order Summary Section
  y += 10;
  if (y > 260) {
    doc.addPage();
    y = margin;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Order Summary", margin, y);
  y += 5;

  // Order Summary Table
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
    `₹${subtotal.toLocaleString()}`,
    summaryX + summaryColWidths[0] + 2,
    y + 6
  );
  y += 10;

  if (discountAmount > 0) {
    doc.setTextColor(0, 128, 0); // Green for discounts
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
    doc.text("Product Savings", summaryX + 2, y + 6);
    doc.text(
      `-₹${(totalSavings - discountAmount).toLocaleString()}`,
      summaryX + summaryColWidths[0] + 2,
      y + 6
    );
    y += 10;
  }

  doc.setTextColor(0, 0, 0);
  doc.text("Shipping", summaryX + 2, y + 6);
  doc.text("FREE (₹99)", summaryX + summaryColWidths[0] + 2, y + 6);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Total", summaryX + 2, y + 6);
  doc.text(
    `₹${total.toLocaleString()}`,
    summaryX + summaryColWidths[0] + 2,
    y + 6
  );
  y += 10;

  // Draw summary table borders
  doc.rect(summaryX, headerY + y - headerY - 48, contentWidth, 48); // Adjust based on rows
  doc.line(
    summaryX + summaryColWidths[0],
    headerY + y - headerY - 48,
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
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for your purchase!", margin, y);
  y += 5;
  doc.text("Terms: Payment due upon receipt.", margin, y);
  y += 5;
  doc.text("Contact us at support@company.com for any queries.", margin, y);

  return doc;
};

const uploadToCloudinary = async (pdfBlob) => {
  const formData = new FormData();
  formData.append("file", pdfBlob, "cart_summary.pdf");
  formData.append("upload_preset", "Project");
  formData.append("cloud_name", "dlxhhxkdg");
  formData.append("resource_type", "raw");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dlxhhxkdg/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log("Cloudinary response:", data);
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Failed to upload PDF to Cloudinary");
    }
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const generateAndUploadPDF = async (
  cartData,
  quantities,
  appliedDiscount,
  subtotal,
  discountAmount,
  total,
  totalSavings,
  userInfo
) => {
  console.log("Starting generateAndUploadPDF with cartData:", cartData);
  if (!cartData?.products?.length) {
    console.error("Cart is empty");
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
    const pdfBlob = doc.output("blob");

    // Debug: Save locally to verify
    console.log("Saving PDF locally for debugging...");
    const debugUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = debugUrl;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(debugUrl);

    console.log("Uploading PDF to Cloudinary...");
    const pdfUrl = await uploadToCloudinary(pdfBlob);
    console.log("PDF uploaded, URL:", pdfUrl);

    return {
      message: "PDF generated and uploaded successfully",
      downloadURL: pdfUrl,
    };
  } catch (error) {
    console.error("Error in generateAndUploadPDF:", {
      message: error.message,
      stack: error.stack,
    });
    return {
      message: "PDF generated locally but upload failed",
      downloadURL: null,
      uploadError: error.message,
    };
  }
};

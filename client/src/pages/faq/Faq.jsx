import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Phone,
  Shield,
  Truck,
} from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      title: "Orders & Purchasing",
      icon: <Phone className="w-6 h-6" />,
      questions: [
        {
          question: "How can I place an order?",
          answer:
            "You can place an order by visiting our store at 56, Machinery Market, Near Railway Station, Bhilwara, or by calling us directly. We also accept orders through WhatsApp and social media for your convenience.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept cash, UPI payments, debit/credit cards, and bank transfers. For online orders, we prefer UPI or bank transfer with order confirmation.",
        },
        {
          question: "Do you offer EMI options?",
          answer:
            "Yes, we offer EMI options for purchases above ₹10,000. EMI plans are available through credit cards and select banks. Visit our store for detailed EMI terms and conditions.",
        },
        {
          question: "Can I reserve a phone before buying?",
          answer:
            "Yes, you can reserve any phone by paying a small advance amount. We'll hold the device for up to 7 days while you arrange the full payment.",
        },
      ],
    },
    {
      title: "Products & Warranty",
      icon: <Shield className="w-6 h-6" />,
      questions: [
        {
          question: "Are your phones genuine?",
          answer:
            "Absolutely! All our new phones come with official manufacturer warranty, original packaging, and authentic accessories. We're authorized dealers for major brands.",
        },
        {
          question: "What warranty do you provide on used phones?",
          answer:
            "Used phones come with our store warranty ranging from 1-6 months depending on the device condition and price. We clearly mention the warranty period for each used device.",
        },
        {
          question: "Do you sell phone accessories?",
          answer:
            "Yes, we have a wide range of accessories including cases, screen protectors, chargers, earphones, power banks, and trending tech accessories at competitive prices.",
        },
        {
          question: "How do you grade used phones?",
          answer:
            "We grade used phones based on physical condition, battery health, and functionality. Each device is thoroughly tested and graded as Excellent, Good, or Fair condition with transparent descriptions.",
        },
      ],
    },
    {
      title: "Exchange & Trade-in",
      icon: <Truck className="w-6 h-6" />,
      questions: [
        {
          question: "Do you accept phone exchanges?",
          answer:
            "Yes! We offer great exchange deals. Bring your old phone for evaluation, and we'll provide the best exchange value. The final price depends on your phone's condition and market value.",
        },
        {
          question: "How is exchange value calculated?",
          answer:
            "Exchange value is determined by the phone's model, age, physical condition, functionality, and current market demand. We provide transparent evaluation right in front of you.",
        },
        {
          question: "Can I exchange any brand phone?",
          answer:
            "We accept most popular smartphone brands including iPhone, Samsung, OnePlus, Xiaomi, Vivo, Oppo, Realme, and others. Some very old or damaged devices may not be eligible.",
        },
        {
          question: "What if my phone has issues?",
          answer:
            "We accept phones with minor issues, but the exchange value will be adjusted accordingly. Phones with major hardware problems or water damage may have significantly lower value.",
        },
      ],
    },
    {
      title: "Delivery & Support",
      icon: <HelpCircle className="w-6 h-6" />,
      questions: [
        {
          question: "Do you provide home delivery?",
          answer:
            "Yes, we provide home delivery within Bhilwara city. Delivery charges may apply depending on the location and order value. Same-day delivery available for orders placed before 2 PM.",
        },
        {
          question: "Can I check the phone before payment?",
          answer:
            "Absolutely! Whether you visit our store or opt for home delivery, you can thoroughly check the phone before making the final payment. Your satisfaction is our priority.",
        },
        {
          question: "What if I face issues after purchase?",
          answer:
            "We provide full post-purchase support. Visit our store or call us for any issues. We offer solutions, repairs, or replacements as per warranty terms.",
        },
        {
          question: "Do you provide phone setup services?",
          answer:
            "Yes, our team can help you set up your new phone, transfer data from your old device, install essential apps, and provide basic usage guidance free of charge.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-medium text-gray-900">
                  {category.title}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex; // Unique index for each question
                  const isOpen = openItems.has(globalIndex);

                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-2xl font-medium text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our friendly team is here
            to help.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl">
              <Phone className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">
                Visit Our Store
              </h4>
              <p className="text-sm text-gray-600">
                56, Machinery Market, Near Railway Station, Bhilwara
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <HelpCircle className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">Get Support</h4>
              <p className="text-sm text-gray-600">
                Call us or visit for personalized assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

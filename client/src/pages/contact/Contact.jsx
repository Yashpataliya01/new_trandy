import React, { useState } from "react";
import { Phone, Mail, Clock, ExternalLink } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const address =
    "The Mobile Point, 56 Machinary Market, Nathdwara Saray, Near Shree Krishna Tower, Near Railway Station, Bhilwara, Rajasthan 311001";
  const encodedAddress = encodeURIComponent(address);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenMaps = () => {
    window.open(`https://www.google.com/maps?q=${encodedAddress}`, "_blank");
  };

  const handleDirections = () => {
    window.open("https://maps.app.goo.gl/iNsTNSggvMkKys2g8", "_blank");
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.email && formData.message) {
      alert("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-2">
                Email, call, or complete the form to reach us.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're here to help you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">tmpbhilwara2151@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">8112261905</span>
              </div>
              <div className="text-blue-600 underline cursor-pointer">
                Customer Support
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Customer Support
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Available Mon–Sat to assist with any issues.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Let us know how we can improve.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Media Inquiries
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Contact us at media@snappyapp.com.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">You can reach us anytime</p>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">+91</span>
                  <div className="w-px h-4 bg-gray-300"></div>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full pl-16 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Submit
              </button>

              <p className="text-xs text-gray-500 text-center">
                By contacting us, you agree to our{" "}
                <span className="text-blue-600 cursor-pointer">Terms</span> and{" "}
                <span className="text-blue-600 cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 rounded-2xl h-96 relative overflow-hidden border border-gray-300">
            <iframe
              title="The Mobile Point Area Map"
              src="https://maps.google.com/maps?q=The+Mobile+Point,+56+Machinary+Market,+Nathdwara+Saray,+Near+Shree+Krishna+Tower,+Near+Railway+Station,+Bhilwara,+Rajasthan+311001&z=18&hl=en&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="w-full h-full rounded-2xl"
            />
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handleOpenMaps}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Maps
              </button>

              <button
                onClick={handleDirections}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 transition-colors text-sm font-medium"
              >
                Get Directions
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Our Location
            </h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Connecting Near and Far
            </h3>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Headquarters
              </h4>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">The Mobile Point</p>
                <p>56 Machinary Market, Nathdwara Saray</p>
                <p>Near Shree Krishna Tower, Near Railway Station</p>
                <p>Bhilwara, Rajasthan 311001</p>
                <p>India</p>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Open: Mon–Sat 9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

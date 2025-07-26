import React from "react";
import {
  CheckCircle,
  RotateCcw,
  Users,
  MapPin,
  Star,
  Smartphone,
  Award,
} from "lucide-react";

import img from "../../assets/about/about.jpeg";
const About = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Yellow */}
      <section className="bg-blue-200 text-black px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 bg-black"></div>
                <div className="w-3 h-3 bg-black"></div>
                <div className="w-3 h-3 bg-black"></div>
              </div>

              <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8">
                MEET THE
                <br />
                <span className="block">MOBILE</span>
                <span className="block">EXPERTS</span>
              </h1>

              <div className="flex items-start justify-between">
                <p className="text-lg font-medium max-w-sm">
                  Real people, real service, and genuine care for every customer
                  since 2020.
                </p>
                <div className="text-right">
                  <div className="text-sm font-bold">SERVING</div>
                  <div className="text-4xl font-black">12K+</div>
                </div>
              </div>
            </div>

            {/* Right Image - Team Photo */}
            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <img src={img} alt="" />
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-black text-sm font-medium">
                  TMP TEAM
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-16 pt-8 border-t border-black/20">
            <h2 className="text-2xl md:text-3xl font-bold max-w-4xl">
              The Mobile Point is where technology meets trust, serving Bhilwara
              with authentic products and genuine relationships since 2020.
            </h2>
          </div>
        </div>
      </section>

      {/* Customer Stories Section - Light */}
      <section className="bg-gray-100 text-black px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-16 leading-tight">
            REAL CUSTOMERS,
            <br />
            REAL SATISFACTION.
          </h2>

          {/* Customer Photos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Customer 1 */}
            <div className="bg-blue-500 text-white rounded-2xl aspect-square overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-blue-400">
                <Smartphone className="w-16 h-16 text-white/80" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold">Happy Customer</h3>
                <p className="text-blue-100 text-sm">New Phone Purchase</p>
              </div>
            </div>

            {/* Customer 2 */}
            <div className="bg-orange-400 text-black rounded-2xl aspect-square overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-orange-300">
                <Award className="w-16 h-16 text-orange-800" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold">GOQii Partnership</h3>
                <p className="text-orange-800 text-sm">Authorized Dealer</p>
              </div>
            </div>

            {/* Customer 3 */}
            <div className="bg-purple-500 text-white rounded-2xl aspect-square overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-purple-400">
                <Users className="w-16 h-16 text-white/80" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold">Team Service</h3>
                <p className="text-purple-100 text-sm">Professional Support</p>
              </div>
            </div>

            {/* Customer 4 */}
            <div className="bg-green-500 text-white rounded-2xl aspect-square overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-green-400">
                <CheckCircle className="w-16 h-16 text-white/80" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold">Satisfied Clients</h3>
                <p className="text-green-100 text-sm">Quality Guarantee</p>
              </div>
            </div>
          </div>

          {/* Store Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Quality Assured Products
              </h3>
              <p className="text-gray-600">
                Every device undergoes rigorous testing to ensure premium
                quality and performance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <RotateCcw className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Great Exchange Offers</h3>
              <p className="text-gray-600">
                Get the best value for your old device with our transparent
                exchange program.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Honest Service</h3>
              <p className="text-gray-600">
                Transparent pricing and dedicated customer support you can
                always trust.
              </p>
            </div>
          </div>

          {/* TMP Brand Section */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black p-12 rounded-2xl text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-yellow-400 rounded-full text-2xl font-bold mb-6">
              TMP
            </div>
            <h3 className="text-3xl font-bold mb-4">THE MOBILE POINT</h3>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              Whether you're upgrading to the latest smartphone or looking for
              certified used devices, our experienced team is here to guide you
              to the perfect choice. Every customer is family at TMP.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section - Dark */}
      <section className="bg-gray-900 text-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 leading-tight">
                VISIT OUR
                <br />
                <span className="text-lime-400">BHILWARA</span>
                <br />
                SHOWROOM
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-lime-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xl font-bold">56, Machinery Market</p>
                    <p className="text-gray-300">
                      Near Railway Station, Bhilwara
                    </p>
                    <p className="text-gray-300">Rajasthan, India</p>
                  </div>
                </div>

                <div className="bg-lime-400 text-black px-6 py-3 rounded-full inline-block font-bold">
                  LANDMARK: FRONT OF JHULELAL CIRCLE
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Why Choose TMP?</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-lime-400" />
                      <span>Authorized dealer for premium brands</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-lime-400" />
                      <span>Expert technical support team</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-lime-400" />
                      <span>Customer satisfaction guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Photo */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-black text-2xl font-bold">TMP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Our Store
                  </h3>
                  <p className="text-gray-400">
                    Modern showroom with latest devices
                  </p>
                  <p className="text-sm text-lime-400 mt-2">
                    Come visit us today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

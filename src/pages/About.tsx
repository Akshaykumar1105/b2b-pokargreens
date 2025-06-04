import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs: React.FC = () => {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
        <section className="max-w-5xl mx-auto mt-6 py-16 px-4 sm:px-6 lg:px-8">
          {/* About Us Section */}
          <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-8 text-center">
            About Us
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            <strong>Pokar Greens</strong> is the flagship brand of{" "}
            <strong>Pokar Food Service Pvt. Ltd.</strong>, a B2B-focused vegetable
            supply company headquartered in<strong> Gandhinagar, Gujarat.</strong> We specialize in
            delivering <strong>high-quality, daily-sourced vegetables</strong> to businesses that
            require consistency, hygiene, and dependable service.
          </p>
          <p className="text-lg leading-relaxed mb-12">
            We proudly serve a wide range of clients — including <strong>restaurants,
            retailers, wholesalers, caterers, and institutions</strong> — by offering a
            reliable, scalable, and cost-effective produce solution. With a strong
            sourcing network and efficient logistics, we ensure your shelves and
            kitchens are always well-stocked and ready.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-12 text-center">
              Why Choose Pokar Greens?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "B2B-Driven Service",
                  desc: "Customized supply plans tailored to business demands and volume requirements.",
                  icon: (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Daily-Sourced Produce",
                  desc: "Fresh, non-frozen vegetables sourced daily to maintain peak quality.",
                  icon: (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Wholesale Pricing",
                  desc: "Competitive, transparent pricing with no compromise on quality standards.",
                  icon: (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 7l-8 4-8-4v10l8 4 8-4V7z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Reliable Delivery Network",
                  desc: "Timely logistics supported by a robust cold chain system.",
                  icon: (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Dedicated Client Support",
                  desc: "A responsive support team for seamless coordination and assistance.",
                  icon: (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="flex items-start mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Note */}
        <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700">
            Whether you're running a cloud kitchen or managing a large retail
            chain, <strong>Pokar Greens</strong> is your trusted partner in fresh
            produce supply.
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-3">
            Powered by Pokar Food Service Pvt. Ltd. — built to support your business growth.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;

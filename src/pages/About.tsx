// AboutUs.tsx
import Header from "@/components/Header";
import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>
      <div className="bg-amber-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-amber-50 py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-green-600">Our Story</span>
                <span className="block text-orange-500">
                  From Farm to Table
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Bringing nature's freshness to your doorstep since 2015
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 mb-6">
                  At Fresh, we believe everyone deserves access to farm-fresh
                  produce. Our mission is to connect local farmers with
                  communities, reducing food miles and supporting sustainable
                  agriculture while delivering the freshest fruits and
                  vegetables to your family.
                </p>
                <p className="text-gray-600">
                  We carefully select partner farms that share our commitment to
                  organic farming practices and environmental stewardship. By
                  choosing Fresh, you're not just getting delicious produce –
                  you're supporting a healthier planet.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <img
                  className="rounded-lg shadow-xl"
                  src="/assets/imgs/Organic-farm-field.jpeg"
                  alt="Organic farm field"
                  width={"100%"}
                  height={"auto"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-amber-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  Sustainability
                </h3>
                <p className="text-gray-600">
                  We prioritize eco-friendly practices from farm to delivery,
                  using minimal packaging and optimized routes to reduce our
                  carbon footprint.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  Community
                </h3>
                <p className="text-gray-600">
                  We strengthen local economies by partnering with small farmers
                  and providing fair compensation for their hard work and
                  quality produce.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8 4-8-4V17l8 4 8-4V7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  Quality
                </h3>
                <p className="text-gray-600">
                  We never compromise on freshness. Our fruits and vegetables
                  are harvested at peak ripeness and delivered within 24 hours
                  of picking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
                  <img
                    src="/assets/imgs/hire-dev-img-2.png"
                    alt="Team member"
                  />
                </div>
                <h3 className="text-xl font-semibold text-orange-500">Nayan</h3>
                <p className="text-green-600">Founder & CEO</p>
                <p className="mt-2 text-gray-600">
                  Former organic farmer with a passion for making fresh produce
                  accessible to everyone.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
                  <img
                    src="/assets/imgs/hire-dev-img-2.png"
                    alt="Team member"
                  />
                </div>
                <h3 className="text-xl font-semibold text-orange-500">smit</h3>
                <p className="text-green-600">Chief Farming Officer</p>
                <p className="mt-2 text-gray-600">
                  Agricultural expert who works directly with our network of
                  local farmers.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
                  <img
                    src="/assets/imgs/hire-dev-img-1.png"
                    alt="Team member"
                  />
                </div>
                <h3 className="text-xl font-semibold text-orange-500">Priya</h3>
                <p className="text-green-600">Sustainability Director</p>
                <p className="mt-2 text-gray-600">
                  Environmental scientist ensuring our operations minimize
                  ecological impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to experience the difference?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of happy customers enjoying farm-fresh produce
              delivered to their doorstep.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                onClick={() => navigate("/")}
              >
                Shop Now
              </button>

              <button
                className="bg-white hover:bg-green-50 text-green-600 font-bold py-3 px-6 rounded-lg transition duration-300"
                onClick={() => navigate("/")}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

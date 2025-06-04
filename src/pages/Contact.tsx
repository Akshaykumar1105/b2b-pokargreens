// ContactUs.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

const ContactUs: React.FC = () => {
  return (
    <>
      <Header />
      <div className="mt-20 flex flex-col justify-center items-center px-6 py-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-8 text-center">Contact</h1>
          <div className="text-gray-700 text-lg space-y-6 leading-relaxed">
            <p>
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:info@pokargreens.com" className="text-green-600 underline">
                info@pokargreens.com
              </a>
            </p>
            <p>
              📞 <strong>Phone:</strong>{" "}
              <a href="tel:+919586901881" className="text-green-600 underline">
                +91 95869 01881
              </a>
            </p>
            <p>
              🏢 <strong>Address:</strong> Pokar Food Service Pvt. Ltd., Gandhinagar, Gujarat, India
            </p>
          </div>
          <p className="mt-10 text-gray-600 text-base max-w-xl mx-auto">
            Thank you for partnering with <strong>Pokar Greens</strong>.<br />
            We are committed to being your trusted source for consistent, quality produce at
            competitive prices.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

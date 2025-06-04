// TermsAndConditions.jsx
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-6 py-20 flex justify-center">
        <article className="max-w-5xl w-full prose prose-indigo prose-lg text-gray-900 leading-relaxed">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-8 text-center">
            Terms & Conditions
          </h1>

          {[
            {
              title: null,
              content: (
                <>
                  <p><strong>Effective Date:</strong> 01/05/2025</p>
                  <p><strong>Brand Name:</strong> Pokar Greens</p>
                  <p><strong>Registered Entity:</strong> Pokar Food Service Pvt. Ltd.</p>
                  <p><strong>Head Office:</strong> Gandhinagar, Gujarat, India</p>
                  <p>
                    These Terms & Conditions govern your use of Pokar Greens' business-to-business (B2B) supply services. By engaging with our services—via website, mobile app, or directly—you agree to these terms on behalf of your company or institution.
                  </p>
                </>
              ),
            },
            {
              title: "1. Acceptance of Terms",
              content: (
                <>
                  <p>By placing an order or entering into a business relationship with Pokar Greens, you confirm that:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>You represent a registered business entity.</li>
                    <li>You are authorized to transact on behalf of your organization.</li>
                    <li>You agree to comply with these Terms & Conditions and any additional signed agreements.</li>
                  </ul>
                </>
              ),
            },
            {
              title: "2. Updates to Terms",
              content: (
                <p>Pokar Greens reserves the right to revise these terms at any time. Continued use of our services after updates constitutes your acceptance of the revised terms.</p>
              ),
            },
            {
              title: "3. Client Responsibilities",
              content: (
                <ul className="space-y-4">
                  <li><strong>Verification:</strong> All business customers must provide valid documents such as GSTIN, FSSAI license (if applicable), and official contact information.</li>
                  <li><strong>Accuracy:</strong> All submitted data (orders, contact info, etc.) must be complete and accurate.</li>
                  <li><strong>Use Compliance:</strong> You agree not to:
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>Use our services for unauthorized or illegal purposes.</li>
                      <li>Misrepresent your business identity.</li>
                      <li>Resell Pokar Greens products in restricted or unauthorized regions.</li>
                    </ul>
                  </li>
                </ul>
              ),
            },
            {
              title: "4. Product Details & Pricing",
              content: (
                <ul className="space-y-4">
                  <li><strong>Availability:</strong> All products are subject to seasonal supply and market conditions.</li>
                  <li><strong>Pricing:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>All rates are wholesale and exclusive of GST unless specified.</li>
                      <li>Final invoice includes all applicable taxes and delivery fees (if any).</li>
                    </ul>
                  </li>
                </ul>
              ),
            },
            {
              title: "5. Orders & Payments",
              content: (
                <ul className="space-y-4">
                  <li><strong>Order Acceptance:</strong> Orders are subject to acceptance based on supply, logistics, and other internal checks.</li>
                  <li><strong>Payments:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>Accepted methods: UPI, NEFT, RTGS, bank transfer, or cleared cheque.</li>
                      <li>Credit terms (if provided) will be specified in a separate agreement.</li>
                    </ul>
                  </li>
                </ul>
              ),
            },
            {
              title: "6. Delivery & Fulfillment",
              content: (
                <ul className="space-y-4">
                  <li><strong>Logistics:</strong> Pokar Greens manages logistics and will deliver to the address provided at the time of order.</li>
                  <li><strong>Delays:</strong> We are not liable for delays caused by natural disasters, strikes, or third-party disruptions.</li>
                  <li><strong>Inspection:</strong> Goods must be inspected upon delivery. Issues must be reported within 12 hours.</li>
                </ul>
              ),
            },
            {
              title: "7. Returns & Replacements",
              content: (
                <ul className="space-y-4">
                  <li><strong>Eligibility:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>Only products that are spoiled or incorrect upon delivery are eligible for return.</li>
                      <li>Claims must be reported within 12 hours of delivery.</li>
                    </ul>
                  </li>
                  <li><strong>Replacements:</strong> Replacement of products is subject to stock availability and Pokar Greens' inspection and approval.</li>
                </ul>
              ),
            },
            {
              title: "8. Limitation of Liability",
              content: (
                <>
                  <p>Pokar Greens shall not be held liable for:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Indirect or consequential business losses</li>
                    <li>Spoilage due to improper storage post-delivery</li>
                    <li>Delays or loss arising from regulatory actions or force majeure</li>
                  </ul>
                </>
              ),
            },
            {
              title: "9. Governing Law & Jurisdiction",
              content: (
                <p>These Terms shall be governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of Ahmedabad, Gujarat.</p>
              ),
            },
          ].map(({ title, content }, idx) => (
            <section
              key={idx}
              className="mb-16 pl-6 border-l-4 border-indigo-400 bg-indigo-50/20 rounded-l-md"
            >
              {title && (
                <h2 className="text-2xl font-semibold mb-6 text-indigo-700 transition-colors duration-300">
                  {title}
                </h2>
              )}
              <div className="prose prose-indigo">{content}</div>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;

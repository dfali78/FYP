import React, { useState } from 'react'

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'Track Order' page and entering your order number. You'll receive real-time updates on your shipment status."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in their original condition with tags attached. Returns are free for defective items or our errors. For other returns, standard shipping charges apply."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see exact rates at checkout."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic orders typically arrive within 3-5 business days. International orders take 7-14 business days depending on the destination. Express shipping options are available."
    },
    {
      question: "Are your products authentic?",
      answer: "Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and designers. We guarantee the authenticity of every item."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. Please contact our customer service team immediately if you need to make changes."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer complimentary gift wrapping for all orders. You can select this option during checkout and add a personalized message."
    },
    {
      question: "What sizes do you carry?",
      answer: "We carry sizes XS through 3XL for most items. Size charts are available on each product page. If you're unsure about sizing, please refer to our size guide or contact us."
    },
    {
      question: "How do I care for my purchases?",
      answer: "Care instructions are included with each item and available on the product page. Generally, we recommend following the care labels and avoiding harsh chemicals."
    },
    {
      question: "Do you have a loyalty program?",
      answer: "Yes! Join our loyalty program to earn points on every purchase, receive exclusive discounts, and get early access to sales and new arrivals."
    },
    {
      question: "What if I receive a damaged item?",
      answer: "If you receive a damaged item, please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund at no cost to you."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about shopping, shipping, returns, and more.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-gray-500">
                    {openFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Contact Support
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Live Chat
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default FAQs

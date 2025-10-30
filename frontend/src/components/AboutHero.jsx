import React from 'react'

const AboutHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>

      <section className="relative px-4 py-20 md:py-28 max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            About Our Company
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent tracking-tight leading-tight mb-6">
            ABOUT US
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        </div>

        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Welcome to our e-commerce platform. We are dedicated to providing high-quality products and exceptional customer service that exceeds expectations.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">5★</div>
            <div className="text-gray-600 font-medium">Rating</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutHero

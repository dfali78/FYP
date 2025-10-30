import React from 'react';
import highQualityIcon from '../assets/icons/high-quality.png';
import warrantyIcon from '../assets/icons/warrenty.png';
import freeShippingIcon from '../assets/icons/free-shipping.png';
import supportIcon from '../assets/icons/support.png';

const ServiceFeatures = () => {
  // Define the features data
  const features = [
    {
      icon: highQualityIcon,
      title: 'High Quality',
      description: 'Crafted from top materials with exceptional attention to detail',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: warrantyIcon,
      title: 'Warranty Protection',
      description: 'Comprehensive coverage for over 2 years of peace of mind',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: freeShippingIcon,
      title: 'Free Shipping',
      description: 'Complimentary delivery on orders over $150 worldwide',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: supportIcon,
      title: '24/7 Support',
      description: 'Round-the-clock dedicated customer assistance team',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Exceptional Service & Quality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our premium services designed to exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Icon Container */}
                <div className="relative p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-10 h-10 object-contain filter brightness-0 invert"
                    />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;

import React from 'react';

const Newsletter = () => {
  return (
    <section className="relative w-full flex justify-center mt-8">
      <div className="relative w-[90%] md:w-[85%] lg:w-[85%] bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-xl text-white py-12 px-8 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-20"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md mx-auto">
            Stay updated with the latest products, exclusive deals, and special offers. Join our community today!
          </p>
          <div className="flex flex-col items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-4 bg-white/10 border border-white/20 rounded-xl w-full max-w-md text-center text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md"
            />
            <button className="bg-black text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-800">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

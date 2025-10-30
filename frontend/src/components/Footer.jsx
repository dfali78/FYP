import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const appId = 'cmhd3hy1z0031q338hubhvnfp';
    const src = 'https://breezaro.com/breezaro-widget.js';

    // Don't add the script if it's already present on the page
    if (document.querySelector(`script[data-app-id="${appId}"]`)) return;

    const script = document.createElement('script');
    script.setAttribute('data-app-id', appId);
    script.src = src;
    script.defer = true;

    // Append the script inside the footer element if available, otherwise to body
    const parent = footerRef.current || document.body;
    parent.appendChild(script);

    return () => {
      // Remove only the script we added
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);
  return (
  <footer ref={footerRef} className="glass py-12 mt-16">
      <div className="container mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo */}
          <h2 className="text-3xl font-bold gradient-text mb-6 md:mb-0">
            JAM Store
          </h2>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 md:space-x-10 text-gray-700 font-semibold">
            <Link to="/track-order" className="hover:text-blue-600 transition-all duration-300 mb-4 md:mb-0 hover:scale-105">Track Order</Link>
            <Link to="/blog" className="hover:text-blue-600 transition-all duration-300 mb-4 md:mb-0 hover:scale-105">Blog</Link>
            <Link to="/faqs" className="hover:text-blue-600 transition-all duration-300 mb-4 md:mb-0 hover:scale-105">FAQs</Link>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 w-full sm:w-80"
            />
            <button className="btn-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-300"></div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-600 font-medium">
          Copyright © 2025 JAM Store . All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

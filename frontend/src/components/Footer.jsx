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
  <footer ref={footerRef} className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4 md:mb-0">
            JAM Store
          </h2>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 text-gray-600 font-medium">
            <Link to="/track-order" className="hover:text-black transition-colors duration-200 mb-2 md:mb-0">Track Order</Link>
            <Link to="/blog" className="hover:text-black transition-colors duration-200 mb-2 md:mb-0">Blog</Link>
            <Link to="/faqs" className="hover:text-black transition-colors duration-200 mb-2 md:mb-0">FAQs</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-gray-200"></div>

        {/* Copyright */}
        <div className="mt-3 text-center text-sm text-gray-500">
          Copyright © 2025 JAM Store . All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

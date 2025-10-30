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
    <footer ref={footerRef} className="relative w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 px-8 md:px-16 mt-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,.1)_1px,transparent_0)] bg-[length:24px_24px]"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold text-white">JAM Store</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop destination for quality products. Discover amazing deals and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.253 14.894 3.762 13.743 3.762 12.446s.49-2.448 1.364-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718 0c-.99 0-1.805-.322-2.475-.962-.67-.64-1.007-1.505-1.007-2.583 0-1.078.337-1.943 1.007-2.583.67-.64 1.485-.962 2.475-.962s1.805.322 2.475.962c.67.64 1.007 1.505 1.007 2.583 0 1.078-.337 1.943-1.007 2.583-.67.64-1.485.962-2.475.962z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors duration-200">Home</Link>
              <Link to="/shop" className="block text-gray-300 hover:text-white transition-colors duration-200">Shop</Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors duration-200">About</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors duration-200">Contact Us</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <div className="space-y-2">
              <Link to="/track-order" className="block text-gray-300 hover:text-white transition-colors duration-200">Track Order</Link>
              <Link to="/faqs" className="block text-gray-300 hover:text-white transition-colors duration-200">FAQs</Link>
              <Link to="/blog" className="block text-gray-300 hover:text-white transition-colors duration-200">Blog</Link>
              <Link to="/profile" className="block text-gray-300 hover:text-white transition-colors duration-200">My Account</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>📧 support@jamstore.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Commerce St, City, State 12345</p>
            </div>
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-white mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-white px-4 py-2 rounded-r-lg font-semibold transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025 JAM Store. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
    </footer>
  )
}

export default Footer

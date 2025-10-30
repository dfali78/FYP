import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/default-product.png';
// Mock product structure for demonstration if no prop is passed
const defaultProduct = {
  name: "Peaky Blinders",
  category: "Mens Collection",
  price: 100.00,
  shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin.",
  // The main image for the LEFT side will be the full screenshot image
  // This is a placeholder for the entire left panel image
  mainImagePanel: defaultImage, // **IMPORTANT: Replace with your actual screenshot URL or the specific left panel image**
};





const DefaultProduct= ({ product = defaultProduct }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const availableSizes = ['S', 'M', 'L', 'XL']; // Mock sizes as they are not in your API response
  
const handleClick = () => {
    navigate(`/product/68f27e63659cc07d204dceb6`);
  }; 
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 flex flex-col lg:flex-row relative overflow-hidden h-auto lg:h-[60vh] shadow-2xl">

      {/* 1. Left Section: Static Image Panel */}
      <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-purple-100 p-0 h-64 lg:h-full">
        <img
          src={defaultProduct.mainImagePanel}
          alt="Product details with highlighted features"
          className="w-full h-full object-contain object-center"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      </div>

      {/* 2. Right Section: Product Details Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8 lg:p-20 relative z-10">

        <div
            className="absolute left-0 top-0 bottom-0 w-3/5 md:w-1/2 transform -skew-x-12 origin-top-left bg-white z-0 hidden lg:block shadow-lg"
        ></div>

        <div className="max-w-lg w-full space-y-6 lg:space-y-8 relative z-10">

          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium uppercase tracking-wider">
            {product.category || 'Premium Collection'}
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {product.name}
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>

          <p className="text-gray-700 leading-relaxed text-lg pr-0 lg:pr-10">
            {product.shortDescription}
          </p>



          <div className="pt-6">
            <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {product.discountedPrice ? `$${product.discountedPrice.toFixed(2)}` : `$${product.price.toFixed(2)}`}
            </span>
          </div>

          <button className="w-full lg:w-56 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold uppercase tracking-wider hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-xl" onClick={handleClick}  >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultProduct;
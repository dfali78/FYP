import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, loading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);

    try {
      await addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      if (err.message === 'User not authenticated') {
        navigate('/signin');
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="card bg-white p-4 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden mb-4 rounded-xl relative">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-image.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="px-2">
        <h3 className="text-sm md:text-base font-bold text-gray-900 truncate mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.name || 'Product Name'}
        </h3>
        <p className="text-xs text-gray-500 mb-3 font-medium">
          {product.brand || 'Al Karom'}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg md:text-xl font-bold gradient-text">
            {/* Display discounted price if available, otherwise regular price */}
            {product.discountedPrice
              ? `$${product.discountedPrice.toFixed(2)}`
              : `$${(product.price || 0).toFixed(2)}`}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full btn-primary text-sm md:text-base font-bold py-2 md:py-3 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <div className="loading-spinner w-4 h-4 mr-2"></div>
              Adding...
            </div>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

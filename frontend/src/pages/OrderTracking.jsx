import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const OrderTracking = () => {
  const location = useLocation();
  const [trackingNumber, setTrackingNumber] = useState(location.state?.trackingNumber || '');
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trackingNumber) {
      handleTrackOrder();
    }
  }, []);

  const handleTrackOrder = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    // Validate tracking number
    if (!trackingNumber || trackingNumber.trim() === '') {
      setError('Please enter your order tracking number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${trackingNumber.trim()}/track`);
      
      if (response.data && response.status === 200) {
        setOrderStatus(response.data);
      } else {
        setError('Unable to fetch order status. Please try again later.');
      }
    } catch (err) {
      console.error('Order tracking error:', err);
      
      if (err.response) {
        // The server responded with a status code that falls out of the range of 2xx
        if (err.response.status === 404) {
          setError('Order not found. Please check your tracking number and try again.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Unable to fetch order status. Please try again later.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('Failed to connect to the server. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred while tracking your order. Please try again later.');
      }
      setOrderStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (err) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-light text-gray-900 mb-6">
          Track Your Order
        </h1>

        <form onSubmit={handleTrackOrder} className="mt-6">
          <div className="mb-4">
            <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Order Tracking Number
            </label>
            <input
              id="trackingNumber"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your order tracking number (e.g., JAM202500001)"
              disabled={loading}
              required
            />
            <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
              {error || "Enter the tracking number provided in your order confirmation"}
            </p>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-black text-white font-medium uppercase tracking-widest hover:bg-gray-800 transition duration-200 rounded-md ${
              loading || !trackingNumber.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading || !trackingNumber.trim()}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Tracking...</span>
              </div>
            ) : (
              'TRACK ORDER'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {orderStatus && (
          <div className="mt-8">
            <div className="text-6xl mb-4">{orderStatus.emoji || '📦'}</div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {orderStatus.message || 'Status not available'}
            </h2>

            <div className="mt-4 mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${orderStatus.progress || 0}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {orderStatus.progress || 0}% Complete
              </p>
            </div>

            <div className="mt-4 text-left">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Order Status:</span> {orderStatus.status || 'Unknown'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Order Created:</span> {formatDate(orderStatus.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Last Updated:</span> {formatDate(orderStatus.updatedAt)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
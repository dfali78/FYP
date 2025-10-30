import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const OrderTracking = () => {
  const location = useLocation();
  const [trackingNumber, setTrackingNumber] = useState(location.state?.trackingNumber || '');
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Normalize backend URL so callers don't accidentally create duplicate '/api/api' paths
  const _rawBackend = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || '';
  const backendBase = _rawBackend.endsWith('/api') ? _rawBackend.slice(0, -4) : _rawBackend;
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
      // Use normalized backendBase and append the API path once
      const response = await axios.get(`${backendBase}/api/orders/${trackingNumber.trim()}/track`);
      
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
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>

      <div className="relative max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 max-w-2xl mx-auto text-center border border-gray-100">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              Order Tracking
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent tracking-tight leading-tight mb-6">
              Track Your Order
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          </div>

        <form onSubmit={handleTrackOrder} className="mt-6">
          <div className="mb-6">
            <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-3">
              Order Tracking Number
            </label>
            <input
              id="trackingNumber"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your order tracking number (e.g., JAM202500001)"
              disabled={loading}
              required
            />
            <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
              {error || "Enter the tracking number provided in your order confirmation"}
            </p>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 bg-black text-white font-semibold uppercase tracking-widest hover:bg-gray-900 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 rounded-xl border border-gray-800 ${
              loading || !trackingNumber.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading || !trackingNumber.trim()}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Tracking...</span>
              </div>
            ) : (
              'TRACK ORDER'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {orderStatus && (
          <div className="mt-8">
            <div className="text-6xl mb-6">{orderStatus.emoji || '📦'}</div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {orderStatus.message || 'Status not available'}
            </h2>

            <div className="mt-6 mb-8">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${orderStatus.progress || 0}%` }}
                ></div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700">
                {orderStatus.progress || 0}% Complete
              </p>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center md:text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Order Status</p>
                  <p className="text-gray-900 font-medium">{orderStatus.status || 'Unknown'}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Order Created</p>
                  <p className="text-gray-900 font-medium">{formatDate(orderStatus.createdAt)}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last Updated</p>
                  <p className="text-gray-900 font-medium">{formatDate(orderStatus.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
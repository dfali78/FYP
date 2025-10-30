import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import categories from '../constants/categories'

const Navbar = () => {
  const { totalQuantity } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          }
        } catch (err) {
          console.error('Failed to fetch user:', err)
        }
      } else {
        setUser(null)
      }
    }

    fetchUser()

    const handleAuthChange = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
      fetchUser()
    }

    window.addEventListener('authChange', handleAuthChange)

    return () => {
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('authChange'))
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white via-blue-50 to-purple-50 shadow-lg backdrop-blur-md bg-opacity-95 z-[300]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,.05)_1px,transparent_0)] bg-[length:20px_20px]"></div>

      <div className="relative container mx-auto flex justify-between items-center px-6 py-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300" onClick={closeMenu}>
          JAM Store
        </Link>

        {/* Desktop Center Nav Links */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-black transition-colors duration-200">Home</Link>
          <div className="relative">
            <button
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
              className="hover:text-black transition-colors duration-200 flex items-center"
            >
              Shop
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isShopDropdownOpen && (
              <div
                className="absolute top-full left-0 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-[100] min-w-48"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                {categories.map((category) => (
                  <div key={category.value} className="group relative">
                    <Link
                      to={`/shop?category=${category.value}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"
                      onClick={() => setIsShopDropdownOpen(false)}
                    >
                      {category.label}
                    </Link>
                    {category.subcategories.length > 0 && (
                      <div className="absolute left-full top-0 bg-white shadow-lg border border-gray-200 rounded-md py-2 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-[101]">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            to={`/shop?category=${category.value}&subcategory=${encodeURIComponent(subcategory)}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"
                            onClick={() => setIsShopDropdownOpen(false)}
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <Link to="/new" className="hover:text-black transition-colors duration-200">New Arrival</Link> */}
          <Link to="/about" className="hover:text-black transition-colors duration-200">About</Link>
          <Link to="/contact" className="hover:text-black transition-colors duration-200">Contact Us</Link>
          <Link to="/track-order" className="hover:text-black transition-colors duration-200">Track Order</Link>
        </div>

        {/* Desktop Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-600 hover:text-black transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* Admin Link */}
              {user && user.isAdmin && (
                <Link to="/admin-login" className="text-gray-600 hover:text-black transition-colors duration-200">
                  Admin
                </Link>
              )}
              {/* Profile Icon */}
              <Link to="/profile" className="text-gray-600 hover:text-black transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-black transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-gray-600 hover:text-black transition-colors duration-200">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 hover:text-black transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>Home</Link>
              <Link to="/shop" className="text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>Shop</Link>
              <Link to="/new" className="text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>New Arrival</Link>
              <Link to="/about" className="text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>Contact Us</Link>
            </div>

            {/* Mobile Cart Icon */}
            <div className="border-t border-gray-200 pt-4">
              <Link to="/cart" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
                </svg>
                <span>Cart</span>
              </Link>
            </div>

            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              <div className="border-t border-gray-200 pt-4 space-y-4">
                {user && user.isAdmin && (
                  <Link to="/admin-login" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 w-full text-left"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <Link to="/signin" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200" onClick={closeMenu}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign in</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all duration-200"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

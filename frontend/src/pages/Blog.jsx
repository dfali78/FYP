import React from 'react'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of E-commerce: Trends to Watch in 2025",
      excerpt: "Explore the latest trends shaping the e-commerce landscape, from AI-powered personalization to sustainable shopping practices.",
      date: "January 15, 2025",
      readTime: "5 min read",
      image: "/api/placeholder/400/250",
      category: "Industry Trends"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Making Eco-Friendly Choices",
      excerpt: "Learn how to make conscious fashion decisions and the impact of sustainable shopping on our planet.",
      date: "January 10, 2025",
      readTime: "4 min read",
      image: "/api/placeholder/400/250",
      category: "Sustainability"
    },
    {
      id: 3,
      title: "Style Guide: Mixing Patterns Like a Pro",
      excerpt: "Master the art of pattern mixing with our comprehensive guide to creating stunning outfits.",
      date: "January 5, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/400/250",
      category: "Fashion Tips"
    },
    {
      id: 4,
      title: "Customer Spotlight: Stories from Our Community",
      excerpt: "Hear from our customers about their favorite JAM Store finds and styling experiences.",
      date: "December 28, 2024",
      readTime: "3 min read",
      image: "/api/placeholder/400/250",
      category: "Community"
    },
    {
      id: 5,
      title: "Seasonal Wardrobe Refresh: Winter Edition",
      excerpt: "Essential winter pieces to elevate your wardrobe and stay stylish in cold weather.",
      date: "December 20, 2024",
      readTime: "7 min read",
      image: "/api/placeholder/400/250",
      category: "Seasonal Guide"
    },
    {
      id: 6,
      title: "The Art of Online Shopping: Tips for Success",
      excerpt: "Maximize your online shopping experience with these expert tips and tricks.",
      date: "December 15, 2024",
      readTime: "4 min read",
      image: "/api/placeholder/400/250",
      category: "Shopping Guide"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            JAM Store Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover fashion insights, style tips, and the latest trends from the JAM Store community.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Blog Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for the latest fashion trends and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog

import React from 'react'

const Hero = () => {
  // Data for the categories (matching the bottom of the image)
  const categories = [
    'ELECTRONICS',
    'CLOTHING',
    'HOME APPLIANCES',
    'GROCERY',
    'ACCESSORIES'
  ]

  // Placeholder images for the three-column hero section
  const heroImages = {
    left: 'https://plus.unsplash.com/premium_photo-1714226830434-7dbc12f31bcf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', // Man on box
    topCenter: 'https://images.pexels.com/photos/2015876/pexels-photo-2015876.jpeg', // Group of women
    bottomCenter: 'https://images.pexels.com/photos/17546502/pexels-photo-17546502.jpeg', // Two women laughing
    right: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop&crop=center' // Man on stool
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section: Smaller, Responsive Three-Column Layout */}
      {/* Reduced vertical padding (py-1, py-2) and set a max height for the container on large screens */}
      <section className="px-4 py-8 md:py-12 max-w-6xl mx-auto slide-up">
        <div className="flex justify-center items-center lg:max-h-[80vh] lg:overflow-hidden">
          {/* Left Column (Image) */}
          <div className="hidden lg:block w-1/4 h-[450px] bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden rounded-2xl shadow-2xl mr-4 card">
            <img
              src={heroImages.left}
              alt="Fashion model sitting"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Center Column (Text & Nested Images) */}
          <div className="w-full lg:w-2/4 h-full flex flex-col items-center justify-center p-6">
            
            {/* Top Center Image */}
            <div className="w-full h-[140px] mb-4 overflow-hidden rounded-xl shadow-xl card">
              <img
                src={heroImages.topCenter}
                alt="New collection models"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Main Text Block */}
            <div className="text-center my-6 bounce-in">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text tracking-tight leading-none mb-4">
                ULTIMATE
              </h1>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-extralight gradient-text tracking-widest mb-4" style={{
                letterSpacing: '0.25em'
              }}>
                SALE
              </h2>
              <p className="text-sm font-semibold tracking-widest text-gray-700 mb-6 uppercase">
                NEW COLLECTION
              </p>
              <button className="btn-primary text-sm font-bold tracking-widest uppercase px-8 py-3">
                SHOP NOW
              </button>
            </div>

            {/* Bottom Center Image */}
            <div className="w-full h-[120px] mt-4 overflow-hidden rounded-xl shadow-xl card">
              <img
                src={heroImages.bottomCenter}
                alt="Sale models laughing"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="hidden lg:block w-1/4 h-[450px] bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden rounded-2xl shadow-2xl ml-4 card">
            <img
              src={heroImages.right}
              alt="Fashion model on stool"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* --- */}

      {/* Categories Section (Matching the bottom strip) */}
      <section className="py-16 px-4 glass mx-4 rounded-3xl my-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-around items-center space-y-6 md:space-y-0">
          {categories.map((category, index) => (
            // In a real app, these would be high-quality SVG/PNG logo images,
            // but for styling, we'll use text that looks like a clean logo.
            <div key={index} className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest gradient-text opacity-90 hover:opacity-100 transition-all duration-300 mx-4 md:mx-6 hover:scale-105 cursor-pointer">
              {category}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero

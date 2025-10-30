import React from 'react'

const WebsiteInfo = () => {
  const infoCards = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Our Mission',
      content: 'We strive to provide a seamless online shopping experience with a wide range of high-quality products at competitive prices.',
      subtitle: 'Our Vision',
      subcontent: 'To become the leading e-commerce platform that customers trust for their everyday needs and special purchases.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Technology Stack',
      content: 'Frontend: React.js with Vite\nBackend: Node.js with Express.js\nDatabase: MongoDB\nStyling: Tailwind CSS\nState Management: React Context',
      subtitle: 'Key Features',
      subcontent: 'User authentication and profiles\nProduct catalog with search and filters\nShopping cart and checkout\nOrder tracking and history\nResponsive design for all devices'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'What We Offer',
      content: 'Wide variety of products across multiple categories\nSecure and fast checkout process\nExcellent customer support\nFast and reliable shipping\nQuality assurance on all products',
      subtitle: '',
      subcontent: ''
    }
  ]

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            About Our Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Building the Future of E-Commerce
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes our platform unique and how we're revolutionizing online shopping experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {infoCards.map((card, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>

                  {/* Content */}
                  <div className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                    {card.content}
                  </div>

                  {/* Subtitle and Subcontent */}
                  {card.subtitle && (
                    <>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{card.subtitle}</h4>
                      <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {card.subcontent}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WebsiteInfo

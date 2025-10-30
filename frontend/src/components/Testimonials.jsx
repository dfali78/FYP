import React, { useState, useRef } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: 'John Doe',
      review: 'Amazing quality and fast shipping! Highly recommend this store. The attention to detail in packaging and the premium feel of the products exceeded my expectations.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      role: 'Verified Customer'
    },
    {
      name: 'Jane Smith',
      review: 'Great customer service and beautiful products. Will shop again! The support team was incredibly helpful and responsive throughout my entire shopping journey.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      role: 'Loyal Customer'
    },
    {
      name: 'Mike Johnson',
      review: 'Excellent experience from start to finish. Top-notch quality. Every aspect of the purchase process was seamless and the product quality is outstanding.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'Premium Member'
    },
    {
      name: 'Sarah Wilson',
      review: 'Love the design and the attention to detail. Perfect purchase! The craftsmanship and design aesthetics are truly remarkable and worth every penny.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'Design Enthusiast'
    }
  ];

  const extendedTestimonials = [...testimonials, ...testimonials];

  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % extendedTestimonials.length;
    goToTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    const prevIndex = (currentIndex - 1 + extendedTestimonials.length) % extendedTestimonials.length;
    goToTestimonial(prevIndex);
  };

  const goToTestimonial = (index) => {
    if (scrollContainerRef.current) {
      const cards = scrollContainerRef.current.children;
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        setCurrentIndex(index % testimonials.length);
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            Customer Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-96 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 snap-center border border-gray-100"
              >
                <div className="flex flex-col items-center">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  {/* Avatar with glow effect */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-600 italic mb-6 leading-relaxed text-center">"{testimonial.review}"</p>

                  {/* Name and Role */}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                    <p className="text-blue-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      productId: "apple-watch-ultra-2",
      title: "Apple Watch Ultra 2",
      subtitle: "ELECTRONICS SALE",
      description:
        "The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP.",
      image: "/assets/apple-watch.png",
      primaryButton: "Shop Now",
      secondaryButton: "Learn More",
      gradientOverlay: "from-blue-600/30 via-purple-600/30 to-pink-600/30",
      accentGradient: "from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      productId: "nike-air-max",
      title: "Nike Air Max 270",
      subtitle: "CLOTHING ESSENTIALS",
      description:
        "Experience ultimate comfort and style with the iconic Air Max cushioning. Perfect for everyday wear.",
      image: "/assets/nike.png",
      primaryButton: "Shop Now",
      secondaryButton: "Learn More",
      gradientOverlay: "from-emerald-600/30 via-teal-600/30 to-cyan-600/30",
      accentGradient: "from-emerald-400 to-teal-500"
    },
    {
      id: 3,
      productId: "kitchenaid-mixer",
      title: "KitchenAid Stand Mixer",
      subtitle: "HOME APPLIANCES",
      description:
        "Professional-grade power and versatility for all your baking and cooking needs. A kitchen essential.",
      image: "/assets/kitchen.png",
      primaryButton: "Shop Now",
      secondaryButton: "Learn More",
      gradientOverlay: "from-rose-600/30 via-pink-600/30 to-purple-600/30",
      accentGradient: "from-rose-400 to-pink-500"
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex justify-center mt-8">
      <div className="relative w-[90%] md:w-[85%] lg:w-[85%] bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-xl text-white h-[480px] flex items-center justify-center">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0 z-10"
                : "opacity-0 translate-x-10 z-0"
            }`}
          >
            {/* Left - Text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <p className={`bg-gradient-to-r ${slide.accentGradient} bg-clip-text text-transparent font-semibold tracking-widest text-sm uppercase`}>
                {slide.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                {slide.title}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto md:mx-0">
                {slide.description}
              </p>
              <div className="flex justify-center md:justify-start gap-4 pt-4">
                <button
                  onClick={() => navigate(`/product/${slide.productId}`)}
                  className={`bg-gradient-to-r ${slide.accentGradient} hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  {slide.primaryButton}
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-md transition-all duration-300">
                  {slide.secondaryButton}
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="flex-1 flex justify-center mt-8 md:mt-0 relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[260px] md:w-[380px] object-contain drop-shadow-2xl transition-all duration-700 transform hover:scale-105"
              />
              <div className={`absolute -inset-2 bg-gradient-to-r ${slide.gradientOverlay} blur-3xl rounded-full -z-10`}></div>
            </div>
          </div>
        ))}

        {/* Arrows - Both at bottom right */}
        <div className="absolute bottom-6 right-6 flex space-x-4 z-20">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-orange-500 scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

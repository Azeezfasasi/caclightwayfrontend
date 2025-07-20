import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
    <section className="relative w-full bg-black text-white font-inter overflow-hidden pt-0 lg:pt-10 pb-0 lg:pb-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url('https://placehold.co/1920x1080/333333/FFFFFF/png?text=Church+Interior')`,}}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center text-left py-12 md:py-0 w-full md:w-1/2 lg:w-2/5">
          {/* Main Headline */}
          <h1 className="text-[24px] sm:text-[35px] lg:text-6xl font-extrabold leading-tight mb-2">
            BECOME A PART OF OUR COMMUNITY
          </h1>
          {/* Subtitle */}
          <p className="text-sm uppercase tracking-widest text-gray-300 mb-4">
            Join a growing family of believers dedicated to worship, spiritual growth, and impacting the world with the love of Jesus Christ. At CAC Lightway Assembly, we are raising Kingdom champions and lighting the path for generations.
          </p>

          {/* Call to Action Button */}
          <Link to="/register" className="w-fit px-8 py-4 bg-orange-500 text-black font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
            GET STARTED
          </Link>

          {/* Small Descriptive Text */}
          <div className="mt-12">
            <div className="flex items-center mb-2">
              <hr className="w-10 border-t-2 border-gray-500 mr-4" />
              <p className="text-sm text-gray-400">
                Empowering Lives Through the Light of Christ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Hero;

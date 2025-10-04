"use client";

import { FaSatellite, FaChevronDown } from "react-icons/fa";
import NASALogo from "../components/NASALogo";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-20 bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white overflow-hidden pt-[75px] pb-8 lg:pb-0">
      {/* Enhanced Space Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2),_transparent_70%)] animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-50 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 25px 35px, #fff, transparent),
                             radial-gradient(2px 2px at 45px 75px, rgba(255,255,255,0.8), transparent),
                             radial-gradient(1px 1px at 95px 45px, #fff, transparent),
                             radial-gradient(1px 1px at 135px 85px, rgba(255,255,255,0.6), transparent),
                             radial-gradient(3px 3px at 180px 25px, rgba(59,130,246,0.8), transparent),
                             radial-gradient(2px 2px at 220px 90px, rgba(147,51,234,0.6), transparent)`,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 120px",
            animation: "twinkle 4s ease-in-out infinite alternate",
          }}
        ></div>

        {/* Enhanced Nebulas with Animation */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/25 via-blue-500/20 to-indigo-600/25 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
        <div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-purple-600/20 blur-3xl rounded-full bottom-20 right-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-[300px] h-[300px] bg-gradient-to-r from-indigo-600/15 to-purple-500/10 blur-2xl rounded-full top-1/2 left-1/3 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Content Left */}
      <div className="w-full lg:w-1/2 relative z-10 space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left">
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
            <span className="block text-white mb-2 animate-slide-up">
              Explore Space
            </span>
            <span className="block">
              with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl animate-glow">
                Terra
              </span>
            </span>
          </h1>

          {/* Subtitle Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm text-blue-300 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            NASA Earth Observation Mission
          </div>
        </div>

        {/* Description */}
        <p
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          Discover NASA&apos;s Terra satellite and its mission to observe our
          planet from space, all in an immersive interactive{" "}
          <span className="text-blue-400 font-semibold">3D journey</span>.
        </p>

        {/* Features List */}
        <div
          className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            "5 Scientific Instruments",
            "25+ Years of Data",
            "Global Coverage",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
              {feature}
            </div>
          ))}
        </div>
        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={() => {
              const earthSection = document.getElementById("earth-section");
              if (earthSection) {
                // استخدام smooth scroll مع fallback
                try {
                  earthSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                } catch {
                  // fallback للمتصفحات القديمة
                  if (typeof window !== 'undefined') {
                    window.scrollTo({
                      top: earthSection.offsetTop,
                      behavior: "smooth",
                    });
                  }
                }
              }
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 rounded-xl text-white font-bold shadow-2xl shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"></div>

            {/* Button Content */}
            <div className="relative flex items-center gap-3">
              <FaSatellite className="text-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:text-cyan-300" />
              <span className="text-lg">Start the Journey</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Interactive Terra Right */}
      <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full flex justify-center items-center z-1 relative mt-8 lg:mt-0">
        {/* Terra Container with Glow */}
        <div className="relative w-full max-w-md lg:w-[80%] h-full">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 blur-3xl rounded-full animate-pulse"></div>

          {/* NASA Model */}
          <div className="relative w-full h-full">
            <NASALogo />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <FaChevronDown className="text-gray-400 text-xl animate-bounce" />
        <span className="text-gray-400 text-sm mt-2">Scroll to Explore</span>
      </div>
    </section>
  );
}

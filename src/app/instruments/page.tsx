"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaBurn,
  FaSun,
  FaCloud,
  FaSearch,
  FaCity,
  FaArrowDown,
  FaExternalLinkAlt,
} from "react-icons/fa";
import ModelPanel from "../../components/ModelPanel";

const instruments = [
  {
    id: "mopitt",
    title: "MOPITT – Air Pollution Tracking",
    description:
      "MOPITT monitored carbon monoxide and air pollution from wildfires and factories, showing how human activity impacts the atmosphere.",
    icon: <FaBurn className="text-red-400 text-3xl" />,
    video:
      "/assets/videos/__Create an 8-second semi-realistic cartoon-style animation showing a Muslim young man studying Isla (1).mp4",
    details: [
      "Urban pollution mapping",
      "Wildfire smoke monitoring",
      "Factory emissions tracking",
    ],
    stats: ["Resolution: 22 km", "Swath: 640 km", "Operational: 1999–2025"],
  },
  {
    id: "ceres",
    title: "CERES – Earth's Energy Balance",
    description:
      "CERES studies the balance between incoming sunlight and outgoing heat, providing critical insights into climate change.",
    icon: <FaSun className="text-yellow-400 text-3xl" />,
    video:
      "/assets/videos/__Create an 8-second semi-realistic cartoon-style animation showing a Muslim young man studying Isla (1).mp4",
    details: [
      "Incoming solar radiation",
      "Heat reflected by Earth",
      "Direct climate indicators",
    ],
    stats: [
      "Measures: Solar + Infrared radiation",
      "Provides: Global energy budget",
      "Legacy: 25+ years of data",
    ],
  },
  {
    id: "modis",
    title: "MODIS – Daily Global Imaging",
    description:
      "MODIS captures daily imagery of Earth, from cloud movements and ocean currents to wildfires and polar ice changes.",
    icon: <FaCloud className="text-blue-300 text-3xl" />,
    video:
      "/assets/videos/__Create an 8-second semi-realistic cartoon-style animation showing a Muslim young man studying Isla (1).mp4",
    details: [
      "Global daily images",
      "Weather and cloud tracking",
      "Forest fire detection",
    ],
    stats: [
      "Bands: 36 (0.4–14µm)",
      "Resolution: 250m–1km",
      "Swath: 2330 km (daily global coverage)",
    ],
  },
  {
    id: "aster",
    title: "ASTER – High-Resolution Imaging",
    description:
      "ASTER zooms into fine details such as urban heat, volcanoes, and natural resources, offering precise data for environmental studies.",
    icon: <FaSearch className="text-green-400 text-3xl" />,
    video:
      "/assets/videos/__Create an 8-second semi-realistic cartoon-style animation showing a Muslim young man studying Isla (1).mp4",
    details: [
      "Urban heat tracking",
      "Volcano monitoring",
      "Natural resource exploration",
    ],
    stats: [
      "Resolution: 15–90m",
      "Bands: 14 (visible–thermal IR)",
      "Built by: Japan (METI/JAXA)",
    ],
  },
  {
    id: "misr",
    title: "MISR – Multi-Angle Observations",
    description:
      "MISR provides multiple perspectives of the Earth, helping scientists study storms, haze, cloud heights, and megacities' growth.",
    icon: <FaCity className="text-purple-400 text-3xl" />,
    video:
      "/assets/videos/__Create an 8-second semi-realistic cartoon-style animation showing a Muslim young man studying Isla (1).mp4",
    details: [
      "Storm & haze analysis",
      "Cloud height measurement",
      "Megacity growth monitoring",
    ],
    stats: [
      "Views: 9 angles",
      "Bands: 4 (blue–NIR)",
      "Unique: 3D aerosol & cloud data",
    ],
  },
];

export default function InstrumentsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current);
    }

    return () => {
      heroObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  const scrollToInstruments = () => {
    cardsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleShowDetails = (id: string) => {
    router.push(`/instruments/${id}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white overflow-hidden pt-[50px]"
      >
        {/* Enhanced Background Effects */}
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

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 w-full">
            {/* Mobile: Model first, then text */}
            <div className="flex flex-col lg:hidden gap-[120px]">
              {/* Model Panel - Mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full h-[300px] md:h-[400px]"
              >
                <ModelPanel />
              </motion.div>

              {/* Text Content - Mobile */}
              <div className="text-center space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                    <span className="block text-white mb-2 animate-slide-up">
                      Terra&apos;s
                    </span>
                    <span className="block">
                      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl animate-glow">
                        Instruments
                      </span>
                    </span>
                  </h1>

                  {/* Subtitle Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm text-blue-300 animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    Scientific Instruments
                  </div>
                </div>

                <p
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  Terra carries 5 advanced instruments that together provide a
                  complete picture of Earth&apos;s{" "}
                  <span className="text-blue-400 font-semibold">
                    climate, atmosphere, and surface
                  </span>
                  .
                </p>

                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.8s" }}
                >
                  <button
                    onClick={scrollToInstruments}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 rounded-xl text-white font-bold shadow-2xl shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"></div>

                    {/* Button Content */}
                    <div className="relative flex items-center gap-3">
                      <span className="text-lg">Explore Instruments</span>
                      <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: Split layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Text Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight">
                    <span className="block text-white mb-2 animate-slide-up">
                      Terra&apos;s
                    </span>
                    <span className="block">
                      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl animate-glow">
                        Instruments
                      </span>
                    </span>
                  </h1>

                  {/* Subtitle Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm text-blue-300 animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    Scientific Instruments
                  </div>
                </div>

                <p
                  className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg mx-auto leading-relaxed animate-slide-up px-4 sm:px-0"
                  style={{ animationDelay: "0.4s" }}
                >
                  Terra carries 5 advanced instruments that together provide a
                  complete picture of Earth&apos;s{" "}
                  <span className="text-blue-400 font-semibold">
                    climate, atmosphere, and surface
                  </span>
                  .
                </p>

                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.8s" }}
                >
                  <button
                    onClick={scrollToInstruments}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 rounded-xl text-white font-bold shadow-2xl shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"></div>

                    {/* Button Content */}
                    <div className="relative flex items-center gap-3">
                      <span className="text-lg">Explore Instruments</span>
                      <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Right side - Model Panel */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={heroVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full h-[500px] xl:h-[600px]"
              >
                <ModelPanel />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Instruments Cards Section */}
      <section
        ref={cardsRef}
        className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-[#0b1a2a] via-[#081126] to-[#050a18] text-white overflow-hidden"
      >
        {/* Enhanced Space Background */}
        <div className="absolute inset-0 z-0">
          {/* Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)]"></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(2px 2px at 30px 40px, #fff, transparent),
                               radial-gradient(2px 2px at 50px 80px, rgba(255,255,255,0.6), transparent),
                               radial-gradient(1px 1px at 100px 50px, #fff, transparent),
                               radial-gradient(1px 1px at 140px 90px, rgba(255,255,255,0.4), transparent),
                               radial-gradient(3px 3px at 190px 30px, rgba(59,130,246,0.6), transparent)`,
              backgroundRepeat: "repeat",
              backgroundSize: "250px 150px",
            }}
          ></div>

          {/* Nebulas */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-cyan-600/15 blur-3xl rounded-full top-20 right-20 animate-pulse"></div>
          <div
            className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/10 via-indigo-600/8 to-blue-600/12 blur-3xl rounded-full bottom-40 left-20 animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition-all duration-1000 ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Scientific
              </span>
              <br />
              <span className="text-white">Instruments</span>
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 px-4 sm:px-0 ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Each instrument aboard Terra provides unique capabilities for
              studying Earth&apos;s{" "}
              <span className="text-blue-400 font-semibold">systems</span>
            </p>
          </div>

          {/* Instruments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {instruments.map((instrument, index) => (
              <motion.div
                key={instrument.id}
                initial={{ opacity: 0, y: 50 }}
                animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(59,130,246,0.03) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Simple glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 blur-xl"></div>
                </div>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-blue-400/20"></div>

                <div className="relative z-10 space-y-6">
                  {/* Icon with enhanced styling */}
                  <div className="flex justify-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-600/10 group-hover:from-blue-400/20 group-hover:via-purple-400/15 group-hover:to-blue-500/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                      <div className="text-4xl transition-all duration-300 group-hover:drop-shadow-lg">
                        {instrument.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title with gradient */}
                  <h3 className="text-xl font-bold text-center mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {instrument.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 text-sm text-center leading-relaxed transition-colors duration-300">
                    {instrument.description}
                  </p>

                  {/* Enhanced Details */}
                  <ul className="space-y-3">
                    {instrument.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-gray-400 group-hover:text-gray-300 text-sm flex items-start transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 mt-1.5 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => handleShowDetails(instrument.id)}
                    className="group/btn relative w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-white font-medium backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Show Details</span>
                      <FaExternalLinkAlt className="text-xs opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

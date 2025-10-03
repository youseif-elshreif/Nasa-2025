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
        className="relative min-h-screen bg-gradient-to-b from-[#0b1a2a] via-[#081126] to-[#050a18] text-white overflow-hidden"
      >
        {/* Background Effects */}
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

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 w-full">
            {/* Mobile: Model first, then text */}
            <div className="flex flex-col lg:hidden gap-12">
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
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                    Terra&apos;s
                  </span>
                  <br />
                  <span className="text-white">Instruments</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Terra carries 5 advanced instruments that together provide a
                  complete picture of Earth&apos;s climate, atmosphere, and
                  surface.
                </p>

                <button
                  onClick={scrollToInstruments}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <span>Explore Instruments</span>
                  <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>

            {/* Desktop: Split layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={heroVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-5xl xl:text-6xl font-extrabold">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                    Terra&apos;s
                  </span>
                  <br />
                  <span className="text-white">Instruments</span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Terra carries 5 advanced instruments that together provide a
                  complete picture of Earth&apos;s climate, atmosphere, and
                  surface.
                </p>

                <button
                  onClick={scrollToInstruments}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <span>Explore Instruments</span>
                  <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
                </button>
              </motion.div>

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
        className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-[#050a18] via-[#0f1f35] to-[#0b1a2a] text-white overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Nebula effects */}
          <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-3xl rounded-full top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute w-[400px] h-[400px] bg-purple-600/15 blur-3xl rounded-full bottom-1/3 right-1/4 animate-pulse"></div>

          {/* Stars pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(2px 2px at 25px 35px, #fff, transparent),
                               radial-gradient(2px 2px at 45px 75px, rgba(255,255,255,0.6), transparent),
                               radial-gradient(1px 1px at 95px 45px, #fff, transparent),
                               radial-gradient(1px 1px at 135px 85px, rgba(255,255,255,0.4), transparent)`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 150px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                Scientific
              </span>
              <br />
              <span className="text-white">Instruments</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Each instrument aboard Terra provides unique capabilities for
              studying Earth&apos;s systems
            </p>
          </div>

          {/* Instruments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instruments.map((instrument, index) => (
              <motion.div
                key={instrument.id}
                initial={{ opacity: 0, y: 50 }}
                animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4">{instrument.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {instrument.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {instrument.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2 mb-6">
                    {instrument.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-gray-400 text-sm flex items-center"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => handleShowDetails(instrument.id)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600/70 to-purple-600/70 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Show Details
                      <FaExternalLinkAlt className="text-xs opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
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

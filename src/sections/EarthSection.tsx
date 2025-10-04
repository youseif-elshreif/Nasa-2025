"use client";

import { useState, useEffect, useRef } from "react";
import EarthModel from "../components/EarthModel";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  FaCloud,
  FaSun,
  FaBurn,
  FaCity,
  FaGlobe,
  FaSearch,
} from "react-icons/fa";

const AnimatedTerra = dynamic(() => import("../components/AnimatedTerra"), {
  ssr: false,
});

export default function EarthSection() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [terraPosition, setTerraPosition] = useState({ x: 200, y: -100 });
  const [terraRotation, setTerraRotation] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const section = document.getElementById("earth-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolledInSection = Math.min(
        Math.max(windowHeight - rect.top, 0),
        sectionHeight
      );

      const progress = scrolledInSection / sectionHeight - 0.15;

      if (progress < 0.18) {
        setCurrentPhase(0);
        setTerraPosition({ x: 220, y: -100 });
        setTerraRotation(0);
      } else if (progress < 0.32) {
        setCurrentPhase(1);
        setTerraPosition({ x: -220, y: -80 });
        setTerraRotation(Math.PI);
      } else if (progress < 0.46) {
        setCurrentPhase(2);
        setTerraPosition({ x: 240, y: 100 });
        setTerraRotation(0);
      } else if (progress < 0.6) {
        setCurrentPhase(3);
        setTerraPosition({ x: -200, y: 120 });
        setTerraRotation(Math.PI / 2);
      } else {
        setCurrentPhase(4);
        setTerraPosition({ x: -240, y: 130 });
        setTerraRotation(Math.PI);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const phases = [
    {
      title: "MOPITT – Air Pollution Tracking",
      description:
        "MOPITT (from Canada) measured carbon monoxide in the lower atmosphere for 25 years, creating the first continuous global CO record and tracking wildfire smoke and industrial emissions.",
      icon: <FaBurn className="text-red-400 text-3xl" />,
      details: [
        "Global carbon monoxide trends",
        "Wildfire smoke transport",
        "Industrial & urban pollution sources",
      ],
    },
    {
      title: "CERES – Earth's Energy Balance",
      description:
        "CERES radiometers measure Earth's radiation budget – how much sunlight is absorbed versus how much heat is emitted – providing vital data for climate models.",
      icon: <FaSun className="text-yellow-400 text-3xl" />,
      details: [
        "Incoming solar energy",
        "Reflected sunlight (albedo)",
        "Emitted infrared heat",
      ],
    },
    {
      title: "MODIS – Daily Global Imaging",
      description:
        "MODIS captures global images twice daily in 36 spectral bands, monitoring clouds, land, oceans, ice, and active fires at resolutions from 250 m to 1 km.",
      icon: <FaCloud className="text-blue-300 text-3xl" />,
      details: [
        "Vegetation & land cover maps",
        "Cloud & weather monitoring",
        "Wildfire & polar ice detection",
      ],
    },
    {
      title: "ASTER – High-Resolution Imaging",
      description:
        "ASTER (from Japan) provides high-resolution visible to thermal infrared images, serving as Terra’s ‘zoom lens’ for detailed views of volcanoes, cities, and land changes.",
      icon: <FaSearch className="text-green-400 text-3xl" />,
      details: [
        "Urban heat & land surface maps",
        "Volcano & geology studies",
        "Natural resource exploration",
      ],
    },
    {
      title: "MISR – Multi-Angle Observations",
      description:
        "MISR’s 9 cameras view Earth from different angles, allowing 3D studies of clouds, aerosols, storms, and surface features like vegetation and megacities.",
      icon: <FaCity className="text-purple-400 text-3xl" />,
      details: [
        "3D cloud height retrieval",
        "Aerosol & haze characterization",
        "Urban growth & storm analysis",
      ],
    },
  ];

  return (
    <section
      id="earth-section"
      className="min-h-[600vh] relative bg-gradient-to-b from-[#050a18] via-[#0f1f35] to-[#0b1a2a] text-white"
    >
      {/* Space background */}
      <div className="absolute inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),_transparent_70%)]"></div>
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
        {/* Nebulas */}
        <div className="absolute w-[200px] h-[600px] bg-blue-600/10 blur-3xl rounded-full top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-600/15 blur-3xl rounded-full bottom-1/3 right-1/4 animate-pulse"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 pt-12 sm:pt-16 lg:pt-20 pb-8 lg:pb-10">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            ref={titleRef}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 transition-all duration-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Terra&apos;s Instruments
            </span>
          </h2>

          {/* Gradient underline */}
          <div
            className={`mx-auto h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-2 transition-all duration-1000 ${
              titleVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>

          {/* Glow effect */}
          <div
            className={`mx-auto h-8 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm mb-6 transition-all duration-1000 ${
              titleVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>

          <p
            className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Explore Terra&apos;s five scientific instruments as they orbit
            Earth, each providing unique perspectives on our planet&apos;s
            climate, atmosphere, and surface changes.
          </p>
        </div>
      </div>

      <div className="h-screen flex flex-col lg:flex-row items-center sticky top-0 z-10">
        {/* Earth fixed */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center relative">
          <EarthModel />

          {/* Terra orbiting */}
          <div
            className="absolute w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 transition-all duration-1000 ease-in-out pointer-events-none"
            style={{
              transform: `translate(${
                terraPosition.x * (typeof window !== 'undefined' && window.innerWidth > 1024 ? 1 : 0.6)
              }px, ${
                terraPosition.y * (typeof window !== 'undefined' && window.innerWidth > 1024 ? 1 : 0.6)
              }px)`,
            }}
          >
            <AnimatedTerra rotation={terraRotation} />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center relative p-4 sm:p-6 lg:p-8">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-1000 ease-out -top-[125px] lg:top-[100px] w-[90%] lg:w-full ${
                index === currentPhase
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
            >
              <div
                className="relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-l-2xl lg:rounded-r-[0px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(59,130,246,0.08) 100%)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow:
                    "0 8px 32px 0 rgba(31, 38, 135, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Icon Section */}
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-blue-600/20">
                    <div className="text-4xl">{phase.icon}</div>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 bg-clip-text text-transparent">
                  {phase.title}
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                  {phase.description}
                </p>

                {/* Details List */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {phase.details.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 text-gray-300 p-2 rounded-lg"
                    >
                      <div className="p-1 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                        <FaGlobe className="text-cyan-400 text-xs sm:text-sm" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <div className="text-center">
                  <Link
                    href="/instruments"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 rounded-xl text-white font-bold shadow-2xl shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"></div>

                    {/* Button Content */}
                    <div className="relative flex items-center gap-3">
                      <span className="text-sm lg:text-base">Learn More</span>
                      <FaSearch className="text-sm group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import EarthModel from "../components/EarthModel";
import dynamic from "next/dynamic";
import { FaCloud, FaSun, FaBurn, FaCity, FaGlobe } from "react-icons/fa";

const AnimatedTerra = dynamic(() => import("../components/AnimatedTerra"), {
  ssr: false,
});

export default function EarthSection() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [terraPosition, setTerraPosition] = useState({ x: 200, y: -100 });
  const [terraRotation, setTerraRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("earth-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolledInSection = Math.min(
        Math.max(windowHeight - rect.top, 0),
        sectionHeight
      );

      const progress = scrolledInSection / sectionHeight - 0.1;

      if (progress < 0.2) {
        setCurrentPhase(0);
        setTerraPosition({ x: 200, y: -100 });
        setTerraRotation(0);
      } else if (progress < 0.45) {
        setCurrentPhase(1);
        setTerraPosition({ x: -200, y: -80 });
        setTerraRotation(Math.PI);
      } else if (progress < 0.7) {
        setCurrentPhase(2);
        setTerraPosition({ x: 220, y: 100 });
        setTerraRotation(0);
      } else {
        setCurrentPhase(3);
        setTerraPosition({ x: -220, y: 120 });
        setTerraRotation(Math.PI);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phases = [
    {
      title: "MOPITT – Air Pollution Tracking",
      description:
        "MOPITT monitors carbon monoxide and air pollution from wildfires and factories, showing how human activity impacts the atmosphere.",
      icon: <FaBurn className="text-red-400 text-3xl" />,
      details: [
        "Urban pollution mapping",
        "Wildfire smoke monitoring",
        "Factory emissions tracking",
      ],
    },
    {
      title: "CERES – Earth's Energy Balance",
      description:
        "CERES studies the balance between incoming sunlight and outgoing heat, providing critical insights into climate change.",
      icon: <FaSun className="text-yellow-400 text-3xl" />,
      details: [
        "Incoming solar radiation",
        "Heat reflected by Earth",
        "Direct climate indicators",
      ],
    },
    {
      title: "MODIS – Daily Global Imaging",
      description:
        "MODIS captures daily imagery of Earth, from cloud movements and ocean currents to wildfires and polar ice changes.",
      icon: <FaCloud className="text-blue-300 text-3xl" />,
      details: [
        "Global daily images",
        "Weather and cloud tracking",
        "Forest fire detection",
      ],
    },
    {
      title: "ASTER & MISR – Detail and Perspective",
      description:
        "ASTER zooms into fine details like city heat and natural resources, while MISR provides multiple perspectives of storms, haze, and megacities’ growth.",
      icon: <FaCity className="text-purple-400 text-3xl" />,
      details: [
        "Urban heat tracking",
        "Natural resource exploration",
        "Storm & haze multi-angle analysis",
      ],
    },
  ];

  return (
    <section
      id="earth-section"
      className="min-h-[400vh] relative bg-gradient-to-b from-black via-[#050a18] to-[#0b1a2a] text-white"
    >
      {/* Space background */}
      <div className="absolute inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),_transparent_70%)]"></div>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, #fff, transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                           radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                           radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                           radial-gradient(2px 2px at 160px 30px, #fff, transparent)`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 100px",
          }}
        ></div>
        {/* Nebulas */}
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full top-1/3 left-1/4"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full bottom-1/4 right-1/3"></div>
      </div>

      <div className="h-screen flex items-center sticky top-0 z-10">
        {/* Earth fixed */}
        <div className="w-1/2 h-full flex items-center justify-center relative">
          <EarthModel />

          {/* Terra orbiting */}
          <div
            className="absolute w-32 h-32 transition-all duration-1000 ease-in-out pointer-events-none"
            style={{
              transform: `translate(${terraPosition.x}px, ${terraPosition.y}px)`,
            }}
          >
            <AnimatedTerra rotation={terraRotation} />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-1/2 h-full flex items-center justify-center relative p-8">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`absolute w-full transition-all duration-1000 ease-out ${
                index === currentPhase
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  {phase.icon}
                  <h2 className="text-3xl lg:text-4xl font-bold text-blue-300">
                    {phase.title}
                  </h2>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  {phase.description}
                </p>
                <ul className="space-y-3">
                  {phase.details.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <FaGlobe className="text-cyan-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

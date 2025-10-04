"use client";

import { useEffect, useState, useRef } from "react";
import { FaRocket, FaExternalLinkAlt } from "react-icons/fa";
import StatCard from "../components/StatCard";
import MissionTimeline from "../components/MissionTimeline";
import ModelPanel from "../components/ModelPanel";
import { MISSION_STATS } from "../data/terra";

export default function MissionOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statsData = [
    {
      value: MISSION_STATS.yearsActive,
      label: "Years Active",
      unit: "+",
      description:
        "Originally designed for 6 years, Terra has been operational for over 25 years",
    },
    {
      value: MISSION_STATS.archiveSizePB.toFixed(1),
      label: "Data Archive",
      unit: "PB",
      description: `Petabytes of Earth observation data collected since ${MISSION_STATS.launchDate
        .split(" ")
        .pop()}`,
    },
    {
      value: MISSION_STATS.orbitsPerDay,
      label: "Daily Orbits",
      unit: "",
      description:
        "Terra completes 14 orbits around Earth every day in its sun-synchronous orbit",
    },
    {
      value: MISSION_STATS.instruments.length,
      label: "Instruments",
      unit: "",
      description: `${MISSION_STATS.instruments.join(
        ", "
      )} - each providing unique Earth observation capabilities`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#0b1a2a] via-[#081126] to-[#050a18] text-white py-20 overflow-hidden"
      aria-labelledby="mission-overview-title"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            id="mission-overview-title"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Mission
            </span>
            <br />
            <span className="text-white">Overview</span>
          </h2>

          {/* Gradient underline */}
          <div
            className={`mx-auto h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-2 transition-all duration-1000 ${
              isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>

          {/* Glow effect */}
          <div
            className={`mx-auto h-8 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm mb-6 transition-all duration-1000 ${
              isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>

          <div
            className={`max-w-4xl mx-auto space-y-4 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4 sm:px-0">
              Terra (launched Dec 18, 1999) is NASA&apos;s long-running
              Earth-observing flagship. With five instruments — MODIS, ASTER,
              MOPITT, MISR, and CERES — Terra has produced multi-decadal data
              records used to map fires, measure atmospheric pollution, monitor
              Earth&apos;s energy budget, and reveal urban and land-surface
              change.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-400 px-4 sm:px-0">
              The mission&apos;s archive exceeds 6 PB and continues to deliver
              vital science more than 25 years after launch.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`mt-8 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="https://terra.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Explore Terra mission data (opens in new tab)"
            >
              <FaRocket className="text-sm group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Data</span>
              <FaExternalLinkAlt className="text-xs opacity-70" />
            </a>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Stats and Timeline */}
          <div className="space-y-8 lg:space-y-12">
            {/* Mission Stats */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 lg:mb-8 text-center lg:text-left">
                Mission Statistics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {statsData.map((stat, index) => (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    unit={stat.unit}
                    description={stat.description}
                    delay={index * 150}
                  />
                ))}
              </div>
            </div>

            {/* Mission Timeline */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <MissionTimeline />
            </div>

            {/* Additional Info */}
            <div
              className={`transition-all duration-1000 delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">
                  Mission Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Launch Vehicle:</span>
                    <span className="text-gray-200 ml-2">
                      {MISSION_STATS.launchVehicle}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Mass:</span>
                    <span className="text-gray-200 ml-2">
                      {MISSION_STATS.massKg.toLocaleString()} kg
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Orbit:</span>
                    <span className="text-gray-200 ml-2">
                      {MISSION_STATS.orbit}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Data Products:</span>
                    <span className="text-gray-200 ml-2">
                      {MISSION_STATS.dataProducts}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    <strong>Operational Notes:</strong>{" "}
                    {MISSION_STATS.operationalNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Model */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
                Interactive Model
              </h3>

              <div className="aspect-square max-w-md mx-auto lg:max-w-none">
                <ModelPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaRocket,
  FaGlobeAmericas,
  FaSatellite,
  FaMicroscope,
  FaDatabase,
  FaCloudSun,
  FaFire,
  FaSnowflake,
  FaWind,
  FaSolarPanel,
} from "react-icons/fa";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
}

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
}

function StatCard({ icon, value, label, index }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100); // stagger animation
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative p-6 md:p-8 rounded-2xl transition-all duration-700 transform hover:scale-105 hover:-rotate-2 hover:translate-y-[-8px] cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(59,130,246,0.05) 100%)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow:
          "0 8px 32px 0 rgba(31, 38, 135, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${
          y / 20
        }deg) rotateY(${-x / 20}deg) scale(1.05) translateZ(20px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-blue-500/25 via-purple-500/20 to-blue-500/25 blur-xl -z-10 group-hover:scale-110"></div>

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10"></div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-blue-600/20 group-hover:from-blue-400/30 group-hover:via-purple-400/25 group-hover:to-blue-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
            <div className="text-3xl md:text-4xl text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110 transform group-hover:drop-shadow-lg">
              {icon}
            </div>
          </div>
        </div>

        {/* Value */}
        <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
          {value}
        </div>

        {/* Label */}
        <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm md:text-base">
          {label}
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 blur-sm"></div>
      </div>
    </div>
  );
}

export default function TerraStatsSection() {
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

  const stats = [
    {
      icon: <FaRocket />,
      value: "1999",
      label: "Launch Year",
    },
    {
      icon: <FaGlobeAmericas />,
      value: "705 km",
      label: "Orbit Altitude",
    },
    {
      icon: <FaSatellite />,
      value: "1–2 days",
      label: "Global Coverage Revisit",
    },
    {
      icon: <FaMicroscope />,
      value: "5",
      label: "Onboard Instruments",
    },
    {
      icon: <FaDatabase />,
      value: "20+ years",
      label: "Data Collected",
    },
    {
      icon: <FaCloudSun />,
      value: "Climate",
      label: "Main Mission Focus",
    },
    {
      icon: <FaFire />,
      value: "4M+ fires",
      label: "Wildfire Observations",
    },
    {
      icon: <FaSnowflake />,
      value: "Since 2000",
      label: "Polar Ice Monitoring",
    },
    {
      icon: <FaWind />,
      value: "Global CO",
      label: "Air Quality Tracking",
    },
    {
      icon: <FaSolarPanel />,
      value: "95%",
      label: "Energy Balance Accuracy",
    },
  ];

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-[#0b1a2a] via-[#0f1f35] to-[#050a18] text-white overflow-hidden">
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
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition-all duration-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              {titleVisible ? (
                <TypingText text="Terra Satellite" delay={500} />
              ) : (
                "Terra Satellite"
              )}
            </span>
            <br />
            <span className="text-white">
              {titleVisible ? (
                <TypingText text="Key Stats" delay={1500} />
              ) : (
                "Key Stats"
              )}
            </span>
          </h2>

          {/* Gradient underline */}
          <div
            className={`mx-auto h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-1000 ${
              titleVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>

          {/* Glow effect */}
          <div
            className={`mx-auto mt-2 h-8 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm transition-all duration-1000 ${
              titleVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"></div>
        </div>
      </div>
    </section>
  );
}

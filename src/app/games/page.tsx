"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSatellite, FaRocket, FaPlay, FaArrowRight } from "react-icons/fa";

export default function GamesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [gamesVisible, setGamesVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const gamesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const gamesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGamesVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    if (gamesRef.current) {
      gamesObserver.observe(gamesRef.current);
    }

    return () => {
      heroObserver.disconnect();
      gamesObserver.disconnect();
    };
  }, []);

  const games = [
    {
      id: "satellitedataexplorer",
      title: "TerraQuest",
      subtitle: "Satellite Data Explorer",
      description:
        "Pilot Terra satellite and collect data from its 5 amazing instruments. Learn about Earth's climate while having fun!",
      features: [
        "Interactive satellite piloting",
        "Learn about Terra's instruments",
        "Educational facts and achievements",
        "Score tracking and combos",
      ],
      difficulty: "Easy",
      players: "Single Player",
      icon: <FaSatellite className="text-4xl text-blue-400" />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500/30 to-cyan-500/30",
      buttonGradient: "from-blue-500/20 to-cyan-500/20",
      hoverGradient: "from-blue-500/30 to-cyan-500/30",
    },
    // Future games can be added here
    {
      id: "coming-soon-1",
      title: "Earth Explorer",
      subtitle: "Climate Detective",
      description:
        "Analyze climate data and discover patterns in Earth's changing environment. Coming soon...",
      features: [
        "Climate data analysis",
        "Pattern recognition challenges",
        "Real NASA datasets",
        "Research simulation",
      ],
      difficulty: "Medium",
      players: "Single Player",
      icon: <FaRocket className="text-4xl text-purple-400" />,
      gradient: "from-purple-500/20 to-indigo-500/20",
      borderGradient: "from-purple-500/30 to-indigo-500/30",
      buttonGradient: "from-purple-500/20 to-indigo-500/20",
      hoverGradient: "from-purple-500/30 to-indigo-500/30",
      comingSoon: true,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white overflow-hidden flex items-center"
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
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="block text-white mb-2 animate-slide-up">
                  Space
                </span>
                <span className="block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl animate-glow">
                    Games
                  </span>
                </span>
              </h1>

              {/* Subtitle Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm text-blue-300 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Interactive Learning Games
              </div>

              <p
                className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed animate-slide-up m-auto mb-4"
                style={{ animationDelay: "0.4s" }}
              >
                Explore the cosmos through interactive games and learn about{" "}
                <span className="text-blue-400 font-semibold">
                  NASA&apos;s Terra satellite
                </span>{" "}
                mission
              </p>

              <div
                className="flex flex-wrap gap-4 animate-slide-up justify-center"
                style={{ animationDelay: "0.6s" }}
              >
                {[
                  "Interactive Games",
                  "Educational Content",
                  "Terra Mission",
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section
        ref={gamesRef}
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
                gamesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Available
              </span>
              <br />
              <span className="text-white">Games</span>
            </h2>
            <p
              className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
                gamesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Interactive experiences that make learning about{" "}
              <span className="text-blue-400 font-semibold">space science</span>{" "}
              fun and engaging
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={gamesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden ${
                  game.comingSoon ? "opacity-80" : ""
                }`}
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

                {/* Coming Soon Badge */}
                {game.comingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs font-medium text-yellow-400 backdrop-blur-sm">
                    Coming Soon
                  </div>
                )}

                <div className="relative z-10 space-y-6">
                  {/* Game Icon and Title */}
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-600/10 group-hover:from-blue-400/20 group-hover:via-purple-400/15 group-hover:to-blue-500/20 transition-all duration-500 group-hover:scale-110">
                      <div className="text-4xl transition-all duration-300 group-hover:drop-shadow-lg">
                        {game.icon}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {game.title}
                      </h3>
                      <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        {game.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 text-sm leading-relaxed transition-colors duration-300">
                    {game.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {game.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-gray-400 group-hover:text-gray-300 text-sm flex items-start transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 mt-1.5 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Game Info */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Difficulty: {game.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>{game.players}</span>
                    </div>
                  </div>

                  {/* Play Button */}
                  {game.comingSoon ? (
                    <div className="w-full px-4 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-xl text-gray-400 font-medium text-center backdrop-blur-sm cursor-not-allowed">
                      Coming Soon
                    </div>
                  ) : (
                    <Link href={`/games/${game.id}`}>
                      <button className="group/btn relative w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-white font-medium backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <FaPlay className="text-sm" />
                          <span>Play Now</span>
                          <FaArrowRight className="text-xs opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
                        </span>
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

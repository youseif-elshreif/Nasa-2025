"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaSatellite,
  FaRocket,
  FaPlay,
  FaTrophy,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

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
      id: "satellite-game",
      title: "TerraQuest",
      subtitle: "Satellite Data Explorer",
      description: "Pilot Terra satellite and collect data from its 5 amazing instruments. Learn about Earth's climate while having fun!",
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
      description: "Analyze climate data and discover patterns in Earth's changing environment. Coming soon...",
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
        className="relative min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black text-white overflow-hidden flex items-center"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {[...Array(120)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: Math.random() * 3 + 1 + "px",
                  height: Math.random() * 3 + 1 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  animationDuration: (Math.random() * 2 + 2) + "s",
                  opacity: Math.random() * 0.8 + 0.2,
                }}
              />
            ))}
          </div>

          {/* Moving nebulas */}
          <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-500/8 via-purple-500/12 to-cyan-500/8 blur-3xl rounded-full -top-20 -right-20 animate-float"></div>
          <div 
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-500/6 via-indigo-500/10 to-blue-500/6 blur-3xl rounded-full -bottom-20 -left-20 animate-float"
            style={{ animationDelay: "3s", animationDirection: "reverse" }}
          ></div>
          <div 
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/4 via-blue-500/8 to-purple-500/4 blur-3xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
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
              {/* Game controller icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                    <FaGamepad className="text-5xl text-blue-400" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Space
                </span>
                <br />
                <span className="text-white">Games</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore the cosmos through interactive games and learn about NASA&apos;s Terra satellite mission
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6 pt-8"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                  <FaTrophy className="text-yellow-400" />
                  <span className="text-gray-300">Educational & Fun</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
                  <FaUsers className="text-cyan-400" />
                  <span className="text-gray-300">Interactive Learning</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section
        ref={gamesRef}
        className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-black via-blue-900/10 to-black text-white overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Scattered stars */}
          <div className="absolute inset-0">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: Math.random() * 2 + 1 + "px",
                  height: Math.random() * 2 + 1 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 4 + "s",
                  animationDuration: (Math.random() * 3 + 2) + "s",
                  opacity: Math.random() * 0.6 + 0.2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={gamesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Available
              </span>
              <br />
              <span className="text-white">Games</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive experiences that make learning about space science fun and engaging
            </p>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={gamesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer overflow-hidden ${
                  game.comingSoon ? 'opacity-75' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(59,130,246,0.04) 100%)`,
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Enhanced glow effects */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${game.gradient} blur-xl`}></div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${game.gradient}`}></div>
                </div>

                {/* Border glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border bg-gradient-to-r ${game.borderGradient}`}></div>

                {/* Coming Soon Badge */}
                {game.comingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs font-medium text-yellow-400 backdrop-blur-sm">
                    Coming Soon
                  </div>
                )}

                <div className="relative z-10 space-y-6">
                  {/* Game Icon and Title */}
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.gradient} group-hover:${game.hoverGradient} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                      {game.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {game.title}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium">{game.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                    {game.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {game.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-gray-400 group-hover:text-gray-300 text-sm flex items-center transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Game Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
                      <span className="text-blue-400">Difficulty:</span>
                      <span className="text-gray-300">{game.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full border border-purple-500/20">
                      <span className="text-purple-400">Players:</span>
                      <span className="text-gray-300">{game.players}</span>
                    </div>
                  </div>

                  {/* Play Button */}
                  {game.comingSoon ? (
                    <div className="w-full px-6 py-4 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-xl text-gray-400 font-medium text-center backdrop-blur-sm cursor-not-allowed">
                      Coming Soon
                    </div>
                  ) : (
                    <Link href={`/games/${game.id}`}>
                      <button className={`group/btn relative w-full px-6 py-4 bg-gradient-to-r ${game.buttonGradient} hover:${game.hoverGradient} border bg-gradient-to-r ${game.borderGradient} hover:border-opacity-75 rounded-xl text-white font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${game.gradient} rounded-xl blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <FaPlay className="text-lg" />
                          <span>Play Now</span>
                          <FaArrowRight className="text-sm opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
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
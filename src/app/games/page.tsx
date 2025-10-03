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
                  animationDuration: Math.random() * 2 + 2 + "s",
                  opacity: Math.random() * 0.8 + 0.2,
                }}
              />
            ))}
          </div>

          {/* Enhanced Moving nebulas */}
          <div className="absolute w-[900px] h-[900px] bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10 blur-3xl rounded-full -top-32 -right-32 animate-float"></div>
          <div
            className="absolute w-[700px] h-[700px] bg-gradient-to-r from-purple-500/8 via-indigo-500/12 to-blue-500/8 blur-3xl rounded-full -bottom-32 -left-32 animate-float"
            style={{ animationDelay: "3s", animationDirection: "reverse" }}
          ></div>
          <div
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/6 via-blue-500/10 to-purple-500/6 blur-3xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-500/4 via-purple-500/8 to-indigo-500/4 blur-3xl rounded-full top-1/4 right-1/4 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute w-[350px] h-[350px] bg-gradient-to-r from-emerald-500/3 via-cyan-500/6 to-blue-500/3 blur-3xl rounded-full bottom-1/4 left-1/4 animate-float"
            style={{ animationDelay: "2.5s", animationDirection: "reverse" }}
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
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 via-purple-500/25 to-cyan-500/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-blue-400/40 shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <FaGamepad className="text-6xl text-blue-300 drop-shadow-2xl group-hover:text-cyan-300 transition-colors duration-500" />
                  </div>

                  {/* Multiple glow layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-3xl blur-2xl animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/15 to-purple-500/10 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating particles */}
                  <div
                    className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-60"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Space
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-lg">
                  Games
                </span>
              </h1>

              <div className="relative">
                <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-2">
                  Explore the cosmos through interactive games and learn about
                  <span className="text-cyan-300 font-semibold">
                    {" "}
                    NASA&apos;s Terra satellite
                  </span>{" "}
                  mission
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6 pt-8"
              >
                <div className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-yellow-500/15 via-orange-500/20 to-yellow-500/15 rounded-2xl border border-yellow-400/30 backdrop-blur-xl hover:border-yellow-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20">
                  <div className="relative">
                    <FaTrophy className="text-2xl text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-yellow-400/20 blur-lg rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-200 font-semibold group-hover:text-white transition-colors duration-300">
                    Educational & Fun
                  </span>
                </div>

                <div className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-500/15 via-blue-500/20 to-cyan-500/15 rounded-2xl border border-cyan-400/30 backdrop-blur-xl hover:border-cyan-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                  <div className="relative">
                    <FaUsers className="text-2xl text-cyan-300 drop-shadow-lg group-hover:text-cyan-200 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-200 font-semibold group-hover:text-white transition-colors duration-300">
                    Interactive Learning
                  </span>
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
                  animationDuration: Math.random() * 3 + 2 + "s",
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
            className="text-center mb-20"
          >
            <div className="relative inline-block mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Available
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-lg">
                  Games
                </span>
              </h2>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 border-2 border-cyan-400/60 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-purple-400/60 rounded-full animate-pulse"></div>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
                Interactive experiences that make learning about
                <span className="text-cyan-300 font-semibold">
                  {" "}
                  space science
                </span>{" "}
                fun and engaging
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto rounded-full"></div>
            </div>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={gamesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative p-10 rounded-3xl transition-all duration-700 hover:scale-105 cursor-pointer overflow-hidden ${
                  game.comingSoon ? "opacity-80" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(59,130,246,0.06) 100%)`,
                  backdropFilter: "blur(25px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${
                    y / 20
                  }deg) rotateY(${-x / 20}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                }}
              >
                {/* Multiple enhanced glow effects */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${game.gradient} blur-2xl`}
                  ></div>
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${game.gradient} opacity-60`}
                  ></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/5 to-transparent"></div>
                </div>

                {/* Animated border glow */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 border-2 ${game.borderGradient} shadow-2xl`}
                ></div>

                {/* Floating particles */}
                <div
                  className="absolute top-4 right-8 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute top-8 right-4 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Coming Soon Badge */}
                {game.comingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs font-medium text-yellow-400 backdrop-blur-sm">
                    Coming Soon
                  </div>
                )}

                <div className="relative z-10 space-y-8">
                  {/* Enhanced Game Icon and Title */}
                  <div className="flex items-start gap-8">
                    <div className="relative group/icon">
                      <div
                        className={`p-6 rounded-3xl bg-gradient-to-br ${game.gradient} group-hover:${game.hoverGradient} transition-all duration-700 group-hover:scale-110 shadow-2xl border border-white/10`}
                      >
                        <div className="relative z-10">{game.icon}</div>
                      </div>

                      {/* Icon glow effects */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${game.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`}
                      ></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-500 drop-shadow-lg">
                        {game.title}
                      </h3>
                      <p className="text-base text-gray-300 font-medium group-hover:text-gray-200 transition-colors duration-300">
                        {game.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <p className="text-gray-200 group-hover:text-white leading-relaxed text-lg transition-colors duration-300">
                      {game.description}
                    </p>
                  </div>

                  {/* Enhanced Features */}
                  <ul className="space-y-4">
                    {game.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-gray-300 group-hover:text-gray-200 flex items-start transition-all duration-300 hover:translate-x-2"
                      >
                        <div className="relative mt-2 mr-4 flex-shrink-0">
                          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced Game Info */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-2xl border border-blue-400/30 backdrop-blur-sm group-hover:border-blue-300/50 transition-all duration-300">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-300 font-medium">
                        Difficulty:
                      </span>
                      <span className="text-white font-bold">
                        {game.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-2xl border border-purple-400/30 backdrop-blur-sm group-hover:border-purple-300/50 transition-all duration-300">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-purple-300 font-medium">
                        Players:
                      </span>
                      <span className="text-white font-bold">
                        {game.players}
                      </span>
                    </div>
                  </div>

                  {/* Play Button */}
                  {game.comingSoon ? (
                    <div className="w-full px-6 py-4 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-xl text-gray-400 font-medium text-center backdrop-blur-sm cursor-not-allowed">
                      Coming Soon
                    </div>
                  ) : (
                    <Link href={`/games/${game.id}`}>
                      <button
                        className={`group/btn relative w-full px-6 py-4 bg-gradient-to-r ${game.buttonGradient} hover:${game.hoverGradient} border bg-gradient-to-r ${game.borderGradient} hover:border-opacity-75 rounded-xl text-white font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${game.gradient} rounded-xl blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
                        ></div>
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

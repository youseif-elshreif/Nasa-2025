"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  FaSatellite,
  FaTrophy,
  FaBook,
  FaExclamationCircle,
  FaBolt,
} from "react-icons/fa";

const TerraGame = () => {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [collectedData, setCollectedData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showFact, setShowFact] = useState(null);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Touch handling state
  const touchStart = useRef({ x: 0, y: 0 });
  const lastTouchTime = useRef(0);

  const instruments = useMemo(
    () => [
      {
        id: "modis",
        name: "MODIS",
        fullName: "Moderate Resolution Imaging Spectroradiometer",
        icon: "🌍",
        color: "bg-blue-500",
        description: "Captures images of Earth's surface, clouds, and aerosols",
        facts: [
          "MODIS views the entire Earth every 1-2 days and has 36 spectral bands!",
          "MODIS data supports wildfire detection and early warning systems worldwide.",
          "The instrument can detect clouds as small as 250 meters across!",
          "MODIS has tracked Arctic sea ice decline for over two decades.",
          "It captures data at 6.1 Mbps, creating terabytes of Earth data daily.",
          "MODIS imagery is used in weather forecasting around the globe.",
        ],
      },
      {
        id: "ceres",
        name: "CERES",
        fullName: "Clouds and Earth's Radiant Energy System",
        icon: "☀️",
        color: "bg-yellow-500",
        description: "Measures Earth's energy balance and radiation",
        facts: [
          "CERES helps us understand how much solar energy Earth absorbs and reflects.",
          "CERES data revealed Earth's energy imbalance due to climate change.",
          "The instrument measures radiation in three spectral ranges simultaneously.",
          "CERES provided crucial data for IPCC climate assessment reports.",
          "It can detect changes in Earth's energy budget as small as 0.3%.",
          "CERES revealed how clouds affect our planet's temperature balance.",
        ],
      },
      {
        id: "mopitt",
        name: "MOPITT",
        fullName: "Measurements of Pollution in the Troposphere",
        icon: "💨",
        color: "bg-gray-500",
        description: "Monitors carbon monoxide and methane pollution",
        facts: [
          "MOPITT can detect pollution from wildfires and urban areas from space!",
          "It created the first continuous global record of carbon monoxide spanning 25+ years.",
          "MOPITT tracked major wildfire events including Australian bushfires.",
          "The instrument can measure CO from Earth's surface up to 150 hPa altitude.",
          "MOPITT data helped develop air quality policies worldwide.",
          "It revealed seasonal patterns in global atmospheric pollution.",
        ],
      },
      {
        id: "aster",
        name: "ASTER",
        fullName:
          "Advanced Spaceborne Thermal Emission and Reflection Radiometer",
        icon: "🏔️",
        color: "bg-red-500",
        description: "Creates detailed 3D maps of land surface temperature",
        facts: [
          "ASTER can map volcanoes and detect heat signatures from volcanic activity.",
          "It created the most complete global digital elevation model (GDEM).",
          "ASTER monitors hundreds of active volcanoes worldwide.",
          "The instrument can detect objects as small as 15 meters across!",
          "ASTER mapped urban growth in major metropolitan areas globally.",
          "It was built by Japan in cooperation with NASA.",
        ],
      },
      {
        id: "misr",
        name: "MISR",
        fullName: "Multi-angle Imaging SpectroRadiometer",
        icon: "🔭",
        color: "bg-purple-500",
        description:
          "Views Earth from multiple angles to study clouds and aerosols",
        facts: [
          "MISR has 9 cameras pointing at different angles to create 3D views of clouds!",
          "It pioneered 3D atmospheric particle analysis from space.",
          "MISR can measure cloud heights with unprecedented accuracy.",
          "The instrument tracks megacity air pollution in incredible detail.",
          "MISR improved climate model representations of aerosols.",
          "It provides unique 3D information about Earth's atmosphere.",
        ],
      },
    ],
    []
  );

  const [dataPoints, setDataPoints] = useState([]);
  const [satellitePos, setSatellitePos] = useState({ x: 50, y: 20 });
  const [starOffset, setStarOffset] = useState(0);
  const keysPressed = useRef({});
  const touchDirection = useRef({ x: 0, y: 0 });
  const lastComboTime = useRef(Date.now());

  // Animate stars slowly
  useEffect(() => {
    if (gameState === "playing") {
      const starAnimation = setInterval(() => {
        setStarOffset((prev) => (prev + 0.01) % 100);
      }, 300);
      return () => clearInterval(starAnimation);
    }
  }, [gameState]);

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      if (score > highScore) {
        setHighScore(score);
      }
      setGameState("complete");
    }
  }, [gameState, timeLeft, score, highScore]);

  // Spawn data points
  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        const randomInstrument =
          instruments[Math.floor(Math.random() * instruments.length)];
        setDataPoints((prev) => {
          if (prev.length < 8) {
            return [
              ...prev,
              {
                id: Date.now() + Math.random(),
                instrument: randomInstrument,
                x: Math.random() * 80 + 10,
                y: Math.random() * 60 + 25,
                collected: false,
              },
            ];
          }
          return prev;
        });
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [gameState, instruments]);

  // Enhanced movement with 8 directions
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    const moveInterval = setInterval(() => {
      setSatellitePos((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 0.8;

        // Keyboard movement
        if (keysPressed.current["ArrowLeft"]) newX -= speed;
        if (keysPressed.current["ArrowRight"]) newX += speed;
        if (keysPressed.current["ArrowUp"]) newY -= speed;
        if (keysPressed.current["ArrowDown"]) newY += speed;

        // Touch movement
        if (touchDirection.current.x !== 0 || touchDirection.current.y !== 0) {
          const touchSpeed = speed * 1.2; // Slightly faster for touch
          newX += touchDirection.current.x * touchSpeed;
          newY += touchDirection.current.y * touchSpeed;
        }

        // Boundary checking
        newX = Math.max(3, Math.min(97, newX));
        newY = Math.max(3, Math.min(87, newY));

        return { x: newX, y: newY };
      });
    }, 16);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(moveInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Combo reset timer
  useEffect(() => {
    if (gameState === "playing") {
      const comboTimer = setInterval(() => {
        if (Date.now() - lastComboTime.current > 3000) {
          setCombo(0);
        }
      }, 500);
      return () => clearInterval(comboTimer);
    }
  }, [gameState]);

  // Collision detection
  useEffect(() => {
    if (gameState === "playing") {
      setDataPoints((prev) => {
        return prev.filter((point) => {
          const distance = Math.sqrt(
            Math.pow(satellitePos.x - point.x, 2) +
              Math.pow(satellitePos.y - point.y, 2)
          );

          if (distance < 6 && !point.collected) {
            const comboBonus = combo * 5;
            const scoreGain = 10 + comboBonus;
            setScore((s) => s + scoreGain);
            setCollectedData((c) => [...c, point.instrument.id]);
            setCombo((c) => c + 1);
            lastComboTime.current = Date.now();

            // اختيار فاكت عشوائي من مجموعة الفاكتس الخاصة بالأداة
            const randomFact =
              point.instrument.facts[
                Math.floor(Math.random() * point.instrument.facts.length)
              ];
            setShowFact({
              ...point.instrument,
              fact: randomFact,
            });
            setTimeout(() => setShowFact(null), 12000);
            return false;
          }
          return true;
        });
      });
    }
  }, [satellitePos, gameState, combo]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(60);
    setCollectedData([]);
    setDataPoints([]);
    setSatellitePos({ x: 50, y: 20 });
    setCombo(0);
    keysPressed.current = {};
  }, []);

  if (gameState === "menu") {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Space Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
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

          {/* Moving nebulas */}
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/8 via-purple-500/12 to-cyan-500/8 blur-3xl rounded-full -top-20 -right-20 animate-float"></div>
          <div
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500/6 via-indigo-500/10 to-blue-500/6 blur-3xl rounded-full -bottom-20 -left-20 animate-float"
            style={{ animationDelay: "3s", animationDirection: "reverse" }}
          ></div>
        </div>

        {/* Game Menu Card */}
        <div
          className="relative z-10 max-w-2xl w-full mx-4 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(59,130,246,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-50 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 blur-xl"></div>

          {/* Content */}
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              {/* Enhanced Satellite Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <FaSatellite className="w-12 h-12 text-blue-400 drop-shadow-lg" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl animate-pulse"></div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                TerraQuest
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Satellite Data Explorer
              </p>

              {highScore > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full backdrop-blur-sm">
                  <FaTrophy className="text-yellow-400" />
                  <span className="font-bold text-yellow-300">
                    High Score: {highScore}
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Game Description */}
            <div className="relative bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/30 rounded-2xl p-8 mb-8 backdrop-blur-xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Main content */}
              <div className="relative z-10">
                {/* Icon and title */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <FaSatellite className="w-8 h-8 text-blue-400 drop-shadow-lg" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl animate-pulse"></div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                      Terra Mission
                    </h2>
                    <p className="text-gray-300 font-medium">
                      Explore NASA&apos;s Earth Observation Satellite
                    </p>
                  </div>
                </div>

                {/* Mission highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="text-sm font-bold text-blue-300">
                        Earth Observer
                      </p>
                      <p className="text-xs text-gray-400">Since 1999</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <span className="text-2xl">🛰️</span>
                    <div>
                      <p className="text-sm font-bold text-purple-300">
                        5 Instruments
                      </p>
                      <p className="text-xs text-gray-400">Advanced Sensors</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="text-sm font-bold text-cyan-300">
                        Climate Data
                      </p>
                      <p className="text-xs text-gray-400">
                        Real-time Monitoring
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={startGame}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-white font-bold text-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FaSatellite className="text-2xl" />
                  Start Mission
                </span>
              </button>

              <button
                onClick={() => setGameState("info")}
                className="group relative w-full px-6 py-3 bg-gradient-to-r from-gray-500/10 to-gray-600/10 hover:from-gray-500/20 hover:to-gray-600/20 border border-gray-500/20 hover:border-gray-400/30 rounded-xl text-gray-300 hover:text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FaBook className="text-lg" />
                  Learn More About Terra
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "info") {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black overflow-auto p-4 relative">
        {/* Space Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Animated stars */}
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
                  animationDelay: Math.random() * 3 + "s",
                  animationDuration: Math.random() * 2 + 2 + "s",
                  opacity: Math.random() * 0.7 + 0.2,
                }}
              />
            ))}
          </div>

          {/* Moving nebulas */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/6 via-purple-500/8 to-cyan-500/6 blur-3xl rounded-full top-20 right-20 animate-float"></div>
          <div
            className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/4 via-indigo-500/6 to-blue-500/4 blur-3xl rounded-full bottom-20 left-20 animate-float"
            style={{ animationDelay: "2s", animationDirection: "reverse" }}
          ></div>
        </div>

        <div
          className="relative z-10 max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(59,130,246,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-30 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 blur-xl"></div>

          <div className="relative z-10 p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              About NASA&apos;s Terra Satellite
            </h1>

            <div className="space-y-6">
              {/* Mission Overview */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Mission Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Terra (EOS AM-1) is a flagship satellite launched by NASA in
                  December 1999. It&apos;s part of the Earth Observing System
                  (EOS) and orbits 705 km above Earth, passing over the equator
                  at 10:30 AM local time. Terra completes an orbit every 99
                  minutes, viewing the entire Earth every 16 days.
                </p>
              </div>

              {/* Instruments Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {instruments.map((inst) => (
                  <div
                    key={inst.id}
                    className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-blue-400/30 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{inst.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{inst.name}</h3>
                        <p className="text-xs text-gray-400">{inst.fullName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                      {inst.description}
                    </p>
                    <div className="space-y-2">
                      {inst.facts.slice(0, 2).map((fact, factIndex) => (
                        <p
                          key={factIndex}
                          className="text-xs text-blue-300 italic border-l-2 border-blue-400/30 pl-3"
                        >
                          {fact}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Terra Matters */}
              <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Why Terra Matters
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-lg">✓</span>
                    <span>
                      Monitors climate change and global warming trends
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-lg">✓</span>
                    <span>
                      Tracks deforestation, wildfires, and land use changes
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-lg">✓</span>
                    <span>Studies ocean temperatures and cloud formations</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-lg">✓</span>
                    <span>
                      Measures air pollution and atmospheric composition
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setGameState("menu")}
              className="group relative mt-8 w-full px-6 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-white font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Back to Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "complete") {
    const uniqueInstruments = new Set(collectedData).size;
    const completionRate = (
      (uniqueInstruments / instruments.length) *
      100
    ).toFixed(0);

    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Space Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
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

          {/* Celebration nebulas */}
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-yellow-500/8 via-orange-500/12 to-red-500/8 blur-3xl rounded-full -top-20 -right-20 animate-pulse"></div>
          <div
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-500/6 via-pink-500/10 to-blue-500/6 blur-3xl rounded-full -bottom-20 -left-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div
          className="relative z-10 max-w-2xl w-full mx-4 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(59,130,246,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Celebration glow */}
          <div className="absolute inset-0 rounded-2xl opacity-60 bg-gradient-to-r from-yellow-500/10 via-orange-500/8 to-yellow-500/10 blur-xl animate-pulse"></div>

          <div className="relative z-10 p-8 text-center">
            {/* Trophy with enhanced styling */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-yellow-500/30 animate-pulse">
                  <FaTrophy className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Mission Complete!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Great job exploring Earth!
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-3xl font-bold text-blue-400 mb-1">{score}</p>
                <p className="text-gray-300 text-sm">Final Score</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-3xl font-bold text-green-400 mb-1">
                  {uniqueInstruments}/5
                </p>
                <p className="text-gray-300 text-sm">Instruments</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-3xl font-bold text-purple-400 mb-1">
                  {collectedData.length}
                </p>
                <p className="text-gray-300 text-sm">Data Points</p>
              </div>
            </div>

            {/* High Score Badge */}
            {score > highScore && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl p-4 mb-6 backdrop-blur-sm animate-pulse">
                <p className="text-yellow-300 font-bold text-lg">
                  🎉 New High Score! 🎉
                </p>
              </div>
            )}

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="bg-gray-700/50 rounded-full h-6 mb-3 overflow-hidden border border-gray-600/30">
                <div
                  className="bg-gradient-to-r from-blue-500 via-green-500 to-cyan-500 h-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <p className="text-gray-300 text-center">
                {completionRate}% Instrument Coverage
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={startGame}
                className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-white font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FaSatellite />
                  Play Again
                </span>
              </button>

              <button
                onClick={() => setGameState("menu")}
                className="group relative w-full px-6 py-3 bg-gradient-to-r from-gray-500/10 to-gray-600/10 hover:from-gray-500/20 hover:to-gray-600/20 border border-gray-500/20 hover:border-gray-400/30 rounded-xl text-gray-300 hover:text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Back to Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black via-blue-900/30 to-black relative overflow-hidden">
      {/* Enhanced Stars background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: `calc(${Math.random() * 100}% + ${starOffset}px)`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 2 + 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/6 via-purple-500/8 to-cyan-500/6 blur-3xl rounded-full top-20 right-20 animate-float"></div>
      <div
        className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/4 via-indigo-500/6 to-blue-500/4 blur-3xl rounded-full bottom-20 left-20 animate-float"
        style={{ animationDelay: "2s", animationDirection: "reverse" }}
      ></div>

      {/* Enhanced HUD */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-xl border-b border-white/10 text-white p-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* Score */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full backdrop-blur-sm">
              <FaTrophy className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
              <span className="font-bold text-xl text-yellow-300">{score}</span>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center gap-3 px-4 py-2 bg-gradient-to-r border rounded-full backdrop-blur-sm transition-all duration-300 ${
                timeLeft <= 10
                  ? "from-red-500/30 to-orange-500/30 border-red-500/40 animate-pulse"
                  : "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
              }`}
            >
              <FaExclamationCircle
                className={`w-5 h-5 drop-shadow-lg ${
                  timeLeft <= 10 ? "text-red-400" : "text-cyan-400"
                }`}
              />
              <span
                className={`font-bold text-xl ${
                  timeLeft <= 10 ? "text-red-300" : "text-cyan-300"
                }`}
              >
                {timeLeft}s
              </span>
            </div>

            {/* Combo */}
            {combo > 1 && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-500/40 rounded-full backdrop-blur-sm animate-pulse">
                <FaBolt className="w-4 h-4 text-orange-400 drop-shadow-lg" />
                <span className="font-bold text-orange-300">
                  x{combo} Combo!
                </span>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full backdrop-blur-sm">
            <FaSatellite className="w-4 h-4 text-green-400 drop-shadow-lg" />
            <span className="text-sm text-green-300">
              Collected:{" "}
              <span className="font-bold">{new Set(collectedData).size}/5</span>{" "}
              instruments
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Fact popup */}
      {showFact && (
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 max-w-md z-20 animate-fade-in">
          <div
            className="rounded-xl p-6 backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(59,130,246,0.08) 100%)",
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl opacity-40 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20 blur-xl"></div>

            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <span className="text-3xl">{showFact.icon}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {showFact.name} Collected!
                </p>
                <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-blue-400/40 pl-3">
                  {showFact.fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game area */}
      <div
        className="absolute inset-0 mt-16"
        onTouchStart={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
          lastTouchTime.current = Date.now();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          const deltaX = touch.clientX - touchStart.current.x;
          const deltaY = touch.clientY - touchStart.current.y;
          const minSwipeDistance = 30;

          // Calculate direction based on swipe
          if (
            Math.abs(deltaX) > minSwipeDistance ||
            Math.abs(deltaY) > minSwipeDistance
          ) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              // Horizontal swipe
              touchDirection.current.x = deltaX > 0 ? 1 : -1;
              touchDirection.current.y = 0;
            } else {
              // Vertical swipe
              touchDirection.current.y = deltaY > 0 ? 1 : -1;
              touchDirection.current.x = 0;
            }
          }
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          // Stop movement after a short delay to allow smooth movement
          setTimeout(() => {
            touchDirection.current = { x: 0, y: 0 };
          }, 100);
        }}
      >
        {/* Earth */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-2/3 rounded-t-full bg-gradient-to-b from-blue-400 via-green-400 to-blue-600 opacity-80"
          style={{ maxWidth: "800px" }}
        >
          <div
            className="absolute inset-0 bg-green-600 opacity-20 rounded-t-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, transparent 10%, rgba(34, 197, 94, 0.3) 10%, rgba(34, 197, 94, 0.3) 15%, transparent 15%),
                             radial-gradient(circle at 60% 30%, transparent 8%, rgba(34, 197, 94, 0.4) 8%, rgba(34, 197, 94, 0.4) 12%, transparent 12%),
                             radial-gradient(circle at 80% 60%, transparent 15%, rgba(34, 197, 94, 0.3) 15%, rgba(34, 197, 94, 0.3) 20%, transparent 20%)`,
            }}
          />
        </div>

        {/* Enhanced Satellite */}
        <div
          className="absolute z-20"
          style={{
            left: `${satellitePos.x}%`,
            top: `${satellitePos.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "none",
          }}
        >
          <div className="relative">
            <FaSatellite className="w-14 h-14 text-white drop-shadow-2xl relative z-10" />
            {/* Multiple glow layers */}
            <div className="absolute -inset-3 bg-blue-400/40 rounded-full blur-lg animate-pulse" />
            <div className="absolute -inset-2 bg-cyan-400/30 rounded-full blur-md" />
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
          </div>
        </div>

        {/* Enhanced Data points */}
        {dataPoints.map((point) => (
          <div
            key={point.id}
            className="absolute z-10"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: Math.random() * 2 + "s",
            }}
          >
            <div className="relative">
              {/* Data point container */}
              <div
                className={`${point.instrument.color} bg-opacity-90 rounded-full p-4 shadow-2xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110`}
              >
                <span className="text-2xl drop-shadow-lg">
                  {point.instrument.icon}
                </span>
              </div>

              {/* Glow effects */}
              <div
                className={`absolute -inset-2 ${point.instrument.color} opacity-40 rounded-full blur-lg animate-pulse`}
              />
              <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm" />

              {/* Pulsing ring */}
              <div className="absolute -inset-4 border-2 border-white/20 rounded-full animate-ping" />
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className="px-6 py-3 rounded-full backdrop-blur-xl border border-white/20 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.08) 100%)",
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20 blur-lg"></div>

          <p className="relative z-10 text-sm text-gray-300 font-medium">
            <span className="text-blue-400 hidden md:inline">↑↓←→</span>
            <span className="text-blue-400 md:hidden">� Swipe</span> Move
            Satellite •<span className="text-purple-400 mx-2">🛰️</span> Collect
            Data •<span className="text-orange-400">⚡</span> Build Combos!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerraGame;

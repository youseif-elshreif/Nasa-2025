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

type GameState = "menu" | "info" | "playing" | "complete";

interface Position {
  x: number;
  y: number;
}

interface Instrument {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  color: string;
  description: string;
  fact: string;
}

interface DataPoint {
  id: number;
  instrument: Instrument;
  x: number;
  y: number;
  collected: boolean;
}

interface KeysPressed {
  [key: string]: boolean;
}

const TerraGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [score, setScore] = useState<number>(0);
  const [collectedData, setCollectedData] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showFact, setShowFact] = useState<Instrument | null>(null);
  const [combo, setCombo] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const instruments: Instrument[] = useMemo(
    () => [
      {
        id: "modis",
        name: "MODIS",
        fullName: "Moderate Resolution Imaging Spectroradiometer",
        icon: "🌍",
        color: "bg-blue-500",
        description: "Captures images of Earth's surface, clouds, and aerosols",
        fact: "MODIS views the entire Earth every 1-2 days and has 36 spectral bands!",
      },
      {
        id: "ceres",
        name: "CERES",
        fullName: "Clouds and Earth's Radiant Energy System",
        icon: "☀️",
        color: "bg-yellow-500",
        description: "Measures Earth's energy balance and radiation",
        fact: "CERES helps us understand how much solar energy Earth absorbs and reflects.",
      },
      {
        id: "mopitt",
        name: "MOPITT",
        fullName: "Measurements of Pollution in the Troposphere",
        icon: "💨",
        color: "bg-gray-500",
        description: "Monitors carbon monoxide and methane pollution",
        fact: "MOPITT can detect pollution from wildfires and urban areas from space!",
      },
      {
        id: "aster",
        name: "ASTER",
        fullName:
          "Advanced Spaceborne Thermal Emission and Reflection Radiometer",
        icon: "🏔️",
        color: "bg-red-500",
        description: "Creates detailed 3D maps of land surface temperature",
        fact: "ASTER can map volcanoes and detect heat signatures from volcanic activity.",
      },
      {
        id: "misr",
        name: "MISR",
        fullName: "Multi-angle Imaging SpectroRadiometer",
        icon: "🔭",
        color: "bg-purple-500",
        description:
          "Views Earth from multiple angles to study clouds and aerosols",
        fact: "MISR has 9 cameras pointing at different angles to create 3D views of clouds!",
      },
    ],
    []
  );

  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [satellitePos, setSatellitePos] = useState<Position>({ x: 50, y: 20 });
  const [starOffset, setStarOffset] = useState<number>(0);
  const keysPressed = useRef<KeysPressed>({});
  const lastComboTime = useRef<number>(Date.now());

  // Animate stars slowly
  useEffect(() => {
    if (gameState === "playing") {
      const starAnimation = setInterval(() => {
        setStarOffset((prev) => (prev + 0.1) % 100);
      }, 200);
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
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [gameState, instruments]);

  // Enhanced movement with 8 directions
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    const moveInterval = setInterval(() => {
      setSatellitePos((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 0.5;

        // Diagonal and cardinal movement
        if (keysPressed.current["ArrowLeft"]) newX -= speed;
        if (keysPressed.current["ArrowRight"]) newX += speed;
        if (keysPressed.current["ArrowUp"]) newY -= speed;
        if (keysPressed.current["ArrowDown"]) newY += speed;

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
            setShowFact(point.instrument);
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
      <div className="w-full h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <FaSatellite className="w-20 h-20 mx-auto mb-4 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              TerraQuest
            </h1>
            <p className="text-xl text-gray-600">Satellite Data Explorer</p>
            {highScore > 0 && (
              <div className="mt-3 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                <span className="font-bold">High Score: {highScore}</span>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Learn About NASA&apos;s Terra Satellite!
            </h2>
            <p className="text-gray-700 mb-4">
              Terra was launched in 1999 and orbits Earth collecting vital
              climate data. Use arrow keys to pilot the satellite and collect
              data from its 5 amazing instruments!
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {instruments.map((inst) => (
                <div
                  key={inst.id}
                  className="flex items-center gap-2 bg-white p-2 rounded"
                >
                  <span className="text-2xl">{inst.icon}</span>
                  <span className="font-semibold text-gray-700">
                    {inst.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            Start Mission
          </button>

          <button
            onClick={() => setGameState("info")}
            className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaBook className="w-5 h-5" />
            Learn More About Terra
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "info") {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-blue-600 overflow-auto p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 my-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            About NASA&apos;s Terra Satellite
          </h1>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Mission Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Terra (EOS AM-1) is a flagship satellite launched by NASA in
                December 1999. It&apos;s part of the Earth Observing System
                (EOS) and orbits 705 km above Earth, passing over the equator at
                10:30 AM local time. Terra completes an orbit every 99 minutes,
                viewing the entire Earth every 16 days.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {instruments.map((inst) => (
                <div
                  key={inst.id}
                  className={`${inst.color} bg-opacity-10 rounded-lg p-5 border-l-4 ${inst.color}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{inst.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{inst.name}</h3>
                      <p className="text-xs text-gray-600">{inst.fullName}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {inst.description}
                  </p>
                  <p className="text-xs text-gray-600 italic">{inst.fact}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Why Terra Matters
              </h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Monitors climate change and global warming trends</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    Tracks deforestation, wildfires, and land use changes
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Studies ocean temperatures and cloud formations</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    Measures air pollution and atmospheric composition
                  </span>
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setGameState("menu")}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Menu
          </button>
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
      <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <FaTrophy className="w-24 h-24 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Mission Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Great job exploring Earth!
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-blue-600">{score}</p>
                <p className="text-gray-600 text-sm">Final Score</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-green-600">
                  {uniqueInstruments}/5
                </p>
                <p className="text-gray-600 text-sm">Instruments</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-600">
                  {collectedData.length}
                </p>
                <p className="text-gray-600 text-sm">Data Points</p>
              </div>
            </div>

            {score > highScore && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 font-bold">
                  🎉 New High Score! 🎉
                </p>
              </div>
            )}

            <div className="bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-gray-600 mb-6">
              {completionRate}% Instrument Coverage
            </p>

            <div className="space-y-3">
              <button
                onClick={startGame}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => setGameState("menu")}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black via-blue-900 to-blue-700 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: `calc(${Math.random() * 100}% + ${starOffset}px)`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaTrophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-xl">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaExclamationCircle className="w-5 h-5 text-red-400" />
              <span className="font-bold text-xl">{timeLeft}s</span>
            </div>
            {combo > 1 && (
              <div className="flex items-center gap-2 bg-orange-500 bg-opacity-80 px-3 py-1 rounded-full">
                <FaBolt className="w-4 h-4" />
                <span className="font-bold">x{combo} Combo!</span>
              </div>
            )}
          </div>
          <div className="text-sm">
            <p>Collected: {new Set(collectedData).size}/5 instruments</p>
          </div>
        </div>
      </div>

      {/* Fact popup */}
      {showFact && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl p-4 max-w-md z-20">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{showFact.icon}</span>
            <div>
              <p className="font-bold text-gray-800">
                {showFact.name} Collected!
              </p>
              <p className="text-sm text-gray-600">{showFact.fact}</p>
            </div>
          </div>
        </div>
      )}

      {/* Game area */}
      <div className="absolute inset-0 mt-16">
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

        {/* Satellite */}
        <div
          className="absolute"
          style={{
            left: `${satellitePos.x}%`,
            top: `${satellitePos.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "none",
          }}
        >
          <FaSatellite className="w-12 h-12 text-white drop-shadow-lg" />
          <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-30 blur-md" />
        </div>

        {/* Data points */}
        {dataPoints.map((point) => (
          <div
            key={point.id}
            className={`absolute ${point.instrument.color} bg-opacity-80 rounded-full p-3 shadow-lg`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-2xl">{point.instrument.icon}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full text-sm">
        Use Arrow Keys (8 directions) • Collect data • Build combos!
      </div>
    </div>
  );
};

export default TerraGame;

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRedo, FaStar, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  predictEnvironmentalImpact,
  calculateCityMetrics,
} from "@/lib/ai-prediction";

type ElementType = "house" | "factory" | "tree" | "solar" | "wind" | "waste";

interface GameElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
}

interface EnvironmentalStats {
  airQuality: number;
  temperature: number;
  vegetation: number;
  energy: number;
  atmosphere: number;
}

const ELEMENT_TYPES = {
  house: {
    name: "House",
    impact: {
      airQuality: -2,
      temperature: 1,
      vegetation: -1,
      energy: -3,
      atmosphere: -1,
    },
    emoji: "🏠",
    description: "Residential building",
  },
  factory: {
    name: "Factory",
    impact: {
      airQuality: -8,
      temperature: 3,
      vegetation: -2,
      energy: -8,
      atmosphere: -5,
    },
    emoji: "🏭",
    description: "Industrial facility",
  },
  tree: {
    name: "Tree",
    impact: {
      airQuality: 5,
      temperature: -2,
      vegetation: 8,
      energy: 1,
      atmosphere: 4,
    },
    emoji: "🌳",
    description: "Natural vegetation",
  },
  solar: {
    name: "Solar Panel",
    impact: {
      airQuality: 3,
      temperature: -1,
      vegetation: 0,
      energy: 6,
      atmosphere: 3,
    },
    emoji: "☀️",
    description: "Clean energy source",
  },
  wind: {
    name: "Wind Turbine",
    impact: {
      airQuality: 3,
      temperature: 0,
      vegetation: 0,
      energy: 7,
      atmosphere: 3,
    },
    emoji: "💨",
    description: "Renewable energy",
  },
  waste: {
    name: "Waste Dump",
    impact: {
      airQuality: -10,
      temperature: 2,
      vegetation: -5,
      energy: -2,
      atmosphere: -6,
    },
    emoji: "🗑️",
    description: "Waste disposal site",
  },
};

const TERRA_INSTRUMENTS = [
  {
    name: "MODIS",
    stat: "vegetation" as const,
    description: "Monitors vegetation and green cover",
    icon: "🌿",
  },
  {
    name: "MOPITT",
    stat: "airQuality" as const,
    description: "Tracks air quality and carbon monoxide",
    icon: "🌫️",
  },
  {
    name: "CERES",
    stat: "energy" as const,
    description: "Measures energy balance",
    icon: "⚡",
  },
  {
    name: "ASTER",
    stat: "temperature" as const,
    description: "Monitors land surface heat",
    icon: "🌡️",
  },
  {
    name: "MISR",
    stat: "atmosphere" as const,
    description: "Analyzes atmospheric particles",
    icon: "☁️",
  },
];

export default function CityBuilderPage() {
  const [elements, setElements] = useState<GameElement[]>([]);
  const [stats, setStats] = useState<EnvironmentalStats>({
    airQuality: 50,
    temperature: 50,
    vegetation: 50,
    energy: 50,
    atmosphere: 50,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedType, setDraggedType] = useState<ElementType | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Count elements by type
  const getElementCount = (type: ElementType) => {
    return elements.filter((el) => el.type === type).length;
  };

  // Check if can add more of this type
  const canAddElement = (type: ElementType) => {
    return getElementCount(type) < 10;
  };

  const handleDragStart = (type: ElementType, e: React.DragEvent) => {
    if (!canAddElement(type)) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    setDraggedType(type);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedType(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedType && canAddElement(draggedType)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const newElement: GameElement = {
        id: `${draggedType}-${Date.now()}-${Math.random()}`,
        type: draggedType,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
      };
      setElements((prev) => [...prev, newElement]);
    }
    handleDragEnd();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDeleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handlePredictWithAI = async () => {
    if (elements.length === 0) {
      alert("Please add some elements to your city first!");
      return;
    }

    setApiError(null);

    try {
      const metrics = calculateCityMetrics(elements);
      const prediction = await predictEnvironmentalImpact(metrics);

      // Update stats based on API prediction with safe fallbacks
      const aqi =
        prediction.air_quality?.air_quality_index ||
        prediction.air_quality?.aqi ||
        50;
      const airQualityScore = Math.max(0, Math.min(100, 100 - aqi * 0.67)); // Maps 0-150 AQI to 100-0 score

      // Use the overall air quality score from the API (already 0-100)
      const atmosphereScore =
        prediction.scores?.air_quality_score ||
        prediction.scores?.air_quality ||
        50;

      const newStats = {
        airQuality: Math.max(0, Math.min(100, airQualityScore)),
        temperature: Math.max(
          0,
          Math.min(100, 100 - (prediction.temperature?.uhi_intensity || 0) * 10)
        ),
        vegetation: Math.max(
          0,
          Math.min(100, (metrics.vegetation_coverage || 0) * 100)
        ),
        energy: Math.max(
          0,
          Math.min(
            100,
            prediction.energy?.sustainability_score ||
              prediction.energy?.sustainability ||
              50
          )
        ),
        atmosphere: Math.max(0, Math.min(100, atmosphereScore)),
      };

      // Final NaN check
      Object.keys(newStats).forEach((key) => {
        const statKey = key as keyof EnvironmentalStats;
        if (isNaN(newStats[statKey]) || !isFinite(newStats[statKey])) {
          newStats[statKey] = 50;
        }
      });

      setStats(newStats);
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
      setApiError("Unable to connect to prediction server");
      // Fall back to local calculation
      calculateStatsLocally();
    }
  };

  // Fallback local calculation
  const calculateStatsLocally = () => {
    const newStats = {
      airQuality: 50,
      temperature: 50,
      vegetation: 50,
      energy: 50,
      atmosphere: 50,
    };

    elements.forEach((element) => {
      const impact = ELEMENT_TYPES[element.type].impact;
      newStats.airQuality += impact.airQuality;
      newStats.temperature += impact.temperature;
      newStats.vegetation += impact.vegetation;
      newStats.energy += impact.energy;
      newStats.atmosphere += impact.atmosphere;
    });

    // Clamp values between 0 and 100
    Object.keys(newStats).forEach((key) => {
      const statKey = key as keyof EnvironmentalStats;
      newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey]));
      // Ensure no NaN values
      if (isNaN(newStats[statKey])) {
        newStats[statKey] = 50;
      }
    });

    setStats(newStats);
  };

  const handleReset = () => {
    setElements([]);
    setStats({
      airQuality: 50,
      temperature: 50,
      vegetation: 50,
      energy: 50,
      atmosphere: 50,
    });
    setApiError(null);
  };

  // Helper function to safely render numeric values
  const safeNumber = (value: number): number => {
    if (isNaN(value) || !isFinite(value)) {
      return 0;
    }
    return Math.round(value);
  };

  const getStatColor = (value: number) => {
    const safeValue = safeNumber(value);
    if (safeValue >= 70) return "bg-green-500";
    if (safeValue >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getOverallScore = () => {
    const values = Object.values(stats).filter((v) => !isNaN(v) && isFinite(v));
    const average =
      values.length > 0
        ? values.reduce((a, b) => a + b, 0) / values.length
        : 50;
    if (average >= 70)
      return { label: "Excellent", color: "bg-green-500", emoji: "🌟" };
    if (average >= 50)
      return { label: "Good", color: "bg-blue-500", emoji: "👍" };
    if (average >= 30)
      return { label: "Fair", color: "bg-yellow-500", emoji: "⚠️" };
    return { label: "Poor", color: "bg-red-500", emoji: "🚨" };
  };

  const overallScore = getOverallScore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
      {/* Space Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Animated Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 25px 35px, #fff, transparent),
                             radial-gradient(2px 2px at 45px 75px, rgba(255,255,255,0.8), transparent),
                             radial-gradient(1px 1px at 95px 45px, #fff, transparent),
                             radial-gradient(1px 1px at 135px 85px, rgba(255,255,255,0.6), transparent),
                             radial-gradient(3px 3px at 180px 25px, rgba(59,130,246,0.8), transparent),
                             radial-gradient(2px 2px at 220px 90px, rgba(147,51,234,0.6), transparent)`,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 120px",
          }}
        ></div>

        {/* Enhanced Nebulas */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 via-blue-500/15 to-indigo-600/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
        <div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-purple-600/15 blur-3xl rounded-full bottom-20 right-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-[300px] h-[300px] bg-gradient-to-r from-indigo-600/10 to-purple-500/8 blur-2xl rounded-full top-1/2 left-1/3 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl py-8 pt-20">
        {/* Header */}
        <div className="mb-6">
          <Card
            className="backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold">
                    Terra City Builder
                  </CardTitle>
                  <CardDescription className="text-base text-gray-300">
                    Build your city and analyze environmental impact with AI
                  </CardDescription>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handlePredictWithAI}
                    className="group relative px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-white font-bold backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <FaStar className="w-4 h-4" />
                      Start Predict Using AI
                    </span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white font-bold backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FaRedo className="w-4 h-4" />
                      Reset
                    </span>
                  </button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Toolbox */}
          <div className="lg:col-span-3 space-y-6">
            <Card
              className="backdrop-blur-xl border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.08) 100%)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-white">Building Elements</CardTitle>
                <CardDescription className="text-gray-300">
                  Drag elements to your city
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(ELEMENT_TYPES).map(([key, value]) => {
                  const count = getElementCount(key as ElementType);
                  const isMaxed = count >= 10;
                  return (
                    <div
                      key={key}
                      draggable={!isMaxed}
                      onDragStart={(e) =>
                        handleDragStart(key as ElementType, e)
                      }
                      onDragEnd={handleDragEnd}
                      className={`p-3 rounded-lg border transition-all ${
                        isMaxed
                          ? "bg-white/10 border-white/20 cursor-not-allowed opacity-50"
                          : "bg-white/10 hover:bg-white/20 cursor-move border-white/20 hover:border-blue-400/50 hover:scale-102 active:scale-98 hover:shadow-lg hover:shadow-blue-500/25"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{value.emoji}</span>
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {value.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {value.description}
                          </div>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isMaxed
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {count}/10
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Build Area */}
          <div className="lg:col-span-6">
            <Card
              className="h-[600px] backdrop-blur-xl border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.08) 100%)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-white">Your City</CardTitle>
                <CardDescription className="text-gray-300">
                  {isDragging
                    ? "Drop element here to place it"
                    : "Drag elements from the toolbox • Click to remove"}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative w-full h-full rounded-lg border-2 border-dashed transition-all ${
                    isDragging
                      ? "border-blue-400 bg-blue-500/10 border-4 shadow-lg shadow-blue-500/25"
                      : "border-white/30 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10"
                  }`}
                >
                  {elements.length === 0 && !isDragging && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">🏗️</div>
                        <p className="text-sm">
                          Drag elements here to start building
                        </p>
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {elements.map((element) => (
                      <motion.button
                        key={element.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteElement(element.id)}
                        className="absolute text-4xl cursor-pointer hover:brightness-110 transition-all"
                        style={{
                          left: `${element.x}%`,
                          top: `${element.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={`Click to remove ${
                          ELEMENT_TYPES[element.type].name
                        }`}
                      >
                        {ELEMENT_TYPES[element.type].emoji}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-3 space-y-6">
            <Card
              className="backdrop-blur-xl border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.08) 100%)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-white">
                  Terra Satellite Data
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Environmental monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {TERRA_INSTRUMENTS.map((instrument) => {
                  const value = stats[instrument.stat];
                  return (
                    <div key={instrument.name}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{instrument.icon}</span>
                          <span className="text-sm font-medium text-white">
                            {instrument.name}
                          </span>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {safeNumber(value)}
                        </div>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getStatColor(
                            value
                          )} transition-colors`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {instrument.description}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card
              className="backdrop-blur-xl border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.08) 100%)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-white">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl mb-2">{overallScore.emoji}</div>
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${
                      overallScore.label === "Excellent"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : overallScore.label === "Good"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : overallScore.label === "Fair"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {overallScore.label}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Based on {elements.length} element
                    {elements.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </CardContent>
            </Card>

            {apiError && (
              <Card
                className="backdrop-blur-xl border border-red-500/50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05) 50%, rgba(239,68,68,0.08) 100%)",
                }}
              >
                <CardHeader>
                  <CardTitle className="text-red-400">
                    Connection Error
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-red-400">
                    <FaExclamationCircle className="w-5 h-5" />
                    <span className="text-sm">{apiError}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaPlay,
  FaRedo,
  FaTimes,
  FaCheck,
  FaChevronRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import api from "@/utils/api";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface GameStats {
  correct: number;
  total: number;
  currentStreak: number;
  bestStreak: number;
}

type GameState = "menu" | "playing" | "results";
type InstrumentType = "MOPITT" | "CERES" | "MODIS" | "MISR" | "ASTER";

export default function TerraFlashCardGame() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    correct: 0,
    total: 0,
    currentStreak: 0,
    bestStreak: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const instruments = [
    {
      name: "MOPITT" as InstrumentType,
      fullName: "Measurements of Pollution in the Troposphere",
      icon: "🌫️",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "from-orange-500/30 to-red-500/30",
      description: "Measures carbon monoxide and methane in the atmosphere",
    },
    {
      name: "CERES" as InstrumentType,
      fullName: "Clouds and Earth's Radiant Energy System",
      icon: "☀️",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "from-yellow-500/30 to-orange-500/30",
      description: "Studies Earth's energy balance and cloud properties",
    },
    {
      name: "MODIS" as InstrumentType,
      fullName: "Moderate Resolution Imaging Spectroradiometer",
      icon: "🌍",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "from-blue-500/30 to-cyan-500/30",
      description: "Captures detailed images of Earth's surface and atmosphere",
    },
    {
      name: "MISR" as InstrumentType,
      fullName: "Multi-angle Imaging SpectroRadiometer",
      icon: "📐",
      color: "from-purple-500/20 to-indigo-500/20",
      borderColor: "from-purple-500/30 to-indigo-500/30",
      description: "Views Earth from multiple angles for 3D analysis",
    },
    {
      name: "ASTER" as InstrumentType,
      fullName:
        "Advanced Spaceborne Thermal Emission and Reflection Radiometer",
      icon: "🔥",
      color: "from-red-500/20 to-pink-500/20",
      borderColor: "from-red-500/30 to-pink-500/30",
      description: "Measures surface temperature and composition",
    },
  ];

  // Shuffle array function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchQuestions = async (instrument: InstrumentType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/terra/${instrument.toLowerCase()}`);

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        // Shuffle the questions and take up to 10 random ones
        const shuffledQuestions = shuffleArray(
          response.data.data as Question[]
        );
        const maxQuestions = Math.min(10, shuffledQuestions.length);
        const selectedQuestions = shuffledQuestions.slice(0, maxQuestions);
        setQuestions(selectedQuestions);
      } else {
        setError(
          `No questions found for ${instrument}. Please try another instrument.`
        );
      }
    } catch (err: unknown) {
      console.error("Error fetching questions:", err);

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response: { status: number } };
        if (axiosError.response?.status === 404) {
          setError(
            `${instrument} questions not available. The API endpoint might not exist.`
          );
        } else if (axiosError.response?.status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Failed to load ${instrument} questions. Please try again.`);
        }
      } else if (err && typeof err === "object" && "code" in err) {
        const networkError = err as { code: string };
        if (networkError.code === "ECONNREFUSED" || !navigator.onLine) {
          setError(
            "Connection error. Please check your internet connection and try again."
          );
        } else {
          setError(`Failed to load ${instrument} questions. Please try again.`);
        }
      } else {
        setError(`Failed to load ${instrument} questions. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const startGame = async (instrument: InstrumentType) => {
    setSelectedInstrument(instrument);
    setError(null);
    setCurrentQuestionIndex(0);
    setGameStats({ correct: 0, total: 0, currentStreak: 0, bestStreak: 0 });
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFlipped(false);

    setGameState("playing");
    await fetchQuestions(instrument);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer || showResult) return;

    setSelectedAnswer(answer);
    setIsFlipped(true);
    setShowResult(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct;

    setGameStats((prev) => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
      bestStreak: Math.max(
        prev.bestStreak,
        isCorrect ? prev.currentStreak + 1 : prev.currentStreak
      ),
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsFlipped(false);
    } else {
      setGameState("results");
    }
  };

  const resetGame = () => {
    setGameState("menu");
    setSelectedInstrument(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFlipped(false);
    setError(null);
    setQuestions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 via-blue-500/15 to-indigo-600/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-purple-600/15 blur-3xl rounded-full bottom-20 right-10 animate-pulse"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                  <span className="text-3xl">🎯</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              Terra Flash Cards
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Test your knowledge about Terra&apos;s instruments with
              interactive flash cards
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 mb-8">
              <p className="text-blue-300 text-sm text-center">
                🎲 Each quiz contains up to 10 random questions • New questions
                every time!
              </p>
            </div>
          </motion.div>

          {/* Instrument Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-300">
              Choose an Instrument to Study
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instruments.map((instrument, index) => (
                <motion.button
                  key={instrument.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame(instrument.name)}
                  disabled={loading}
                  className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-blue-500/25"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${instrument.color.replace(
                      "/20",
                      "/10"
                    )}, rgba(255,255,255,0.02))`,
                    borderImage: `linear-gradient(135deg, ${instrument.borderColor}) 1`,
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${instrument.borderColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-4 text-center">
                      {instrument.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 text-center">
                      {instrument.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 text-center line-clamp-2">
                      {instrument.description}
                    </p>
                    <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span className="text-sm font-medium">
                            Loading...
                          </span>
                        </>
                      ) : (
                        <>
                          <FaPlay className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            Start Quiz
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
    // Loading state
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/15 via-blue-500/10 to-indigo-600/15 blur-3xl rounded-full top-20 left-20 animate-pulse"></div>
          </div>
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-blue-300 mb-2">
                Loading {selectedInstrument} Questions...
              </h2>
              <p className="text-gray-400">
                Please wait while we fetch the questions from our database.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-red-600/15 via-orange-500/10 to-red-600/15 blur-3xl rounded-full top-20 left-20 animate-pulse"></div>
          </div>
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">{error}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => fetchQuestions(selectedInstrument!)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaRedo className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Menu
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    // No questions state
    if (!currentQuestion || questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
          </div>
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                No Questions Available
              </h2>
              <p className="text-gray-300 mb-8">
                We couldn&apos;t find any questions for {selectedInstrument}.
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Game playing state with questions
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/15 via-blue-500/10 to-indigo-600/15 blur-3xl rounded-full top-20 left-20 animate-pulse"></div>
          <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-purple-600/10 blur-3xl rounded-full bottom-20 right-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Menu</span>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-300">
                {selectedInstrument}
              </h2>
              <p className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-xl font-bold text-green-400">
                {gameStats.correct}/10
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Flash Card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto perspective-1000">
              <motion.div
                className="relative w-full h-96 preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of Card - Question */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl backdrop-blur-xl border border-white/20 p-8 flex flex-col justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-8 text-center leading-relaxed">
                    {currentQuestion.question}
                  </h3>

                  <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSelect(option.charAt(0))}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                          selectedAnswer === option.charAt(0)
                            ? selectedAnswer === currentQuestion.correct
                              ? "bg-green-500/20 border-green-500/50 text-green-300"
                              : "bg-red-500/20 border-red-500/50 text-red-300"
                            : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
                        }`}
                      >
                        <span className="font-medium">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Back of Card - Result */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl backdrop-blur-xl border border-white/20 p-8 flex flex-col justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-center mb-6">
                    {selectedAnswer === currentQuestion.correct ? (
                      <div className="mb-4">
                        <FaCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-green-400 mb-2">
                          Correct!
                        </h3>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <FaTimes className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-red-400 mb-2">
                          Incorrect
                        </h3>
                        <p className="text-white">
                          The correct answer was:{" "}
                          <span className="font-bold text-green-400">
                            {currentQuestion.correct}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/10 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-blue-300 mb-2">
                      Explanation:
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <button
                    onClick={nextQuestion}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        Next Question <FaChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        See Results <FaChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "results") {
    const percentage = Math.round((gameStats.correct / gameStats.total) * 100);
    const getGrade = () => {
      if (percentage >= 90)
        return {
          grade: "A+",
          color: "text-green-400",
          message: "Outstanding!",
        };
      if (percentage >= 80)
        return { grade: "A", color: "text-green-400", message: "Excellent!" };
      if (percentage >= 70)
        return { grade: "B", color: "text-blue-400", message: "Good job!" };
      if (percentage >= 60)
        return { grade: "C", color: "text-yellow-400", message: "Not bad!" };
      return { grade: "D", color: "text-red-400", message: "Keep studying!" };
    };

    const gradeInfo = getGrade();

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 via-blue-500/15 to-indigo-600/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-purple-600/15 blur-3xl rounded-full bottom-20 right-10 animate-pulse"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto text-center"
          >
            {/* Results Card */}
            <div
              className="backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
              }}
            >
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                  Quiz Complete!
                </h1>
                <h2 className="text-2xl text-blue-300 mb-2">
                  {selectedInstrument}
                </h2>
              </div>

              {/* Grade */}
              <div className="mb-8">
                <div className={`text-8xl font-bold ${gradeInfo.color} mb-4`}>
                  {gradeInfo.grade}
                </div>
                <p className="text-2xl text-gray-300 mb-2">
                  {gradeInfo.message}
                </p>
                <p className="text-xl text-gray-400">{percentage}% Score</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400">
                    {gameStats.correct}
                  </div>
                  <div className="text-sm text-gray-400">Correct</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-400">
                    {gameStats.total - gameStats.correct}
                  </div>
                  <div className="text-sm text-gray-400">Incorrect</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-400">
                    {gameStats.bestStreak}
                  </div>
                  <div className="text-sm text-gray-400">Best Streak</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => startGame(selectedInstrument!)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaRedo className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Menu
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}

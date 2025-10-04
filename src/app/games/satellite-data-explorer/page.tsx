"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaSatellite, FaGamepad } from "react-icons/fa";
import Link from "next/link";
import TerraGame from "@/components/TerraGame.js";

export default function SatelliteGamePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a] flex items-center justify-center">
        {/* Enhanced Space Background */}
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
                               radial-gradient(3px 3px at 180px 25px, rgba(59,130,246,0.8), transparent)`,
              backgroundRepeat: "repeat",
              backgroundSize: "250px 120px",
            }}
          ></div>

          {/* Enhanced Nebulas */}
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/25 via-blue-500/20 to-indigo-600/25 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
          <div
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-purple-600/20 blur-3xl rounded-full bottom-20 right-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <FaSatellite
              className="w-20 h-20 mx-auto text-blue-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              TerraQuest
            </span>
          </h1>

          <p
            className="text-gray-300 text-lg animate-slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            Preparing your space mission...
          </p>

          {/* Loading Bar */}
          <div
            className="mt-8 w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden animate-slide-up"
            style={{ animationDelay: "1s" }}
          >
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1428] to-[#0b1a2a]">
      {/* Enhanced Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 pt-[75px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          {/* Back Button */}
          <Link
            href="/"
            className="group flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 "
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Game Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaGamepad className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                TerraQuest
              </h1>
              <p className="text-xs text-gray-400">Satellite Data Explorer</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-medium">
              Game Ready
            </span>
          </div>
        </div>
      </header>

      {/* Game Container */}
      <main className="relative">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0">
          {/* Animated Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulse"></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(2px 2px at 25px 35px, #fff, transparent),
                               radial-gradient(2px 2px at 45px 75px, rgba(255,255,255,0.6), transparent),
                               radial-gradient(1px 1px at 95px 45px, #fff, transparent),
                               radial-gradient(1px 1px at 135px 85px, rgba(255,255,255,0.4), transparent)`,
              backgroundRepeat: "repeat",
              backgroundSize: "250px 120px",
            }}
          ></div>

          {/* Enhanced Nebulas */}
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/15 via-blue-500/10 to-indigo-600/15 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
          <div
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 via-cyan-500/8 to-purple-600/10 blur-3xl rounded-full bottom-20 right-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Game Content */}
        <div className="relative z-10">
          <TerraGame />
        </div>
      </main>
    </div>
  );
}

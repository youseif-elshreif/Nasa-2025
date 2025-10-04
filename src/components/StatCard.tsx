"use client";

import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface StatCardProps {
  value: string | number;
  label: string;
  unit?: string;
  description?: string;
  delay?: number;
}

export default function StatCard({
  value,
  label,
  unit = "",
  description,
  delay = 0,
}: StatCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative group"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg border border-white/8 hover:scale-105 transition-all duration-300 hover:bg-white/8 animate-fade-in-up">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20 blur-xl -z-10"></div>

        <div className="relative z-10">
          {/* Value */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2">
            {value}
            {unit && (
              <span className="text-lg sm:text-xl text-blue-300/80 ml-1">
                {unit}
              </span>
            )}
          </div>

          {/* Label and Info */}
          <div className="flex items-center gap-2">
            <h3 className="text-gray-300 font-medium text-sm md:text-base">
              {label}
            </h3>

            {description && (
              <div className="relative">
                <button
                  className="text-blue-400/60 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-full p-1"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  aria-label={`More information about ${label}`}
                  aria-describedby={`tooltip-${label
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <FaInfoCircle className="text-xs" />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div
                    id={`tooltip-${label.replace(/\s+/g, "-").toLowerCase()}`}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900/95 backdrop-blur-sm text-gray-200 text-xs rounded-lg shadow-xl border border-gray-700/50 z-20"
                    role="tooltip"
                  >
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                    {description}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

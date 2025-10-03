"use client";

import { useState } from "react";
import { TIMELINE } from "../data/terra";

export default function MissionTimeline() {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  return (
    <div className="w-full" role="region" aria-label="Mission Timeline">
      <h3 className="text-xl font-semibold text-white mb-6 text-center md:text-left">
        Mission Timeline
      </h3>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30"></div>

          {/* Timeline points */}
          <div className="flex justify-between relative">
            {TIMELINE.map((entry, index) => (
              <div
                key={entry.year}
                className="flex flex-col items-center group"
              >
                <button
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 shadow-lg hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 relative z-10"
                  onClick={() =>
                    setActivePoint(activePoint === index ? null : index)
                  }
                  onMouseEnter={() => setActivePoint(index)}
                  onMouseLeave={() => setActivePoint(null)}
                  aria-label={`${entry.year}: ${entry.label}`}
                  aria-expanded={activePoint === index}
                >
                  <span className="text-white font-bold text-sm">
                    {entry.year.toString().slice(-2)}
                  </span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"></div>
                </button>

                {/* Year label */}
                <span className="text-gray-400 text-xs mt-2 font-medium">
                  {entry.year}
                </span>

                {/* Popup content */}
                {activePoint === index && (
                  <div className="absolute -top-21 left-1/2 transform -translate-x-1 w-64 p-4 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 z-20 animate-fade-in">
                    <h4 className="text-blue-300 font-semibold text-sm mb-1">
                      {entry.label}
                    </h4>
                    <p className="text-gray-300 text-xs">{entry.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden space-y-4">
        {TIMELINE.map((entry, index) => (
          <div key={entry.year} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {entry.year.toString().slice(-2)}
                </span>
              </div>
              {index < TIMELINE.length - 1 && (
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/30 to-purple-500/30 mt-2"></div>
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-300 font-semibold text-sm">
                    {entry.year}
                  </span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-300 font-medium text-sm">
                    {entry.label}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{entry.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activePoint !== null &&
          TIMELINE[activePoint] &&
          `Timeline point selected: ${TIMELINE[activePoint].year} - ${TIMELINE[activePoint].label}. ${TIMELINE[activePoint].text}`}
      </div>
    </div>
  );
}

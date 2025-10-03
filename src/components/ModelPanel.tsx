"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import of InteractiveTerra with SSR disabled
const InteractiveTerra = dynamic(() => import("./InteractiveTerra"), {
  ssr: false,
  loading: () => <ModelSkeleton />,
});

function ModelSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl animate-pulse">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full animate-pulse"></div>
        <div className="text-gray-400 text-sm">Loading 3D Model...</div>
      </div>
    </div>
  );
}

export default function ModelPanel() {
  const [isClient, setIsClient] = useState(false);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleModelError = () => {
    setModelError(true);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 rounded-xl blur-3xl"></div>

      {/* Main container */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(59,130,246,0.05) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {isClient && !modelError ? (
          <div className="w-full h-full">
            <InteractiveTerra />
          </div>
        ) : (
          // Fallback image with blur effect
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/assets/terra-thumb.jpg"
                alt="Terra satellite preview"
                fill
                className="object-cover rounded-xl filter blur-sm"
                onError={handleModelError}
                priority={false}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-xl"></div>

              {/* Loading text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white/80 text-sm font-medium">
                    {modelError
                      ? "Loading fallback..."
                      : "Preparing 3D model..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <p className="text-white/90 text-xs text-center">
              Interactive Terra satellite model - drag to rotate, scroll to zoom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

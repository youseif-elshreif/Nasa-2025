"use client";

import dynamic from "next/dynamic";
import { FaSatellite, FaChevronDown } from "react-icons/fa";

const InteractiveTerra = dynamic(() => import("../components/InteractiveTerra"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-between px-20 bg-gradient-to-b from-black via-[#050a18] to-[#0b1a2a] text-white overflow-hidden">
      {/* خلفية الفضاء */}
      <div className="absolute inset-0 z-0">
        {/* نجوم */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15),_transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #fff, transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                           radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                           radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                           radial-gradient(2px 2px at 160px 30px, #fff, transparent)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px'
        }}></div>
        {/* نيبولا */}
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full top-1/3 left-1/4"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full bottom-1/4 right-1/3"></div>
      </div>

      {/* النصوص شمال */}
      <div className="w-1/2 relative z-10 space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Explore Space with{" "}
          <span className="text-blue-400 drop-shadow-lg">Terra</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-lg">
          Discover NASA&apos;s Terra satellite and its mission to observe our
          planet from space, all in an immersive interactive 3D journey.
        </p>
        <a
          href="#earth-section"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg transition"
        >
          <FaSatellite className="text-lg" />
          Start the Journey
        </a>
      </div>

      {/* Terra التفاعلي يمين */}
      <div className="w-1/2 h-full flex justify-center items-center z-1">
        <div className="w-[70%] h-full absolute right-0 top-0">
          <InteractiveTerra />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <FaChevronDown className="text-gray-400 text-xl animate-bounce" />
        <span className="text-gray-400 text-sm mt-2">Scroll to Explore</span>
      </div>
    </section>
  );
}

"use client";
import HeroSection from "../sections/HeroSection";
import TerraStatsSection from "../sections/TerraStatsSection";
import EarthSection from "../sections/EarthSection";

export default function Home() {
  return (
    <main>
      {/* Hero Section - Terra تفاعلي */}
      <HeroSection />

      {/* Terra Stats Section - إحصائيات القمر الصناعي */}
      <TerraStatsSection />

      {/* Earth Section - Terra يتحرك حول الأرض */}
      <EarthSection />
    </main>
  );
}

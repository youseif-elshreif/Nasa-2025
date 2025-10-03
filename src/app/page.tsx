"use client";
import HeroSection from "../sections/HeroSection";
import MissionOverview from "../components/MissionOverview";
import TerraStatsSection from "../sections/TerraStatsSection";
import EarthSection from "../sections/EarthSection";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero Section - Terra تفاعلي */}
        <HeroSection />

        {/* Mission Overview - نظرة عامة على المهمة */}
        <MissionOverview />

        {/* Terra Stats Section - إحصائيات القمر الصناعي */}
        <TerraStatsSection />

        {/* Earth Section - Terra يتحرك حول الأرض */}
        <EarthSection />
      </main>

      {/* Footer */}
    </>
  );
}

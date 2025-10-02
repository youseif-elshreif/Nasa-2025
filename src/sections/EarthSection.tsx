"use client";

import { useState, useEffect } from "react";
import EarthModel from "../components/EarthModel";
import dynamic from "next/dynamic";

const AnimatedTerra = dynamic(() => import("../components/AnimatedTerra"), {
  ssr: false,
});

export default function EarthSection() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [terraPosition, setTerraPosition] = useState({ x: 200, y: -100 });
  const [terraRotation, setTerraRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("earth-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolledInSection = Math.max(0, windowHeight - rect.top);
      const progress = Math.min(scrolledInSection / (sectionHeight * 0.8), 1);

      if (progress < 0.25) {
        setCurrentPhase(0);
        setTerraPosition({ x: 200, y: -100 }); // فوق يمين الأرض
        setTerraRotation(0); // الاتجاه الأصلي
      } else if (progress < 0.5) {
        setCurrentPhase(1);
        setTerraPosition({ x: -200, y: -80 }); // فوق شمال الأرض
        setTerraRotation(Math.PI); // دوران 180 درجة
      } else if (progress < 0.75) {
        setCurrentPhase(2);
        setTerraPosition({ x: 220, y: 100 }); // تحت يمين الأرض
        setTerraRotation(0); // الاتجاه الأصلي
      } else {
        setCurrentPhase(3);
        setTerraPosition({ x: -220, y: 120 }); // تحت شمال الأرض
        setTerraRotation(Math.PI); // دوران 180 درجة
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phases = [
    {
      title: "مرحباً بـ Terra في مدار الأرض",
      description:
        "القمر الصناعي Terra وصل بنجاح إلى مدار الأرض ويبدأ مهمته العلمية المهمة.",
      features: [
        "🛰️ Terra في المدار",
        "📡 بدء جمع البيانات",
        "🌍 مراقبة الكوكب",
      ],
    },
    {
      title: "جمع البيانات المناخية",
      description:
        "أجهزة Terra المتطورة تجمع الآن بيانات مناخية وبيئية حيوية من زوايا متعددة.",
      features: ["🌡️ مراقبة الحرارة", "☁️ تحليل السحب", "🌊 تتبع المحيطات"],
    },
    {
      title: "التحليل البيئي المتقدم",
      description:
        "القمر الصناعي يعالج وينقل البيانات البيئية في الوقت الفعلي لمساعدة العلماء.",
      features: ["📊 نقل البيانات", "🔬 التحليل العلمي", "🌱 رؤى بيئية"],
    },
    {
      title: "نجاح المهمة المستمر",
      description:
        "Terra يواصل مراقبته الدائمة للأرض، ويوفر بيانات مهمة لحماية كوكبنا.",
      features: ["✅ إنجاز المهمة", "🔄 المراقبة المستمرة", "🌏 حماية الكوكب"],
    },
  ];

  return (
    <section
      id="earth-section"
      className="min-h-[400vh] bg-black text-white relative "
    >
      <div className="h-screen flex items-center sticky top-0">
        {/* Earth ثابت */}
        <div className="w-1/2 h-full flex items-center justify-center relative">
          <EarthModel />

          {/* Terra المتحرك */}
          <div
            className="absolute w-32 h-32 transition-all duration-1000 ease-in-out pointer-events-none"
            style={{
              transform: `translate(${terraPosition.x}px, ${terraPosition.y}px)`,
            }}
          >
            <AnimatedTerra 
              rotation={terraRotation}
            />
          </div>
        </div>

        {/* النصوص */}
        <div className="w-1/2 h-full flex items-center justify-center relative">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`absolute w-full transition-all duration-700 ease-in-out ${
                index === currentPhase
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-5xl font-bold mb-6 text-blue-400">
                {phase.title}
              </h2>
              <p className="text-xl mb-8 leading-relaxed text-gray-300">
                {phase.description}
              </p>

              <div className="space-y-4">
                {phase.features.map((f, i) => (
                  <div key={i} className="text-lg text-gray-400">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

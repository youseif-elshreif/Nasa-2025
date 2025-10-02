// app/sections/EarthSection.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  FaSatellite,
  FaCloud,
  FaThermometerHalf,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { MdOutlineAutoAwesome, MdInfoOutline } from "react-icons/md";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { IconType } from "react-icons";

const AnimatedTerra = dynamic(() => import("../components/AnimatedTerra"), {
  ssr: false,
});
const EarthModel = dynamic(() => import("../components/EarthModel"), {
  ssr: false,
});

/**
 * EarthSection
 * - Left: Earth 3D + Animated Terra overlay (moves with scroll)
 * - Right: Flexible info panel (Tabs / Accordion / Article) — content is rich & editable
 *
 * Notes:
 * - This is written to be drop-in for Next.js app router (client component).
 * - Ensure assets/models are present and AnimatedTerra/EarthModel are exported with ssr:false.
 */

type Phase = {
  id: string;
  title: string;
  summary: string;
  icon: IconType;
  details: string[]; // deeper bullet points
  datasets: string[]; // which Terra instruments / derived products apply
  visualizations: string[]; // suggestions for visualizations
  impact: string; // short impact statement
  actions: string[]; // actionable insights for community / scientists
};

const PHASES: Phase[] = [
  {
    id: "mopitt",
    title: "MOPITT — Air Pollution & CO Monitoring",
    icon: FaCloud,
    summary:
      "MOPITT measures carbon monoxide and other trace gases in the troposphere. It detects pollution plumes from fires and industry and tracks transport of polluted air across regions.",
    details: [
      "MOPITT’s long record allows trend detection in CO linked to biomass burning and fossil fuel combustion.",
      "Useful for separating local emission sources from transported pollution (e.g., smoke from distant wildfires).",
      "Combining MOPITT with active-fire layers (FIRMS) helps confirm fire-driven CO spikes.",
    ],
    datasets: ["MOPITT CO columns", "FIRMS hotspots (MODIS)"],
    visualizations: [
      "Animated CO concentration plumes overlayed on map",
      "Time-series of CO at key urban / rural locations",
    ],
    impact:
      "Provides direct evidence of air quality events that affect public health and help manage emergency responses.",
    actions: [
      "Targeted air quality advisories when CO/plumes exceed thresholds.",
      "Use MOPITT trends to evaluate long-term pollution control policy effectiveness.",
    ],
  },
  {
    id: "ceres",
    title: "CERES — Earth's Energy Budget",
    icon: MdOutlineAutoAwesome,
    summary:
      "CERES measures reflected sunlight and emitted thermal radiation to quantify how much energy enters and leaves Earth — a fundamental variable in climate studies.",
    details: [
      "CERES helps quantify radiative forcing and monitor changes in Earth’s net energy balance.",
      "Short-term changes (e.g., cloudiness) produce detectable radiative anomalies; long-term trends point to climate shifts.",
      "Useful for validating climate models and satellite-based surface energy estimates.",
    ],
    datasets: [
      "CERES radiative flux products (TOA & surface)",
      "cloud fraction & properties",
    ],
    visualizations: [
      "Global maps of net flux anomalies (animated by month/year)",
      "Side-by-side CERES vs. model flux comparisons",
    ],
    impact:
      "Critical for understanding warming/cooling drivers and for evaluating mitigation/geoengineering scenarios.",
    actions: [
      "Use CERES anomalies to prioritize climate research regions.",
      "Integrate CERES fluxes into local climate adaptation planning (e.g., agriculture heat-risk).",
    ],
  },
  {
    id: "modis",
    title: "MODIS — Daily Global Imagery",
    icon: GiEarthAsiaOceania,
    summary:
      "MODIS delivers near-daily global images at moderate resolution — ideal for tracking clouds, vegetation, ocean color, and active fires at continental scale.",
    details: [
      "MODIS supports rapid detection of disturbances: flooding, wildfire outbreaks, dust storms and large algal blooms.",
      "Daily cadence enables change detection workflows and anomaly alerts.",
      "MODIS spectral bands are often used to compute vegetation indices (e.g., NDVI) and burned-area maps.",
    ],
    datasets: [
      "MODIS true color & false color composites",
      "vegetation indices (NDVI)",
      "active fire products",
    ],
    visualizations: [
      "Daily animated mosaics over a region (time-lapse)",
      "NDVI change maps showing vegetation loss or recovery",
    ],
    impact:
      "Enables operational monitoring of natural hazards and supports resource management decisions at scale.",
    actions: [
      "Deploy MODIS-based alerts for wildfire response and early-warning systems.",
      "Use MODIS time series to detect agricultural stress and inform irrigation scheduling.",
    ],
  },
  {
    id: "aster-misr",
    title: "ASTER & MISR — Fine Detail & Multi-angle Views",
    icon: FaThermometerHalf,
    summary:
      "ASTER provides high-resolution surface detail (e.g., urban heat, land cover), while MISR gives multi-angle perspectives for aerosol heights and 3D structure.",
    details: [
      "ASTER’s thermal data reveals urban heat islands and surface temperature heterogeneity.",
      "MISR’s multi-angle imaging enables plume height estimation and better aerosol characterization.",
      "Combining ASTER and MISR is powerful for city-scale studies and volcanic / smoke plume analysis.",
    ],
    datasets: [
      "ASTER high-resolution imagery / DEMs",
      "MISR multi-angle aerosol products",
    ],
    visualizations: [
      "3D terrain overlays with ASTER DEMs",
      "Height-coded aerosol plume visualizations from MISR",
    ],
    impact:
      "Provides the fine-scale context necessary for local planning, hazard assessment, and resource exploration.",
    actions: [
      "Use ASTER DEMs for flood modeling and infrastructure planning.",
      "Leverage MISR plume heights to improve air-quality dispersion models.",
    ],
  },
];

export default function EarthSection() {
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [terraPosition, setTerraPosition] = useState({ x: 200, y: -100 });
  const [terraRotation, setTerraRotation] = useState<number>(0);
  const [layoutMode, setLayoutMode] = useState<
    "tabs" | "accordion" | "article"
  >("tabs");

  // update phase & terra behavior based on scroll (same approach as earlier)
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("earth-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolledInSection = Math.max(0, windowHeight - rect.top);
      const progress = Math.min(scrolledInSection / (sectionHeight * 0.8), 1);

      // map progress range into four phases (0..3)
      if (progress < 0.25) {
        setCurrentPhase(0);
        setTerraPosition({ x: 220, y: -120 });
        setTerraRotation(0);
      } else if (progress < 0.5) {
        setCurrentPhase(1);
        setTerraPosition({ x: -240, y: -100 });
        setTerraRotation(Math.PI);
      } else if (progress < 0.75) {
        setCurrentPhase(2);
        setTerraPosition({ x: 240, y: 120 });
        setTerraRotation(Math.PI / 6); // slight tilt
      } else {
        setCurrentPhase(3);
        setTerraPosition({ x: -220, y: 140 });
        setTerraRotation(-Math.PI / 6);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // helper renderers
  function IconForPhase(index: number) {
    const icon = PHASES[index].icon;
    const Comp = icon;
    return <Comp className="text-cyan-400 w-6 h-6 inline-block mr-2" />;
  }

  // Accordion item component
  function AccordionItem({ phase, idx }: { phase: Phase; idx: number }) {
    const open = currentPhase === idx;
    return (
      <div
        className={`border-b border-gray-800 py-4 transition-colors ${
          open ? "bg-white/5" : ""
        }`}
      >
        <button
          onClick={() => setCurrentPhase(idx)}
          className="w-full text-left flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-cyan-400">
              {(phase.icon && <phase.icon />) || null}
            </span>
            <h3 className="font-semibold text-lg">{phase.title}</h3>
          </div>
          <div className="text-sm text-gray-400">{open ? "Open" : "Open"}</div>
        </button>

        {/* expanded */}
        {open && (
          <div className="mt-3 text-sm text-gray-300 space-y-3">
            <p>{phase.summary}</p>
            <ul className="list-disc list-inside space-y-2">
              {phase.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <section
      id="earth-section"
      className="min-h-[400vh] relative bg-gradient-to-b from-black via-[#041022] to-black text-white"
    >
      {/* subtle star background (replace /assets/stars-bg.png with your asset) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-[url('/assets/stars-bg.png')] bg-cover" />
      </div>

      {/* sticky viewport frame */}
      <div className="h-screen flex items-center sticky top-0 z-10">
        {/* LEFT: Earth canvas + Terra overlay */}
        <div className="w-1/2 h-full flex items-center justify-center relative">
          <div className="w-full h-full flex items-center justify-center">
            {/* EarthModel is centered */}
            <EarthModel />
          </div>

          {/* Terra overlay (position controlled by scroll) */}
          <div
            aria-hidden
            className="absolute w-40 h-40 transition-all duration-800 ease-in-out pointer-events-none"
            style={{
              transform: `translate(${terraPosition.x}px, ${terraPosition.y}px)`,
            }}
          >
            <AnimatedTerra rotation={terraRotation} />
          </div>
        </div>

        {/* RIGHT: Flexible information panel */}
        <div className="w-1/2 h-full flex items-center justify-center relative px-8">
          <div className="w-full max-w-2xl bg-gradient-to-b from-black/60 via-black/40 to-transparent border border-gray-800 rounded-xl p-6 backdrop-blur-md shadow-xl">
            {/* header + layout switch */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaSatellite className="w-7 h-7 text-cyan-400" />
                <div>
                  <div className="text-xs text-gray-400 uppercase">
                    Mission Focus
                  </div>
                  <h2 className="text-2xl font-bold">
                    Terra Instruments & Insights
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLayoutMode("tabs")}
                  className={`px-3 py-1 rounded ${
                    layoutMode === "tabs"
                      ? "bg-cyan-500 text-black"
                      : "bg-transparent border border-gray-800 text-gray-300"
                  }`}
                >
                  Tabs
                </button>
                <button
                  onClick={() => setLayoutMode("accordion")}
                  className={`px-3 py-1 rounded ${
                    layoutMode === "accordion"
                      ? "bg-cyan-500 text-black"
                      : "bg-transparent border border-gray-800 text-gray-300"
                  }`}
                >
                  Accordion
                </button>
                <button
                  onClick={() => setLayoutMode("article")}
                  className={`px-3 py-1 rounded ${
                    layoutMode === "article"
                      ? "bg-cyan-500 text-black"
                      : "bg-transparent border border-gray-800 text-gray-300"
                  }`}
                >
                  Article
                </button>
              </div>
            </div>

            {/* content area */}
            <div className="min-h-[280px]">
              {layoutMode === "tabs" && (
                <div>
                  {/* tab buttons */}
                  <div className="flex gap-2 mb-4">
                    {PHASES.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setCurrentPhase(i)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                          currentPhase === i
                            ? "bg-cyan-500 text-black"
                            : "bg-transparent text-gray-300 border border-gray-800"
                        }`}
                      >
                        <p.icon className="w-4 h-4" />
                        {p.title.split(":")[0]}
                      </button>
                    ))}
                  </div>

                  {/* selected panel */}
                  <div className="p-4 rounded-md bg-black/30 border border-gray-800">
                    <div className="flex items-start gap-4">
                      <div className="text-cyan-400 text-3xl mt-1">
                        {/* <PHASES[currentPhase].icon /> */}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {PHASES[currentPhase].title}
                        </h3>
                        <p className="text-gray-300 mb-3">
                          {PHASES[currentPhase].summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-1">
                              Key datasets
                            </h4>
                            <ul className="text-sm text-gray-300 list-disc list-inside">
                              {PHASES[currentPhase].datasets.map((d, idx) => (
                                <li key={idx}>{d}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 mb-1">
                              Suggested visuals
                            </h4>
                            <ul className="text-sm text-gray-300 list-disc list-inside">
                              {PHASES[currentPhase].visualizations.map(
                                (v, idx) => (
                                  <li key={idx}>{v}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 text-sm">
                          <strong className="text-gray-200">Impact:</strong>{" "}
                          <span className="text-gray-300">
                            {PHASES[currentPhase].impact}
                          </span>
                        </div>

                        <div className="mt-3 text-sm">
                          <strong className="text-gray-200">Actions:</strong>
                          <ul className="list-disc list-inside text-gray-300 mt-2">
                            {PHASES[currentPhase].actions.map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {layoutMode === "accordion" && (
                <div>
                  {PHASES.map((p, idx) => (
                    <div key={p.id}>
                      <div
                        onClick={() => setCurrentPhase(idx)}
                        className={`p-3 cursor-pointer rounded-md flex items-center justify-between ${
                          currentPhase === idx
                            ? "bg-white/5"
                            : "hover:bg-white/2"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <p.icon className="w-5 h-5 text-cyan-400" />
                          <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-xs text-gray-400">
                              {p.summary.slice(0, 80)}...
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {currentPhase === idx ? "Active" : "Open"}
                        </div>
                      </div>

                      {currentPhase === idx && (
                        <div className="p-4 pb-6 text-sm text-gray-300 border-b border-gray-800">
                          <ul className="list-disc list-inside space-y-2">
                            {p.details.map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {layoutMode === "article" && (
                <article className="prose prose-invert max-w-none text-sm text-gray-200">
                  <h3 className="text-xl font-semibold">
                    {PHASES[currentPhase].title}
                  </h3>
                  <p>{PHASES[currentPhase].summary}</p>

                  <h4 className="mt-3">Deep details</h4>
                  <ul>
                    {PHASES[currentPhase].details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>

                  <h4 className="mt-3">Data & visualizations</h4>
                  <p>
                    Datasets:{" "}
                    <strong>{PHASES[currentPhase].datasets.join(", ")}</strong>
                  </p>
                  <p>Visual suggestions:</p>
                  <ul>
                    {PHASES[currentPhase].visualizations.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>

                  <h4 className="mt-3">Impact & Actions</h4>
                  <p>{PHASES[currentPhase].impact}</p>
                  <ul>
                    {PHASES[currentPhase].actions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </article>
              )}
            </div>

            {/* footer with small progress indicator */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
              <div>
                Phase <strong className="text-white">{currentPhase + 1}</strong>{" "}
                of {PHASES.length}
              </div>
              <div className="w-48 h-2 bg-gray-800 rounded overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-width"
                  style={{
                    width: `${((currentPhase + 1) / PHASES.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

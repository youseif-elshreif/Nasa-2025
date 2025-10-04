"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaBurn,
  FaSun,
  FaCloud,
  FaSearch,
  FaCity,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaChartLine,
  FaPlay,
} from "react-icons/fa";

const instruments = [
  {
    id: "mopitt",
    title: "MOPITT – Air Pollution Tracking",
    fullDescription:
      "The Measurements of Pollution in the Troposphere (MOPITT) instrument was developed by the Canadian Space Agency and has been monitoring carbon monoxide in Earth's lower atmosphere since 1999. MOPITT has created the first continuous global record of CO, providing crucial data on wildfire emissions, industrial pollution, and atmospheric transport patterns. This instrument has revolutionized our understanding of how human activities impact air quality on a global scale.",
    icon: <FaBurn className="text-red-400 text-4xl" />,
    video: "/assets/videos/mopitt.mp4",
    details: [
      "Urban pollution mapping",
      "Wildfire smoke monitoring",
      "Factory emissions tracking",
      "Atmospheric transport studies",
      "Air quality assessment",
    ],
    stats: [
      { label: "Resolution", value: "22 km" },
      { label: "Swath Width", value: "640 km" },
      { label: "Operational Period", value: "1999–2025" },
      { label: "Measurement", value: "Carbon Monoxide (CO)" },
      { label: "Altitude Range", value: "Surface to 150 hPa" },
    ],
    keyAchievements: [
      "First continuous global CO record spanning 25+ years",
      "Tracked major wildfire events including Australian bushfires",
      "Revealed seasonal patterns in global pollution",
      "Supported air quality policy development worldwide",
    ],
    nasaLinks: [
      {
        title: "MOPITT Official Page",
        url: "https://terra.nasa.gov/about/terra-instruments/mopitt",
      },
    ],
  },
  {
    id: "ceres",
    title: "CERES – Earth's Energy Balance",
    fullDescription:
      "The Clouds and the Earth's Radiant Energy System (CERES) instruments measure both solar-reflected and Earth-emitted radiation from the top of the atmosphere to the Earth's surface. CERES data provides critical insights into Earth's energy budget and how it's changing over time. This information is fundamental to understanding climate change, as it reveals how much energy Earth absorbs from the sun versus how much it radiates back to space.",
    icon: <FaSun className="text-yellow-400 text-4xl" />,
    video: "/assets/videos/mopitt.mp4",
    details: [
      "Incoming solar radiation measurement",
      "Earth's reflected heat monitoring",
      "Climate change indicators",
      "Cloud radiative effects",
      "Energy budget calculations",
    ],
    stats: [
      { label: "Measurement Types", value: "Solar + Infrared radiation" },
      { label: "Coverage", value: "Global energy budget" },
      { label: "Data Legacy", value: "25+ years continuous" },
      { label: "Spectral Ranges", value: "0.3-5μm, 8-12μm, 0.3-200μm" },
      { label: "Viewing", value: "Scanning radiometer" },
    ],
    keyAchievements: [
      "Documented Earth's energy imbalance due to climate change",
      "Revealed cloud feedback mechanisms in climate system",
      "Provided data for IPCC climate assessment reports",
      "Established baseline for future climate monitoring",
    ],
    nasaLinks: [
      {
        title: "CERES Official Page",
        url: "https://terra.nasa.gov/about/terra-instruments/ceres",
      },
      { title: "Energy Budget Data", url: "https://ceres.larc.nasa.gov/" },
    ],
  },
  {
    id: "modis",
    title: "MODIS – Daily Global Imaging",
    fullDescription:
      "The Moderate Resolution Imaging Spectroradiometer (MODIS) is Terra's most well-known instrument, capturing daily images of the entire Earth in 36 spectral bands. MODIS data supports a wide range of applications from weather forecasting and wildfire detection to monitoring ocean productivity and tracking changes in polar ice. Its comprehensive daily coverage has made it indispensable for understanding rapid environmental changes.",
    icon: <FaCloud className="text-blue-300 text-4xl" />,
    video: "/assets/videos/modis.mp4",
    details: [
      "Daily global Earth imagery",
      "Weather and cloud tracking",
      "Forest fire detection and monitoring",
      "Ocean color and productivity",
      "Land surface temperature mapping",
    ],
    stats: [
      { label: "Spectral Bands", value: "36 bands (0.4–14.4μm)" },
      { label: "Spatial Resolution", value: "250m–1km" },
      { label: "Swath Width", value: "2330 km" },
      { label: "Coverage", value: "Daily global" },
      { label: "Data Rate", value: "6.1 Mbps" },
    ],
    keyAchievements: [
      "Enabled daily global fire monitoring and early warning",
      "Revolutionized weather prediction with cloud data",
      "Tracked Arctic sea ice decline over decades",
      "Supported disaster response with rapid imaging",
    ],
    nasaLinks: [
      {
        title: "MODIS Official Page",
        url: "https://terra.nasa.gov/about/terra-instruments/modis",
      },
      {
        title: "Worldview Image Gallery",
        url: "https://worldview.earthdata.nasa.gov/",
      },
    ],
  },
  {
    id: "aster",
    title: "ASTER – High-Resolution Imaging",
    fullDescription:
      "The Advanced Spaceborne Thermal Emission and Reflection Radiometer (ASTER) provides high-resolution imaging in 14 spectral bands from visible to thermal infrared. Built by Japan's METI in cooperation with NASA, ASTER specializes in detailed studies of land surface processes, including urban heat islands, volcanic activity, and mineral mapping. Its high resolution makes it ideal for focused environmental studies.",
    icon: <FaSearch className="text-green-400 text-4xl" />,
    video: "/assets/videos/aster.mp4",
    details: [
      "Urban heat island mapping",
      "Volcanic eruption monitoring",
      "Natural resource exploration",
      "Land surface change detection",
      "Mineral composition analysis",
    ],
    stats: [
      { label: "Spatial Resolution", value: "15–90m" },
      { label: "Spectral Bands", value: "14 (visible–thermal IR)" },
      { label: "Swath Width", value: "60 km" },
      { label: "Built by", value: "Japan (METI/JAXA)" },
      { label: "Stereo Capability", value: "Near-infrared" },
    ],
    keyAchievements: [
      "Created global digital elevation model (GDEM)",
      "Monitored hundreds of active volcanoes worldwide",
      "Mapped urban growth in major metropolitan areas",
      "Supported mineral exploration and geological studies",
    ],
    nasaLinks: [
      {
        title: "ASTER Official Page",
        url: "https://terra.nasa.gov/about/terra-instruments/aster",
      },
      { title: "ASTER GDEM", url: "https://asterweb.jpl.nasa.gov/gdem.asp" },
    ],
  },
  {
    id: "misr",
    title: "MISR – Multi-Angle Observations",
    fullDescription:
      "The Multi-angle Imaging SpectroRadiometer (MISR) views Earth with cameras pointed in 9 different directions, providing unique 3D information about clouds, aerosols, and land surfaces. This multi-angle approach allows MISR to distinguish between different types of particles in the atmosphere and measure cloud heights with unprecedented accuracy. MISR data is crucial for understanding air quality and climate interactions.",
    icon: <FaCity className="text-purple-400 text-4xl" />,
    video: "/assets/videos/mopitt.mp4",
    details: [
      "Multi-angle atmospheric analysis",
      "Cloud height measurements",
      "Aerosol type identification",
      "Megacity pollution monitoring",
      "Storm system analysis",
    ],
    stats: [
      { label: "Viewing Angles", value: "9 angles (±70.5°)" },
      { label: "Spectral Bands", value: "4 (blue, green, red, NIR)" },
      { label: "Swath Width", value: "360 km" },
      { label: "Resolution", value: "275m–1.1km" },
      { label: "Unique Data", value: "3D aerosol & cloud structure" },
    ],
    keyAchievements: [
      "Pioneered 3D atmospheric particle analysis",
      "Tracked megacity air pollution in detail",
      "Improved climate model aerosol representations",
      "Enhanced understanding of cloud-climate interactions",
    ],
    nasaLinks: [
      {
        title: "MISR Official Page",
        url: "https://terra.nasa.gov/about/terra-instruments/misr",
      },
      { title: "MISR Data Portal", url: "https://misr.jpl.nasa.gov/" },
    ],
  },
];

export default function InstrumentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const instrumentId = params?.id as string;
  const instrument = instruments.find((inst) => inst.id === instrumentId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!instrument) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0b1a2a] via-[#081126] to-[#050a18] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Instrument Not Found</h1>
          <button
            onClick={() => router.push("/instruments")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-105 transition-transform duration-300"
          >
            Back to Instruments
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-[#0b1a2a] via-[#081126] to-[#050a18] text-white"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)]"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 30px 40px, #fff, transparent),
                             radial-gradient(2px 2px at 50px 80px, rgba(255,255,255,0.6), transparent),
                             radial-gradient(1px 1px at 100px 50px, #fff, transparent),
                             radial-gradient(1px 1px at 140px 90px, rgba(255,255,255,0.4), transparent),
                             radial-gradient(3px 3px at 190px 30px, rgba(59,130,246,0.6), transparent)`,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 150px",
          }}
        ></div>

        {/* Nebulas */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-cyan-600/15 blur-3xl rounded-full top-20 right-20 animate-pulse"></div>
        <div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/10 via-indigo-600/8 to-blue-600/12 blur-3xl rounded-full bottom-40 left-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-20 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Back Button */}
          <button
            onClick={() => router.push("/instruments")}
            className="group inline-flex items-center gap-2 mb-8 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Instruments
          </button>

          {/* Title Section */}
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-shrink-0">{instrument.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                  {instrument.title.split(" – ")[0]}
                </span>
                <br />
                <span className="text-white text-2xl md:text-3xl lg:text-4xl">
                  {instrument.title.split(" – ")[1]}
                </span>
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-blue-400" />
                About This Instrument
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {instrument.fullDescription}
              </p>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaPlay className="text-blue-400" />
                Instrument Animation
              </h2>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50">
                {/* Video Player */}
                <video
                  src={instrument.video}
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  muted
                  loop
                  playsInline
                >
                  <source src={instrument.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            {/* Images Section - Only show for instruments with images */}
            {(instrumentId === "aster" ||
              instrumentId === "ceres" ||
              instrumentId === "modis" ||
              instrumentId === "mopitt" ||
              instrumentId === "misr") && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="p-6 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FaSearch className="text-purple-400" />
                  Instrument Images
                </h2>

                <div
                  className={`grid gap-4 ${
                    instrumentId === "misr"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  <div className="relative group overflow-hidden rounded-xl">
                    <Image
                      src={`/assets/imgs/${instrumentId}1.jpg`}
                      alt={`${instrument.title} - Image 1`}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="relative group overflow-hidden rounded-xl">
                    <Image
                      src={`/assets/imgs/${instrumentId}2.jpg`}
                      alt={`${instrument.title} - Image 2`}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {instrumentId === "misr" && (
                    <>
                      <div className="relative group overflow-hidden rounded-xl">
                        <Image
                          src={`/assets/imgs/${instrumentId}3.jpg`}
                          alt={`${instrument.title} - Image 3`}
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="relative group overflow-hidden rounded-xl">
                        <Image
                          src={`/assets/imgs/${instrumentId}4.jpg`}
                          alt={`${instrument.title} - Image 4`}
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Key Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Key Capabilities
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {instrument.details.map((detail, index) => (
                  <li key={index} className="text-gray-300 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Key Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaChartLine className="text-green-400" />
                Key Achievements
              </h2>
              <ul className="space-y-3">
                {instrument.keyAchievements.map((achievement, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Stats & Links */}
          <div className="space-y-6">
            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Technical Specifications
              </h3>
              <div className="space-y-3">
                {instrument.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className="text-white font-medium text-sm">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* NASA Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">
                NASA Resources
              </h3>
              <div className="space-y-3">
                {instrument.nasaLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300"
                  >
                    <span className="text-white text-sm">{link.title}</span>
                    <FaExternalLinkAlt className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

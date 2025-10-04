"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaGithub,
  FaRocket,
  FaSatellite,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  const teamMembers = [
    {
      name: "Ammar Soliman",
      role: "Project Lead, Video Editor",
      linkedin: "https://linkedin.com/in/ammar-soliman",
      github: "https://github.com/ammar-soliman",
    },
    {
      name: "Youseif Elshreif",
      role: "Frontend Developer",
      linkedin: "https://linkedin.com/in/youseif-elshreif",
      github: "https://github.com/youseif-elshreif",
    },
    {
      name: "Mohamed Abo Ellail",
      role: "Backend Developer",
      linkedin: "https://linkedin.com/in/mohamed-abo-ellail",
      github: "https://github.com/mohamed-abo-ellail",
    },
    {
      name: "Ziad Sheashe",
      role: "AI Specialist",
      linkedin: "https://linkedin.com/in/ziad-sheashe",
      github: "https://github.com/ziad-sheashe",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Instruments", href: "/instruments" },
    { name: "Games", href: "/games" },
    { name: "Terra Stats", href: "#terra-stats" },
    { name: "Mission Overview", href: "#mission-overview" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/80 to-black border-t border-white/10 backdrop-blur-xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[conic-gradient(at_center,_transparent_0deg,_rgba(59,130,246,0.1)_60deg,_transparent_120deg)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Spatium"
                width={150}
                height={50}
                className="h-12 w-auto drop-shadow-lg"
              />
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Exploring the cosmos through NASA&apos;s Terra satellite mission.
              Bringing space science closer to Earth with interactive
              experiences.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Created with</span>
              <FaHeart className="text-red-400 animate-pulse" />
              <span>by Spatium Team</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <FaRocket className="text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Section */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaSatellite className="text-purple-400" />
              Our Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">{member.role}</p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-1"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <FaLinkedin className="text-lg" />
                    </Link>
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 p-1"
                      aria-label={`${member.name} GitHub`}
                    >
                      <FaGithub className="text-lg" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Spatium. All rights reserved. | NASA Terra Mission
              Educational Project
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
      </div>
    </footer>
  );
}

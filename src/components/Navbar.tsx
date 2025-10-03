"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaSatellite,
  FaGamepad,
  FaHome,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Instruments", href: "/instruments", icon: FaSatellite },
    { name: "Games", href: "/games", icon: FaGamepad },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
            <FaSatellite className="text-white text-lg group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Spatium
          </div>
        </Link>

        {/* Right: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-white bg-white/10 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <IconComponent
                  className={`text-sm transition-all duration-300 ${
                    isActive ? "text-blue-400" : "group-hover:text-blue-400"
                  }`}
                />
                {link.name}
                {/* Underline Active */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-300 text-xl p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-black/50 backdrop-blur-xl border-t border-white/10 py-6 animate-fade-in shadow-2xl">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-lg transition-all duration-300 ${
                  isActive
                    ? "text-white font-semibold bg-white/10 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <IconComponent
                  className={`text-sm ${
                    isActive ? "text-blue-400" : "text-gray-400"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

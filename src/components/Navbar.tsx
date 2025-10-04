"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaGamepad, FaHome } from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Instruments", href: "/instruments", icon: FaMicroscope },
    { name: "Weather", href: "/weather", icon: TiWeatherCloudy },
    { name: "Games", href: "/games", icon: FaGamepad },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/assets/logo.png"
            alt="Spatium"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
          />
        </Link>

        {/* Right: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {links.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname === link.href ||
                  pathname.startsWith(link.href + "/");
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
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname === link.href ||
                  pathname.startsWith(link.href + "/");
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

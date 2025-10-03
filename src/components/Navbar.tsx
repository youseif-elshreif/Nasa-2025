"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Instruments", href: "/instruments" },
    { name: "Games", href: "/games" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left: Tabs */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`relative transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {/* Underline Active */}
                <span
                  className={`absolute bottom-[-6px] left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right: Brand */}
        <div className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Spatium
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-300 text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 bg-black/40 backdrop-blur-md border-t border-white/10 py-6 animate-fade-in">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

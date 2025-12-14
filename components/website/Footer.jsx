"use client";

import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="w-[90%] mx-auto px-4">
        {/* Content */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/* Left - Brand */}
          <div className="flex items-center space-x-3">
            <Link href={WEBSITE_HOME} className="flex items-center p-2">
              <div className="w-12 h-12 animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                DT
              </div>
              <div className="leading-tight ml-3 hidden sm:block">
                <h1 className="text-xl font-semibold tracking-wide text-gray-100">
                  Dheeraj Thakur
                </h1>
                <p className="text-sm text-gray-100 tracking-wider uppercase">
                  Admin Dashboard
                </p>
              </div>
            </Link>
          </div>
          
          {/* Center - Copyright */}
          <div className="text-center">
  <p className="text-base md:text-lg text-gray-100">
    Copyright © {currentYear} Dheeraj Thakur. All rights reserved.
  </p>
  <p className="text-base md:text-lg text-gray-100 mt-2 flex items-center justify-center gap-2">
    Made with <FaHeart className="text-red-500 animate-pulse" /> Developed and maintained by Dheeraj Thakur
  </p>
</div>

          
          {/* Right - Social Links */}
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="text-gray-400 hover:text-white transition-colors text-lg md:text-xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-lg md:text-xl"
            >
              <FaLinkedin />
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-gray-200 px-3 py-1 border border-gray-700 rounded transition-colors text-sm md:text-base"
            >
              ↑ TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

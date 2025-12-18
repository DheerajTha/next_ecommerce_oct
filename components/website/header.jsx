"use client";

import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { FiSearch, FiUser, FiX, FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./cart";

const Header = () => {
  const auth = useSelector((store) => store.authStore.auth);
  const [openSearch, setOpenSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpenSearch(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="lg:px-32 px-4">
          <div className="flex items-center justify-between h-16">
            {/* LOGO (UNCHANGED) */}
            <Link href={WEBSITE_HOME} className="flex items-center p-2">
              <div className="w-11 h-11 animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                DT
              </div>
              <div className="leading-tight mx-2 hidden sm:block">
                <h1 className="text-lg font-semibold tracking-wide text-gray-900">
                  Dheeraj Thakur
                </h1>
                <p className="text-xs text-gray-800 tracking-widest uppercase">
                  Admin Dashboard
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex">
              <ul className="flex gap-10 text-sm font-medium text-gray-600">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Shop", href: WEBSITE_SHOP },
                  { label: "T-Shirt", href: "/category/t-shirt" },
                  { label: "Hoodies", href: "/category/hoodies" },
                  { label: "OverSizes", href: "/category/oversizes" },
                ].map((item) => (
                  <li key={item} className="hover:text-blue-600 transition">
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ACTION ICONS */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setOpenSearch(true)}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <FiSearch size={20} />
              </button>

              <Cart count={2} onClick={() => console.log("Open cart drawer")} />

              {!auth ? (
                <Link
                  href={WEBSITE_LOGIN}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <FiUser size={20} />
                </Link>
              ) : (
                <Link href={USER_DASHBOARD}>
                  <Avatar className="w-9 h-9 border">
                    <AvatarImage src={auth?.avatar?.url} />
                    <AvatarFallback>DT</AvatarFallback>
                  </Avatar>
                </Link>
              )}

              {/* MOBILE MENU ICON */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setMobileMenu(true)}
              >
                <FiMenu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {openSearch && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-28 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSearch(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl"
              initial={{ scale: 0.9, y: -30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  Search Products
                </h2>
                <button
                  onClick={() => setOpenSearch(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for T-Shirts, Hoodies, Oversized..."
                  className="w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Press <kbd className="border px-1 rounded">ESC</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenu(false)}
          >
            <motion.div
              className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Menu</h3>
                <button onClick={() => setMobileMenu(false)}>
                  <FiX size={22} />
                </button>
              </div>

              <ul className="space-y-4 text-gray-700">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Shop", href: WEBSITE_SHOP },
                  { label: "T-Shirt", href: "/category/t-shirt" },
                  { label: "Hoodies", href: "/category/hoodies" },
                  { label: "OverSizes", href: "/category/oversizes" },
                ].map((item) => (
                  <li key={item} className="hover:text-blue-600">
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

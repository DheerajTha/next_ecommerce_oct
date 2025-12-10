"use client";
import useFetch from "@/hooks/useFetch";
import { ADMIN_CATEGORY_SHOW, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoutes";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";

const CountOverview = () => {
  const { data: count, loading } = useFetch("/api/dashboard/admin/count");

  const cards = [
    {
      title: "Total Categories",
      value: count?.data?.category,
      icon: <BiCategory size={26} />,
      link: ADMIN_CATEGORY_SHOW,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Total Products",
      value: count?.data?.product,
      icon: <IoShirtOutline size={26} />,
      link: ADMIN_PRODUCT_SHOW,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Add Categories",
      value: 10,
      icon: <MdOutlineShoppingBag size={26} />,
      link: "#",
      color: "from-rose-400 to-rose-600",
    },
    {
      title: "Add Products",
      value: 10,
      icon: <LuUserRound size={26} />,
      link: "#",
      color: "from-violet-400 to-violet-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((item, index) => (
        <Link key={index} href={item.link}>
          <div className="group relative overflow-hidden rounded-xl border bg-white dark:bg-card p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition`}
            />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400">
                  {item.title}
                </h4>

                {loading ? (
                  <div className="h-7 w-16 mt-2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                ) : (
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                    {item.value}
                  </p>
                )}
              </div>

              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountOverview;

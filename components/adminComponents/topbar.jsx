"use client";
import React from "react";
import ThemeSwitch from "./themeSwitch";
import UserDropDown from "./userDropDown";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSidebar } from "../ui/sidebar";
import Searchbar from "./searchbar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed border h-16 w-full top-0 left-0 z-40 md:pl-72 flex justify-between items-center bg-white dark:bg-card pl-7 md:pr-0">
      <div className=""> <Searchbar/> </div>
      <div className="flex items-center gap-3 pr-10 ">
        <ThemeSwitch />
        <UserDropDown />
        <button
          onClick={toggleSidebar}
          className=" md:hidden"
          variant="icon"
        >
          <HiMenuAlt3 size={28} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;

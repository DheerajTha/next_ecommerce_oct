"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button type="button" variant="ghost" className='cursor-pointer'>
            <IoSunnyOutline className="dark:hidden" />
            <IoMoonOutline className="hidden dark:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='cursor-pointer'>
          <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitch;

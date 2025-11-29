"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";

import Image from "next/image";
import logoBlack from "@/public/assets/images/logo-black.png";
import logoWhite from "@/public/assets/images/logo-white.png";

import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";
import { adminSideBarMenu } from "./sidebarmenu";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { useSidebar } from "../ui/sidebar";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar className="z-50">
      <SidebarHeader className="border-b h-14 p-2">
        <div className="flex justify-between items-center px-2">
          <Image
            className="block dark:hidden"
            src={logoBlack}
            alt="Logo"
            width={100}
            height={50}
            priority
          />
          <Image
            className="hidden dark:block"
            src={logoWhite}
            alt="Logo"
            width={100}
            height={50}
            priority
          />

          <Button
            onClick={toggleSidebar}
            type="button"
            size="icon"
            className="md:hidden"
            variant="ghost"
          >
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
  <SidebarMenu className="mt-2 space-y-1">
    {adminSideBarMenu.map((menu, index) => {
      const hasSubmenu = menu.submenu && menu.submenu.length > 0;

      // ====== CASE 1: With Submenu ======
      if (hasSubmenu) {
        return (
          <Collapsible
            key={index}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="
                    flex items-center w-full rounded-xl px-4 py-3
                    font-medium text-[15px] tracking-wide
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    transition-all duration-200
                  "
                >
                  <menu.icon className="w-5 h-5 text-gray-500" />
                  <span className="ml-3">{menu.title}</span>

                  <LuChevronRight
                    className="
                      ml-auto w-4 h-4 
                      text-gray-500
                      transition-transform duration-300
                      group-data-[state=open]/collapsible:rotate-90
                    "
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub className="ml-2 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-4">
                  {menu.submenu.map((submenu, idx) => (
                    <SidebarMenuSubItem key={idx}>
                      <SidebarMenuSubButton
                        asChild
                        className="
                          text-sm py-2 px-3 rounded-lg
                          text-gray-600 dark:text-gray-300
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          transition-all duration-150 cursor-pointer
                        "
                      >
                        <Link href={submenu.url} prefetch={false}>
                          {submenu.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }

      // ====== CASE 2: Normal Single Item ======
      return (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton
            asChild
            className="
              flex items-center rounded-xl px-4 py-3
              text-[15px] font-medium tracking-wide
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
              transition-all duration-200
            "
          >
            <Link href={menu.url} prefetch={false}>
              <menu.icon className="w-5 h-5 text-gray-500" />
              <span className="ml-3">{menu.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    })}
  </SidebarMenu>
</SidebarContent>

    </Sidebar>
  );
};

export default AppSidebar;

"use client"
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import Image from "next/image";
import logoBlack from "@/public/assets/images/logo-black.png";
import logoWhite from "@/public/assets/images/logo-white.png";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";
import { adminSideBarMenu } from "./sidebarmenu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className='z-50'>
      <SidebarHeader className="border-b h-14 p-2 ">
        <div className="flex justify-between items-center px-2 ">
          <Image
            className="block dark:hidden"
            src={logoBlack}
            alt="Logo"
            width={100}
            height={50}
          />
          <Image
            className="hidden dark:block"
            src={logoWhite}
            alt="Logo"
            width={100}
            height={50}
          />
          <Button onClick={toggleSidebar} type="button" size="icon" className="md:hidden" variant="ghost">
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminSideBarMenu.map((menu, index) => (
            <Collapsible key={index} className="group/collapsible ">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild >
                  <SidebarMenuButton asChild className="font-medium text-sm flex gap-x-2 items-center w-full rounded-md py-5 pl-4 pr-4 transition-colors duration-300 ease-linear group-data-[state=open]:bg-gray-700">
                    <Link href={menu?.url}>
                      <menu.icon />
                      {menu.title}

                      {menu.submenu && menu.submenu.length > 0 && (
                        <LuChevronRight className="group-data-[state=open]/collapsible:rotate-90 ml-auto transition-transform duration-300 ease-in-out transform  " />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {menu.submenu && menu.submenu.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenu.map((submenu, submenuIndex) => (
                        <SidebarMenuSubItem key={submenuIndex}>
                          <SidebarMenuSubButton>
                            <Link href={submenu?.url}>{submenu.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

import AppSideBar from "@/components/adminComponents/appSideBar";
import ThemeProvider from "@/components/adminComponents/theme-provider";
import Topbar from "@/components/adminComponents/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSideBar />
        <main className="md:w-[calc(100%-16rem)]  ">
          <div className="pt-[70px] px-8 min-h-[calc(100vh-40px)] ">
            <Topbar />
            {children}
          </div>
          <div></div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Layout;

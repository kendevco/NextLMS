"use client";

import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"
import { useTheme } from "@/components/providers/theme-provider";

export const Navbar = () => {
    const { theme } = useTheme();

    return (
        <div className={`p-4 border-b h-full flex items-center ${theme === "dark" ? "bg-gray-900" : "bg-white"} ${theme === "dark" ? "text-white" : "text-gray-900"} shadow-sm`}>
             <MobileSidebar />
             <NavbarRoutes />
        </div>
    )
}
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

import SidebarWidget from "./SidebarWidget";
import {
  FlipHorizontal,
  GridIcon,
  UserCircleIcon,
  SettingsIcon,
  FileTextIcon,
  BanknoteIcon,
  Ticket,
} from "lucide-react";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <Image
              src="/eventureLogo.webp"
              alt="logo"
              width={150}
              height={70}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Image
              src="/eventureLogo.webp"
              alt="logo"
              width={180}
              height={100}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          )}
        </Link>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-6">
            {/* Section: Menu */}
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <FlipHorizontal />
                )}
              </h2>
              <ul className="text-md flex flex-col gap-2">
                <li>
                  <Link
                    href="/dashboard"
                    className={`menu-item flex items-center gap-2 ${
                      isActive("/") ? "menu-item-active" : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <GridIcon />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>Dashboard</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/my-event"
                    className={`menu-item flex items-center gap-2 ${
                      isActive("/my-event")
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <Ticket />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>My Event</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section: Account */}
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Account"
                ) : (
                  <UserCircleIcon />
                )}
              </h2>
              <ul className="text-md flex flex-col gap-2">
                <li>
                  <Link
                    href="/dashboard/profile"
                    className={`menu-item flex items-center gap-2 ${
                      isActive("/profile")
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <UserCircleIcon />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>Account Profile</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    className={`menu-item flex items-center gap-2 ${
                      isActive("/settings")
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <SettingsIcon />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>Settings</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/legal"
                    className={`menu-item flex items-center gap-2 ${
                      isActive("/legal")
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <FileTextIcon />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>Legal Information</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/bank-account"
                    className={`menu-item flex items-center gap-2 ${
                      isActive("/bank")
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <BanknoteIcon />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>Bank Account</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;

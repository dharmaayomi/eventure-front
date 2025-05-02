"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSidebar } from "../context/SidebarContext";

import { isAdmin, isUser } from "@/utils/AuthRole";
import {
  BanknoteIcon,
  CalendarFold,
  FileTextIcon,
  FlipHorizontal,
  LayoutDashboard,
  Search,
  SettingsIcon,
  Ticket,
  UserCircleIcon,
  UserCog,
  UserRound,
} from "lucide-react";
import { useSession } from "next-auth/react";
import SidebarWidget from "./SidebarWidget";

const AppSidebar: React.FC = () => {
  const session = useSession();
  const user = session.data?.user;

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
        className={`flex ${
          !isExpanded && !isHovered
            ? "py-6 lg:justify-center"
            : "justify-start py-2"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <Image
              src="/eventureLogo.webp"
              alt="logo"
              width={200}
              height={150}
              loading="lazy"
              className="mt-auto h-18 w-full object-cover"
            />
          ) : (
            <Image
              src="/eventureLogoOnly.webp"
              alt="logo"
              width={70}
              height={70}
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
                className={`mb-2 flex text-xs leading-[15px] text-gray-400 uppercase ${
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
                {!!isAdmin(session.data) && (
                  <>
                    <li>
                      {/* dashboard */}
                      <Link
                        href="/dashboard"
                        className={`menu-item flex items-center gap-2 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                          isActive("/dashboard")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <LayoutDashboard />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>Dashboard</span>
                        )}
                      </Link>
                    </li>
                    <li>
                      {/* my event */}
                      <Link
                        href="/dashboard/my-event"
                        className={`menu-item flex items-center gap-2 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                          isActive("/dashboard/my-event")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <CalendarFold />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>My Event</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
                {!!isUser(session.data) && (
                  <>
                    <li>
                      <Link
                        href="/dashboard/my-ticket"
                        className={`menu-item flex items-center gap-2 ${
                          isActive("/dashboard/my-ticket")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <Ticket />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>My Ticket</span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/my-event"
                        className={`menu-item flex items-center gap-2 ${
                          isActive("/my-event")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <Search />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>Discover</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Section: Account */}
            <div>
              <h2
                className={`mb-2 flex text-xs leading-[18px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Account"
                ) : (
                  <UserRound />
                )}
              </h2>
              <ul className="text-md flex flex-col gap-2">
                {!!isAdmin(session.data) && (
                  <>
                    <li>
                      {/* organizer profile */}
                      <Link
                        href="/dashboard/organizer"
                        className={`menu-item flex items-center gap-2 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                          isActive("/dashboard/organizer")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <UserCog />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>Organizer Profile</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
                {!!isUser(session.data) && (
                  <>
                    <li>
                      {/* account profile */}
                      <Link
                        href="/dashboard/profile"
                        className={`menu-item flex items-center gap-2 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                          isActive("/dashboard/profile")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <UserCircleIcon />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>Account Profile</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
                {(!!isUser(session.data) || !!isAdmin(session.data)) && (
                  <>
                    <li>
                      {/* settings */}
                      <Link
                        href="/dashboard/settings"
                        className={`menu-item flex items-center gap-2 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                          isActive("/dashboard/settings")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <SettingsIcon />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>Settings</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
                {!!isAdmin(session.data) && (
                  <>
                    <li>
                      {/* bank account */}
                      <Link
                        href="/dashboard/bank-account"
                        className={`menu-item flex items-center gap-2 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                          isActive("/dashboard/bank-account")
                            ? "rounded-md bg-blue-100 p-2 font-semibold text-[#004de8]"
                            : "p-2"
                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                      >
                        <BanknoteIcon />
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span>Bank Account</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
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

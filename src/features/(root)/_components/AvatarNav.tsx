"use client";
import { Separator } from "@/components/ui/separator";
import { Dropdown } from "@/features/(dashboard)/_components/dropdown/Dropdown";
import { DropdownItem } from "@/features/(dashboard)/_components/dropdown/DropdownItem";
import { useRole } from "@/hooks/api/auth/useRole";
import Backdrop from "@/layouts/Backdrop";
import { useAuthStore } from "@/store/auth";
import {
  BanknoteIcon,
  CalendarFold,
  FileTextIcon,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Ticket,
  UserRoundPen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AvatarNav() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { user, clearAuth, isAdmin, isUser } = useAuthStore();
  const role = useRole();

  // console.log("apakah ini admin", isAdmin());
  // console.log("apakah ini user", isUser());
  // console.log("user", user);

  const logout = () => {
    clearAuth();
    router.push("/");
  };

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
          <Image width={44} height={44} src="/jendeuk.webp" alt="User" />
        </span>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Backdrop />

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800"
      >
        <div>
          <span className="text-theme-sm block font-medium text-gray-700 dark:text-gray-400">
            {user?.fullName}
          </span>
          <span className="text-theme-xs mt-0.5 block text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
        </div>
        <ul className="flex flex-col gap-1 border-b border-gray-200 pt-4 pb-3 dark:border-gray-800">
          {!!user && !!isAdmin() && (
            <>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <LayoutDashboard />
                  Dashboard
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard/my-event"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <CalendarFold />
                  My Events
                </DropdownItem>
              </li>
            </>
          )}

          {!!user && !!isUser() && (
            <>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard/my-ticket"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <Ticket />
                  My Ticket
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/discover"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <Search />
                  Discover
                </DropdownItem>
              </li>
            </>
          )}
        </ul>
        <ul>
          {!!user && (isUser() || isAdmin()) && (
            <>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard/profile"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <UserRoundPen />
                  Profile
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard/settings"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <Settings />
                  Settings
                </DropdownItem>
              </li>
            </>
          )}
          {!!user && !!isAdmin() && (
            <>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard/legal"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <FileTextIcon />
                  Legal Information
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/dashboard/bank-account"
                  className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  <BanknoteIcon />
                  Bank Account
                </DropdownItem>
              </li>
            </>
          )}
        </ul>

        <Separator />
        <Link
          href="/"
          onClick={logout}
          className="group text-theme-sm mt-3 flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LogOut rotate={180} />
          Sign out
        </Link>
      </Dropdown>
    </div>
  );
}

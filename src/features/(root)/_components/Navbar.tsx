"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { isAdmin, isUser } from "@/utils/AuthRole";
import {
  BanknoteIcon,
  CalendarFold,
  CalendarPlus,
  Compass,
  LayoutDashboard,
  SearchIcon,
  Settings,
  Ticket,
  UserRoundPen,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import AvatarNav from "./AvatarNav";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [debounceSearch] = useDebounceValue(search, 500);
  const session = useSession();

  const handleSearchSubmit = () => {
    if (debounceSearch.trim()) {
      router.push(`/events?search=${debounceSearch}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full ${
        isScrolled
          ? "border-b bg-[#ffffff]/70 shadow-sm backdrop-blur-lg"
          : "border-b bg-[#ffffff]"
      }`}
    >
      {/* Top bar */}
      <div className="relative items-center bg-[#083ca3] p-1">
        <div className="container mx-auto flex items-center gap-2">
          <div className="ml-auto hidden items-center space-x-4 px-4 py-1 text-sm md:flex">
            <Link
              className="pointer-events-auto text-white hover:text-[#7ba7ff]"
              href="/about"
            >
              About Eventure
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#7ba7ff]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#7ba7ff]"
              href="/become-event-creator"
            >
              Become an Event Creator
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        id="navbar"
        className="relative container mx-auto flex items-center p-4"
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/eventureLogo.webp"
            alt="logo"
            width={180}
            height={100}
            loading="lazy"
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Right side */}
        <div className="ml-auto hidden w-full max-w-5xl items-center justify-end space-x-4 text-[#083ca3] md:flex">
          {/* Search bar */}
          <div className="flex w-full max-w-xl items-center space-x-2">
            <Input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search your exciting event here!"
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-[#083ca3]"
              onClick={handleSearchSubmit}
            >
              <SearchIcon />
            </Button>
          </div>

          {/* Navigation Links */}
          <Link
            className="pointer-events-auto text-sm font-medium hover:text-[#004DE8] hover:underline"
            href="/events"
          >
            <div className="flex items-center gap-1">
              <Compass size={26} />
              Discover
            </div>
          </Link>
          <Link
            className="pointer-events-auto text-sm font-medium hover:text-[#004DE8] hover:underline"
            href="/dashboard/my-event/create"
          >
            <div className="flex items-center gap-1">
              <CalendarPlus size={24} />
              Create event
            </div>
          </Link>

          {!!session.data?.user ? (
            <AvatarNav />
          ) : (
            <>
              <Link href="/register">
                <Button className="border border-[#083ca3] bg-transparent font-semibold text-[#083ca3] hover:border-transparent hover:bg-[#7ba7ff] hover:text-white">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="w-full bg-[#FF7F00] font-semibold hover:bg-[#7ba7ff]">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile version (Dropdown) */}
        <div className="ml-auto md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded border p-2">☰</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-[#083ca3]">
                Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Discover */}
              <DropdownMenuItem asChild>
                <Link href="/events" className="flex items-center gap-2">
                  <Compass size={18} />
                  Discover
                </Link>
              </DropdownMenuItem>

              {/* Create Event - bisa dibedakan berdasarkan role */}
              {!isUser(session.data) && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/my-event/create"
                    className="flex items-center gap-2"
                  >
                    <CalendarPlus size={18} />
                    Create Event
                  </Link>
                </DropdownMenuItem>
              )}

              {/* Tambahan opsional untuk ADMIN */}
              {isAdmin(session.data) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/my-event"
                      className="flex items-center gap-2"
                    >
                      <CalendarFold size={18} />
                      My Events
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              {isUser(session.data) && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/my-ticket"
                      className="flex items-center gap-2"
                    >
                      <Ticket size={18} />
                      My Ticket
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              {(isUser(session.data) || isAdmin(session.data)) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        isAdmin(session.data)
                          ? "/dashboard/organizer"
                          : "/dashboard/profile"
                      }
                      className="flex items-center gap-2"
                    >
                      <UserRoundPen size={18} />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <Settings size={18} />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              {isAdmin(session.data) && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/bank-account"
                    className="flex items-center gap-2"
                  >
                    <BanknoteIcon size={18} />
                    Bank Account
                  </Link>
                </DropdownMenuItem>
              )}

              {/* Auth Buttons */}
              {!session.data?.user ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/register">
                      <Button
                        variant="outline"
                        className="w-full border-[#083ca3] text-[#083ca3] hover:border-transparent hover:bg-[#7ba7ff] hover:text-white"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <Button className="w-full bg-[#FF7F00] hover:bg-[#7ba7ff]">
                        Sign In
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login" onClick={logout}>
                    <Button className="w-full bg-[#FF7F00] hover:bg-[#7ba7ff]">
                      Sign out
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

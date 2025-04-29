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
import { useAuthStore } from "@/store/auth";
import { CalendarPlus, Compass, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import AvatarNav from "./AvatarNav";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, clearAuth } = useAuthStore();
  const [search, setSearch] = useState<string>("");
  const [debounceSearch] = useDebounceValue(search, 500);

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

  console.log(search);

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
              href="/"
            >
              About Eventure
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#7ba7ff]"
              href="/"
            >
              Blog
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#7ba7ff]"
              href="/"
            >
              Become an Event Creator
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#7ba7ff]"
              href="/"
            >
              Pricing
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
            href="/"
          >
            <div className="flex items-center gap-1">
              <Compass size={26} />
              Discover
            </div>
          </Link>
          <Link
            className="pointer-events-auto text-sm font-medium hover:text-[#004DE8] hover:underline"
            href="/events/create-event"
          >
            <div className="flex items-center gap-1">
              <CalendarPlus size={24} />
              Create event
            </div>
          </Link>

          {!user ? (
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
          ) : (
            <AvatarNav />
          )}
        </div>

        {/* Mobile version (Dropdown) */}
        <div className="ml-auto md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded border p-2">☰</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <Link href="/">Home</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/blogs">Blogs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/category">Category</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

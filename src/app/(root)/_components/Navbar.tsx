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
import { CalendarPlus, Compass, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full ${
        isScrolled
          ? "border-b bg-[#ffffff] shadow-sm backdrop-blur-lg"
          : "border-b bg-[#ffffff]"
      }`}
    >
      <div className="relative items-center bg-[#083ca3] p-1">
        <div className="container mx-auto flex items-center gap-2">
          {" "}
          <div className="ml-auto hidden items-center space-x-4 px-4 py-1 text-sm md:flex">
            <Link
              className="pointer-events-auto text-white hover:text-[#004DE8] hover:underline"
              href="/"
            >
              About Eventure
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#004DE8] hover:underline"
              href="/"
            >
              Blog
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#004DE8] hover:underline"
              href="/"
            >
              Become an Event Creator
            </Link>
            <Link
              className="pointer-events-auto text-white hover:text-[#004DE8] hover:underline"
              href="/"
            >
              Pricing
            </Link>
          </div>
        </div>
      </div>
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

        {/* Menu navigasi di kanan */}
        <div className="ml-auto hidden w-full max-w-5xl items-center justify-end space-x-4 text-[#083ca3] md:flex">
          <div className="flex w-full max-w-xl items-center space-x-2">
            <Input
              type="email"
              placeholder="Search your exiting event here!"
              className="flex-1"
            />
            <Button type="submit" className="bg-[#083ca3]">
              <SearchIcon />
            </Button>
          </div>
          <Link
            className="pointer-events-auto text-base font-medium hover:text-[#004DE8] hover:underline"
            href="/"
          >
            <div className="flex gap-1">
              <Compass size={26} />
              Discover
            </div>
          </Link>
          <Link
            className="pointer-events-auto font-medium hover:text-[#004DE8] hover:underline"
            href="/about"
          >
            <div className="flex gap-1">
              <CalendarPlus size={24} />
              Create event
            </div>
          </Link>

          <Link href="/Daftar">
            <Button className="border border-[#083ca3] bg-transparent font-semibold text-[#083ca3] hover:bg-[#7ba7ff]">
              Sign Up
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="w-full bg-[#083ca3] font-semibold hover:bg-[#7ba7ff]">
              Sign in
            </Button>
          </Link>
        </div>
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

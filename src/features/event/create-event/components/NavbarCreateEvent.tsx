"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarNav from "@/features/(root)/_components/AvatarNav";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarCreateEvent = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const session = useSession();
  const user = session.data?.user;
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
          ? "border-b bg-[#ffffff]/70 shadow-sm backdrop-blur-lg"
          : "border-b bg-[#ffffff]"
      }`}
    >
      {/* Top bar */}
      <div className="relative items-center bg-[#083ca3] p-1">
        <div className="container mx-auto flex items-center gap-2"></div>
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
          {!!user && <AvatarNav />}
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

export default NavbarCreateEvent;

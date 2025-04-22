"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  MailCheckIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="pb-8` bg-gradient-to-b from-[#fafafa] via-gray-50 to-gray-100 pt-8">
      <div id="footer" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className={`mb-4 text-2xl font-bold text-gray-900`}>
              Stay Connected
            </h3>
            <p className="mb-6 text-gray-600">
              Get the latest updates and insights delivered straight to your
              inbox
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className={`w-full rounded-l-lg border px-4 py-3 pl-10 ${
                      !isValid && email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-[#272727] focus:outline-none`}
                    aria-label="Email address"
                  />
                  <MailCheckIcon className="absolute top-1/2 left-3 -translate-y-1/2 transform text-xl text-gray-400" />
                </div>
                <button
                  type="submit"
                  disabled={!isValid || isLoading || !email}
                  className={`rounded-r-lg px-6 py-3 font-semibold text-white ${
                    isValid && email
                      ? "bg-[#272727]/80 hover:bg-[#272727]"
                      : "bg-gray-400"
                  } transition duration-200 focus:ring-2 focus:ring-[#272727] focus:ring-offset-2 focus:outline-none disabled:opacity-50`}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {!isValid && email && (
                <p className="mt-2 text-sm text-red-500">
                  Please enter a valid email address
                </p>
              )}
              {showSuccess && (
                <div className="animate-fade-in absolute top-full left-0 mt-2 rounded-md bg-green-100 px-4 py-2 text-green-700">
                  Successfully subscribed!
                </div>
              )}
            </form>
          </div>
          <div className="pl-0 md:pl-28">
            <h4 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="pl-none md:pl-16">
            <h4 className="mb-4 text-lg font-semibold text-gray-900">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition duration-200 hover:text-[#272727]"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} DailyMuse. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a
                href="#"
                className="text-gray-400 transition duration-200 hover:text-[#272727]"
                aria-label="Twitter"
              >
                <TwitterIcon className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition duration-200 hover:text-[#272727]"
                aria-label="GitHub"
              >
                <GithubIcon className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition duration-200 hover:text-[#272727]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { LOGOS } from "@/public/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Headset, Menu, X, LogOut, Moon, Sun, User, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/stores/authStore";

const NAV_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Partner With Us", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, fetchProfile, isLoading, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const loadUser = async () => {
      await fetchProfile();
      setIsMounted(true);
    };
    loadUser();
  }, [fetchProfile]);

  // Handle theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Get initials for avatar
  const getInitials = () => {
    if (!user?.displayName) return "U";
    return user.displayName
    //@ts-ignore
      .split(" ")
      //@ts-ignore
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Don't render until we know auth state
  if (!isMounted || isLoading) {
    return (
      <nav className="absolute left-0 top-3 z-50 w-full px-5 py-4 md:px-16">
        <div className="relative flex items-center justify-between">
          <div className="ml-auto flex items-center gap-3">
            <div className="h-10 w-9 rounded-md bg-red-500 animate-pulse "></div>
            <div className="h-10 w-10 rounded-full bg-red-500 animate-pulse "></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="absolute left-0 top-3 z-50 w-full px-5 py-4 md:px-16">
      <div className="relative flex items-center justify-between">

        {/* ── Left nav links (desktop) ── */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-black  capitalize tracking-wide transition hover:text-red-500"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── Center logo ── */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        >
          <div className="relative h-10 w-10 md:h-28 md:w-28">
            <Image src={
               theme === "dark" ? LOGOS.NEW : LOGOS.NEW
            } alt="Biteloop Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* ── Right side (desktop) ── */}
        <div className="ml-auto hidden items-center gap-3 md:flex">
          {user && (
            <Tooltip>
              <TooltipTrigger className="inline-flex cursor-pointer h-10 w-9 items-center justify-center rounded-md bg-red-500 text-white transition hover:bg-red-600">
                <Link href="/helpline">
                  <Headset className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Helpline</p>
              </TooltipContent>
            </Tooltip>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full  transition focus:outline-none"
              >
                <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white font-medium">
                {
                  user?.photoURL ? (
                     <img
                  src={user?.photoURL as string}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                 />
                  ) : 
                  (
                    <p className="">{getInitials()}</p>
                  )
                }
                </div>

              </button>

              {/* Custom Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-neutral-900 border-none z-50">
                  <div className="py-1">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {String(user?.displayName ?? "User")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {String(user?.email)}
                      </p>
                    </div>

                    {/* Profile Link */}
                    <Link
                      href={`/profile/${user?.id}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>

                    {/* Theme Toggle */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {theme === "light" ? (
                        <>
                          <Moon className="h-4 w-4" />
                          Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun className="h-4 w-4" />
                          Light Mode
                        </>
                      )}
                    </button>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-red-500 font-bold px-6 py-5 hover:bg-red-600 cursor-pointer">
                Register
              </Button>
            </Link>
          )}
        </div>

        {/* ── Mobile: hamburger ── */}
        <button
          className="ml-auto flex items-center justify-center rounded-md p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-black/80 px-6 py-6 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-black uppercase tracking-wide transition hover:text-orange-400"
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-2 flex flex-col gap-3">
            {user && (
              <Link href="/helpline" onClick={() => setOpen(false)}>
                <Button className="w-full bg-red-500 hover:bg-red-600 cursor-pointer">
                  <Headset className="h-4 w-4 mr-2" />
                  Helpline
                </Button>
              </Link>
            )}

            {user ? (
              <>
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/10">
                  <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                    {getInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {String(user?.displayName || "User")}
                    </p>
                    <p className="text-xs text-gray-300 truncate">
                      {String(user?.email) }
                    </p>
                  </div>
                </div>

                <Link href="/profile" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>

                <Button 
                  variant="outline"
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full border-white/30 text-white hover:bg-white/10"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  )}
                </Button>

                <Button 
                  className="w-full bg-red-500 font-bold hover:bg-red-600 cursor-pointer"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                <Button className="w-full bg-red-500 font-bold hover:bg-red-600 cursor-pointer">
                  Register
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
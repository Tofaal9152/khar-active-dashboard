"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { imagePath } from "@/constants/imagePath";

import SignOut from "@/features/auth/signout/SignOut";
import { Button } from "../../ui/button";

export default function Navbar({ session }: { session?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="z-50 px-6 md:px-12 lg:px-20 py-4 sticky top-0 bg-[#F3F1EE]">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div data-testid="logo">
          <Link href="/">
            <Image
              src={imagePath.logoImage}
              alt="KHAR ACTIVE"
              width={128}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        {session ? (
          <ul className="hidden md:flex items-center gap-8 text-sm text-[#444444]">
            <li>
              <Link
                href="/my-bookings"
                className="sketch-underline hover:text-[#111111] transition-colors"
                data-testid="link-my-booking"
              >
                My Booking
              </Link>
            </li>
            <li>
              <SignOut />
            </li>
          </ul>
        ) : (
          <div className="hidden md:block">
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        )}

        {/* Mobile Right Side */}
        {session ? (
          // ✅ logged in => show hamburger
          <button
            className="md:hidden text-[#111111]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          // ✅ not logged in => NO hamburger, only login
          <Link
            href="/auth/signin"
            className="md:hidden text-sm font-medium text-[#111111]"
          >
            <Button>Login</Button>
          </Link>
        )}
      </nav>

      {/* Mobile Dropdown (only when logged in) */}
      {session && open && (
        <div className="md:hidden mt-4 rounded-xl border border-black/10 bg-white shadow-lg">
          <ul className="flex flex-col divide-y text-sm text-[#111111]">
            <li className="block px-4 py-3 font-medium hover:bg-black/5">
              {/* <ReferAFriend /> */}
            </li>
            <li>
              <Link
                href="/my-bookings"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 font-medium hover:bg-black/5"
              >
                My Booking
              </Link>
            </li>
            <li className="px-4 py-3">
              <SignOut />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

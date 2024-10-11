"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import {
  MdDashboard,
  MdRocketLaunch,
  MdHome,
  MdPerson,
  MdMonetizationOn,
  MdHelp,
  MdSearch,
} from "react-icons/md";
import { UserButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function MobileUi({ toggleMenu }) {
  const { user } = useUser();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (href) => pathname === href;

  const menuItemsForCandidate = [
    { href: "/", icon: MdHome, label: "Home" },
    { href: "/jobs", icon: MdSearch, label: "Find Jobs" },
    { href: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { href: "/job-profile", icon: MdPerson, label: "Job Profile" },
    { href: "/pricing", icon: MdMonetizationOn, label: "Try Premium" },
    { href: "/ask-ai", icon: MdRocketLaunch, label: "Ask AI" },
    { href: "/about", icon: MdHelp, label: "FAQ" },
  ];
  const menuItemsForRecruiter = [
    { href: "/", icon: MdHome, label: "Home" },
    {
      href: `/dashboard/${user?.unsafeMetadata?.role}`,
      icon: MdDashboard,
      label: "Dashboard",
    },
    { href: "/post-job", icon: MdSearch, label: "Post Job" },
    { href: `/${user?.id}/jobs`, icon: MdPerson, label: "Job Overview" },
    { href: "/pricing", icon: MdMonetizationOn, label: "Try Premium" },
    { href: "/ask-ai", icon: MdRocketLaunch, label: "Ask AI" },
    { href: "/about", icon: MdHelp, label: "FAQ" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center" onClick={toggleMenu}>
            <img
              src="/jobsco.png"
              alt="Jobsco Logo"
              className="h-8 w-auto sm:h-10"
            />
            <span className="ml-2 text-xl font-medium text-white">Jobsco</span>
          </Link>
          <button
            className="text-gray-400 hover:text-gray-200 transition-colors"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-1">
          {user?.unsafeMetadata?.role === "candidate"
            ? menuItemsForCandidate.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={toggleMenu}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))
            : menuItemsForRecruiter.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={toggleMenu}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
        </nav>
        <div className="mt-6 pt-6 border-t border-gray-700">
          {user ? (
            <div className="flex flex-col items-center space-y-4">
              <UserButton />
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SignOutButton>
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Sign Out
                  </button>
                </SignOutButton>
              </motion.div>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-in"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

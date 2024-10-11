import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { FaBars } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import {
  MdDashboard,
  MdWork,
  MdMonetizationOn,
  MdHome,
  MdPreview,
} from "react-icons/md";

export default function MenuUi({ toggleMenu }) {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const audioRef = useRef(null);

  const userRole = user?.unsafeMetadata?.role;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (href) => {
    return pathname === href;
  };

  const playBellSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <header className="bg-[#141413] shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="flex items-center">
                <img
                  src="/jobsco.png"
                  alt="Jobsco Logo"
                  className="h-8 w-auto sm:h-10"
                />
                <span className="ml-2 text-2xl font-medium text-white">
                  Jobsco
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="bg-[#323232] rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open menu</span>
                <FaBars className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex space-x-10">
              <Link
                href="/jobs"
                className={`text-base ${
                  isActive("/jobs")
                    ? "text-white font-semibold underline"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                Find Jobs
              </Link>
              <Link
                href="/pricing"
                className={`text-base ${
                  isActive("/pricing")
                    ? "text-white font-semibold underline"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                Try Premium
              </Link>
              <Link
                href="/ask-ai"
                className={`text-base ${
                  isActive("/ask-ai")
                    ? "text-white font-semibold underline"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                Ask AI
              </Link>
              <Link
                href="/about"
                className={`text-base ${
                  isActive("/about")
                    ? "text-white font-semibold underline"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                FAQ
              </Link>
            </nav>

            {/* CTA button */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {user?.id ? (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="rounded-full me-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserButton />
                  </motion.div>
                  <motion.div
                    className="rounded-full p-2 bg-[#222222] border border-gray-600 me-2 cursor-pointer hover:bg-[#333333] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleSidebar}
                  >
                    <CiSettings size={20} className="text-gray-200" />
                  </motion.div>
                  <motion.div
                    className="rounded-full p-2 bg-[#222222] border border-gray-600 cursor-pointer hover:bg-[#333333] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playBellSound}
                  >
                    <CiBellOn size={20} className="text-gray-200" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href="/sign-in"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign-in
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-[#1a1a1a] shadow-lg z-50"
          >
            <div className="p-4">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              <nav>
                <Link
                  href="/"
                  className={`block py-2 px-4 rounded transition-colors duration-200 ${
                    isActive("/")
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-300 hover:bg-[#2a2a2a]"
                  }`}
                >
                  <div className="flex items-center">
                    <MdHome className="mr-2" />
                    Home
                  </div>
                </Link>
                <Link
                  href={`/dashboard/${user?.unsafeMetadata?.role}`}
                  className={`block py-2 px-4 rounded transition-colors duration-200 ${
                    isActive(`/dashboard/${user?.unsafeMetadata?.role}`)
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-300 hover:bg-[#2a2a2a]"
                  }`}
                >
                  <div className="flex items-center">
                    <MdDashboard className="mr-2" />
                    Dashboard
                  </div>
                </Link>
                {userRole === "recruiter" ? (
                  <Link
                    href="/post-job"
                    className={`block py-2 px-4 rounded transition-colors duration-200 ${
                      isActive("/post-job")
                        ? "bg-[#2a2a2a] text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center">
                      <MdWork className="mr-2" />
                      Post Jobs
                    </div>
                  </Link>
                ) : (
                  <Link
                    href="/jobs"
                    className={`block py-2 px-4 rounded transition-colors duration-200 ${
                      isActive("/jobs")
                        ? "bg-[#2a2a2a] text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center">
                      <MdWork className="mr-2" />
                      Find Jobs
                    </div>
                  </Link>
                )}

                {userRole === "recruiter" ? (
                  <Link
                    href={`/${user?.id}/jobs`}
                    className={`block py-2 px-4 rounded transition-colors duration-200 ${
                      isActive(`/${user?.id}/jobs`)
                        ? "bg-[#2a2a2a] text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center">
                      <MdPreview className="mr-2" />
                      Job Overview
                    </div>
                  </Link>
                ) : (
                  <Link
                    href="/job-profile"
                    className={`block py-2 px-4 rounded transition-colors duration-200 ${
                      isActive("/job-profile")
                        ? "bg-[#2a2a2a] text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center">
                      <MdPreview className="mr-2" />
                      Job Profile
                    </div>
                  </Link>
                )}

                <Link
                  href="/pricing"
                  className={`block py-2 px-4 rounded transition-colors duration-200 ${
                    isActive("/pricing")
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-300 hover:bg-[#2a2a2a]"
                  }`}
                >
                  <div className="flex items-center">
                    <MdMonetizationOn className="mr-2" />
                    Try Premium
                  </div>
                </Link>
                <motion.div
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SignOutButton />
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Audio element for bell sound */}
      <audio ref={audioRef} src="/bell.mp3" />
    </>
  );
}

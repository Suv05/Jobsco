import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

import { FaBars } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";

export default function MenuUi({ toggleMenu }) {
  const { user } = useSelector((state) => state.user);

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
                className="text-base text-gray-300 hover:text-gray-100"
              >
                Find Jobs
              </Link>
              <Link
                href="/pricing"
                className="text-base text-gray-300 hover:text-gray-100"
              >
                Try Premium
              </Link>
              <Link
                href="/resources"
                className="text-base text-gray-300 hover:text-gray-100"
              >
                Resources
              </Link>
              <Link
                href="/about"
                className="text-base text-gray-300 hover:text-gray-100"
              >
                FAQ
              </Link>
            </nav>

            {/* CTA button */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      {user ? (
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
          >
            <CiSettings size={20} className="text-gray-200" />
          </motion.div>
          <motion.div 
            className="rounded-full p-2 bg-[#222222] border border-gray-600 cursor-pointer hover:bg-[#333333] transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
    </>
  );
}

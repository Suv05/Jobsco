import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default function MenuUi({ toggleMenu }) {
  return (
    <>
      <header className="bg-[#181C14] shadow-md fixed top-0 left-0 right-0 z-50">
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
                href="/companies"
                className="text-base text-gray-300 hover:text-gray-100"
              >
                Companies
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
              <Link
                href="/sign-in"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign-in
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

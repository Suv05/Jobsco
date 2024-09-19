import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function Mobileui({toggleMenu}) {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <img
            src="/jobsco.png"
            alt="Jobsco Logo"
            className="h-8 w-auto sm:h-10"
          />
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-4">
          <Link
            href="/jobs"
            className="block text-base font-medium text-gray-900 hover:text-gray-700"
            onClick={toggleMenu}
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="block text-base font-medium text-gray-900 hover:text-gray-700"
            onClick={toggleMenu}
          >
            Companies
          </Link>
          <Link
            href="/resources"
            className="block text-base font-medium text-gray-900 hover:text-gray-700"
            onClick={toggleMenu}
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="block text-base font-medium text-gray-900 hover:text-gray-700"
            onClick={toggleMenu}
          >
            FAQ
          </Link>
        </nav>
        <div className="mt-6">
          <Link
            href="/sign-in"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={toggleMenu}
          >
            Sign-in
          </Link>
        </div>
      </div>
    </>
  );
}

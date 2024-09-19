"use client";

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#181C14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Jobsco</h3>
            <p className="text-sm text-gray-300">
              Connecting talented professionals with exciting career opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-sm text-gray-300 hover:text-white">Find Jobs</Link></li>
              <li><Link href="/companies" className="text-sm text-gray-300 hover:text-white">Companies</Link></li>
              <li><Link href="/resources" className="text-sm text-gray-300 hover:text-white">Resources</Link></li>
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter for the latest job opportunities.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">&copy; 2024 Jobsco. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
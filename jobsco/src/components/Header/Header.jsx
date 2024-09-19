"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/store/user-slice";
import MenuUi from "./MenuUi";
import Mobileui from "./Mobileui";

export default function Header({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <>
      <div className="mb-16">
        <MenuUi toggleMenu={toggleMenu} />

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        ></div>
        <div
          className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Mobileui toggleMenu={toggleMenu} />
        </div>
      </div>
    </>
  );
}

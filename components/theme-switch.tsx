"use client";
import { useTheme } from "./providers/theme-provider"
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import {
  useClerk, 
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { FaArrowUp, FaUser, FaUserAlt } from "react-icons/fa";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { openSignIn } = useClerk();

  return (
    <>
      <div className="fixed bottom-5 right-5 flex gap-4">
        <button
          title="Toggle theme"
          className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          onClick={toggleTheme}
        >
          {theme === "light" ? <BsSun /> : <BsMoon />}
        </button>

        <button
          title="Scroll to top"
          className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px] rounded-[24px]",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
        <button
          title="Sign in"
          onClick={() => openSignIn()} 
          className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        >
          <FaUser />
        </button>
      </SignedOut>

      </div>


      
    </>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SignInPage from "@/components/auth/SignIn";
import ForgotPassword from "@/components/auth/ForgetPassword";
import Image from "next/image";
import logo from "../../../../../public/logo.svg";
import { useTheme } from "next-themes";

function Page() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isForget, setForgetState] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleState = () => {
    setForgetState((prevState) => !prevState);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - white background with logo */}
      <div className="flex flex-col items-center justify-center bg-offwhite min-w-1/3 max-sm:hidden">
        <Image
          src={logo}
          width={300}
          height={300}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {/* Right side - gradient with sign in */}
      <div
        className="flex w-2/3 max-sm:w-full 
    bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 
    items-center justify-center"
      >
        <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white p-6">
          <CardContent>
            {!isForget ? (
              <SignInPage onToggle={toggleState} />
            ) : (
              <ForgotPassword onToggle={toggleState} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;

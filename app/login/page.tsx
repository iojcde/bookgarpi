 
import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";
import { LoginOptions } from "./login-options";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="w-full grid-cols-1 lg:grid">
      <div className="container flex py-32 flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[300px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-4xl font-extrabold">로그인</h1>
          </div>
          <LoginOptions/>        </div>
      </div>
    </div>
  );
}

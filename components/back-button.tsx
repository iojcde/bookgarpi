"use client";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";

export const BackButton = ({
  children,
  ...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter();
  return (
    <button
      {...props}
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </button>
  );
};

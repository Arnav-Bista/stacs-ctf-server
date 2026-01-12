"use client";

import { ReactNode } from "react";

export default function ProblemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center p-6 gap-8">
      {children}
    </div>
  );
}

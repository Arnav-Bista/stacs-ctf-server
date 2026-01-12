"use client";

import { ProblemTrackerProvider } from "./tracker";

export default function ProblemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center p-6 gap-8">
      <ProblemTrackerProvider>
        {children}
      </ProblemTrackerProvider>
    </div>
  );
}

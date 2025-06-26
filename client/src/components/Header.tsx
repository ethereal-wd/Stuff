"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Bibuain Automation</h1>
      </div>
    </header>
  );
}
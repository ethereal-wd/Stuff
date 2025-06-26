"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset>
        <Header />
        <div className="p-3 md:p-6 lg:p-9 pb-10 bg-gray-100">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
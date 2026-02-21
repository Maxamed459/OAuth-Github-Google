import type { Metadata } from "next";
import "../globals.css";
import SideBar from "@/components/sideBar";


export const metadata: Metadata = {
  title: "Home - Third Part Authentications",
  description: "A simple Next.js application demonstrating third-party authentication with GitHub and Google.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="w-full h-screen flex items-center">
    //   <div className="w-65">
    //   <SideBar />
    //   </div>
    //   <div className="flex-1 overflow-auto">
    //   {children}
    //   </div>
    // </div>
    <div className="w-full h-screen flex overflow-hidden">
      {/* sidebar: fixed width, full height */}
      <aside className="w-64 flex-shrink-0 h-full">
        <SideBar />
      </aside>

      {/* main: scrollable area */}
      <main className="flex-1 overflow-auto h-full">
        {children}
      </main>
    </div>
  );
}

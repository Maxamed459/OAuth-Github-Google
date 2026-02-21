import type { Metadata } from "next";
import "../globals.css";
import DashboardShell from "@/components/dashboard/DashboardShell";


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
    <DashboardShell>{children}</DashboardShell>
  );
}

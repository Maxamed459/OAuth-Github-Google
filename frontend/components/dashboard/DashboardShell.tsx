"use client";

import ModernSidebar from "@/components/dashboard/ModernSidebar";
import {
  SidebarStateProvider,
  useSidebarState,
} from "@/components/dashboard/SidebarStateContext";

type DashboardShellProps = {
  children: React.ReactNode;
};

function DashboardShellContent({ children }: DashboardShellProps) {
  const { collapsed } = useSidebarState();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside
        className={`h-full flex-shrink-0 border-r border-slate-200 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <ModernSidebar />
      </aside>

      <main className="h-full flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarStateProvider>
      <DashboardShellContent>{children}</DashboardShellContent>
    </SidebarStateProvider>
  );
}

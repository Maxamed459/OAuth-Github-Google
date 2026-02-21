"use client";

import { createContext, useContext, useMemo, useState } from "react";

type SidebarState = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarStateContext = createContext<SidebarState | null>(null);

type SidebarStateProviderProps = {
  children: React.ReactNode;
};

export function SidebarStateProvider({ children }: SidebarStateProviderProps) {
  const [collapsed, setCollapsed] = useState(false);

  const value = useMemo(
    () => ({
      collapsed,
      toggleSidebar: () => setCollapsed((current) => !current),
    }),
    [collapsed],
  );

  return <SidebarStateContext.Provider value={value}>{children}</SidebarStateContext.Provider>;
}

export function useSidebarState() {
  const context = useContext(SidebarStateContext);
  if (!context) {
    throw new Error("useSidebarState must be used within SidebarStateProvider.");
  }
  return context;
}

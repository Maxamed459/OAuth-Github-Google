"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaGraduationCap, FaLaptopHouse } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuUniversity } from "react-icons/lu";
import { MdAnnouncement } from "react-icons/md";
import { TbPlayFootball } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import {
  DASHBOARD_FOOTER_LINKS,
  DASHBOARD_GROUPS,
  DASHBOARD_HOME,
} from "@/components/dashboard/navConfig";
import { useSidebarState } from "@/components/dashboard/SidebarStateContext";

const GROUP_ICONS: Record<string, React.ReactNode> = {
  laps: <FaLaptopHouse size={18} />,
  halls: <LuUniversity size={18} />,
  futsal: <TbPlayFootball size={18} />,
};

export default function ModernSidebar() {
  const { collapsed } = useSidebarState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") ?? "";

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    laps: true,
    halls: false,
    futsal: false,
  });

  const activeGroup = useMemo(() => {
    for (const group of DASHBOARD_GROUPS) {
      if (group.children.some((child) => child.sectionKey === activeSection)) {
        return group.id;
      }
    }
    return "";
  }, [activeSection]);

  const toggleGroup = (groupId: string) => {
    setOpenSections((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="border-b border-slate-700 p-4">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : "justify-start"}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400 text-slate-900">
            <FaGraduationCap size={22} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold tracking-wide">Campus Hub</p>
              <p className="text-xs text-slate-300">Admin Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className={`p-3 ${collapsed ? "px-2" : ""}`}>
        <ul className="space-y-2">
          <li>
            <Link
              href={DASHBOARD_HOME.href}
              title={collapsed ? DASHBOARD_HOME.label : undefined}
              className={`flex items-center rounded-md py-2 transition ${
                collapsed ? "justify-center px-2" : "gap-2 px-3"
              } ${
                pathname === DASHBOARD_HOME.href && !activeSection
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "text-slate-200 hover:bg-slate-700/70 hover:text-white"
              }`}
            >
              <AiFillDashboard size={18} />
              {!collapsed && <span>{DASHBOARD_HOME.label}</span>}
            </Link>
          </li>

          {DASHBOARD_GROUPS.map((group) => {
            const isOpen = openSections[group.id];
            const isGroupActive = activeGroup === group.id;

            if (collapsed) {
              return (
                <li key={group.id}>
                  <Link
                    href={group.children[0]?.href ?? DASHBOARD_HOME.href}
                    title={group.label}
                    className={`flex justify-center rounded-md px-2 py-2 transition ${
                      isGroupActive
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-slate-200 hover:bg-slate-700/70 hover:text-white"
                    }`}
                  >
                    {GROUP_ICONS[group.id]}
                  </Link>
                </li>
              );
            }

            return (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition ${
                    isGroupActive
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-200 hover:bg-slate-700/70 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {GROUP_ICONS[group.id]}
                    {group.label}
                  </span>
                  {isOpen ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
                </button>

                {isOpen && (
                  <ul className="mt-2 space-y-1 pl-5">
                    {group.children.map((child) => {
                      const isActive = activeSection === child.sectionKey;
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block rounded-md px-3 py-1.5 text-sm transition ${
                              isActive
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}

          <li className="pt-2">
            {!collapsed && (
              <div className="mb-2 px-3 text-xs uppercase tracking-widest text-slate-400">
                Quick Actions
              </div>
            )}
            <ul className="space-y-1">
              {DASHBOARD_FOOTER_LINKS.map((item) => {
                const isActive = activeSection === item.sectionKey;
                const icon =
                  item.sectionKey === "create" ? (
                    <GrAnnounce size={16} />
                  ) : (
                    <MdAnnouncement size={16} />
                  );

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center rounded-md py-2 transition ${
                        collapsed ? "justify-center px-2" : "gap-2 px-3"
                      } ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "text-slate-200 hover:bg-slate-700/70 hover:text-white"
                      }`}
                    >
                      {icon}
                      {!collapsed && item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

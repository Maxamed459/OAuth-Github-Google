export type DashboardChildItem = {
  label: string;
  href: string;
  sectionKey: string;
};

export type DashboardGroupItem = {
  id: string;
  label: string;
  children: DashboardChildItem[];
};

export const DASHBOARD_HOME = {
  label: "Dashboard",
  href: "/home",
};

export const DASHBOARD_GROUPS: DashboardGroupItem[] = [
  {
    id: "laps",
    label: "Laps",
    children: [
      {
        label: "Add Schedule",
        href: "/home?section=laps-add",
        sectionKey: "laps-add",
      },
      {
        label: "My Schedules",
        href: "/home?section=laps-list",
        sectionKey: "laps-list",
      },
    ],
  },
  {
    id: "halls",
    label: "Halls",
    children: [
      {
        label: "Add Schedule",
        href: "/home?section=halls-add",
        sectionKey: "halls-add",
      },
      {
        label: "My Schedules",
        href: "/home?section=halls-list",
        sectionKey: "halls-list",
      },
    ],
  },
  {
    id: "futsal",
    label: "Futsal",
    children: [
      {
        label: "Add Schedule",
        href: "/home?section=futsal-add",
        sectionKey: "futsal-add",
      },
      {
        label: "My Schedules",
        href: "/home?section=futsal-list",
        sectionKey: "futsal-list",
      },
    ],
  },
];

export const DASHBOARD_FOOTER_LINKS = [
  {
    label: "Create",
    href: "/home?section=create",
    sectionKey: "create",
  },
  {
    label: "Announcements",
    href: "/home?section=announcements",
    sectionKey: "announcements",
  },
];

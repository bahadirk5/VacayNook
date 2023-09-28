import { DashboardConfig } from "types"

export const userDashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "My reservations",
      href: "/user-dashboard/reservations",
      icon: "CalendarCheck",
    },
    {
      title: "Settings",
      href: "/user-dashboard/settings",
      icon: "settings",
    },
  ],
}

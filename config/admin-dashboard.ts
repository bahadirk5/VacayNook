import { DashboardConfig } from "types"

export const adminDashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Posts",
      href: "/admin-dashboard",
      icon: "post",
    },
    {
      title: "Settings",
      href: "/admin-dashboard/settings",
      icon: "settings",
    },
  ],
}
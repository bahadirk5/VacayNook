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
      title: "Category",
      href: "/admin-dashboard/category",
      icon: "category",
    },
    {
      title: "Settings",
      href: "/admin-dashboard/settings",
      icon: "settings",
    },
  ],
}
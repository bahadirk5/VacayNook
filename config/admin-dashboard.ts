import { DashboardConfig } from "types"

export const adminDashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Reservations",
      href: "/admin-dashboard/reservations",
      icon: "CalendarCheck",
    },
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
      title: "Amenities",
      href: "/admin-dashboard/amenities",
      icon: "AirVent",
    },
    {
      title: "Hero Section",
      href: "/admin-dashboard/hero-section",
      icon: "LayoutTemplate",
    },
    {
      title: "Settings",
      href: "/admin-dashboard/settings",
      icon: "settings",
    },
  ],
}

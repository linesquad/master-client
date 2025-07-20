import { Bell, Home, Info, Mail, Search, User } from "lucide-react";

export const getSidebarItems = (t: (key: string) => string) => [
  {
    title: t("navigation.home"),
    url: "/",
    icon: Home,
  },
  {
    title: t("navigation.about"),
    url: "/about",
    icon: Info,
  },
  {
    title: t("navigation.contact"),
    url: "/contact",
    icon: Mail,
  },
  {
    title: t("navigation.find"),
    url: "/find",
    icon: Search,
  },
  {
    title: t("navigation.notifications"),
    url: "/profile/notifications",
    icon: Bell,
  },
  {
    title: t("navigation.profile"),
    url: "/profile",
    icon: User,
  },
];

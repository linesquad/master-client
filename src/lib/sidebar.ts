import { Home, Info, Mail, Search } from "lucide-react";

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
];

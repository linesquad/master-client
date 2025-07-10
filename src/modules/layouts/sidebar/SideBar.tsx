import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { getSidebarItems } from "@/lib/sidebar";
import Languages from "@/modules/home/ui/views/languages";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const activeLinkProps = {
  activeProps: {
    className: "bg-primary text-primary-foreground",
  },
  inactiveProps: {
    className: "dark:text-white text-black",
  },
};

export function SideBar() {
  const { t } = useTranslation();
  const items = getSidebarItems(t);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-foreground dark:text-white">
            <h1 className="text-xl font-bold">{t("application.name")}</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url} {...activeLinkProps}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Languages />
    </Sidebar>
  );
}

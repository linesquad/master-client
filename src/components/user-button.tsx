"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
import { useUser } from "@/modules/auth/hooks/useUser";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BurgerMenu } from "@/modules/home/ui/components/burger-menu/BurgerMenu";
import { useTranslation } from "react-i18next";

export const UserButton = () => {
  const { data: user, isLoading } = useUser();
  const { mutate: logout } = useLogout();
  const { t } = useTranslation("common");

  if (isLoading || !user) {
    return (
      <div>
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-white/90 hover:text-white px-2 py-1.5 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/10 dark:hover:bg-white/5 rounded-sm border border-transparent hover:border-white/20 dark:hover:border-white/10 backdrop-blur-sm cursor-pointer"
              >
                {t("auth.login")}
              </Link>
              <Link
                to="/register"
                className="bg-white dark:bg-gray-100 text-[#2C5BE3] dark:text-[#1a365d] px-3 py-1.5 text-sm font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#2C5BE3] dark:focus:ring-offset-[#1a365d] shadow-lg hover:shadow-xl hover:scale-105 transform cursor-pointer"
              >
                {t("auth.register")}
              </Link>
            </div>
          </div>
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <BurgerMenu />
        </div>
      </div>
    );
  }

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email?.charAt(0).toUpperCase() ?? "U");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 font-medium text-xl text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "user"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />

        <DropdownMenuItem
          onClick={() => logout()}
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { burgerPaths } from "@/lib/burgerPaths";
import { useUser } from "@/modules/auth/hooks/useUser";
import { UserButton } from "@/components/user-button";
import { useTranslation } from "react-i18next";

export function BurgerMenu() {
  const { data: userData } = useUser();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MenuIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="IRKLE" className="w-20 h-20" />
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-6">
            {userData ? (
              <div>
                <UserButton />
              </div>
            ) : (
              burgerPaths.map((path) => (
                <Link to={path.path} key={path.name} onClick={handleLinkClick}>
                  <span className="text-lg font-medium transition-all duration-300 hover:text-indigo-600">
                    {t(path.name)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

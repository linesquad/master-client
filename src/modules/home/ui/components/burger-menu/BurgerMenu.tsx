import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { burgerPaths } from "@/lib/burgerPaths"

  export function BurgerMenu() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

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
            <img src="/projectlogo.webp" alt="IRKLE" className="w-10 h-10" />
            <SheetTitle>IRKLE</SheetTitle>
          </div>
          <SheetDescription>
            Navigate to different sections of the app
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-6">
            {burgerPaths.map((path) => (
              <Link to={path.path} key={path.name} onClick={handleLinkClick}>
                <span className="text-lg font-medium transition-all duration-300 hover:text-indigo-600">{path.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

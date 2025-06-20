import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerDemo() {
  const [searchData, setSearchData] = useState("")

  const handleSearch = () => {
    console.log(searchData)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Search</DrawerTitle>
            <DrawerDescription>Enter your search query to find content.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleSearch}>Search</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

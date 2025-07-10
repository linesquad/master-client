import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useFindMasterByName } from "./hooks/useFindMasterByName";

interface Master {
  id: string;
  fullName: string;
  imageUrl: string;
  city: string;
  availability: string;
}

export function DrawerDemo() {
  const [searchData, setSearchData] = useState("");
  const { data, isLoading, isError, error } = useFindMasterByName(
    searchData,
    5
  );

  let masters: Master[] = [];
  if (data) {
    if (Array.isArray(data)) {
      // If data is directly an array
      masters = data.slice(0, 5); // Limit to 5 results
    } else if (data.masters && Array.isArray(data.masters)) {
      // If data is wrapped in a masters property
      masters = data.masters.slice(0, 5); // Limit to 5 results
    }
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
            <DrawerTitle>Search Masters</DrawerTitle>
            <DrawerDescription>
              Search for masters by name (minimum 2 characters).
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search masters..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="mt-4 max-h-80 overflow-y-auto">
              {isLoading && searchData.length >= 2 && (
                <div className="py-4 text-center text-sm">Searching...</div>
              )}

              {isError && (
                <div className="py-4 text-center text-sm text-red-500">
                  Error: {error?.message || "Something went wrong"}
                </div>
              )}

              {searchData.length < 2 && searchData.length > 0 && (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  Type at least 2 characters to search
                </div>
              )}

              {searchData.length >= 2 && !isLoading && masters.length === 0 && (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No masters found.
                </div>
              )}

              {masters.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Showing {masters.length} master(s)
                  </div>
                  {masters.map((master) => (
                    <Link
                      key={master.id}
                      to="/find"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        {master.imageUrl && (
                          <img
                            src={master.imageUrl}
                            alt={master.fullName}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate">
                            {master.fullName}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="truncate">{master.city}</span>
                            <span>•</span>
                            <span
                              className={
                                master.availability === "now"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }
                            >
                              {master.availability === "now"
                                ? "Available now"
                                : master.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

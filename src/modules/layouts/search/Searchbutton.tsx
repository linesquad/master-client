import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useFindMasterByName } from "./hooks/useFindMasterByName";

interface Master {
  id: string;
  fullName: string;
  imageUrl: string;
  city: string;
  availability: string;
}

export function Searchbutton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, isError, error } = useFindMasterByName(
    searchQuery,
    5
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  // Debug logging
  React.useEffect(() => {
    if (data) {
      console.log("Search data received:", data);
    }
  }, [data]);

  // Handle both possible response structures
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
    <>
      <p className="text-muted-foreground text-sm">
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search masters..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList className="max-h-[320px] overflow-y-auto">
          {isLoading && searchQuery.length >= 2 && (
            <div className="py-6 text-center text-sm">Searching...</div>
          )}
          {isError && (
            <div className="py-6 text-center text-sm text-red-500">
              Error: {error?.message || "Something went wrong"}
            </div>
          )}
          {searchQuery.length < 2 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search
            </div>
          )}
          {searchQuery.length >= 2 && !isLoading && masters.length === 0 && (
            <CommandEmpty>No masters found.</CommandEmpty>
          )}
          {masters.length > 0 && (
            <CommandGroup heading={`Masters (showing ${masters.length})`}>
              <div className="space-y-1">
                {masters.map((master) => (
                  <CommandItem
                    key={master.id}
                    value={master.fullName}
                    className="p-0"
                    onSelect={() => {
                      // Navigate to the master's profile or find page
                      window.open(`/Find?masterId=${master.id}`, "_self");
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 p-3 w-full cursor-pointer hover:bg-accent rounded-lg">
                      {master.imageUrl && (
                        <img
                          src={master.imageUrl}
                          alt={master.fullName}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium text-sm truncate">
                          {master.fullName}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

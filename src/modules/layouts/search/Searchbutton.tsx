import * as React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
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
          placeholder=""
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList className="max-h-[320px] overflow-y-auto">
          {isLoading && searchQuery.length >= 2 && (
            <div className="py-6 text-center text-sm">{t("search.searching")}</div>
          )}
          {isError && (
            <div className="py-6 text-center text-sm text-red-500">
              {t("common.error")}: {error?.message || "Something went wrong"}
            </div>
          )}
          {searchQuery.length < 2 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t("search.typeToSearch")}
            </div>
          )}
          {searchQuery.length >= 2 && !isLoading && masters.length === 0 && (
            <CommandEmpty>{t("search.noMastersFound")}</CommandEmpty>
          )}
          {masters.length > 0 && (
            <CommandGroup heading={t("search.showingResults", { count: masters.length })}>
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
                    <div className="flex items-start gap-3 p-3 w-full cursor-pointer hover:bg-accent rounded-lg min-h-[60px]">
                      {master.imageUrl && (
                        <img
                          src={master.imageUrl}
                          alt={master.fullName}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                        />
                      )}
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium text-sm leading-snug break-words" 
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word'
                              }}>
                          {master.fullName}
                        </span>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground mt-1">
                          <span className="break-words leading-relaxed" style={{ wordBreak: 'break-word' }}>
                            {master.city}
                          </span>
                          <span className="flex-shrink-0">•</span>
                          <span
                            className={`flex-shrink-0 ${
                              master.availability === "now"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {master.availability === "now"
                              ? t("search.availableNow")
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

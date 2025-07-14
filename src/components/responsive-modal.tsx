"use client";

import { useIsMobile } from "@/hooks/use-mobile";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModalTwo = ({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg border-none overflow-y-auto hide-scrollbar max-h-[85vh] bg-white p-4">
          <DialogTitle className="sr-only">Complete Lead</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

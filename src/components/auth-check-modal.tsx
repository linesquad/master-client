import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent } from "./ui/drawer";

interface AuthCheckModalProps {
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
}

export function AuthCheckModal({
  showDialog,
  setShowDialog,
}: AuthCheckModalProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Drawer open={showDialog} onOpenChange={setShowDialog}>
        <DrawerContent>
          <div className="text-center text-lg font-medium">
            Please login to contact the master
          </div>
          <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <div className="text-center text-lg font-medium">
          Please login to contact the master
        </div>
        <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
      </DialogContent>
    </Dialog>
  );
}

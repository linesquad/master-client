import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/modules/layouts/sidebar/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideBar /> 
      <SidebarInset>
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

import Header from "@/modules/layouts/Header";
import Footer from "@/modules/layouts/Footer";
import SideBarLayout from "@/modules/layouts/sidebar/SideBarLayout";
import { StickyThemeToggle } from "./ui/sticky-theme-toggle";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      <div className=" flex flex-col">
        <SideBarLayout>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SideBarLayout>
        <StickyThemeToggle />
      </div>
    </div>
  );
}

export default MainLayout;

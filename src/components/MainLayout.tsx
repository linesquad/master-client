import Header from "@/modules/layouts/Header";
import Footer from "@/modules/layouts/Footer";
import SideBarLayout from "@/modules/layouts/sidebar/SideBarLayout";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="min-h-screen flex flex-col">
        <SideBarLayout>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SideBarLayout>
      </div>
    </div>
  );
}

export default MainLayout;

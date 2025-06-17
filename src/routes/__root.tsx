import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "@/modules/layouts/Header";
import Footer from "@/modules/layouts/Footer";
import SideBarLayout from "@/modules/layouts/sidebar/SideBarLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <SideBarLayout>
      <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      <Footer />
      </SideBarLayout>
    </div>
  );
}

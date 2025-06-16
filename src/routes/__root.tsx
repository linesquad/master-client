import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
// import SideBar from "@/modules/layouts/SideBar";
import Footer from "@/modules/layouts/Footer";
import Header from "@/modules/layouts/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header />
      {/* <SideBar /> */}
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}

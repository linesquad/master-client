import { getUserId } from "@/modules/auth/services/auth";
import { Outlet, redirect } from "@tanstack/react-router";

  export const Route = createFileRoute({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getUserId().catch(() => null);
    if (!user) {
      throw redirect({ to: "/login" });
    }
    return { user };
  },
})

function RouteComponent() {
  return <Outlet />
}

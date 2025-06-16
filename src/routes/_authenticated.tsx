import { getUserId } from "@/modules/auth/services/auth";
import { Outlet, redirect } from "@tanstack/react-router";

  export const Route = createFileRoute({
  component: RouteComponent,
  loader: async () => {
    const user = await getUserId().catch(() => null);
    if (!user) {
      throw redirect({ to: "/register" });
    }
    console.log(user)
    return { user };
  },
})

function RouteComponent() {
  return <Outlet />
}

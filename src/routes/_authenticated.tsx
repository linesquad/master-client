import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute({
  beforeLoad: async ({ context }) => {
    const user = await context.getUser();
    if (!user) throw redirect({ to: "/login" });

    return { user };
  },
});

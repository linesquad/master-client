import { getUserId } from "@/modules/auth/services/auth";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute({
  beforeLoad: async () => {
    const user = await getUserId().catch(() => null);
    if (!user) {
      throw redirect({ to: "/login" });
    }
  },
});

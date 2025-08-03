import { useUser } from "@/modules/auth/hooks/useUser";
import { ClientCard } from "../components/client-card";
import { ClientLeadsResults } from "../components/client-leads-results";
import { ClientReviews } from "../components/client-reviews";
import { DottedSeparator } from "@/components/dotted-separator";

export function MainProfileView() {
  const { data: user, isInitialLoad } = useUser();

  if (isInitialLoad)
    return (
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 animate-pulse h-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 h-64 animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 h-64 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  if (!user) return <div>User not found</div>;

  return (
    <>
      <ClientCard user={user} />
      <div className="my-10">
        <DottedSeparator />
      </div>
      <ClientLeadsResults />
      <div className="my-10">
        <DottedSeparator />
      </div>
      <ClientReviews />
    </>
  );
}

import type { Client } from "@/modules/auth/types";

interface ClientNotificationHeaderProps {
  user: Client | null;
}

export const ClientNotificationHeader = ({
  user,
}: ClientNotificationHeaderProps) => {
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="font-bold">Your information</h2>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Full name:</p>
            <p>{user.fullName}</p>
            <p className="font-bold">Email:</p>
            <p>{user.email}</p>
            <p className="font-bold">Phone:</p>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useMutation } from "@tanstack/react-query";
import { createLead } from "../services/masters";
import toast from "react-hot-toast";
import { MasterAvatar } from "@/components/master-avatar";

export const useCreateLead = () => {
  return useMutation({
    mutationFn: ({
      masterJobId,
      message,
      location,
      requestedTime,
    }: {
      masterJobId: string;
      message?: string;
      location: string;
      requestedTime?: string;
    }) => createLead(masterJobId, message, location, requestedTime),
    onSuccess: ({ data }) => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <MasterAvatar
                    name={data.master.fullName}
                    className="size-10"
                    fallbackClassName="text-lg"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {data.master.fullName}
                  </p>
                  <a
                    href={`tel:${data.master.phone}`}
                    className="mt-1 text-sm text-gray-500 hover:text-blue-500 hover:underline cursor-pointer"
                  >
                    {data.master.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 1000 * 60 * 5,
        }
      );
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create lead");
    },
  });
};

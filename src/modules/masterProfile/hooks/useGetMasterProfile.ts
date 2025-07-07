import { useQuery } from "@tanstack/react-query";
import { getMasterProfile } from "../services/proflie";

export const useGetMasterProfile = (id: string) => {
  return useQuery({
    queryKey: ["master-profile", id],
    queryFn: () => getMasterProfile(id),
    enabled: !!id,
  });
};

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useUpdateMemberRole = () => {
  const mutate = useMutation(api.members.updateRole);
  return { mutate };
};

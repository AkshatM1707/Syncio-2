import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useRemoveMember = () => {
  const mutate = useMutation(api.members.remove);
  return { mutate };
};

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useLeaveWorkspace = () => {
  const mutate = useMutation(api.members.leave);
  return { mutate };
};

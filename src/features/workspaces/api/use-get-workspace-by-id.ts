import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetWorkspaceByIdProps {
  id: Id<"workspaces">;
}

export const useGetWorkspace = ({ id }: UseGetWorkspaceByIdProps) => {
  const data = useQuery(api.workspaces.getByID, { id });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};

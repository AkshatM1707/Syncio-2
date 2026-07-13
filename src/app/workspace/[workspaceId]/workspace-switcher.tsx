"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter((w) => w._id !== workspaceId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-lg rounded-lg flex items-center justify-center cursor-pointer transition-colors p-0 border-none outline-none">
          {workspaceLoading ? (
            <Loader2 className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name?.charAt(0).toUpperCase() ?? "W"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer flex-col justify-start items-start capitalize font-semibold"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground font-normal">
            Active workspace
          </span>
        </DropdownMenuItem>
        
        {filteredWorkspaces?.length ? (
          <>
            <DropdownMenuSeparator />
            {filteredWorkspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace._id}
                className="cursor-pointer capitalize overflow-hidden"
                onClick={() => router.push(`/workspace/${workspace._id}`)}
              >
                <div className="size-9 shrink-0 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-lg flex items-center justify-center mr-2">
                  {workspace.name.charAt(0).toUpperCase()}
                </div>
                <p className="truncate">{workspace.name}</p>
              </DropdownMenuItem>
            ))}
          </>
        ) : null}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTimeout(() => setOpen(true), 0)}
        >
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-lg flex items-center justify-center mr-2">
            <Plus className="size-5" />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

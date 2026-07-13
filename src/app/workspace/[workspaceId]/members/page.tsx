"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useUpdateMemberRole } from "@/features/members/api/use-update-member-role";
import { useRemoveMember } from "@/features/members/api/use-remove-member";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreVertical, ShieldAlert, Trash, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MembersPage() {
  const workspaceId = useWorkspaceId();
  const { data: members, isLoading: loadingMembers } = useGetMembers({ workspaceId });
  const { data: currentMember, isLoading: loadingCurrentMember } = useCurrentMember({ workspaceId });

  const { mutate: updateRole } = useUpdateMemberRole();
  const { mutate: removeMember } = useRemoveMember();

  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  if (loadingMembers || loadingCurrentMember) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isAdmin = currentMember?.role === "admin";

  const handleUpdateRole = async (memberId: string, role: "admin" | "member") => {
    try {
      await updateRole({ id: memberId as any, role });
    } catch (error) {
      console.error(error);
      // Would typically use toast here
    }
  };

  const handleRemove = async () => {
    if (!memberToRemove) return;
    try {
      await removeMember({ id: memberToRemove as any });
      setMemberToRemove(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Workspace Members</h1>
      
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {members?.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between p-3 border rounded-lg bg-white"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={member.user?.imageUrl} />
                  <AvatarFallback className="bg-sky-500 text-white">
                    {member.user?.name?.charAt(0).toUpperCase() ?? "M"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">
                      {member.user?.name}
                      {currentMember?._id === member._id && (
                        <span className="text-xs font-normal text-muted-foreground ml-2">
                          (You)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {member.role === "admin" ? (
                      <ShieldCheck className="size-3 text-rose-500" />
                    ) : (
                      <ShieldAlert className="size-3 text-blue-500" />
                    )}
                    <span className="capitalize">{member.role}</span>
                  </div>
                </div>
              </div>

              {isAdmin && currentMember?._id !== member._id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        handleUpdateRole(
                          member._id,
                          member.role === "admin" ? "member" : "admin"
                        )
                      }
                    >
                      {member.role === "admin" ? "Demote to Member" : "Promote to Admin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setMemberToRemove(member._id)}
                    >
                      <Trash className="size-4 mr-2" />
                      Remove from workspace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this member from the workspace? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberToRemove(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemove}>
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

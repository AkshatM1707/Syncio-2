"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOutIcon } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const UserButton = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Fetch Convex user via `users.current`
  const convexUser = useQuery(api.users.current, {});

  if (!isLoaded) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!user) {
    // console.log("Not logged in");
    return null;
  }

  console.log("Logged in", { clerk: user, convex: convexUser });

  return (
    <DropdownMenu modal={false}> 
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="rounded-md size-10 hover:opacity-75 transition">
          <AvatarImage
            className="rounded-md"
            alt={user.fullName ?? "User"}
            src={user.imageUrl}
          />
          <AvatarFallback className="rounded-md bg-sky-500 text-white ">
            {user.firstName?.charAt(0).toUpperCase() ??
              user.username?.charAt(0).toUpperCase() ??
              "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        {convexUser ? (
          <div className="px-3 py-2 text-sm">
            <p className="font-medium">{convexUser.name}</p>
            <p className="text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Loading profile…
          </div>
        )}
        <DropdownMenuItem onClick={() => signOut()} className="h-10">
          <LogOutIcon className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

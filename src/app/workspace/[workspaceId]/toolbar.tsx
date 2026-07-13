"use client";

import { Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5 border-b border-white/20">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/30 w-full justify-start h-7 px-2 text-white/80 hover:text-white transition-colors"
        >
          <Search className="w-4 h-4 mr-2" />
          <span className="text-xs">Search workspace</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:bg-white/20 hover:text-white"
        >
          <Info className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};
